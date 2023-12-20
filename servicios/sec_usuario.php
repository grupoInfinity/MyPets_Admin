<?php
include_once('../config.php'); 

$bd = "jeo";
$tabla = "sec_usuario";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$user = isset($_GET['user']) ? $_GET['user'] : '';
$clave = utf8_decode(isset($_GET['clave']) ? $_GET['clave'] : '');

$nombre = utf8_decode(isset($_GET['nombre']) ? $_GET['nombre'] : '');
$apellido = utf8_decode(isset($_GET['apellido']) ? $_GET['apellido'] : '');
$email = utf8_decode(isset($_GET['email']) ? $_GET['email'] : '');
$pin = utf8_decode(isset($_GET['pin']) ? $_GET['pin'] : '');

$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$usercr = utf8_decode(isset($_GET['usercr']) ? $_GET['usercr'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($user)) $user="A.usr='$user'";
	else $user="1=1";
	if(!empty($nombre)) $nombre="AND A.nombre LIKE '%$nombre%'";
	else $nombre="";
	if(!empty($apellido)) $apellido="AND A.apellido LIKE '%$apellido%'";
	else $apellido="";
	if(!empty($estado)) $estado="AND A.estado='$estado'";
	else $estado="";
	
	$sql = "
	SELECT A.usr, A.clave, A.nombre, A.apellido, A.email, A.estado
	FROM $bd.$tabla A
	WHERE $user $clave $estado ";

	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$results[] = array(
				"usuario" => $row["usuario"]
				, 'clave' => utf8_decode($row["clave"])
				, 'nombre' => utf8_decode($row["nombre"])
				, 'apellido' => utf8_decode($row["apellido"])
				, 'email' => utf8_decode($row["email"])
				, 'pin' => utf8_decode($row["pin"])
				, 'estado'=>$row["estado"]);
				$json = array("status"=>1, "info"=>$results);
			}
		} else {
			$json = array("status"=>0, "info"=>"No existe información con ese criterio.");
		}
	else $json = array("status"=>0, "info"=>"No existe información.");
}
else{
	if(strtoupper($accion) =='I'){// VERIFICACION SI LA ACCION ES INSERCION
		
		//$date = date('Y-m-d');
	
		$sql = "INSERT INTO $bd.$tabla(usuario, clave, nombre, apellido, email, ESTADO, USUARIO_CREACION/*, FECHA_CREACION*/) 
		VALUE('$user','$clave', '$nombre', '$apellido', '$email', 'A', '$usercr'/*, '$date'*/)";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
		} else {
			$json = array("status"=>0, "info"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES MODIFICACION
	
		if(!empty($clave)) $clave = "clave='".strtoupper($clave)."'";
		else $clave = "clave=clave";
		if(!empty($nombre)) $nombre = ", nombre='".strtoupper($nombre)."'";
		else $nombre = ", nombre=nombre";
		if(!empty($apellido)) $apellido = ", apellido='".strtoupper($apellido)."'";
		else $apellido = ", apellido=apellido";
		if(!empty($email)) $email = ", email='".strtoupper($email)."'";
		else $email = ", email=email";
		
				
		$estado = ", estado='".strtoupper($estado)."'";
		$usercr = ", usuario_modificacion='".$usercr."'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		
		$sql = "UPDATE $bd.$tabla SET $clave $nombre $apellido $email $estado $usercr /*$date*/ WHERE usr = '$user'";
		
		echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro actualizado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES ELIMINACION
		$usercr = ", usuario_modificacion='".$usercr."'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla set estado='I' $usercr /*$date*/ WHERE usuario = $user";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='LU'){ //VERIFICACION SI LA ACCION ES CONSULTA DEL LOGIN
			if(!empty($usr)) $usr="A.usuario='$user'";
			else $user = "A.usuario = null";
			if(!empty($estado)) $estado="AND A.estado='A'";
			else $estado="AND A.estado=null";
			
			$sql = "SELECT A.usuario FROM $bd.$tabla A WHERE $usr $estado ";

			$result = $conn->query($sql);
			
			if (!empty($result))
				if($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						$results[] = array(
						"user" => $row["usuario"]
						);
						$json = array("status"=>1, "info"=>$results);
					}
				} else {
					$json = array("status"=>0, "info"=>"No existe información con ese criterio.");
				}
			else $json = array("status"=>0, "info"=>"No existe información.");
		}
	else if(strtoupper($accion) =='LP'){ //VERIFICACION SI LA ACCION ES CONSULTA DEL PASSWORD
			if(!empty($user)) $user="A.usuario='$user'";
			else $user = "A.usuario = null";
			if(!empty($clave)) $clave="A.clave='$clave'";
			else $clave = "AND A.clave = null";
			if(!empty($estado)) $estado="AND A.estado='A'";
			else $estado="AND A.estado=null";
			
			$sql = "SELECT A.usuario FROM $bd.$tabla A WHERE $user $clave $estado ";

			$result = $conn->query($sql);
			
			if (!empty($result))
				if($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						$results[] = array(
						"user" => $row["usuario"]
						);
						$json = array("status"=>1, "info"=>$results);
					}
				} else {
					$json = array("status"=>0, "info"=>"No existe información con ese criterio.");
				}
			else $json = array("status"=>0, "info"=>"No existe información.");
		}
	
}
$conn->close();

/* Output header */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($json);
//*/
 ?>