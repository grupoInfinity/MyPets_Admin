<?php
include_once('../config.php');

$bd = "dbMyPet";
$tabla = "sec_menu";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_menu = isset($_GET['id_menu']) ? $_GET['id_menu'] : '';
$descripcion = utf8_decode(isset($_GET['descripcion']) ? $_GET['descripcion'] : '');
$menu_icon = utf8_decode(isset($_GET['menu_icon']) ? $_GET['menu_icon'] : '');
$orden = utf8_decode(isset($_GET['orden']) ? $_GET['orden'] : '');
$acceso_directo = utf8_decode(isset($_GET['acceso_directo']) ? $_GET['acceso_directo'] : '');
$estado = utf8_decode(isset($_GET['estado']) ? $_GET['estado'] : '');
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
    if(!empty($id_menu)) $id_menu="v.id_menu='$id_menu'";
	else $id_menu="1=1";
    if(!empty($descripcion)) $descripcion="AND v.descripcion LIKE '%'$descripcion%'";
	else $descripcion="";
	if(!empty($menu_icon)) $menu_icon="AND v.menu_icon='$menu_icon'";
	else $menu_icon="";
	if(!empty($orden)) $orden="AND v.orden='$orden'";
	else $orden="";
    if(!empty($acceso_directo)) $acceso_directo="AND v.acceso_directo='$acceso_directo'";
	else $acceso_directo="";
    if (!empty($estado)) $estado = "AND v.estado='$estado'";
    else $estado = "";

    $sql = "
	SELECT * FROM $bd.$tabla v
    WHERE $id_menu $descripcion $menu_icon $orden $acceso_directo $estado ";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $results[] = array(
                    "id_menu" => $row["id_menu"],
                    'descripcion' => utf8_decode($row["descripcion"]),
                    'menu_icon' => utf8_decode($row["menu_icon"]),
                    'orden' => utf8_decode($row["orden"]),
                    'acceso_directo' => utf8_decode($row["acceso_directo"]),
                    'estado' => utf8_decode($row["estado"])
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
		SELECT MAX(a.id_menu) + 1 as id
		FROM $bd.$tabla a";

        $result = $conn->query($sql);

        if (!empty($result) || !is_null($result)) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {
                    if (!is_null($row["id_menu"])) $id_menu = $row["id_menu"];
                    else $id_menu = 1;
                }
            } else {
                $id_menu = 1;
            }
        } else $id_menu = 1;
        //$date = (new DateTime())->format('Y-m-d');

        $sql = "INSERT INTO $bd.$tabla(id_menu, descripcion,menu_icon,orden,acceso_directo,estado, usuario_creacion/*, fecha_creacion*/) 
        VALUE($id_menu,'$descripcion','$menu_icon','$acceso_directo', 'A', '$user'/*, '$date'*/)";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    }else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES MODIFICACION

        $descripcion = "descripcion='".$descripcion."'";
        $menu_icon = ", menu_icon='".$menu_icon."'";
        $orden = "orden='".$orden."'";
        $acceso_directo = "acceso_directo='".$acceso_directo."'";
		$estado = ", estado='".strtoupper($estado)."'";
		$user = ", usuario_modificacion='".$user."'";
        //$date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla SET $descripcion $menu_icon $orden $acceso_directo $estado $user /*$date*/ WHERE id_menu = $id_menu";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id_menu = $id_menu";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    }
    else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ACTIVAR REGISTRO
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id_menu = $id_menu";

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
