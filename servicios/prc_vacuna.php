<?php
include_once('../config.php'); 

$bd = "dbMyPet";
$tabla = "prc_vacunas";
$tabla2 = "prc_mascotas";
$tabla3 = "ctg_tipovacunas";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_vac = isset($_GET['id_vac']) ? $_GET['id_vac'] : '';
$id_mascota = isset($_GET['id_mascota']) ? $_GET['id_mascota'] : '';
$id_tipovac= isset($_GET['id_tipovac']) ? $_GET['id_tipovac'] : '';
$nombrevac = utf8_decode(isset($_GET['nombrevac']) ? $_GET['nombrevac'] : '');
$fechacr = utf8_decode(isset($_GET['fechacr']) ? $_GET['fechacr'] : '');
$estado = utf8_decode(isset($_GET['estado']) ? $_GET['estado'] : '');
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	/*if(!empty($id_mun)) $id_mun="A.id_municipio='$id_mun'";
	else $id_mun="1=1";
	if(!empty($id_depto)) $id_depto="AND A.id_departamento='$id_depto'";
	else $id_depto="AND 1=1";
	if(!empty($municipio)) $municipio="AND A.municipio LIKE '%'$municipio%'";
	else $municipio="";
    if (!empty($estado)) $estado = "AND A.estado='$estado'";
    else $estado = "";*/
		
	$sql = "
	SELECT v.id_vacuna,m.nombremascota,t.nombrevacuna,
    v.usuario_creacion,v.fecha_creacion,v.usuario_update,v.fecha_update,v.estado
	FROM $bd.$tabla v, $bd.$tabla2 m, $bd.$tabla3 t ";
	//WHERE $id_opc $id_opc_ppal $id_rol ";
	
	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$results[] = array(
				"id_vac" => $row["id_vacuna"]
				, 'nombremascota' => utf8_decode($row["nombremascota"])
                , 'nombrevacuna' => utf8_decode($row["nombrevacuna"])
                , 'estado' => utf8_decode($row["estado"])
                , 'uscr' => utf8_decode($row["usuario_creacion"])
                , 'fechacr' => utf8_decode($row["fecha_creacion"])
                , 'usup' => utf8_decode($row["usuario_update"])
                , 'fechaup' => utf8_decode($row["fecha_update"])
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

		$date = (new DateTime())->format('Y-m-d');
	
		$sql = "INSERT INTO 
        $bd.$tabla(id_vacuna, id_mascota,id_tipovacuna,estado, usuario_creacion, fecha_creacion) 
		VALUE($id_vac, $id_mascota,  $id_tipovac, 'A','$user', '$date')";
		
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
		
		$sql = "UPDATE $bd.$tabla SET estado='I' WHERE id_vac = $id_vac ";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVAR EL REGISTRO
		$user = ", usuario_update='".$user."'";
		$date = ", fecha_update='".(new DateTime())->format('Y-m-d')."'";
		
		$sql = "UPDATE $bd.$tabla SET estado='A' WHERE id_vac = $id_vac ";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
	else if (strtoupper($accion) == 'HV') { // ACCION DE HISTORIAL DE VACUNAS


        $sql = "
        SELECT v.id_vacuna,m.nombremascota,t.nombrevacuna,
        v.usuario_creacion,v.fecha_creacion,v.usuario_update,v.fecha_update,v.estado
        FROM $bd.$tabla m, $bd.$tabla2 v, $bd.$tabla3 t 
        WHERE v.id_mascota=m.id_mascota AND v.id_tipovacuna=t.id_tipovacuna
        AND v.id_mascota=$id_mascota AND v.estado='A'";

        $result = $conn->query($sql);

        if (!empty($result))
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $results[] = array(
                        "id" => $row["id_municipio"], 
						'departamento' => utf8_decode($row["departamento"]),
						'municipio' => utf8_decode($row["municipio"]), 
						'estado' => utf8_decode($row["estado"])
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
 ?>