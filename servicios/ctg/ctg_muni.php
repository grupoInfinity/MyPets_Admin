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
$tabla = "ctg_municipio";


$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$idMuni = isset($_GET['id']) ? $_GET['id'] : '';
$idDepto =(isset($_GET['idDepto']) ? $_GET['idDepto'] : '');
$desc = utf8_encode(isset($_GET['desc']) ? $_GET['desc'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_encode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";
//echo $json;
if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
    if(!empty($idMuni)) $idMuni="A.id='$idMuni'";
    else $idMuni="1=1";
	
    if(!empty($idDepto) || $idDepto=="0") $idDepto="AND A.id_depto = $idDepto";
    else $idDepto="";
    if(!empty($desc)) $desc="AND A.descripcion LIKE '%$desc%'";
    else $desc="";    
    if(!empty($estado)) $estado="AND A.estado='$estado'";
    else $estado="";
    
    $sql = "
	SELECT A.id, A.id_depto, A.descripcion, A.estado
	FROM $bd.$tabla A
	WHERE $idMuni $idDepto $desc $estado";
    
    //echo $sql;
    $result = $conn->query($sql);
    
    if (!empty($result))
        if($result->num_rows > 0) {
            $i=0;
           // echo 'mii';
            
            while($row = $result->fetch_assoc()) {
                $idMuni  = $row["id"];
                $idDepto  = $row["id_depto"];                
                
                $id[] = array(                    
                    'id' => $idMuni
                    ,'id_depto' => $idDepto
                );
                
                $sql2 = "
				SELECT A.id, A.descripcion, A.estado
				FROM $bd.ctg_depto A
				WHERE A.id = $idDepto";
                
                //echo $sql2;
                $result2 = $conn->query($sql2);
                
                if (!empty($result2))
                    if($result2->num_rows > 0) {
                        while($row2 = $result2->fetch_assoc()) {
                            $resultsDepto[] = array(
                                'id' => $row2["id"]
                                , 'descripcion' => utf8_encode($row2["descripcion"])
                                , 'estado'=>$row2["estado"]
                            );
                        }
                    } else {
                        $resultsDepto[] = null;
                    }
                    else $resultsDepto[] = null;
                                   
                    
                    $results[] = array
                    ("id" => $id[$i]
                        //"id" => $row["id"]
                        , 'descripcion' => utf8_encode($row["descripcion"])
                        , 'estado' => $row["estado"]
                        , 'ctgDepto' => $resultsDepto[$i]);
                    
                    $json = array("status"=>1, "info"=>$results);
     //               echo $json;
     //               echo json_encode($json);
                    $i++;
            }
       //     echo 'mii';
        } else {
            $json = array("status"=>0, "info"=>"No existe informacion con ese criterio....");
        }
        else $json = array("status"=>0, "info"=>"No existe informacion.");
}
else{
    if(strtoupper($accion) =='I'){// VERIFICACION SI LA ACCION ES INSERCION
        $sql = "
		SELECT MAX(a.id) + 1 as id
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
        $date = date('Y-m-d');
        
        $sql = "INSERT INTO $bd.$tabla(ID, ID_DEPTO, DESCRIPCION, ESTADO, USUARIO_CREACION, FECHA_CREACION)
		VALUES ($id, $idDepto, '".strtoupper($desc)."', 'A', '$user', '$date')";
        
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
        } else {
            $json = array("status"=>0, "info"=>$conn->error);
        }
    }
    else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES MODIFICACION
        
        $desc = "descripcion='".strtoupper($desc)."'";
        $user = ", usuario_modificacion='".$user."'";
        $estado = ", estado='".$estado."'";
        $date = ", fecha_modificacion='".date('Y-m-d')."'";
        $idDepto = ", id_depto='".$idDepto."'";
        
       
        $sql = "UPDATE $bd.$tabla SET $desc $estado $user $date $idDepto WHERE id='$idMuni'";
        //echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status"=>1, "info"=>"Registro actualizado exitosamente.");
		} else {
			$json = array("status"=>0, "error"=>$conn->error);
		}
	}
    
    else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES ELIMINACION
        
        $user = ", usuario_modificacion='".$user."'";
        $date = ", fecha_modificacion='".date('Y-m-d')."'";
        
		
        if(!empty($idMuni)) $idMuni="AND id = $idMuni";
        else $idMuni = "";
        
        if(!empty($idDepto) || strlen(trim($idDepto))!=0) $idDepto="AND id_depto = $idDepto";
        else $idDepto = "";
        
		
        if(strlen(trim($idDepto))==0 || strlen(trim($idMuni))==0) {
            $json = array("status"=>0, "error"=>"No se puede eliminar debido a insuficiencia de criterios.");
        }
        else {
            
            $sql = "UPDATE $bd.$tabla SET estado = 'I' $user $date WHERE 1=1 $idMuni $idDepto";
            
            if ($conn->query($sql) === TRUE) {
                $json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
            } else {
                $json = array("status"=>0, "error"=>$conn->error);
            }
        }
        
    }
    
    else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_modificacion='".$user."'";
        $date = ", fecha_modificacion='".date('Y-m-d')."'";
        
        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id = $idMuni";
        
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