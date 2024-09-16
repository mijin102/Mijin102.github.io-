// Suponiendo que tienes un formulario con id "myForm"
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const formData = new FormData(this); // Obtiene los datos del formulario

    fetch('https://tu-backend.com/api/guardar-datos', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Éxito:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
