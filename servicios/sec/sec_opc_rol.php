<?php
include_once('../config.php'); 

$bd = "dbmypet";
$tabla = "sec_opc_rol";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_menu = isset($_GET['id_menu']) ? $_GET['id_menu'] : '';
$id_opc = utf8_decode(isset($_GET['id_opc']) ? $_GET['id_opc'] : '');
$id_rol = utf8_decode(isset($_GET['id_rol']) ? $_GET['id_rol'] : '');

$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($id_opc)) $id_opc="A.id_opc='$id_opc'";
	else $id_opc="1=1";
	if(!empty($id_menu)) $id_oid_menupc_ppal="AND A.id_menu='$id_menu'";
	else $id_menu="";
	if(!empty($id_rol)) $id_rol="AND A.id_rol = '$id_rol'";
	else $id_rol="";
		
	$sql = "
	SELECT A.id_menu, A.id_opc, A.id_rol
	FROM $bd.$tabla A
	WHERE $id_opc $id_menu $id_rol ";
	
	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$results[] = array(
				"id_menu" => $row["id_menu"]
				, 'id_opc' => utf8_decode($row["id_opc"])
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
	
		$sql = "INSERT INTO $bd.$tabla(id_menu, id_opc, id_rol, USUARIO_CREACION, FECHA_CREACION) 
		VALUE($id_menu, $id_opc, $id_rol, '$user'/*, '$date'*/)";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
		} else {
			$json = array("status"=>0, "info"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES ACTUALIZACION
		$id_menu = "id_menu=".$id_menu;
		$user = ",usuario_modificacion='".$user."'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET $id_menu $user /*$date*/ WHERE id_opc = $id_opc AND id_rol = $id_rol";
		echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES ELIMINACION
		$user = ",usuario_modificacion='".$user."'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='I' $user WHERE id_opc = $id_opc AND id_rol = $id_rol";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ELIMINACION
		$user = ",usuario_modificacion='".$user."'";
		//$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='A' $user WHERE id_opc = $id_opc AND id_rol = $id_rol";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='OP'){// VERIFICACION SI LA ACCION DE LAS OPCIONES PRINCIPALES

		$sql = "SELECT DISTINCT mn.id_menu, mn.descripcion, mn.menu_icon, mn.orden
		FROM $bd.sec_menu mn
		INNER JOIN $bd.sec_opc_rol opcr ON opcr.id_menu = mn.id_menu
		INNER JOIN $bd.sec_rol_usuario rs ON rs.usuario = '$user' AND rs.id_rol = opcr.id_rol
		WHERE mn.estado = 'A'";
		//echo $sql;
		$result = $conn->query($sql);
		//echo print_r($conn);
		if (!empty($result)){
			if($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					$results[] = array(
					"id_menu" => $row["id_menu"]
					, 'descripcion' => utf8_decode($row["descripcion"])
					, 'menu_icon' => utf8_decode($row["menu_icon"])
					, 'orden' => ($row["orden"])
					);
					$json = array("status"=>1, "info"=>$results);
				}
			} else {
				$json = array("status"=>0, "info"=>"No existe información con ese criterio.");
			}
		}
		else{
			echo "entre...";
			$json = array("status"=>0, "info"=>"No existe información.");
		}
	}
	else if(strtoupper($accion) =='OU'){// VERIFICACION SI LA ACCION DE LAS OPCIONES DE LOS USUARIOS
	
		$sql = "SELECT DISTINCT opc.*  
		FROM $bd.sec_rol_usuario rs
		INNER JOIN $bd.sec_opc_rol opcr ON opcr.id_rol = rs.id_rol
		INNER JOIN $bd.sec_opcion opc ON opc.id_opc = opcr.id_opc 
		AND COALESCE(opc.id_menu, -1) = COALESCE(opcr.id_menu, -1)
		AND opc.estado = 'A'
		INNER JOIN $bd.sec_usuario us ON us.usuario = rs.usuario AND us.estado = 'A' AND us.usuario = '$user'";
		
		$result = $conn->query($sql);
		
		if (!empty($result))
			if($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					$results[] = array(
					"id" => $row["id_opc"]
					, 'id_menu' => ($row["id_menu"])
					, 'id_opc_padre' => ($row["id_opc_padre"])
					, 'padre' => ($row["padre"])
					, 'descripcion' => ($row["descripcion"])
					, 'url' => ($row["url"])
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