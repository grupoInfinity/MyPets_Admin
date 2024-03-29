<?php
include_once('../config.php');

//$bd = "dbMyPet";
header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}
$tabla = "ctg_tipovacunas";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';
$nombrevac= utf8_decode(isset($_GET['desc']) ? $_GET['desc'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');
$idmasc = utf8_decode(isset($_GET['idmasc']) ? $_GET['idmasc'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
    if (!empty($id)) $id = "A.id_tipovacuna='$id'";
    else $id = "1=1";
    if (!empty($nombrevac)) $nombrevac = "AND A.nombrevacuna LIKE '%$nombrevac%'";
    else $nombrevac = "";
    if (!empty($estado)) $estado = "AND A.estado='$estado'";
    else $estado = "";
    //HACER UNA CONSULTA DE LAS VACUNAS QUE NO TIENE UNA MASCOTA
    if (!empty($idmasc)) $sql = "SELECT A.id_tipovacuna, A.nombrevacuna, A.estado
    FROM $bd.ctg_tipovacunas A 
    LEFT JOIN $bd.prc_vacunas V ON A.id_tipovacuna = V.id_tipovacuna AND V.id_mascota = $idmasc
    WHERE $id $estado AND V.id_tipovacuna IS NULL;";

    //CONSULTA NORMAL
    else $sql = "SELECT A.id_tipovacuna,A.nombrevacuna,A.estado 
    FROM $bd.ctg_tipovacunas A 
    WHERE $id $nombrevac $estado ";

    /*$sql = "SELECT A.id_tipovacuna,A.nombrevacuna,A.estado 
    FROM $bd.$tabla A 
    WHERE $id $nombrevac $estado ";*/

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $results[] = array(
                    "id" => $row["id_tipovacuna"],
                    'descripcion' => utf8_decode($row["nombrevacuna"]),
                    'estado' => $row["estado"]
                );
                $json = array("status" => 1, "info" => $results);
            }
        } else {
            $json = array("status" => 0, "info" => "No existe información con ese criterio.");
        }
    else $json = array("status" => 0, "info" => "No existe información.");
} else {
    if (strtoupper($accion) == 'I') { // VERIFICACION SI LA ACCION ES INSERCION
        $sql = "
		SELECT MAX(a.id_tipovacuna) + 1 as id
		FROM $bd.$tabla a";

        $result = $conn->query($sql);

        if (!empty($result) || !is_null($result)) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {
                    if (!is_null($row["id"])) $id = $row["id"];
                    else $id = 1;
                }
            } else {
                $id = 1;
            }
        } else $id = 1;
        $date = date('Y-m-d H:i:s');

        $sql = "INSERT INTO $bd.$tabla(id_tipovacuna, nombrevacuna, estado, usuario_creacion, fecha_creacion) 
        VALUE($id,'$nombrevac', 'A', '$user', '$date')";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    }else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES MODIFICACION

        $nombrevac = "nombrevacuna='" . strtoupper($nombrevac) . "'";
        $estado = ", estado='" . strtoupper($estado) . "'";
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla SET $nombrevac $estado $user $date WHERE id_tipovacuna = $id";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id_tipovacuna = $id";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    }
    else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id_tipovacuna = $id";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    }
}
$conn->close();

/* Output header */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($json);
//*/
