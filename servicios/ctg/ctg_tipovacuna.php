<?php
include_once('../config.php');

$bd = "dbMyPet";
$tabla = "ctg_tipovacunas";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';
$nombrevac= utf8_decode(isset($_GET['nombrevac']) ? $_GET['nombrevac'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
    if (!empty($id)) $id = "A.id_tipovacuna='$id'";
    else $id = "1=1";
    if (!empty($nombrevac)) $nombrevac = "AND A.nombrevacuna LIKE '%$nombrevac%'";
    else $nombrevac = "";
    if (!empty($estado)) $estado = "AND A.estado='$estado'";
    else $estado = "";

    $sql = "SELECT A.id_tipovacuna,A.nombrevacuna,A.estado 
    FROM $bd.$tabla A 
    WHERE $id $depto $estado ";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $results[] = array(
                    "id" => $row["id_tipovacuna"],
                    'nombrevacuna' => utf8_decode($row["nombrevacuna"]),
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
                    if (!is_null($row["id_tipovacuna"])) $id = $row["id_tipovacuna"];
                    else $id = 1;
                }
            } else {
                $id = 1;
            }
        } else $id = 1;
        $date = (new DateTime())->format('Y-m-d');

        $sql = "INSERT INTO $bd.$tabla(id_tipovacuna, nombrevacuna, estado, usuario_creacion, fecha_creacion) 
        VALUE($id,'$nombrevac', '$estado', '$user', '$date')";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    }else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES MODIFICACION

        $nombrevac = "nombrevacuna='" . strtoupper($nombrevac) . "'";
        $estado = ", estado='" . strtoupper($estado) . "'";
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla SET $nombrevac $estado $user $date WHERE id_tipovacuna = $id";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id_tipovacuna = $id";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    }
    else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

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
