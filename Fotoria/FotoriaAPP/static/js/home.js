document.addEventListener('DOMContentLoaded', function () {
    const editModal = new bootstrap.Modal(document.getElementById('editModal')); // Inicializar el modal de Bootstrap
    const closeModal = document.querySelector('.close'); // Botón de cierre
    const editIcons = document.querySelectorAll('.edit-icon'); // Todos los iconos de edición
    const editForm = document.getElementById('editForm'); // Formulario de edición
    
    // Abre el modal y carga el contenido del formulario dinámicamente
    editIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            const pictureId = this.getAttribute('data-id');
            
            // Hacer una solicitud AJAX o cargar el formulario dinámicamente aquí
            fetch(`/edit/${pictureId}/`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la respuesta: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Datos recibidos del servidor:', data); // Ver los datos que estamos recibiendo del servidor

                    // Verificar si el servidor respondió correctamente
                    if (data.html_form) {
                        // Cargar el contenido del formulario en el modal
                        document.getElementById('modal-form-content').innerHTML = data.html_form;

                        // Esperar a que el formulario se haya cargado en el DOM
                        const form = document.getElementById('editForm');
                        if (form) {
                            // Establecer la URL de acción del formulario para que apunte a la vista de actualización
                            form.action = `/edit/${pictureId}/`;
                        }

                        // Mostrar el modal después de cargar el contenido
                        editModal.show();
                    } else {
                        throw new Error('El formulario no se recibió correctamente');
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el formulario:', error);
                    alert('Hubo un error al cargar el formulario de edición.');
                });
        });
    });

    // Cerrar el modal al hacer clic en el ícono de cierre
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            editModal.hide();
        });
    }

    // Enviar el formulario cuando se haga clic en "Guardar Cambios"
    if (editForm) {
        editForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto de enviar el formulario
            const formData = new FormData(editForm); // Obtener los datos del formulario

            // Enviar el formulario mediante Fetch o AJAX
            fetch(editForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Si la actualización fue exitosa, cierra el modal
                    alert('¡Imagen actualizada correctamente!');
                    editModal.hide();
                    // Puedes optar por actualizar la vista de alguna forma, como recargar los datos de la imagen
                } else {
                    alert('Hubo un error al actualizar la imagen.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al intentar guardar los cambios.');
            });
        });
    }
});
