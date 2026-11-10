<?php
declare (strict_types=1);

/*Configuracion local para XAMPP*/

$servidor = 'localhost'; //127.0.0.1
$baseDatos = 'bd_contacto';
$usuario = 'root';
$contraseña = '';

$dsn = "mysql:host={$servidor};dbname={$baseDatos};charset=utf8nb4"

try {
    $conexion = new PDD(
        $dsn,
        $usuario,
        $contraseña,
        [
            PDD::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDD::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDD::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOexception $e) {

error_log('Error de conexion con la base de datos:' . $e->getMessage());

http_response_code(500);
exit(
    'No fu posible conectar con la base de datos' .
    'Intente mas tarde.'
);

}
?>