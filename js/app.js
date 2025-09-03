/**
 * @file Main application logic for the shift report form.
 * @author Gemini Agent
 */

// --- GLOBAL STATE ---

/** @type {object} Holds the application configuration from config.json. */
let appConfig = {};
/** @type {string} The current calculated business date (YYYY-MM-DD). */
let currentBusinessDate = '';
/** @type {number|null} The timer for the webhook sending delay. */
let webhookTimer = null;


// --- INITIALIZATION ---

/**
 * Main entry point. Fires after the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
});

/**
 * Fetches configuration and initializes the application.
 */
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        appConfig = await response.json();
        initializeApp();
    } catch (error) {
        console.error('Could not load config.json:', error);
        alert('Ошибка: Не удалось загрузить файл конфигурации.');
    }
}

/**
 * Kicks off all initialization functions after config is loaded.
 */
function initializeApp() {
    initializeBusinessDate();
    initializeInputProcessing();
    initializeExpenseManagement();
    loadState();
    updateSummary();
}


// --- HELPERS ---

/**
 * Gets the integer value of a form field.
 * @param {string} id The ID of the input element.
 * @returns {number} The parsed integer value, or 0 if invalid.
 */
function getFieldValue(id) {
    const input = document.getElementById(id);
    return parseInt(input ? input.value : '0', 10) || 0;
}

/**
 * Sets the text content of a summary field.
 * @param {string} id The ID of the span element.
 * @param {string|number} value The value to display.
 */
function setSummaryValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}


// --- CORE LOGIC ---

/**
 * Calculates the current business date based on the changeover time in the config.
 * @returns {string} The business date in YYYY-MM-DD format.
 */
function getBusinessDate() {
    const { changeTime, timezone } = appConfig.businessDate;
    const [changeHour, changeMinute] = changeTime.split(':').map(Number);
    const nowInTimezone = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
    const changeDate = new Date(nowInTimezone.getTime());
    changeDate.setHours(changeHour, changeMinute, 0, 0);
    if (nowInTimezone < changeDate) {
        nowInTimezone.setDate(nowInTimezone.getDate() - 1);
    }
    const year = nowInTimezone.getFullYear();
    const month = String(nowInTimezone.getMonth() + 1).padStart(2, '0');
    const day = String(nowInTimezone.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Sets the initial business date on the page.
 */
function initializeBusinessDate() {
    currentBusinessDate = getBusinessDate();
    setSummaryValue('buisnessdate', currentBusinessDate);
}

/**
 * Checks if the business date has changed since the page loaded and reloads if it has.
 */
function checkBusinessDate() {
    const newBusinessDate = getBusinessDate();
    if (currentBusinessDate !== newBusinessDate) {
        localStorage.removeItem(`shiftReportData_${newBusinessDate}`);
        window.location.reload();
    }
}

/**
 * Resets the 1-minute timer to send the webhook.
 */
function resetWebhookTimer() {
    clearTimeout(webhookTimer);
    webhookTimer = setTimeout(sendWebhook, 60000);
}


// --- STATE MANAGEMENT (LocalStorage) ---

/**
 * Saves the entire form state to localStorage.
 */
function saveState() {
    const state = { fields: {}, expenses: [] };
    const inputIds = [
        'razmen', 'presto_nalichnie', 'presto_karti', 'presto_vozvrati',
        'dostavka', 'samovivoz', 'nalichnie_vsego', 'terminal_sverka'
    ];
    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            state.fields[id] = { value: input.value, rawValue: input.dataset.rawValue };
        }
    });
    document.querySelectorAll('.expense-row').forEach(row => {
        const sumInput = row.querySelector('input[name="expense_sum"]');
        const categorySelect = row.querySelector('select[name="expense_category"]');
        const commentInput = row.querySelector('input[name="expense_comment"]');
        state.expenses.push({
            sum: { value: sumInput.value, rawValue: sumInput.dataset.rawValue },
            category: categorySelect.value,
            comment: commentInput.value
        });
    });
    localStorage.setItem(`shiftReportData_${currentBusinessDate}`, JSON.stringify(state));
}

/**
 * Loads the form state from localStorage for the current business date.
 */
