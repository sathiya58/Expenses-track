let balance = 0;
let income = 0;
let expenses = 0;
let transactions = [];

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description === '' || isNaN(amount)) {
        alert("Please enter valid description and amount");
        return;
    }

    const transaction = { id: Date.now(), description, amount, type };
    transactions.push(transaction);
    updateTransactionList();
    clearForm();
}

function updateTransactionList() {
    const transactionList = document.getElementById('transactions-list');
    transactionList.innerHTML = ''; // Clear existing list
    
    income = 0;
    expenses = 0;

    transactions.forEach((transaction) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>
                <button class="edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
            </td>
        `;
        transactionList.appendChild(row);
        
        if (transaction.type === 'income') {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    updateBalance();
}

function updateBalance() {
    balance = income - expenses;
    document.getElementById('balance').textContent = balance.toFixed(2);
    document.getElementById('total-income').textContent = income.toFixed(2);
    document.getElementById('total-expenses').textContent = expenses.toFixed(2);
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateTransactionList();
}

function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    document.getElementById('description').value = transaction.description;
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('type').value = transaction.type;

    deleteTransaction(id); // Remove transaction for now, will re-add after edit
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
}
