// Base de datos de productos (en un caso real, esto vendría de un backend)
const productos = {
   1: {
      id: 1,
      nombre: "Martillo de Acero",
      precio: 15.99,
      descripcion: "Martillo profesional con mango de fibra de vidrio y cabeza de acero forjado. Ideal para trabajos de construcción y carpintería.",
      caracteristicas: ["Mango anti-vibración", "Cabeza endurecida", "Peso: 16 oz", "Garantía de 2 años"],
      imagen: "https://via.placeholder.com/300x200?text=Martillo"
   },
   2: {
      id: 2,
      nombre: "Juego de Destornilladores",
      precio: 22.50,
      descripcion: "Set completo de 6 destornilladores profesionales con puntas intercambiables y mango ergonómico antideslizante.",
      caracteristicas: ["Incluye 12 puntas diferentes", "Mango de goma", "Cabeza magnetizada", "Estuche organizador"],
      imagen: "https://via.placeholder.com/300x200?text=Destornilladores"
   },
   3: {
      id: 3,
      nombre: "Llave Inglesa Ajustable",
      precio: 18.75,
      descripcion: "Llave ajustable de 10 pulgadas de longitud, fabricada en acero cromo vanadio para máxima durabilidad.",
      caracteristicas: ["Ajuste preciso", "Diseño ergonómico", "Resistente a la corrosión", "Capacidad hasta 1 pulgada"],
      imagen: "https://via.placeholder.com/300x200?text=Llave+Ajustable"
   },
   4: {
      id: 4,
      nombre: "Kit de Tornillos",
      precio: 12.99,
      descripcion: "Set de 200 tornillos de diferentes medidas y tipos. Incluye tornillos para madera, metal y drywall.",
      caracteristicas: ["Diferentes medidas", "Incluye tornillos Phillips y planos", "Resistentes a la oxidación", "Estuche organizador"],
      imagen: "https://via.placeholder.com/300x200?text=Tornillos"
   },
   5: {
      id: 5,
      nombre: "Taladro Percutor",
      precio: 89.99,
      descripcion: "Taladro percutor inalámbrico de 20V con función de percutor para materiales duros. Incluye 2 baterías y cargador rápido.",
      caracteristicas: ["Velocidad variable", "Batería de litio", "Maletín de transporte", "2 años de garantía"],
      imagen: "https://via.placeholder.com/300x200?text=Taladro"
   },
   6: {
      id: 6,
      nombre: "Sierra de Calar",
      precio: 75.50,
      descripcion: "Sierra de calar eléctrica con 6 velocidades ajustables, láser guía y sistema de cambio rápido de hojas.",
      caracteristicas: ["Potencia 800W", "Corte en ángulo de 45°", "Sistema sin herramientas", "Incluye 5 hojas diferentes"],
      imagen: "https://via.placeholder.com/300x200?text=Sierra+Calar"
   }
};

