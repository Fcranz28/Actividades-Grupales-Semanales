<?php
$db_host = 'localhost';
$db_user = 'root';      
$db_pass = 'Fcr@nz1234'; // 
$db_name = 'Casa_Tornillo_DB';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);


if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    //echo "¡Conexión exitosa a la base de datos Casa_Tornillo_DB!";
}

$conn->set_charset("utf8");

?>