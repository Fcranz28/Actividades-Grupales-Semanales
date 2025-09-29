document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    let carrito = [];
    const carritoBtn = document.getElementById('carritoBtn');
    const cartPopup = document.getElementById('cartPopup');
    const carritoCount = document.getElementById('carritoCount');
    const carritoItems = document.getElementById('carritoItems');
    const carritoTotal = document.getElementById('carritoTotal');
    const cerrarCarrito = document.getElementById('cerrarCarrito');
    const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
    const btnPagar = document.getElementById('btnPagar');
    const paymentPopup = document.getElementById('paymentPopup');
    const cerrarPago = document.getElementById('cerrarPago');
    const paymentForm = document.getElementById('paymentForm');
    const backdrop = document.getElementById('backdrop');

    // Funciones del carrito
    function actualizarCarrito() {
        carritoCount.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
        
        if (carrito.length === 0) {
            carritoItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            carritoTotal.textContent = '0.00';
            return;
        }
        
        let html = '';
        let total = 0;
        
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            html += `
                <div class="cart-item">
                    <div class="item-info">
                        <h6>${item.nombre}</h6>
                        <p class="mb-0">Cantidad: ${item.cantidad} × $${item.precio.toFixed(2)}</p>
                    </div>
                    <div class="item-price">
                        <p class="mb-0">$${subtotal.toFixed(2)}</p>
                        <button class="btn-remove" onclick="eliminarDelCarrito(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        carritoItems.innerHTML = html;
        carritoTotal.textContent = total.toFixed(2);
    }

    // Función para agregar al carrito
    window.agregarAlCarrito = function(button) {
        const id = parseInt(button.getAttribute('data-id'));
        const nombre = button.getAttribute('data-nombre');
        const precio = parseFloat(button.getAttribute('data-precio'));
        
        const itemExistente = carrito.find(item => item.id === id);
        
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({
                id: id,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }
        
        actualizarCarrito();
        
        // Mostrar notificación
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        
        Toast.fire({
            icon: 'success',
            title: 'Producto agregado al carrito'
        });
    }

    // Función para eliminar del carrito
    window.eliminarDelCarrito = function(id) {
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1);
            }
            actualizarCarrito();
        }
    }

    // Event Listeners
    carritoBtn.addEventListener('click', () => {
        cartPopup.style.display = 'block';
    });

    cerrarCarrito.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

    btnPagar.addEventListener('click', () => {
        if (carrito.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Carrito vacío',
                text: 'Por favor, agrega productos antes de proceder al pago.'
            });
            return;
        }
        paymentPopup.style.display = 'block';
        backdrop.style.display = 'block';
    });

    cerrarPago.addEventListener('click', () => {
        paymentPopup.style.display = 'none';
        backdrop.style.display = 'none';
    });

    // También cerrar al hacer clic en el backdrop
    backdrop.addEventListener('click', () => {
        paymentPopup.style.display = 'none';
        backdrop.style.display = 'none';
    });

    document.getElementById('btnSeguirComprando').addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        if (carrito.length === 0) return;
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se eliminarán todos los productos del carrito',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                actualizarCarrito();
                Swal.fire(
                    '¡Carrito vaciado!',
                    'Tu carrito está ahora vacío',
                    'success'
                );
            }
        });
    });

    // Manejar el formulario de pago
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardName = document.getElementById('cardName').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expDate = document.getElementById('expDate').value;
        const cvv = document.getElementById('cvv').value;
        
        // Validaciones
        if (!cardName.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa el nombre como aparece en la tarjeta'
            });
            return;
        }
        
        if (!/^\d{16}$/.test(cardNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El número de tarjeta debe tener 16 dígitos'
            });
            return;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(expDate)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de expiración debe tener el formato MM/YY'
            });
            return;
        }
        
        if (!/^\d{3,4}$/.test(cvv)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El CVV debe tener 3 o 4 dígitos'
            });
            return;
        }
        
        // Simular procesamiento del pago
        Swal.fire({
            title: 'Procesando pago...',
            text: 'Por favor espere...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        // Simular un delay para el procesamiento
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: '¡Pago exitoso!',
                text: 'Gracias por tu compra. Tu pedido está en camino.'
            }).then(() => {
                // Limpiar el carrito
                carrito = [];
                actualizarCarrito();
                
                // Cerrar los popups
                paymentPopup.style.display = 'none';
                backdrop.style.display = 'none';
                cartPopup.style.display = 'none';
                
                // Limpiar el formulario
                paymentForm.reset();
            });
        }, 2000);
    });

    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', function() {
            agregarAlCarrito(this);
        });
    });

    // Inicializar carrito
    actualizarCarrito();
});
