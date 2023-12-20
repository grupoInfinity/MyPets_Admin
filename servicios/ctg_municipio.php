<?php
include_once('../config.php'); 

$bd = "dbMyPet";
$tabla = "ctg_municipios";
$tabla2 = "ctg_departamentos";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_mun = isset($_GET['id_mun']) ? $_GET['id_mun'] : '';
$id_depto = utf8_decode(isset($_GET['id_depto']) ? $_GET['id_depto'] : '');
$municipio = utf8_decode(isset($_GET['municipio']) ? $_GET['municipio'] : '');
$estado = utf8_decode(isset($_GET['estado']) ? $_GET['estado'] : '');
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($id_mun)) $id_mun="AND m.id_municipio='$id_mun'";
	else $id_mun="";
	if(!empty($id_depto)) $id_depto="AND m.id_departamento='$id_depto'";
	else $id_depto="";
	if(!empty($municipio)) $municipio="AND m.municipio LIKE '%'$municipio%'";
	else $municipio="";
    if (!empty($estado)) $estado = "AND m.estado='$estado'";
    else $estado = "";
		
	$sql = "select m.id_municipio,m.id_departamento,d.departamento,m.municipio,m.estado
    from $bd.$tabla m,$bd.$tabla2 d  
	where m.id_departamento=d.id_departamento $id_mun $id_depto $municipio $estado ";
	
	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$results[] = array(
				"id_municipio" => $row["id_municipio"]
				, 'id_depto' => $row["id_departamento"]
				, 'departamento' => utf8_decode($row["departamento"])
				, 'municipio' => utf8_decode($row["municipio"])
                , 'estado' => utf8_decode($row["estado"])
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
		//AGREGAR ORDEN DE ID
        $sql = "
		SELECT MAX(a.id_municipio) + 1 as id
		FROM $bd.$tabla a";

        $result = $conn->query($sql);

        if (!empty($result) || !is_null($result)) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {
                    if (!is_null($row["id_municipio"])) $id_mun = $row["id_municipio"];
                    else $id_mun = 1;
                }
            } else {
                $id_mun = 1;
            }
        } else $id_mun = 1;

		//$date = (new DateTime())->format('Y-m-d');
	
		$sql = "INSERT INTO 
        $bd.$tabla(id_municipio, id_departamento, municipio,estado, usuario_creacion/*, fecha_creacion*/) 
		VALUE($id_mun, $id_depto, $municipio, 'A','$user', /*'$date'*/)";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
		} else {
			$json = array("status"=>0, "info"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES ACTUALIZACION
		$id_depto= " id_departamento=".$id_depto;
        $municipio = ",municipio='".$municipio."'";
        $estado = ",estado='".$estado."'";
		$user = ", usuario_update='".$user."'";
		//$date = ", fecha_update='".(new DateTime())->format('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET $id_depto $municipio $estado $user /*$date*/ WHERE id_municipio = $id_mun ";
		echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES ELIMINACION
		$user = ", usuario_update='".$user."'";
		//$date = ", fecha_update='".(new DateTime())->format('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='I' $user WHERE id_municipio = $id_municipio ";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVAR EL REGISTRO
		$user = ", usuario_update='".$user."'";
		//$date = ", fecha_update='".(new DateTime())->format('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='A' $user WHERE id_municipio = $id_municipio ";
		
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