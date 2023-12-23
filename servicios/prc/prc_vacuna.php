<?php
include_once('../config.php'); 

$bd = "dbMyPet";
$tabla = "prc_vacunas";
$tabla2 = "prc_mascotas";
$tabla3 = "ctg_tipovacunas";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_vacuna = isset($_GET['id_vacuna']) ? $_GET['id_vacuna'] : '';
$id_mascota = isset($_GET['id_mascota']) ? $_GET['id_mascota'] : '';
$id_tipovac= isset($_GET['id_tipovac']) ? $_GET['id_tipovac'] : '';
$nombrevac = utf8_decode(isset($_GET['nombrevac']) ? $_GET['nombrevac'] : '');
$fechacr = utf8_decode(isset($_GET['fechacr']) ? $_GET['fechacr'] : '');
$estado = utf8_decode(isset($_GET['estado']) ? $_GET['estado'] : '');
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($id_vacuna)) $id_vacuna="v.id_municipio='$id_vacuna'";
	else $id_vacuna="1=1";
	if(!empty($id_mascota)) $id_mascota="AND v.id_mascota='$id_mascota'";
	else $id_mascota="";
	if(!empty($id_tipovac)) $id_tipovac="AND v.id_tipovacuna='$id_tipovac'";
	else $id_tipovac="";
	if(!empty($nombrevac)) $nombrevac="AND v.nombrevacuna LIKE '%'$nombrevac%'";
	else $nombrevac="";
    if (!empty($estado)) $estado = "AND v.estado='$estado'";
    else $estado = "";
		
	$sql = "SELECT v.id_vacuna,v.id_mascota,v.id_tipovacuna,m.nombremascota,
	t.nombrevacuna,DATE(v.fecha_creacion) AS fecha_creacion,v.estado
	FROM $bd.$tabla v, $bd.$tabla2 m, $bd.$tabla3 t 
	WHERE $id_vacuna $id_mascota $id_tipovac $nombrevac $estado 
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
		SELECT MAX(a.id_municipio) + 1 as id
		FROM $bd.$tabla a";

        $result = $conn->query($sql);

        if (!empty($result) || !is_null($result)) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {
                    if (!is_null($row["id_vacuna"])) $id_vacuna = $row["id_vacuna"];
                    else $id_vacuna = 1;
                }
            } else {
                $id_mun = 1;
            }
        } else $id_mun = 1;

		$date = (new DateTime())->format('Y-m-d');
	
		$sql = "INSERT INTO 
        $bd.$tabla(id_vacuna, id_mascota,id_tipovacuna,estado, usuario_creacion, fecha_creacion) 
		VALUE($id_vacuna, $id_mascota,  $id_tipovac, '$estado','$user', '$date')";
		
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
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".(new DateTime())->format('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='I' WHERE id_vacuna = $id_vacuna ";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVAR EL REGISTRO
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".(new DateTime())->format('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='A' WHERE id_vacuna = $id_vacuna ";
		
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