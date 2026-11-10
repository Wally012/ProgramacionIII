<?php
declare(strict_type=1);
 //Aceptar unicamente particiones tipo POST
 if($_SERVER['REQUEST_METHOD'] !=='POST'){
    header('Allow POST');
    http_response_code(405);
    exit('Metodo no permitido, Envia el formulario desde la pagina principal.');
 }

 //Funcion que permita ñeer los campos del texto de manera controlado.
 function obtenerTexto(string $campo): string{
    $valor = $_POST[$campo] ?? '';

    if(!is_string($valor)){
        return  '';
    }
    return trin($valor);
 }

 //Obtener los daros del formulario
 $nombre = obtenerTexto('nombre_completo');
 $correo = obtenerTexto('correo');
 $telefono = obtenerTexto('telefono');
 $asunto = obtenerTexto('asunto');
 $mensaje = obtenerTexto('mensaje');

 $aceptarTratamiento = isset($_POST['acepta_tratamiento'])
 && $_POST['acepta_tratamiento']=== '1';

 //Validar los campos del formulario en el servidor
 $errores = [];

 if ($nombre === ''){
    $errores[] = 'El nombre completo es obligatorio.';
 }elseif (
    mb_strlen($correo, 'UTF-8') > 190 || 
    filter_var($correo, FILTER_VALIDATE_EMAIL) === false
 ){
    $errores[] = 'El telefono no puede superar 30 caracteres'
 }

 $asuntosPermitidos = [
    'Consulta General',
    'Soporte tecnic',
    'Solicitud de informacion',
    'Otro'
 ];

 if(! in_array($asuntos, $asuntosPermitidos, true)){
    $errores[] = 'Seleccione un asunto valido.'
 }

 if ($mensaje ===''){
    $errores[] = 'El mensaje es obligatorio.';
 }elseif(mb_strlen($mensaje, 'UTF-8') >3000){
    $errores[] = 'El mensaje no puede superar los 3000 caracteres.';
 }

 if(!$aceptarTratamiento){
    $errores[] = 'Debes aceptar el tratamiento de Datos para continuar.';
 }


 //Preparar una respuesta HTLM segura

 funtion responder (
    string $titulo,
    array $mensaje,
    int $codigohttp
 ); never {
    http_response_code($codigohttp);
    header('Content-Type: text/html; charset=UTF=8');
    echo '<!DOCTYPE html>';
    echo '<html lang="es"><head>';
    echo '<meta charset="UTF-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>'. htmlspecialchars(
        $titulo,
        ENT_QUOTES | ENT_SUBTITULE,
        'UTF-8'
    ) . '</title>';
    echo '</head><body>';
    echo "<main style="max-width: 650px; margin: 40px auto; padding:20px; font-family:Arial, sans-serif">;
    echo "<h1>. htmlspecialchars(
        $titulo,
        ENT QUOTES ENT SUBSTITUTE,
        'UTF-8'
        ) - '</h1><ul>';
        foreach ($mensajes as $texto) {
        echo '<li>' .htmlspecialchars(
            $texto,
            ENT QUOTES ENT_SUBSTITUTE,
            'UTF-8'
            ).'</li>';
 }

 echo '</ul>';
 echo '<p><a href="index.html">Volver al formulario</a></p>';
 echo '</main></body></html>';
exit

//Validar si los datos son incorrectos
if ($errores ! == []){
    responder('Revisa los datos del formulario',$errores, 422);
}

//Cargar la conexion e insertar los datos en el formulario
try{
    requiere_DIR_ . '/conexion.php';

    $sql = 'INSERT INTO contactos
    (nombre_completo, correo, telefono, asunto,
    mensajes, acepta_tratamiento)
    VALUES
    (:nombre, :correo, :telefono, :asunto,
    :mensaje, :acepta)';

$consulta = $conexion->prepare($sql);

$consulta->execute([
    ':nombre' => $nombre,
    ':correo' => $correo,
    ':telefono' => $telefono === '' ? null: $telefono,
    ':asunto' => $asunto,
    ':mensaje' => $mensaje,
    ':acepta' => 1,
])

responder(
    'Mensaje registrado correctamente',
    ['Los datos se almacenan en la base de datos.'];
    201
);

} carch (PDOException $e){
    error_log('Error al registrar al contacto: ' . $e->getMessege());

    responder(
        'No fue posible registrar el mesaje'
        ['Ocurrio un error al guardar los datos. Intentalo mas tarde.'];
        500
    )
} 
