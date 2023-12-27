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
$tabla = "prc_vacunas";
$tabla2 = "prc_mascotas";
$tabla3 = "ctg_tipovacunas";


$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_vacuna = isset($_GET['id']) ? $_GET['id'] : '';
$id_mascota = isset($_GET['idmasc']) ? $_GET['idmasc'] : '';
$id_tipovac= isset($_GET['idtpvac']) ? $_GET['idtpvac'] : '';
$nombrevac = utf8_decode(isset($_GET['nombrevac']) ? $_GET['nombrevac'] : '');
$nombremasc = utf8_decode(isset($_GET['nombremasc']) ? $_GET['nombremasc'] : '');
$fechacr = utf8_decode(isset($_GET['fechacr']) ? $_GET['fechacr'] : '');
$estado = utf8_decode(isset($_GET['estado']) ? $_GET['estado'] : '');
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($id_vacuna)) $id_vacuna="v.id_vacuna='$id_vacuna'";
	else $id_vacuna="1=1";
	if(!empty($id_mascota)) $id_mascota="AND v.id_mascota='$id_mascota'";
	else $id_mascota="";
	if(!empty($id_tipovac)) $id_tipovac="AND v.id_tipovacuna='$id_tipovac'";
	else $id_tipovac="";
	if(!empty($nombremasc)) $nombremasc="AND m.nombremascota LIKE '%'$nombremasc%'";
	else $nombremasc="";
	if(!empty($nombrevac)) $nombrevac="AND t.nombrevacuna LIKE '%'$nombrevac%'";
	else $nombrevac="";
    if (!empty($estado)) $estado = "AND v.estado='$estado'";
    else $estado = "";
		
	$sql = "SELECT v.id_vacuna,v.id_mascota,v.id_tipovacuna,m.nombremascota,
	t.nombrevacuna,DATE(v.fecha_creacion) AS fecha_creacion,v.estado
	FROM $bd.prc_vacunas v, $bd.prc_mascotas m, $bd.ctg_tipovacunas t 
	WHERE $id_vacuna $id_mascota $id_tipovac $nombrevac $nombremasc $estado AND
	v.id_mascota=m.id_mascota AND v.id_tipovacuna=t.id_tipovacuna ";
	
	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$results[] = array(
				"id_vacuna" => $row["id_vacuna"]
				,"id_mascota" => $row["id_mascota"]
				,"id_tipovacuna" => $row["id_tipovacuna"]
				, 'nombremascota' => utf8_decode($row["nombremascota"])
                , 'nombrevacuna' => utf8_decode($row["nombrevacuna"])
                , 'estado' => utf8_decode($row["estado"])
                , 'fechacr' => utf8_decode($row["fecha_creacion"])
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
		SELECT MAX(a.id_vacuna) + 1 as id
		FROM $bd.$tabla a";

        $result = $conn->query($sql);

        if (!empty($result) || !is_null($result)) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {
                    if (!is_null($row["id"])) $id_vacuna = $row["id"];
                    else $id_vacuna = 1;
                }
            } else {
                $id_vacuna = 1;
            }
        } else $id_vacuna = 1;

		$date = date('Y-m-d H:i:s');
	
		$sql = "INSERT INTO 
        $bd.$tabla(id_vacuna, id_mascota,id_tipovacuna,estado, usuario_creacion, fecha_creacion) 
		VALUE($id_vacuna, $id_mascota,  $id_tipovac, 'A','$user', '$date')";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
		} else {
			$json = array("status"=>0, "info"=>$conn->error);
		}
	}
	/*else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES ACTUALIZACION
		$id_tipovac= " id_tipovacuna=".$id_tipovac;
        $estado = ",estado='".$estado."'";
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".(new DateTime())->format('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET $id_tipovac $municipio $estado $user $date WHERE id_municipio = $id_vac ";
		echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}*/
	else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES ELIMINACION
		/*$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".date('Y-m-d H:i:s')."'";*/
		
		$sql = "DELETE $bd.$tabla WHERE id_vacuna = $id_vacuna ";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	/*else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVAR EL REGISTRO
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".date('Y-m-d H:i:s')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='A' WHERE id_vacuna = $id_vacuna ";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro activado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}*/
	
	
}
$conn->close();

/* Output header */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($json);
//*/
 ?>