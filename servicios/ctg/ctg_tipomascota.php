<?php
include_once('../config.php');
header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}
//$bd = "dbMyPet";
$tabla = "ctg_tipomascotas";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';
$tipomascota= utf8_decode(isset($_GET['desc']) ? $_GET['desc'] : '');
$estado = utf8_decode(isset($_GET['estado']) ? $_GET['estado'] : '');
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
<<<<<<< Updated upstream:aplicacion/servicios/ctg/ctg_tipomascota.php
    if (!empty($id)) $id = "A.id_tipomascota='$id'";
    else $id = "1=1";
    if (!empty($tipomascota)) $tipomascota = "AND A.tipomascota LIKE '%$tipomascota%'";
    else $tipomascota = "";
    if (!empty($estado)) $estado = "AND A.estado='$estado'";
=======
    if(!empty($id)) $id="v.id_menu='$id'";
	else $id="1=1";
    if(!empty($desc)) $desc="AND v.descripcion LIKE '%'$desc%'";
	else $desc="";
	if(!empty($menu_icon)) $menu_icon="AND v.menu_icon='$menu_icon'";
	else $menu_icon="";
	if(!empty($orden)) $orden="AND v.orden='$orden'";
	else $orden="";
    if(!empty($acceso_directo)) $acceso_directo="AND v.acceso_directo='$acceso_directo'";
	else $acceso_directo="";
    if (!empty($estado)) $estado = "AND v.estado='$estado'";
>>>>>>> Stashed changes:servicios/sec/sec_menu.php
    else $estado = "";

    $sql = "SELECT A.id_tipomascota,A.tipomascota,A.estado 
    FROM $bd.$tabla A  WHERE $id $tipomascota $estado ";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $results[] = array(
<<<<<<< Updated upstream:aplicacion/servicios/ctg/ctg_tipomascota.php
                    "id" => $row["id_tipomascota"],
                    'tipomascota' => utf8_decode($row["tipomascota"]),
                    'estado' => $row["estado"]
=======
                    "id" => $row["id_menu"],
                    'descripcion' => ($row["descripcion"]),
                    'menu_icon' => ($row["menu_icon"]),
                    'orden' => ($row["orden"]),
                    'acceso_directo' => ($row["acceso_directo"]),
                    'estado' => ($row["estado"])
>>>>>>> Stashed changes:servicios/sec/sec_menu.php
                );
                $json = array("status" => 1, "info" => $results);
            }
        } else {
            $json = array("status" => 0, "info" => "No existe información con ese criterio.");
        }
    else $json = array("status" => 0, "info" => "No existe información.");
} 
else {
    if (strtoupper($accion) == 'I') { // VERIFICACION SI LA ACCION ES INSERCION
        $sql = "
		SELECT MAX(a.id_tipomascota) + 1 as id
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

        $sql = "INSERT INTO $bd.$tabla(id_tipomascota, tipomascota, estado, usuario_creacion, fecha_creacion) 
        VALUE($id,'$tipomascota', 'A', '$user', '$date')";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    }
	else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES MODIFICACION

<<<<<<< Updated upstream:aplicacion/servicios/ctg/ctg_tipomascota.php
        $tipomascota = "tipomascota='" . strtoupper($tipomascota) . "'";
        $estado = ", estado='" . strtoupper($estado) . "'";
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla SET $tipomascota $estado $user $date WHERE id = $id";
=======
        $desc = "descripcion='".$desc."'";
        $menu_icon = ", menu_icon='".$menu_icon."'";
        $orden = ", orden='".$orden."'";
        $acceso_directo = ", acceso_directo='".$acceso_directo."'";
		$estado = ", estado='".strtoupper($estado)."'";
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

	$sql = "UPDATE $bd.$tabla SET $desc $menu_icon $orden $acceso_directo $estado $user $date WHERE id_menu = $id";
>>>>>>> Stashed changes:servicios/sec/sec_menu.php

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } 
	else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
<<<<<<< Updated upstream:aplicacion/servicios/ctg/ctg_tipomascota.php
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id = $id";
=======
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id_menu = $id";
>>>>>>> Stashed changes:servicios/sec/sec_menu.php

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    }
    else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
<<<<<<< Updated upstream:aplicacion/servicios/ctg/ctg_tipomascota.php
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id = $id";
=======
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id_menu = $id";
>>>>>>> Stashed changes:servicios/sec/sec_menu.php

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
