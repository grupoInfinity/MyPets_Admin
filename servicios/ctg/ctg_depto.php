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

$tabla = "ctg_departamento";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';
$desc = utf8_encode(isset($_GET['desc']) ? $_GET['desc'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_encode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($id)) $id="A.id_departamento='$id'";
	else $id="1=1";
	if(!empty($desc)) $desc="AND A.descripcion LIKE '%$desc%'";
	else $desc="";
	if(!empty($estado)) $estado="AND A.estado='$estado'";
	else $estado="";
	
	$sql = "
	SELECT A.id_departamento, A.descripcion, A.estado
	FROM $bd.$tabla A
	WHERE $id $desc $estado ";
	//echo $sql;
	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$results[] = array("id" => $row["id_departamento"], 
				'descripcion' => utf8_encode($row["descripcion"]), 
				'estado'=>$row["estado"]);
				$json = array("status"=>1, "info"=>$results);
			}
		} else {
			$json = array("status"=>0, "info"=>"No existe informacion con ese criterio....");
		}
	else $json = array("status"=>0, "info"=>"No existe información.");
}
else{
	if(strtoupper($accion) =='I'){// VERIFICACION SI LA ACCION ES INSERCION
		$sql = "
		SELECT MAX(a.id_departamento) + 1 as id
		FROM $bd.$tabla a";
		
		$result = $conn->query($sql);
		
		if (!empty($result) || !is_null($result)){
			if ($result->num_rows > 0) {
				
				while($row = $result->fetch_assoc()) {
					if(!is_null($row["id"])) $id=$row["id"];
					else $id=1;
				}
			} else {
				$id=1;
			}
		}
		else $id=1;
		$date = date('Y-m-d H:i:s');
	
		$sql = "INSERT INTO $bd.$tabla(ID_DEPARTAMENTO, DESCRIPCION, ESTADO, USUARIO_CREACION, FECHA_CREACION)
		VALUE($id,'".strtoupper($desc)."', 'A', '$user', '$date')";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
		} else {
			$json = array("status"=>0, "info"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES MODIFICACION
	
		$desc = "descripcion='".strtoupper($desc)."'";
		$estado = ", estado='".strtoupper($estado)."'";
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".date('Y-m-d H:i:s')."'";
		
		
		$sql = "UPDATE $bd.$tabla SET $desc $estado $user $date WHERE id_departamento = $id";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro actualizado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES ELIMINACION
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".date('Y-m-d H:i:s')."'";
		
		$sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id_departamento = $id";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ELIMINACION
	    $user = ", usuario_update='".$user."'";
	    $date = ", fecha_update='".date('Y-m-d H:i:s')."'";
	    
	    $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id_departamento = $id";
	    
	    if ($conn->query($sql) === TRUE) {
	        $json = array("status"=>1, "info"=>"Registro activado exitosamente.");
	    } else {
	        $json = array("status"=>0, "error"=>$conn->error);
	    }
	}
}
$conn->close();

/* Output header */

echo json_encode($json);
//*/
 ?>