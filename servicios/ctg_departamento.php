<?php
include_once('../config.php');

$bd = "dbMyPet";
$tabla = "ctg_departamentos";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';
$depto = utf8_decode(isset($_GET['depto']) ? $_GET['depto'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
    if (!empty($id)) $id = "A.id_departamento='$id'";
    else $id = "1=1";
    if (!empty($depto)) $depto = "AND A.departamento LIKE '%$depto%'";
    else $depto = "";
    if (!empty($estado)) $estado = "AND A.estado='$estado'";
    else $estado = "";

    $sql = "
	SELECT *
	FROM $bd.$tabla A";
    //WHERE $id $depto $estado ";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $results[] = array(
                    "id" => $row["id_departamento"],
                    'departamento' => utf8_decode($row["departamento"]),
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
		SELECT MAX(a.id_departamento) + 1 as id
		FROM $bd.$tabla a";

        $result = $conn->query($sql);

        if (!empty($result) || !is_null($result)) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {
                    if (!is_null($row["id_departamento"])) $id = $row["id_departamento"];
                    else $id = 1;
                }
            } else {
                $id = 1;
            }
        } else $id = 1;
        $date = (new DateTime())->format('Y-m-d');

        $sql = "INSERT INTO $bd.$tabla(id_departamento, departamento, estado, usuario_creacion, fecha_creacion) VALUE($id,'$depto', 'A', '$user', '$date')";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    } else if (strtoupper($accion) == 'CU') { // VERIFICACION SI LA ACCION ES UNA CONSULTA DE UN REGISTRO PARA CARGARLO A UN FORMULARIO

        if (!empty($id)) $id = "A.id_departamento='$id'";
        else $id = "1=1";
        
        $sql = "
        SELECT *
        FROM $bd.$tabla A 
        where $id";

        $result = $conn->query($sql);

        if (!empty($result))
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $results[] = array(
                        "id" => $row["id_departamento"],
                        'departamento' => utf8_decode($row["departamento"]),
                        'estado' => $row["estado"]
                    );
                    $json = array("status" => 1, "info" => $results);
                }
            } else {
                $json = array("status" => 0, "info" => "No existe información con ese criterio.");
            }
        else $json = array("status" => 0, "info" => "No existe información.");

    } else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES MODIFICACION

        $depto = "departamento='" . strtoupper($depto) . "'";
        $estado = ", estado='" . strtoupper($estado) . "'";
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla SET $depto $estado $user $date WHERE id_departamento = $id";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id_departamento = $id";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    }
    else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ACTIVAR REGISTRO
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id_departamento = $id";

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
