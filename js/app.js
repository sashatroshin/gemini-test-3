document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
});

// Will be populated with config from config.json
let appConfig = {};

// Main app initialization function
function initializeApp() {
    initializeInputProcessing();
    initializeExpenseManagement();
    loadState(); // Load saved data
    updateSummary(); // Initial calculation based on loaded data
}

// --- HELPERS ---
function getFieldValue(id) {
    const input = document.getElementById(id);
    return parseInt(input ? input.value : '0', 10) || 0;
}

function setSummaryValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// --- STATE MANAGEMENT ---
function saveState() {
    const state = {
        fields: {},
        expenses: []
    };

    const inputIds = [
        'razmen', 'presto_nalichnie', 'presto_karti', 'presto_vozvrati',
        'dostavka', 'samovivoz', 'nalichnie_vsego', 'terminal_sverka'
    ];
    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            state.fields[id] = {
                value: input.value,
                rawValue: input.dataset.rawValue
            };
        }
    });

    document.querySelectorAll('.expense-row').forEach(row => {
        const sumInput = row.querySelector('input[name="expense_sum"]');
        const categorySelect = row.querySelector('select[name="expense_category"]');
        const commentInput = row.querySelector('input[name="expense_comment"]');
        state.expenses.push({
            sum: {
                value: sumInput.value,
                rawValue: sumInput.dataset.rawValue
            },
            category: categorySelect.value,
            comment: commentInput.value
        });
    });

    localStorage.setItem('shiftReportData', JSON.stringify(state));
    console.log('State saved to localStorage');
}

function loadState() {
    const savedState = localStorage.getItem('shiftReportData');
    if (!savedState) return;

    const state = JSON.parse(savedState);

    // Load static fields
    for (const id in state.fields) {
        const input = document.getElementById(id);
        if (input) {
            input.value = state.fields[id].value || '';
            if (state.fields[id].rawValue) {
                input.dataset.rawValue = state.fields[id].rawValue;
            }
            // Store the calculated value as well for consistency
            input.dataset.calculatedValue = input.value;
        }
    }

    // Load dynamic expense rows
    const expensesContainer = document.getElementById('expenses-container');
    expensesContainer.innerHTML = ''; // Clear any existing rows
    state.expenses.forEach(expense => {
        const newRow = createExpenseRow();
        const sumInput = newRow.querySelector('input[name="expense_sum"]');
        const categorySelect = newRow.querySelector('select[name="expense_category"]');
        const commentInput = newRow.querySelector('input[name="expense_comment"]');

        sumInput.value = expense.sum.value || '0';
        if (expense.sum.rawValue) {
            sumInput.dataset.rawValue = expense.sum.rawValue;
        }
        sumInput.dataset.calculatedValue = sumInput.value;

        categorySelect.value = expense.category || '';
        commentInput.value = expense.comment || '';

        expensesContainer.appendChild(newRow);
    });

    console.log('State loaded from localStorage');
}


// --- SUMMARY CALCULATION ---
function updateSummary() {
    // ... (rest of the function is the same)
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

    saveState();
}


// --- INPUT PROCESSING ---
// ... (function is the same)
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

function initializeInputProcessing() {
    const inputIds = [
        'razmen', 'presto_nalichnie', 'presto_karti',
        'dostavka', 'samovivoz', 'nalichnie_vsego', 'terminal_sverka'
    ];
    inputIds.forEach(id => addInputProcessing(document.getElementById(id)));
}

// --- EXPENSE MANAGEMENT ---
// ... (function is the same)
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
