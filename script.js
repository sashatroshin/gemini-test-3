let appConfig = {};
let debounceTimer;

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Shift Report App Initialized");
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        appConfig = await response.json();
        initializeApp();
    } catch (error) {
        console.error("Failed to load config.json:", error);
        alert("КРИТИЧЕСКАЯ ОШИБКА: Не удалось загрузить config.json. Приложение не может работать.");
    }
});

function initializeApp() {
    const formColumn = document.querySelector('.form-column');
    setupMathInputs(formColumn);
    setupExpenseHandling(formColumn);
    
    formColumn.addEventListener('input', handleFormChange);
    formColumn.addEventListener('focusout', handleFormChange);
    formColumn.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-expense-btn')) {
            handleFormChange();
        }
    });

    loadDataFromLocalStorage();
    updateCalculations();
}

function handleFormChange() {
    const data = getFormData();
    updateCalculations(data);
    saveDataToLocalStorage(data);
    triggerWebhook(data);
}

// --- WEBHOOK INTEGRATION ---
function triggerWebhook(data) {
    clearTimeout(debounceTimer);
    const statusDiv = document.getElementById('webhook-status');
    statusDiv.textContent = 'Изменения сохранены. Отправка через 1 минуту...';
    statusDiv.className = 'status-saving';

    debounceTimer = setTimeout(() => {
        sendDataToWebhook(data);
    }, 60000); // 1 minute
}

async function sendDataToWebhook(data) {
    const statusDiv = document.getElementById('webhook-status');
    statusDiv.textContent = 'Отправка данных...';
    statusDiv.className = 'status-sending';

    const businessDate = getBusinessDate();
    const [year, month, day] = businessDate.split('-');

    const payload = {
        shiftReport: {
            date: new Date().toLocaleDateString('ru-RU'),
            buisnessdate: `${day}.${month}.${year}`
        },
        fields: data.fields,
        rashodi: data.rashodi
    };

    try {
        const response = await fetch(appConfig.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            statusDiv.textContent = 'Данные успешно отправлены.';
            statusDiv.className = 'status-success';
        } else {
            throw new Error(`Server responded with ${response.status}`);
        }
    } catch (error) {
        console.error("Webhook send error:", error);
        statusDiv.textContent = 'Ошибка отправки данных.';
        statusDiv.className = 'status-error';
    }
}


