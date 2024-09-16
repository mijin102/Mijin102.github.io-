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
        // Aquí se debería implementar una manera de actualizar el archivo data.json en GitHub
        console.log('Guardar datos no implementado en esta demostración');
    }

    async function updateAccount(id, updatedAccount) {
        // Aquí se debería implementar una manera de actualizar el archivo data.json en GitHub
        console.log('Actualizar datos no implementado en esta demostración');
    }

    async function displayAccounts() {
        tableBody.innerHTML = '';
        try {
            const response = await fetch('https://raw.githubusercontent.com/TU_USUARIO/TU_REPOSITORIO/main/data.json');
            if (!response.ok) {
                throw new Error('Error al obtener datos');
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
        // Opcional: Implementar cheques de fechas si necesario
    }

    displayAccounts();
});
