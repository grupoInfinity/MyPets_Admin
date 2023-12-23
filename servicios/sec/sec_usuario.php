<?php
include_once('../config.php');

$bd = "dbmypet";
$tabla = "sec_usuario";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$user = isset($_GET['usr']) ? $_GET['usr'] : '';
$clave = utf8_decode(isset($_GET['clave']) ? $_GET['clave'] : '');

$nombre = utf8_decode(isset($_GET['nombre']) ? $_GET['nombre'] : '');
$apellido = utf8_decode(isset($_GET['apellido']) ? $_GET['apellido'] : '');
$email = utf8_decode(isset($_GET['email']) ? $_GET['email'] : '');
$pin = utf8_decode(isset($_GET['pin']) ? $_GET['pin'] : '');

$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$usercr = utf8_decode(isset($_GET['usercr']) ? $_GET['usercr'] : '');

$json = "no has seteado nada.";
function generarPin()
{
	// Generar un PIN de 6 dígitos
	$pin = sprintf("%06d", mt_rand(0, 999999));
	return (string) $pin;
}

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
	if (!empty($user)) $user = "A.usuario='$user'";
	else $user = "1=1";
	if (!empty($nombre)) $nombre = "AND A.nombre LIKE '%$nombre%'";
	else $nombre = "";
	if (!empty($apellido)) $apellido = "AND A.apellido LIKE '%$apellido%'";
	else $apellido = "";
	if (!empty($estado)) $estado = "AND A.estado='$estado'";
	else $estado = "";
	if (!empty($pin)) $pin = "AND A.pin='$pin'";
	else $pin = "";

	$sql = "
	SELECT A.usuario, A.clave, A.nombre, A.apellido, A.email, A.estado, A.pin
	FROM $bd.$tabla A
	WHERE $user $clave $estado $pin";
	//echo $sql;
	$result = $conn->query($sql);

	if (!empty($result))
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$results[] = array(
					"usuario" => $row["usuario"],
					'clave' => utf8_decode($row["clave"]), 
					'nombre' => utf8_decode($row["nombre"]), 
					'apellido' => utf8_decode($row["apellido"]), 
					'email' => utf8_decode($row["email"]),
					'pin' => utf8_decode($row["pin"]), 
					'estado' => $row["estado"]
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

		//$date = date('Y-m-d');
		$pin = generarPin();

		$sql = "INSERT INTO $bd.$tabla(usuario, clave, nombre, apellido, email,,pin ESTADO, USUARIO_CREACION/*, FECHA_CREACION*/) 
		VALUE('$user','$clave', '$nombre', '$apellido', '$email', '$estado','$pin', '$usercr'/*, '$date'*/)";

		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
		} else {
			$json = array("status" => 0, "info" => $conn->error);
		}
	} else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES MODIFICACION

		if (!empty($clave)) $clave = "clave='" . strtoupper($clave) . "'";
		else $clave = "clave=clave";
		if (!empty($nombre)) $nombre = ", nombre='" . strtoupper($nombre) . "'";
		else $nombre = ", nombre=nombre";
		if (!empty($apellido)) $apellido = ", apellido='" . strtoupper($apellido) . "'";
		else $apellido = ", apellido=apellido";
		if (!empty($email)) $email = ", email='" . strtoupper($email) . "'";
		else $email = ", email=email";

		$pin=", pin='". generarPin() ."'";
		$estado = ", estado='" . strtoupper($estado) . "'";
		$usercr = ", usuario_modificacion='" . $usercr . "'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";


		$sql = "UPDATE $bd.$tabla SET $clave $nombre $apellido $email $pin $estado $usercr /*$date*/ WHERE usr = '$user'";

		echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	} else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
		$usercr = ", usuario_modificacion='" . $usercr . "'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";

		$sql = "UPDATE $bd.$tabla set estado='I' $usercr /*$date*/ WHERE usuario = $user";

		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	} 
	else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ELIMINACION
		$usercr = ", usuario_modificacion='" . $usercr . "'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";

		$sql = "UPDATE $bd.$tabla set estado='A' $usercr /*$date*/ WHERE usuario = $user";

		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	}
	else if (strtoupper($accion) == 'LU') { //VERIFICACION SI LA ACCION ES CONSULTA DEL LOGIN
		if (!empty($usr)) $usr = "A.usuario='$user'";
		else $user = "A.usuario = null";
		if (!empty($estado)) $estado = "AND A.estado='A'";
		else $estado = "AND A.estado=null";

		$sql = "SELECT A.usuario FROM $bd.$tabla A WHERE $usr $estado ";

		$result = $conn->query($sql);

		if (!empty($result))
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$results[] = array(
						"user" => $row["usuario"]
					);
					$json = array("status" => 1, "info" => $results);
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
	} 
	else if (strtoupper($accion) == 'LP') { //VERIFICACION SI LA ACCION ES CONSULTA DEL PASSWORD
		if (!empty($user)) $user = "A.usuario='$user'";
		else $user = "A.usuario = null";
		if (!empty($clave)) $clave = "AND A.clave='$clave'";
		else $clave = "AND A.clave = null";
		if (!empty($estado)) $estado = "AND A.estado='A'";
		else $estado = "AND A.estado=null";
		
		$sec_rol = [];
		$idRolAdministrador = "1";

		$sql = "SELECT A.usuario FROM $bd.$tabla A WHERE $user $clave $estado ";
		//echo $sql;
		$result = $conn->query($sql);

		if (!empty($result))
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$usuario = $row["usuario"];
					/******************************************/
					$isRolAdmin = "N";
					$isRolSupervisor = "N";
					$isRolCajero = "N";
					$sql_rol = "SELECT A.id_rol
								  FROM $bd.sec_rol_usuario A
								  WHERE $user";
					//echo $sql_rol; 
					$result2 = $conn->query($sql_rol);
					if (!empty($result2)) {
						if($result2->num_rows > 0) {
							while($row2 = $result2->fetch_assoc()) {
								$rol = $row2["id_rol"];
										
								/******************************************/
								
								$sql3 = "SELECT A.id_rol, A.descripcion, A.estado
										 FROM $bd.sec_rol A
										 WHERE A.id_rol = $rol";
										 
								//echo $sql3;
								
								$result3 = $conn->query($sql3);
								if (!empty($result3)) {
									if($result3->num_rows > 0) {
										while($row3 = $result3->fetch_assoc()) {
											$sec_rol[] = array(
												'id' => $row3["id_rol"],
												'descripcion'=>utf8_encode($row3["descripcion"]),
												'estado'=>$row3["estado"]
											);
										}
									} else {
										$sec_rol[] = null;
									}
								}
								else $sec_rol[] = null;
								
								$pos = strpos("roles_adm=".$idRolAdministrador, $rol);
								//if ($pos > 0) {
								if ($idRolAdministrador == $rol) {
									$isRolAdmin = "S";
								}
								
							}
						}
					}
					
					$results[] = array(
						"user" => $usuario
						, "sec_rol" => $sec_rol
					);
					$json = array("status" => 1, "info" => $results);
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
	}
}
$conn->close();

/* Output header */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($json);
//*/