function loadState() {
    const savedState = localStorage.getItem(`shiftReportData_${currentBusinessDate}`);
    if (!savedState) return;
    const state = JSON.parse(savedState);
    for (const id in state.fields) {
        const input = document.getElementById(id);
        if (input) {
            input.value = state.fields[id].value || '';
            if (state.fields[id].rawValue) input.dataset.rawValue = state.fields[id].rawValue;
            input.dataset.calculatedValue = input.value;
        }
    }
    const expensesContainer = document.getElementById('expenses-container');
    expensesContainer.innerHTML = '';
    state.expenses.forEach(expense => {
        const newRow = createExpenseRow();
        const sumInput = newRow.querySelector('input[name="expense_sum"]');
        const categorySelect = newRow.querySelector('select[name="expense_category"]');
        const commentInput = newRow.querySelector('input[name="expense_comment"]');
        sumInput.value = expense.sum.value || '0';
        if (expense.sum.rawValue) sumInput.dataset.rawValue = expense.sum.rawValue;
        sumInput.dataset.calculatedValue = sumInput.value;
        categorySelect.value = expense.category || '';
        commentInput.value = expense.comment || '';
        expensesContainer.appendChild(newRow);
    });
}


// --- UI & EVENT HANDLING ---

/**
 * The main calculation and UI update function. Called whenever data changes.
 */
function updateSummary() {
    checkBusinessDate();
    const razmen = getFieldValue('razmen');
    const presto_nalichnie = getFieldValue('presto_nalichnie');
    const presto_karti = getFieldValue('presto_karti');
    const dostavka = getFieldValue('dostavka');
    const samovivoz = getFieldValue('samovivoz');
    const nalichnie_vsego = getFieldValue('nalichnie_vsego');
    const terminal_sverka = getFieldValue('terminal_sverka');
    let obschie_rashodi = 0;
    document.querySelectorAll('input[name="expense_sum"]').forEach(input => {
        obschie_rashodi += parseInt(input.value, 10) || 0;
    });
    const ozhidaemie_nalichnie = razmen + presto_nalichnie - obschie_rashodi;
    const raznica_nalichnie = nalichnie_vsego - ozhidaemie_nalichnie;
    const fakt_beznal = terminal_sverka + dostavka + samovivoz;
    const raznica_beznal = fakt_beznal - presto_karti;
    const obschaya_vyruchka = presto_nalichnie + presto_karti;
    const chistie_nalichnie = ozhidaemie_nalichnie - razmen;
    setSummaryValue('obschie_rashodi', obschie_rashodi);
    setSummaryValue('ozhidaemie_nalichnie', ozhidaemie_nalichnie);
    setSummaryValue('raznica_nalichnie', raznica_nalichnie);
    setSummaryValue('fakt_beznal', fakt_beznal);
    setSummaryValue('raznica_beznal', raznica_beznal);
    setSummaryValue('obschaya_vyruchka', obschaya_vyruchka);
    setSummaryValue('chistie_nalichnie', chistie_nalichnie);
    updateDiscrepancyMessages(raznica_nalichnie, raznica_beznal);
    saveState();
    resetWebhookTimer();
}

/**
 * Displays messages in the summary area based on cash/cashless discrepancies.
 * @param {number} raznica_nalichnie The cash discrepancy.
 * @param {number} raznica_beznal The cashless discrepancy.
 */
function updateDiscrepancyMessages(raznica_nalichnie, raznica_beznal) {
    const messagesContainer = document.getElementById('messages-container');
    const { messages } = appConfig;
    let html = '';
    if (raznica_nalichnie > 0) {
        const msg = messages.cashSurplus;
        html += `<article><header><strong>${msg.title}</strong></header><p>${msg.template.replace('{amount}', raznica_nalichnie)}</p></article>`;
    } else if (raznica_nalichnie < 0) {
        const msg = messages.cashShortage;
        html += `<article><header><strong>${msg.title}</strong></header><p>${msg.template.replace('{amount}', Math.abs(raznica_nalichnie))}</p></article>`;
    }
    if (raznica_beznal > 0) {
        const msg = messages.cashlessDiscrepancyPositive;
        html += `<article><header><strong>${msg.title}</strong></header><p>${msg.template.replace('{amount}', raznica_beznal)}</p></article>`;
    } else if (raznica_beznal < 0) {
        const msg = messages.cashlessDiscrepancyNegative;
        html += `<article><header><strong>${msg.title}</strong></header><p>${msg.template.replace('{amount}', Math.abs(raznica_beznal))}</p></article>`;
    }
    messagesContainer.innerHTML = html;
}

/**
 * Adds expression evaluation and validation to an input field.
 * @param {HTMLInputElement} input The input element to process.
 */