// --- DATA PERSISTENCE ---
function getBusinessDate() {
    const now = new Date();
    const localTime = now.getTime();
    const localOffset = now.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const tzOffset = appConfig.businessDate.timezone === "Asia/Irkutsk" ? 8 * 3600000 : 0;
    const targetTime = new Date(utc + tzOffset);
    const [hours, minutes] = appConfig.businessDate.changeTime.split(':').map(Number);
    if (targetTime.getHours() < hours || (targetTime.getHours() === hours && targetTime.getMinutes() < minutes)) {
        targetTime.setDate(targetTime.getDate() - 1);
    }
    const year = targetTime.getFullYear();
    const month = String(targetTime.getMonth() + 1).padStart(2, '0');
    const day = String(targetTime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function saveDataToLocalStorage(data) {
    const businessDate = getBusinessDate();
    localStorage.setItem(`shiftReport-${businessDate}`, JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    const businessDate = getBusinessDate();
    const savedData = localStorage.getItem(`shiftReport-${businessDate}`);
    if (savedData) {
        populateForm(JSON.parse(savedData));
    }
}

function populateForm(data) {
    if (!data) return;
    for (const [id, value] of Object.entries(data.fields)) {
        const input = document.getElementById(id);
        if (input) input.value = value || '';
    }
    const expensesContainer = document.getElementById('expenses-container');
    expensesContainer.innerHTML = '';
    if (data.rashodi) {
        data.rashodi.forEach(rashod => addExpenseRow(rashod));
    }
}

// --- CALCULATIONS & UI UPDATES ---
function getFormData() {
    const fields = ['razmen', 'presto_nalichnie', 'presto_karti', 'presto_vozvrati', 'dostavka', 'samovivoz', 'nalichnie_vsego', 'terminal_sverka'];
    const data = { fields: {}, rashodi: [] };
    fields.forEach(id => {
        const input = document.getElementById(id);
        data.fields[id] = parseFloat(input.value) || 0;
    });
    document.querySelectorAll('.expense-item').forEach(item => {
        data.rashodi.push({
            summa: parseFloat(item.querySelector('.expense-summa').value) || 0,
            kategoriya: item.querySelector('.expense-kategoriya').value,
            komment: item.querySelector('.expense-komment').value
        });
    });
    return data;
}

function updateCalculations(data = getFormData()) {
    const f = data.fields;
    const obschie_rashodi = data.rashodi.reduce((total, r) => total + r.summa, 0);
    const ozhidaemie_nalichnie = f.razmen + f.presto_nalichnie - obschie_rashodi;
    const raznica_nalichnie = f.nalichnie_vsego - ozhidaemie_nalichnie;
    const fakt_beznal = f.terminal_sverka + f.dostavka + f.samovivoz;
    const raznica_beznal = fakt_beznal - f.presto_karti;
    const obschaya_vyruchka = f.presto_nalichnie + f.presto_karti;
    const chistie_nalichnie = ozhidaemie_nalichnie - f.razmen;
    const summary = { obschie_rashodi, ozhidaemie_nalichnie, raznica_nalichnie, fakt_beznal, raznica_beznal, obschaya_vyruchka, chistie_nalichnie };
    updateSummaryUI(summary);
}

function updateSummaryUI(summary) {
    const formatCurrency = (value) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);
    document.getElementById('summary-content').innerHTML = `
        <p>Общие расходы: <strong>${formatCurrency(summary.obschie_rashodi)}</strong></p>
        <p>Ожидаемые наличные: <strong>${formatCurrency(summary.ozhidaemie_nalichnie)}</strong></p>
        <p>Разница по наличным: <strong class="${summary.raznica_nalichnie !== 0 ? 'diff' : ''}">${formatCurrency(summary.raznica_nalichnie)}</strong></p><hr>
        <p>Факт по безналу: <strong>${formatCurrency(summary.fakt_beznal)}</strong></p>
        <p>Разница по безналу: <strong class="${summary.raznica_beznal !== 0 ? 'diff' : ''}">${formatCurrency(summary.raznica_beznal)}</strong></p><hr>
        <p>Общая выручка: <strong>${formatCurrency(summary.obschaya_vyruchka)}</strong></p>
        <p>Чистая выручка наличными: <strong>${formatCurrency(summary.chistie_nalichnie)}</strong></p>
    `;
    const discrepancyMessages = document.getElementById('discrepancy-messages');
    discrepancyMessages.innerHTML = '';
    const createMessage = (type, amount) => {
        const msgConfig = appConfig.messages[type];
        const amountStr = formatCurrency(Math.abs(amount));
        const msgDiv = document.createElement('div');
        msgDiv.className = `discrepancy-message ${type}`;
        msgDiv.innerHTML = `<h4>${msgConfig.title}</h4><p>${msgConfig.template.replace('{amount}', amountStr)}</p>`;
        discrepancyMessages.appendChild(msgDiv);
    };
    if (summary.raznica_nalichnie > 0) createMessage('cashSurplus', summary.raznica_nalichnie);
    if (summary.raznica_nalichnie < 0) createMessage('cashShortage', summary.raznica_nalichnie);
    if (summary.raznica_beznal > 0) createMessage('cashlessDiscrepancyPositive', summary.raznica_beznal);
    if (summary.raznica_beznal < 0) createMessage('cashlessDiscrepancyNegative', summary.raznica_beznal);
}

// --- EVENT HANDLERS & HELPERS ---
function setupMathInputs(formColumn) {
    const safeEval = (expression) => {
        if (!expression || typeof expression !== 'string') return null;
        if (/[^0-9\s+\-.\*\/]/g.test(expression)) return null;
        try {
            const result = new Function(`return ${expression}`)();
            return isNaN(result) ? null : result;
        } catch (error) { return null; }
    };
    formColumn.addEventListener('focusin', e => {
        if (e.target.classList.contains('math-input') && e.target.dataset.raw) e.target.value = e.target.dataset.raw;
    });
    formColumn.addEventListener('focusout', e => {
        if (e.target.classList.contains('math-input')) {
            const rawValue = e.target.value;
            if (!rawValue) { delete e.target.dataset.raw; return; }
            const result = safeEval(rawValue);
            if (result !== null && result.toString() !== rawValue) {
                e.target.dataset.raw = rawValue;
                e.target.value = result;
            } else {
                delete e.target.dataset.raw;
            }
        }
    });
}

function setupExpenseHandling(formColumn) {
    const addExpenseBtn = document.getElementById('add-expense-btn');
    if (addExpenseBtn) addExpenseBtn.addEventListener('click', () => addExpenseRow());

    const expensesContainer = document.getElementById('expenses-container');
    if (expensesContainer) expensesContainer.addEventListener('click', e => {
        if (e.target.classList.contains('delete-expense-btn')) {
            e.target.closest('.expense-item').remove();
            handleFormChange();
        }
    });
}

function addExpenseRow(rashod = {}) {
    const expensesContainer = document.getElementById('expenses-container');
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    const categoryOptions = appConfig.expenseCategories.map(cat => 
        `<option value="${cat}" ${rashod.kategoriya === cat ? 'selected' : ''}>${cat}</option>`
    ).join('');
    expenseItem.innerHTML = `
        <input type="text" class="math-input expense-summa" placeholder="Сумма" value="${rashod.summa || ''}">
        <select class="expense-kategoriya">${categoryOptions}</select>
        <input type="text" class="expense-komment" placeholder="Комментарий" value="${rashod.komment || ''}">
        <button type="button" class="delete-expense-btn" title="Удалить расход">×</button>
    `;
    expensesContainer.appendChild(expenseItem);
}