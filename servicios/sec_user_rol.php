<?php
include_once('../config.php'); 

$bd = "dbmypet";
$tabla = "sec_rol_usuario";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$user = isset($_GET['user']) ? $_GET['user'] : '';
$id_rol = utf8_decode(isset($_GET['id_rol']) ? $_GET['id_rol'] : '');
$usercr = utf8_decode(isset($_GET['usercr']) ? $_GET['usercr'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($user)) $user="A.usuario='$user'";
	else $user="1=1";
	if(!empty($id_rol)) $id_rol="AND A.id_rol = '$id_rol'";
	else $id_rol="";
		
	$sql = "
	SELECT A.user, A.id_rol
	FROM $bd.$tabla A
	WHERE $user $id_rol ";
	
	//echo $sql;
	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$results[] = array(
				"usuario" => $row["usuario"]
				, 'id_rol' => utf8_decode($row["id_rol"])
				);
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
	
		$sql = "INSERT INTO $bd.$tabla(usuario, id_rol, USUARIO_CREACION/*, FECHA_CREACION*/) 
		VALUE($usuario,$id_rol, '$usercr'/*, '$date'*/)";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
		} else {
			$json = array("status"=>0, "info"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES ELIMINACION
		$usercr = ", usuario_update='".$usercr."'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='I' $usercr WHERE usuario = $user AND id_rol = $id_rol";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}	
    else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ELIMINACION
		$usercr = ", usuario_update='".$usercr."'";

		//$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='A' $usercr WHERE usuario = $user AND id_rol = $id_rol";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}	
}
$conn->close();

/* Output header */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($json);
//*/
 ?>