function addInputProcessing(input) {
    if (!input) return;
    input.addEventListener('focus', (e) => {
        if (e.target.dataset.rawValue) e.target.value = e.target.dataset.rawValue;
    });
    input.addEventListener('input', (e) => {
        const isValid = /^[0-9+]*$/.test(e.target.value);
        e.target.setAttribute('aria-invalid', !isValid);
    });
    input.addEventListener('blur', (e) => {
        const value = e.target.value;
        e.target.dataset.rawValue = value;
        if (!/^[0-9+]*$/.test(value) || value.trim() === '') {
            e.target.value = e.target.dataset.calculatedValue || '0';
        } else {
            try {
                const result = value.split('+').reduce((sum, term) => sum + (parseInt(term, 10) || 0), 0);
                e.target.value = result;
                e.target.dataset.calculatedValue = result;
            } catch (error) {
                e.target.value = e.target.dataset.calculatedValue || '0';
                e.target.setAttribute('aria-invalid', 'true');
            }
        }
        updateSummary();
    });
}

/**
 * Initializes all static input fields on the page.
 */
function initializeInputProcessing() {
    const inputIds = [
        'razmen', 'presto_nalichnie', 'presto_karti',
        'dostavka', 'samovivoz', 'nalichnie_vsego', 'terminal_sverka'
    ];
    inputIds.forEach(id => addInputProcessing(document.getElementById(id)));
}

/**
 * Creates a new HTML row for entering an expense.
 * @returns {HTMLDivElement} The new row element.
 */
function createExpenseRow() {
    const row = document.createElement('div');
    row.className = 'grid expense-row';
    row.innerHTML = `
        <div>
            <input type="text" name="expense_sum" placeholder="Сумма" value="0">
        </div>
        <div>
            <select name="expense_category">
                ${appConfig.expenseCategories.map(category => `<option value="${category}">${category}</option>`).join('')}
            </select>
        </div>
        <div>
            <input type="text" name="expense_comment" placeholder="Комментарий">
        </div>
        <button class="secondary outline" name="delete_expense">Удалить</button>
    `;
    const sumInput = row.querySelector('input[name="expense_sum"]');
    addInputProcessing(sumInput);
    sumInput.dataset.calculatedValue = '0';
    return row;
}

/**
 * Sets up the "Add Expense" button and handles row deletion.
 */
function initializeExpenseManagement() {
    const addExpenseBtn = document.getElementById('add-expense');
    const expensesContainer = document.getElementById('expenses-container');
    addExpenseBtn.addEventListener('click', () => {
        const newRow = createExpenseRow();
        expensesContainer.appendChild(newRow);
        updateSummary();
    });
    expensesContainer.addEventListener('click', (e) => {
        if (e.target && e.target.name === 'delete_expense') {
            e.target.closest('.expense-row').remove();
            updateSummary();
        }
    });
}


// --- WEBHOOK ---

/**
 * Gathers all form data into a JSON object for the webhook.
 * @returns {object} The report data object.
 */
function getReportData() {
    const report = {
        shiftReport: {
            date: new Date().toISOString().split('T')[0],
            buisnessdate: currentBusinessDate
        },
        fields: {},
        rashodi: [],
        status: appConfig.status || 'test'
    };
    const inputIds = [
        'razmen', 'nalichnie_vsego', 'dostavka', 'samovivoz',
        'presto_nalichnie', 'presto_karti', 'presto_vozvrati', 'terminal_sverka'
    ];
    inputIds.forEach(id => {
        report.fields[id] = document.getElementById(id).value;
    });
    document.querySelectorAll('.expense-row').forEach(row => {
        report.rashodi.push({
            summa: row.querySelector('input[name="expense_sum"]').value,
            kategoriya: row.querySelector('select[name="expense_category"]').value,
            komment: row.querySelector('input[name="expense_comment"]').value
        });
    });
    return report;
}

/**
 * Sends the report data to the configured webhook URL.
 */
async function sendWebhook() {
    const reportData = getReportData();
    console.log('Sending webhook with data:', reportData);
    try {
        const response = await fetch(appConfig.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportData)
        });
        if (!response.ok) {
            throw new Error(`Webhook failed with status: ${response.status}`);
        }
        console.log('Webhook sent successfully!');
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

// --- INITIALIZATION ---
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        appConfig = await response.json();
        console.log('Config loaded:', appConfig);
        initializeApp();
    } catch (error) {
        console.error('Could not load config.json:', error);
        alert('Ошибка: Не удалось загрузить файл конфигурации.');
    }
}
