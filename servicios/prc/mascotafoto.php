<?php
include_once('../config.php');

header('Content-type:undefined');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

$tabla = "prc_mascotas";

$accion = isset($_POST['accion']) ? $_POST['accion'] : '';
$id_mascota = isset($_POST['id']) ? $_POST['id'] : '';
$user = isset($_POST['user']) ? $_POST['user'] : '';
$foto = isset($_POST['foto']) ? $_POST['foto'] : '';

echo "Valores del POST:\n";
var_dump($_POST);

$json = "no has seteado nada.";

function cBase64($imagen)
{
    $imagenBase64 = base64_encode(file_get_contents($imagen));
    return $imagenBase64;
}

if (strtoupper($accion) == 'U') {
    // Actualizar solo la foto si se proporciona una nueva
    $user = ", usuario_update='" . $user . "'";
    if (!empty($foto)) {
        $foto = "foto='" . cBase64($foto) . "'";
        
        $sql = "UPDATE $bd.prc_mascotas SET $foto $user WHERE id_mascota = $id_mascota";
    } else {
        // No se proporcionó una nueva foto, no la actualices

        $sql = "UPDATE $bd.$tabla SET foto=foto $user WHERE id_mascota = $id_mascota";
    }

    if ($conn->query($sql) === TRUE) {
        $json = array("status" => 1, "info" => "Foto actualizada exitosamente.");
    } else {
        $json = array("status" => 0, "error" => $conn->error);
    }
}

echo json_encode($json);

$conn->close();
?>