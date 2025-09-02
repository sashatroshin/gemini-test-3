const appState = {
    config: null,
    businessDate: null,
};

let debounceTimer = null; // For webhook submission

// IDs of all static input fields to be saved
const savableInputIds = [
    'opening-cash',
    'presto-revenue',
    'presto-cash',
    'presto-card',
    'actual-cash'
];

// IDs of inputs that support math expressions
const mathInputIds = [
    'opening-cash',
    'presto-revenue',
    'presto-cash',
    'presto-card',
    'actual-cash'
];

document.addEventListener('DOMContentLoaded', () => {
    console.log('Shift report application initialized.');
    loadConfig().then(() => {
        setupEventListeners();
    });
});

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        appState.config = await response.json();
        console.log('Configuration loaded:', appState.config);
        initializeBusinessDate();
        loadState(); // Load state after business date is known
    } catch (error) {
        console.error("Could not load configuration:", error);
        alert("Ошибка: Не удалось загрузить файл конфигурации. Приложение не может работать.");
    }
}

function initializeBusinessDate() {
    if (typeof dateFns === 'undefined' || typeof dateFnsTz === 'undefined') {
        console.error("date-fns or date-fns-tz is not loaded!");
        alert("Ошибка: Не удалось загрузить библиотеки для работы с датами.");
        return;
    }

    const { timeZone, hour: cutoffHour } = appState.config.businessDate;
    const { utcToZonedTime, format } = dateFnsTz;
    const { subDays } = dateFns;

    const nowInZone = utcToZonedTime(new Date(), timeZone);
    let businessDate = nowInZone;

    if (nowInZone.getHours() < cutoffHour) {
        businessDate = subDays(nowInZone, 1);
    }

    appState.businessDate = format(businessDate, 'yyyy-MM-dd', { timeZone });
    console.log(`Business date determined: ${appState.businessDate}`);

    const businessDateEl = document.getElementById('summary-business-date');
    if (businessDateEl) {
        businessDateEl.textContent = format(businessDate, 'dd.MM.yyyy', { timeZone });
    }
}

function getStorageKey() {
    return `shiftReport-${appState.businessDate}`;
}

function saveState() {
    if (!appState.businessDate) return;

    const state = {
        expenses: []
    };
    
    savableInputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            if (mathInputIds.includes(id)) {
                state[id] = {
                    value: input.value,
                    formula: input.dataset.formula || ''
                };
            } else {
                state[id] = input.value;
            }
        }
    });

    document.querySelectorAll('.expense-row').forEach(row => {
        const amountInput = row.querySelector('.expense-amount');
        const expense = {
            amount: {
                value: amountInput.value,
                formula: amountInput.dataset.formula || ''
            },
            category: row.querySelector('.expense-category').value,
            comment: row.querySelector('.expense-comment').value,
        };
        state.expenses.push(expense);
    });
    
    localStorage.setItem(getStorageKey(), JSON.stringify(state));
    console.log('State saved for', appState.businessDate);
    
    updateSummary();

    // Debounced webhook submission
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(sendDataToWebhook, 60000);
}

function loadState() {
    if (!appState.businessDate) return;

    const savedState = localStorage.getItem(getStorageKey());
    if (savedState) {
        const state = JSON.parse(savedState);
        console.log('Loading saved state:', state);

        savableInputIds.forEach(id => {
            const input = document.getElementById(id);
            if (input && state[id]) {
                if (mathInputIds.includes(id) && typeof state[id] === 'object') {
                    input.value = state[id].value;
                    input.dataset.formula = state[id].formula;
                } else {
                    input.value = state[id];
                }
            }
        });

        if (state.expenses && state.expenses.length > 0) {
            document.getElementById('expenses-list').innerHTML = '';
            state.expenses.forEach(expense => addExpenseRow(expense));
        }
        
        updateSummary();

    } else {
        console.log('No saved state found for', appState.businessDate);
    }
}

function setupEventListeners() {
    savableInputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', saveState);
            if (mathInputIds.includes(id)) {
                input.addEventListener('focus', handleMathFocus);
                input.addEventListener('blur', handleMathBlur);
            }
        }
    });

    const addExpenseBtn = document.getElementById('add-expense');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', () => addExpenseRow());
    }
    
    console.log('Event listeners set up.');
}

