document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const tableBody = document.getElementById('accounts-table').getElementsByTagName('tbody')[0];
    let editId = null;

    form.addEventListener('submit', async (event) => {
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
            await updateAccount(editId, account);
            editId = null;
        } else {
            await saveAccount(account);
        }

        displayAccounts();
        form.reset();
    });

    async function saveAccount(account) {
        try {
            const response = await fetch('https://tu-backend.com/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            });
            if (!response.ok) {
                throw new Error('Error al guardar la cuenta');
            }
            const data = await response.json();
            console.log('Cuenta guardada:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function updateAccount(id, updatedAccount) {
        try {
            const response = await fetch(`https://tu-backend.com/api/accounts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAccount)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la cuenta');
            }
            const data = await response.json();
            console.log('Cuenta actualizada:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function displayAccounts() {
        tableBody.innerHTML = '';
        try {
            const response = await fetch('https://tu-backend.com/api/accounts');
            if (!response.ok) {
                throw new Error('Error al obtener cuentas');
            }
            const accounts = await response.json();
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
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function checkExpiryDates() {
        // Si decides mantener el chequeo de fechas en el frontend
        // puedes consultar los datos almacenados en el backend
        // en lugar de localStorage
    }

    displayAccounts();
});
