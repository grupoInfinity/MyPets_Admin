<?php
include_once('../config.php');
//include_once('../ip.php'); 

header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
	die();
}
$tabla = "sec_usuario";
function generarPin(){
	$pin = sprintf("%06d", mt_rand(0, 999999));
	return (string) $pin;
}

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$usr = isset($_GET['usr']) ? $_GET['usr'] : '';
$pin = isset($_GET['pin']) ? $_GET['pin'] : '';
$clave = (isset($_GET['clave']) ? $_GET['clave'] : '');
$nuevaClave = (isset($_GET['nuevaClave']) ? $_GET['nuevaClave'] : '');
$confirmarClave = (isset($_GET['confirmarClave']) ? $_GET['confirmarClave'] : '');
$nombre = (isset($_GET['nombre']) ? $_GET['nombre'] : '');
$apellido = (isset($_GET['apellido']) ? $_GET['apellido'] : '');
$email = isset($_GET['email']) ? $_GET['email'] : '';
$tel = isset($_GET['tel']) ? $_GET['tel'] : '';

$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_encode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
	if (!empty($usr)) $usr = "AND A.usuario='$usr'";
	else $usr = "";
	if (!empty($nombre)) $nombre = "AND A.nombre LIKE '%$nombre%'";
	else $nombre = "";
	if (!empty($apellido)) $apellido = "AND A.apellido LIKE '%$apellido%'";
	else $apellido = "";
	if (!empty($email)) $email = "AND A.email LIKE '%$email%'";
	else $email = "";
	if (!empty($tel)) $tel = "AND A.telefono LIKE '%$tel%'";
	else $tel = "";
	if (!empty($estado)) $estado = "AND A.estado='$estado'";
	else $estado = "";
	if (!empty($pin)) $pin = "AND A.pin='$pin'";
	else $pin = "";

	$sql = "SELECT DISTINCT A.usuario, A.clave, A.nombre, A.apellido,A.email,A.pin, A.estado,A.telefono 
	FROM $bd.$tabla A
	WHERE 1=1 $usr $nombre $apellido $email $estado $tel $pin AND A.usuario!='system'";
	//echo $sql;
	$result = $conn->query($sql);

	if (!empty($result))
		if ($result->num_rows > 0) {
			//$i = 0;	
			while ($row = $result->fetch_assoc()) {
				$usr = $row["usuario"];
				$clave = $row["clave"];
				$nombre = $row["nombre"];
				$apellido = $row["apellido"];
				$email = $row["email"];
				$pin = $row["pin"];
				$tel = $row["telefono"];
				$estado = $row["estado"];

				$results[] = array(
					"usr" => $usr,
					'clave' => $clave,
					'nombre' => ($nombre), 
					'apellido' => ($apellido),
					'email' => ($email),
					'pin' => $pin,
					'tel' => $tel,
					'estado' => $estado
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

		$date = date('Y-m-d H:i:s');

		$sql = "INSERT INTO $bd.$tabla(usuario, clave, nombre, apellido, 
		email,telefono,pin, estado,USUARIO_CREACION, FECHA_CREACION) 
		VALUE('$usr','$clave', '$nombre', '$apellido', '$email','$tel','".generarPin()."', 
		'A', '$user', '$date')";

		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
		} else {
			$json = array("status" => 0, "info" => $conn->error);
		}
	} 
	else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES MODIFICACION

		if (!empty($clave)) $clave = "clave='" . ($clave) . "'";
		else $clave = "clave=clave";
		if (!empty($nombre)) $nombre = ", nombre='" . ($nombre) . "'";
		else $nombre = ",nombre=nombre";
		if (!empty($apellido)) $apellido = ", apellido='" . ($apellido) . "'";
		else $apellido = ",apellido=apellido";
		if (!empty($tel)) $tel = ", telefono='" . ($tel) . "'";
		else $tel = ",telefono=telefono";
		if (!empty($email)) $email = ", email='" . ($email) . "'";
		else $email = ",email=email";
		if (!empty($pin)) $pin = ",pin='" . generarPin() . "'";
		else $pin = ",pin=pin";

		$estado = ", estado='" . strtoupper($estado) . "'";
		$user = ", usuario_update='" . $user . "'";
		$date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";


		$sql = "UPDATE $bd.$tabla SET $clave $nombre $apellido $email $tel $pin $estado $user $date 
		WHERE usuario = '$usr'";

		//echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	}
	else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES INACTIVACION
		$user = ", usuario_update='" . $user . "'";
		$date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

		$sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE usuario = '$usr'";

		//echo $sql;

		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	} 
	else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ACTIVACION
		$user = ", usuario_update='" . $user . "'";
		$date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

		$sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE usuario = '$usr'";

		//echo $sql;

		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	} 
	else if (strtoupper($accion) == 'LU') { //VERIFICACION SI LA ACCION ES CONSULTA DEL LOGIN
		if (!empty($usr)) $usr = "A.usuario='$usr'";
		else $usr = " A.usuario = null";
		if (!empty($estado)) $estado = "AND A.estado='A'";
		else $estado = "AND A.estado=null";

		$sql = "SELECT A.usuario
		FROM $bd.$tabla A
		WHERE $usr $estado AND 1=1 ";

		$result = $conn->query($sql);

		if (!empty($result))
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$results[] = array(
						"usr" => $row["usuario"]
					);
					$json = array("status" => 1, "info" => $results);
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
	} 
	else if (strtoupper($accion) == 'LP') { //VERIFICACION SI LA ACCION ES CONSULTA DEL PASSWORD
		$usrAux = $usr;
		if (!empty($usr)) $usr = "A.usuario='$usr'";
		else $usr = "A.usuario = null";
		if (!empty($clave)) $clave = "AND A.clave='$clave'";
		else $clave = "AND A.clave = null";
		if (!empty($estado)) $estado = "AND A.estado='A'";
		else $estado = "AND A.estado=null";

		$sql = "SELECT A.usuario
				FROM $bd.sec_usuario A
				WHERE $usr $estado $clave";

		$result = $conn->query($sql);

		if (!empty($result))
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {

					$sql_rol = "SELECT A.id_rol
					FROM $bd.sec_rol_usuario A
					WHERE $usr";
					//echo $sql_rol;
					$result2 = $conn->query($sql_rol);
					if (!empty($result2)) {
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$rol = $row2["id_rol"];

								$sql3 = "SELECT A.id_rol, A.descripcion, A.estado
								FROM $bd.sec_rol A WHERE A.id_rol = $rol";

								$result3 = $conn->query($sql3);
								if (!empty($result3)) {
									if ($result3->num_rows > 0) {
										while ($row3 = $result3->fetch_assoc()) {
											$sec_rol[] = array(
												'id' => $row3["id_rol"],
												'descripcion' => utf8_encode($row3["descripcion"]),
												'estado' => $row3["estado"]
											);
										}
									} else {
										$sec_rol[] = null;
									}
								} else $sec_rol[] = null;
							}
						}
					}

					$results[] = array(
						//"idUser" => $ultimoId,
						"usr" => $row["usuario"],
						"sec_rol" => $sec_rol
					);

					//$sec_rol=null;
					$json = array("status" => 1, "info" => $results);
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
	} 
	else if (strtoupper($accion) == 'LP2') { //VERIFICACION SI LA ACCION ES CONSULTA DEL LOGIN SIN PASSWORD
		$usrAux = $usr;
		if (!empty($usr)) $usr = "A.usuario='$usr'";
		else $usr = "";
		if (!empty($clave)) $clave = "AND A.clave='$clave'";
		else $clave = "";
		if (!empty($estado)) $estado = "AND A.estado='A'";
		else $estado = "";

		$sql = "SELECT A.usuario FROM $bd.$tabla A
		WHERE $usr $estado $clave ";

		//echo $sql;

		$result = $conn->query($sql);

		if (!empty($result))
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {

					$sql_rol = "SELECT A.id_rol
					FROM $bd.sec_rol_usuario A WHERE $usr";
					//echo $sql_rol; 
					$result2 = $conn->query($sql_rol);
					if (!empty($result2)) {
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$rol = $row2["id_rol"];

								$sql3 = "SELECT A.id_rol, A.descripcion, A.estado
												 FROM $bd.sec_rol A
												 WHERE A.id_rol = $rol";

								$result3 = $conn->query($sql3);
								if (!empty($result3)) {
									if ($result3->num_rows > 0) {
										while ($row3 = $result3->fetch_assoc()) {
											$sec_rol[] = array(
												'id' => $row3["id_rol"],
												'descripcion' => utf8_encode($row3["descripcion"]),
												'estado' => $row3["estado"]
											);
										}
									} else {
										$sec_rol[] = null;
									}
								} else $sec_rol[] = null;
							}
						}
					}


					$results[] = array(
						"usr" => $row["usuario"],
						"sec_rol" => $sec_rol
					);

					//$sec_rol=null;
					$json = array("status" => 1, "info" => $results);
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
		//echo $json;
	} 
	else if (strtoupper($accion) == 'UP') { // VERIFICACION SI LA ACCION ES MODIFICACION DE CLAVE

		$user = ", usuario_update='" . $user . "'";
		$date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

		$claveActual = "";
		$sql = "
			SELECT A.clave
			FROM $bd.$tabla A
			WHERE usuario='$usr'";

		$result = $conn->query($sql);

		if (!empty($result)) {
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$claveActual = $row["clave"];
					if (!strcmp($clave, $claveActual) && !strcmp($nuevaClave, $confirmarClave)) {
						$sql = "UPDATE $bd.$tabla SET clave='$nuevaClave' $user $date WHERE usuario = '$usr'";
						if ($conn->query($sql) === TRUE) {
							$json = array("status" => 1, "info" => "Cambio de Clave realizado exitosamente.");
						} else {
							$json = array("status" => 0, "error" => $conn->error);
						}
					} else $json = array("status" => 0, "info" => "Por favor revise los valores ingresados.");
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		} else $json = array("status" => 0, "info" => "No existe informacion.");
	}
}
$conn->close();

/* Output header */


echo json_encode($json);
//*/