// Carrito de compras
let carrito = [];
const carritoCount = document.getElementById('carritoCount');
const carritoItems = document.getElementById('carritoItems');
const carritoTotal = document.getElementById('carritoTotal');
const carritoBtn = document.getElementById('carritoBtn');
const carritoOverlay = document.getElementById('carritoOverlay');
const carritoSidebar = document.getElementById('carritoSidebar');
const cerrarCarrito = document.getElementById('cerrarCarrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const detallesProducto = document.getElementById('detallesProducto');

// Funciones del carrito
function actualizarCarrito() {
   carritoCount.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
   
   if (carrito.length === 0) {
      carritoItems.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
      carritoTotal.textContent = '0.00';
      return;
   }
   
   carritoItems.innerHTML = '';
   let total = 0;
   
   carrito.forEach(item => {
      const itemTotal = item.precio * item.cantidad;
      total += itemTotal;
      
      const carritoItem = document.createElement('div');
      carritoItem.className = 'carrito-item';
      carritoItem.innerHTML = `
         <div>
            <h6>${item.nombre}</h6>
            <p class="mb-0">Cantidad: ${item.cantidad} | $${item.precio.toFixed(2)} c/u</p>
         </div>
         <div>
            <p class="fw-bold">$${itemTotal.toFixed(2)}</p>
            <button class="btn btn-sm btn-danger eliminar-item" data-id="${item.id}">
               <i class="fas fa-trash"></i>
            </button>
         </div>
      `;
      
      carritoItems.appendChild(carritoItem);
   });
   
   carritoTotal.textContent = total.toFixed(2);
   
   // Agregar event listeners a los botones de eliminar
   document.querySelectorAll('.eliminar-item').forEach(button => {
      button.addEventListener('click', (e) => {
         const id = parseInt(e.currentTarget.getAttribute('data-id'));
         eliminarDelCarrito(id);
      });
   });
}

function agregarAlCarrito(id) {
   const producto = productos[id];
   const existingItem = carrito.find(item => item.id === id);
   
   if (existingItem) {
      existingItem.cantidad += 1;
   } else {
      carrito.push({
         id: producto.id,
         nombre: producto.nombre,
         precio: producto.precio,
         cantidad: 1
      });
   }
   
   actualizarCarrito();
   
   // Mostrar mensaje de confirmación
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

function eliminarDelCarrito(id) {
   const index = carrito.findIndex(item => item.id === id);
   
   if (index !== -1) {
      if (carrito[index].cantidad > 1) {
         carrito[index].cantidad -= 1;
      } else {
         carrito.splice(index, 1);
      }
      
      actualizarCarrito();
   }
}

function vaciarCarrito() {
   carrito = [];
   actualizarCarrito();
}

function mostrarDetallesProducto(id) {
   const producto = productos[id];
   
   if (!producto) return;
   
   let caracteristicasHTML = '';
   producto.caracteristicas.forEach(caract => {
      caracteristicasHTML += `<li>${caract}</li>`;
   });
   
   detallesProducto.innerHTML = `
      <img src="${producto.imagen}" class="img-fluid mb-3" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p class="text-success fw-bold">$${producto.precio.toFixed(2)}</p>
      <p>${producto.descripcion}</p>
      <h5>Características:</h5>
      <ul>
         ${caracteristicasHTML}
      </ul>
      <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
   `;
   
   // Agregar event listener al botón de agregar al carrito en los detalles
   detallesProducto.querySelector('.agregar-carrito').addEventListener('click', () => {
      agregarAlCarrito(producto.id);
   });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
   // Botones de agregar al carrito
   document.querySelectorAll('.agregar-carrito').forEach(button => {
      button.addEventListener('click', (e) => {
         const id = parseInt(e.currentTarget.getAttribute('data-id'));
         agregarAlCarrito(id);
      });
   });
   
   // Botones de ver detalles
   document.querySelectorAll('.ver-detalles').forEach(button => {
      button.addEventListener('click', (e) => {
         const id = parseInt(e.currentTarget.getAttribute('data-id'));
         mostrarDetallesProducto(id);
      });
   });
   
   // Carrito
   carritoBtn.addEventListener('click', () => {
      carritoSidebar.classList.add('active');
      carritoOverlay.classList.add('active');
   });
   
   cerrarCarrito.addEventListener('click', () => {
      carritoSidebar.classList.remove('active');
      carritoOverlay.classList.remove('active');
   });
   
   carritoOverlay.addEventListener('click', () => {
      carritoSidebar.classList.remove('active');
      carritoOverlay.classList.remove('active');
   });
   
   vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
   
   // Inicializar carrito
   actualizarCarrito();
});

function pagarCarrito() {
   if (carrito.length === 0) {
      Swal.fire({
         icon: "warning",
         title: "Carrito vacío",
         text: "Agrega productos antes de pagar."
      });
      return;
   }

   Swal.fire({
      title: "Finalizar Compra",
      html: `
         <input type="text" id="nombre" class="swal2-input" placeholder="Nombre completo">
         <input type="text" id="tarjeta" class="swal2-input" placeholder="Número de tarjeta">
         <input type="text" id="cvv" class="swal2-input" placeholder="CVV">
      `,
      confirmButtonText: "Pagar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
         const nombre = document.getElementById("nombre").value;
         const tarjeta = document.getElementById("tarjeta").value;
         const cvv = document.getElementById("cvv").value;

         if (!nombre || !tarjeta || !cvv) {
            Swal.showValidationMessage("Por favor completa todos los campos");
            return false;
         }

         return { nombre, tarjeta, cvv };
      }
   }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire({
            icon: "success",
            title: "Pago exitoso",
            text: `Gracias por tu compra, ${result.value.nombre}. Tu pedido está en camino.`,
         });

         // Vaciar carrito después de pagar
         vaciarCarrito();
      }
   });
}


document.getElementById("btnPagar").addEventListener("click", pagarCarrito);
