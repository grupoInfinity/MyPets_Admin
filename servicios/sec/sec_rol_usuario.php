<?php
include_once('../config.php');

header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
	die();
}
$tabla = "sec_rol_usuario";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$usr = isset($_GET['usr']) ? $_GET['usr'] : '';
$rol = utf8_encode(isset($_GET['rol']) ? $_GET['rol'] : '');

$user = utf8_encode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
	if (!empty($usr)) $usr = "A.usuario='$usr'";
	else $usr = "1=1";
	if (!empty($rol)) $rol = "AND A.id_rol = $rol";
	else $rol = "";

	$sql = "
	SELECT A.usuario, A.id_rol
	FROM $bd.$tabla A
	WHERE $usr $rol";

	//echo $sql;
	$result = $conn->query($sql);

	if (!empty($result))
		if ($result->num_rows > 0) {
			$i = 0;
			while ($row = $result->fetch_assoc()) {
				$usr = $row["usuario"];
				$rol = $row["id_rol"];

				$id[] = array(
					'rol' => $rol, 'usr' => $usr
				);

				$sql2 = "SELECT A.usuario, A.nombre, A.clave, A.apellido, A.email, A.estado,A.pin 
				FROM $bd.sec_usuario A
				WHERE A.usuario = '$usr'";

				//echo $sql2;
				$result2 = $conn->query($sql2);

				if (!empty($result2))
					if ($result2->num_rows > 0) {
						while ($row2 = $result2->fetch_assoc()) {
							$resultsUsr[] = array(
								'usr' => $row2["usuario"],
								'pin' => $row2["pin"],
								'nombre' => $row2["nombre"],
								'clave' => $row2["clave"], 
								'apellido' => $row2["apellido"], 
								'email' => $row2["email"],
							    'estado' => $row2["estado"]
							);
						}
					} else {
						$resultsUsr[] = null;
					}
				else $resultsUsr[] = null;

				$sql2 = "SELECT A.id_rol, A.descripcion, A.estado
				FROM $bd.sec_rol A WHERE A.id_rol = $rol";

				//echo $sql2;
				$result2 = $conn->query($sql2);

				if (!empty($result2))
					if ($result2->num_rows > 0) {
						while ($row2 = $result2->fetch_assoc()) {
							$resultsRol[] = array(
								'id' => $row2["id_rol"], 
								'descripcion' => $row2["descripcion"], 
								'estado' => $row2["estado"]
							);
						}
					} else {
						$resultsRol[] = null;
					}
				else $resultsRol[] = null;

				$results[] = array(
					"id" => $id[$i],
					'ctgUsr' => $resultsUsr[$i],
					'ctgRol' => $resultsRol[$i]
				);

				$json = array("status" => 1, "info" => $results);

				$i++;
			}
		} else {
			$json = array("status" => 0, "info" => "No existe información con ese criterio.");
		}
	else $json = array("status" => 0, "info" => "No existe información.");
} else {
	if (strtoupper($accion) == 'I') { // VERIFICACION SI LA ACCION ES INSERCION

		$date = date('Y-m-d H:i:s');

		$sql = "INSERT INTO $bd.$tabla(usuario,id_rol, USUARIO_CREACION, FECHA_CREACION) 
		VALUE('$usr', $rol, '$user', '$date')";
		//echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
		} else {
			$json = array("status" => 0, "info" => $conn->error);
		}
	}

	/*else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES MODIFICACION
	    
	    $usr = " usr='".$usr."'";
	    $rol = ", rol='".$rol."'";
	    //$estado = ", estado='".strtoupper($estado)."'";
	    $user = ", usuario_modificacion='".$user."'";
	    $date = ", fecha_modificacion='".date('Y-m-d')."'";
	    
	    
	    $sql = "UPDATE $bd.$tabla SET $rol $user $date WHERE ";
	    
	    if ($conn->query($sql) === TRUE) {
	        $json = array("status"=>1, "info"=>"Registro actualizado exitosamente.");
	    } else {
	        $json = array("status"=>0, "error"=>$conn->error);
	    }
	}
	*/ else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
		$user = ", usuario_update='" . $user . "'";
		$date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

		$sql = "DELETE FROM $bd.$tabla WHERE usuario = '$usr' AND id_rol = $rol";

		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	}
}
$conn->close();

/* Output header */

echo json_encode($json);
//*/
