<?php
require_once 'config.php';

// Procesar la búsqueda
$busqueda = isset($_GET['buscar']) ? $_GET['buscar'] : '';
$where = '';

if (!empty($busqueda)) {
    $busqueda = $conn->real_escape_string($busqueda);
    $where = "WHERE nombre LIKE '%$busqueda%' OR descripcion LIKE '%$busqueda%'";
}

// Consulta SQL para obtener los productos
$sql = "SELECT * FROM productos $where ORDER BY id";
$resultado = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
   <link rel="stylesheet" href="./style2.css">
   <link rel="stylesheet" href="./style.css">
   <title>La Casa del Tornillo - Catálogo</title>
</head>
<body class="bg-light">
  <div class="row mx-0">
    <div class="col-md-12 px-0">
      <header>
         <h4 class="glitch-effect" data-text="La Casa del Tornillo - Actividad Grupal - Grupo 7">La Casa del Tornillo - Actividad Grupal - Grupo 7</h4>
         <div class="col-md-12 px-0">
         <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
            <div class="container-fluid">
               <a class="navbar-brand d-flex align-items-center" href="#">
                  <img src="https://cdn-icons-png.flaticon.com/512/2837/2837730.png" alt="La Casa del Tornillo" height="40" width="40" class="logo-estilizado me-2">
                  <span>La Casa del Tornillo</span>
               </a>
               <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav mx-auto">
                     <li class="nav-item">
                        <a class="nav-link" href="./index.html">Inicio</a>
                     </li>                     
                     <li class="nav-item">
                        <a class="nav-link" href="./nosotros.html">Nosotros</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="./Contactanos.html">Contáctanos</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link active" href="./catalogo.php">Catálogo</a>
                     </li>
                  </ul>                  
               </div>
               <div class="d-flex align-items-center">
                  <div class="search-container me-3">
                     <form action="catalogo.php" method="GET" class="d-flex">
                        <input type="text" name="buscar" class="search-input" placeholder="Buscar producto..." 
                               value="<?php echo htmlspecialchars($busqueda); ?>">
                        <button type="submit" class="search-button">Buscar</button>
                     </form>
                  </div>
                                    <div class="cart-container">
                     <button class="cart-button" id="carritoBtn">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-text">Tu Carrito</span>
                        <span class="cart-count" id="carritoCount">0</span>
                     </button>
                  </div>
               </div>
            </div>
         </nav>
         </div>
      </header>
    </div>

    <div class="cart-popup" id="cartPopup">
        <div class="cart-header">
            <span class="close-cart" id="cerrarCarrito">&times;</span>
            <h3>Tu Carrito</h3>
        </div>
        <div id="carritoItems" class="cart-items">
            <p class="empty-cart">Tu carrito está vacío</p>
        </div>
        <div class="cart-total">
            <span>Total:</span>
            <span>$<span id="carritoTotal">0.00</span></span>
        </div>
        <div class="cart-buttons">
            <button class="btn-finalizar" id="btnPagar">
                <i class="fas fa-shopping-bag"></i> Finalizar Compra
            </button>
            <button class="btn-vaciar" id="vaciarCarrito">
                <i class="fas fa-trash"></i> Vaciar Carrito
            </button>
            <button class="btn-seguir" id="btnSeguirComprando">
                ← Seguir Comprando
            </button>
        </div>
    </div>

    <!-- Formulario de Pago -->
    <div class="backdrop" id="backdrop"></div>
    <div class="payment-popup" id="paymentPopup" style="display: none;">
        <div class="payment-header">
            <span class="close-payment" id="cerrarPago">&times;</span>
            <h3>Finalizar Compra</h3>
        </div>
        <form id="paymentForm" class="payment-form">
            <div class="form-group">
                <label for="cardName">Nombre en la tarjeta</label>
                <input type="text" id="cardName" required>
            </div>
            <div class="form-group">
                <label for="cardNumber">Número de tarjeta</label>
                <input type="text" id="cardNumber" required pattern="[0-9]{16}" maxlength="16">
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="expDate">Fecha de expiración</label>
                        <input type="text" id="expDate" required pattern="[0-9]{2}/[0-9]{2}" placeholder="MM/YY">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" required pattern="[0-9]{3,4}" maxlength="4">
                    </div>
                </div>
            </div>
            <button type="submit" class="btn-confirmar-pago">
                <i class="fas fa-lock"></i> Confirmar Pago
            </button>
        </form>
    </div>

    <div class="col-md-8 bg-yellow hight100">
        <section>
            <h2 class="mb-4">Nuestros Productos</h2>
            <div class="row">
                <?php
                if ($resultado && $resultado->num_rows > 0) {
                    while ($producto = $resultado->fetch_assoc()) {
                        ?>
                                                <article class="col-md-6 col-lg-4 producto mb-4">
                            <div class="card text-center">
                                <img src="<?php echo htmlspecialchars($producto['imagen']); ?>" 
                                     class="card-img-top" 
                                     alt="<?php echo htmlspecialchars($producto['nombre']); ?>">
                                <div class="card-body">
                                    <h5 class="card-title"><?php echo htmlspecialchars($producto['nombre']); ?></h5>
                                    <div class="caracteristicas">
                                        <?php echo nl2br(htmlspecialchars($producto['caracteristicas'])); ?>
                                    </div>
                                    <p class="price mt-2">$<?php echo number_format($producto['precio'], 2); ?></p>
                                    <button class="btn btn-primary agregar-carrito w-100 mb-2" 
                                            data-id="<?php echo $producto['id']; ?>" 
                                            data-nombre="<?php echo htmlspecialchars($producto['nombre']); ?>" 
                                            data-precio="<?php echo $producto['precio']; ?>">
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
                        </article>
                        <?php
                    }
                } else {
                    echo '<div class="col-12 text-center">';
                    echo '<p class="alert alert-info">No se encontraron productos.</p>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    <div class="col-md-4 bg-blue hight100">
        <aside>
            <h3 class="mb-3">Detalles del Producto</h3>
            <div class="detalles-producto" id="detallesProducto">
                <p class="text-center">Selecciona "Ver Detalles" en algún producto para ver sus características aquí.</p>
            </div>
        </aside>
    </div>
            </div>
        </section>
    </div>
   

   
    <div class="col-md-12 bg-dark text-white text-center py-3">
        <footer>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <h2>La Casa del Tornillo</h2>
                </div>
                <div class="col-md-4 mb-3">
                    <h5>Integrantes:</h5>
                    <div class="console-container">
                        <div class="console">
                            <p class="line">Grupo 7<span class="cursor">_</span></p>
                            <p class="line">Integrantes:</p>
                            <p class="line">></p>
                            <p class="line">Franz_Kennedy_Aguilar_Cerna.dev</p>
                            <p class="line">Jean_Aldair_Teniente_Apaza.dev</p>
                            <p class="line">></p>
                            <p class="line">Aumentenos la nota Profe😭<span class="cursor">█</span></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <h5>Síguenos</h5>
                    <div class="social-links">
                        <a href="/" class="social-icon facebook" title="Síguenos en Facebook">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="Facebook" class="social-img">
                        </a>
                        <a href="https://www.instagram.com/" class="social-icon instagram" title="Síguenos en Instagram">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram" class="social-img">
                        </a>
                        <a href="https://x.com/?lang=es" class="social-icon twitter" title="Síguenos en Twitter">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/X_icon.svg" alt="Twitter" class="social-img">
                        </a>
                    </div>
                </div>
            </div>
            <hr class="my-2">
            <p class="mb-0">&copy; 2025 La Casa del Tornillo - Todos los derechos reservados</p>
        </footer>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="./script2.js"></script>
</body>
</html>
<?php
$conn->close();
?>
