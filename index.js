document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const tableBody = document.getElementById('accounts-table').getElementsByTagName('tbody')[0];
    let editId = null;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const id = document.getElementById('id').value;
        const startDate = document.getElementById('startDate').value;
        const phone = document.getElementById('phone').value;
        const endDate = document.getElementById('endDate').value;

        const account = {
            firstName,
            lastName,
            id,
            startDate,
            phone,
            endDate
        };

        if (editId) {
            updateAccount(editId, account);
            editId = null;
        } else {
            saveAccount(account);
        }

        displayAccounts();
        form.reset();
    });

    function saveAccount(account) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    function updateAccount(id, updatedAccount) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accounts = accounts.map(account => account.id === id ? updatedAccount : account);
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    function displayAccounts() {
        tableBody.innerHTML = '';
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accounts.forEach((account) => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = account.firstName;
            row.insertCell(1).textContent = account.lastName;
            row.insertCell(2).textContent = account.id;
            row.insertCell(3).textContent = account.startDate;
            row.insertCell(4).textContent = account.phone;
            row.insertCell(5).textContent = account.endDate;

            const editCell = row.insertCell(6);
            editCell.innerHTML = '<span class="edit-icon">✎</span>';
            editCell.addEventListener('click', () => {
                document.getElementById('firstName').value = account.firstName;
                document.getElementById('lastName').value = account.lastName;
                document.getElementById('id').value = account.id;
                document.getElementById('startDate').value = account.startDate;
                document.getElementById('phone').value = account.phone;
                document.getElementById('endDate').value = account.endDate;
                editId = account.id;
            });
        });
        checkExpiryDates();
    }

    function checkExpiryDates() {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const today = new Date();
        accounts.forEach((account) => {
            const endDate = new Date(account.endDate);
            const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
            if (daysLeft <= 3 && daysLeft >= 0) {
                alert(`La cuenta con ID ${account.id} expira en ${daysLeft} días.`);
            }
        });
    }

    displayAccounts();
});