function addExpenseRow(expense) {
    const expensesList = document.getElementById('expenses-list');
    const row = document.createElement('div');
    row.className = 'form-group expense-row';

    const amount = expense ? expense.amount : { value: '', formula: '' };
    const category = expense ? expense.category : '';
    const comment = expense ? expense.comment : '';

    const categoryOptions = appState.config.expenseCategories
        .map(cat => `<option value="${cat}" ${cat === category ? 'selected' : ''}>${cat}</option>`)
        .join('');

    row.innerHTML = `
        <input type="text" class="expense-amount" placeholder="Сумма" value="${amount.value || ''}" data-formula="${amount.formula || ''}">
        <select class="expense-category">${categoryOptions}</select>
        <input type="text" class="expense-comment" placeholder="Комментарий" value="${comment || ''}">
        <button class="delete-expense">🗑️</button>
    `;

    row.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', saveState);
    });
    
    const amountInput = row.querySelector('.expense-amount');
    amountInput.addEventListener('focus', handleMathFocus);
    amountInput.addEventListener('blur', handleMathBlur);

    row.querySelector('.delete-expense').addEventListener('click', () => {
        row.remove();
        saveState();
    });

    expensesList.appendChild(row);
}

function evaluateExpression(expr) {
    if (!/^[0-9+\-.\s]*$/.test(expr)) {
        return null;
    }
    try {
        return new Function(`return ${expr}`)();
    } catch (error) {
        console.error('Invalid math expression:', expr, error);
        return null;
    }
}

function handleMathFocus(event) {
    const input = event.target;
    if (input.dataset.formula) {
        input.value = input.dataset.formula;
    }
}

function handleMathBlur(event) {
    const input = event.target;
    const expression = input.value;

    if (!isNaN(expression) && expression.trim() !== '') {
        input.dataset.formula = '';
        saveState();
        return;
    }

    const result = evaluateExpression(expression);
    
    if (result !== null) {
        input.dataset.formula = expression;
        input.value = result;
        saveState();
    }
}

function getNumericValue(elementId) {
    const element = document.getElementById(elementId);
    return parseFloat(element.value) || 0;
}

function updateSummary() {
    const prestoRevenue = getNumericValue('presto-revenue');
    document.getElementById('summary-presto-revenue').textContent = prestoRevenue;

    let totalExpenses = 0;
    document.querySelectorAll('.expense-amount').forEach(input => {
        totalExpenses += parseFloat(input.value) || 0;
    });
    document.getElementById('summary-total-expenses').textContent = totalExpenses;

    const openingCash = getNumericValue('opening-cash');
    const prestoCash = getNumericValue('presto-cash');
    const expectedCash = openingCash + prestoCash - totalExpenses;
    document.getElementById('summary-expected-cash').textContent = expectedCash;

    const actualCash = getNumericValue('actual-cash');
    document.getElementById('summary-actual-cash').textContent = actualCash;

    const discrepancy = actualCash - expectedCash;
    document.getElementById('summary-discrepancy').textContent = discrepancy;

    updateDiscrepancyMessage(discrepancy);
}

function updateDiscrepancyMessage(discrepancy) {
    const container = document.getElementById('discrepancy-message-container');
    container.innerHTML = ''; // Clear previous messages

    if (discrepancy === 0) {
        return; // No message if everything is balanced
    }

    const message = document.createElement('div');
    message.className = 'discrepancy-message';

    if (discrepancy > 0) {
        message.classList.add('surplus');
        message.textContent = appState.config.messages.surplus;
    } else { // discrepancy < 0
        message.classList.add('shortage');
        message.textContent = appState.config.messages.shortage;
    }

    container.appendChild(message);
}

async function sendDataToWebhook() {
    console.log('Debounce timer elapsed. Sending data to webhook...');
    
    const { webhookUrl } = appState.config;
    if (!webhookUrl || webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
        console.warn('Webhook URL is not configured. Skipping submission.');
        return;
    }

    const stateString = localStorage.getItem(getStorageKey());
    if (!stateString) {
        console.error('Could not retrieve state from localStorage to send.');
        return;
    }
    
    const state = JSON.parse(stateString);

    const summary = {};
    document.querySelectorAll('#summary-details .summary-item span[id]').forEach(span => {
        summary[span.id.replace('summary-', '')] = span.textContent;
    });

    const payload = {
        reportId: `shift-${appState.businessDate}`,
        businessDate: appState.businessDate,
        data: state,
        summary: summary
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload, null, 2),
        });

        if (response.ok) {
            console.log('Successfully sent data to webhook.');
        } else {
            console.error(`Webhook submission failed with status: ${response.status}`);
            const errorBody = await response.text();
            console.error('Error body:', errorBody);
        }
    } catch (error) {
        console.error('An error occurred during webhook submission:', error);
    }
}
