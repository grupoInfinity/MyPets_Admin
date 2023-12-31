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
$tabla = "sec_opcion";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_opc = isset($_GET['id']) ? $_GET['id'] : '';
$id_opc_ppal = isset($_GET['id_opc_ppal']) ? $_GET['id_opc_ppal'] : '';
$id_opc_padre = isset($_GET['id_opc_padre']) ? $_GET['id_opc_padre'] : '';
$id_empresa = isset($_GET['id_empresa']) ? $_GET['id_empresa'] : '';
$padre = isset($_GET['padre']) ? $_GET['padre'] : '';

$desc = utf8_encode(isset($_GET['desc']) ? $_GET['desc'] : '');
$orden = (isset($_GET['orden']) ? $_GET['orden'] : '');
$url = (isset($_GET['url']) ? $_GET['url'] : '');

$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = (isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
    if(!empty($id_opc)) $id_opc="A.id='$id_opc'";
    else $id_opc="1=1";
    if(!empty($id_opc_ppal)) $id_opc_ppal="and A.id_menu='$id_opc_ppal'";
    else $id_opc_ppal="and 1=1";
    if(!empty($id_opc_padre)) $id_opc_padre="and A.id_opc_padre='$id_opc_padre'";
    else $id_opc_padre="and 1=1";
    
    if(!empty($desc)) $desc="AND A.descripcion LIKE '%$desc%'";
    else $desc="";
    if(!empty($estado)) $estado="AND A.estado='$estado'";
    else $estado="";
    if(!empty($padre)) $padre="AND A.padre=$padre";
    else $padre="";
    
    $sql = "SELECT A.id_opc, A.id_menu, A.id_opc_padre, A.padre, 
    A.descripcion, A.url, A.estado, A.orden
	FROM $bd.sec_opcion A
    WHERE $id_opc $id_opc_ppal $id_opc_padre $desc $estado $padre
    ORDER BY CAST(A.orden AS DECIMAL) DESC ";

    //ORDER BY DESC ($orden)";
    
    //echo $sql;
    $result = $conn->query($sql);
    if (!empty($result))
        if($result->num_rows > 0) {
            $i=0;
            while($row = $result->fetch_assoc()) {
                
                $id_opc = $row["id_opc"];
                $id_opc_ppal  = $row["id_menu"];
                $id_opc_padre  = $row["id_opc_padre"];
                
                $id[] = array(
                    'id' => $id_opc
                    , 'id_opc_principal' => $id_opc_ppal
                    , 'id_opc_padre' => $id_opc_padre
                );
                
                $sql2 = "
				SELECT A.id_menu, A.descripcion, A.estado
				FROM $bd.sec_menu A
				WHERE A.id_menu = $id_opc_ppal";
                
                //echo $sql2;
                $result2 = $conn->query($sql2);
                
                if (!empty($result2))
                    if($result2->num_rows > 0) {
                        while($row2 = $result2->fetch_assoc()) {
                            $resultsOpcPpal[] = array(
                                'id' => $row2["id_menu"]
                                , 'descripcion' => $row2["descripcion"]
                                , 'estado'=>$row2["estado"]
                            );
                        }
                    } else {
                        $resultsOpcPpal[] = null;
                    }
                    else $resultsOpcPpal[] = null;


                    /*$sql2 = "
                    SELECT A.id, A.descripcion, A.estado
                    FROM $bd.ctg_empresa A
                    WHERE A.id = $id_empresa";
                    
                    //echo $sql2;
                    $result2 = $conn->query($sql2);
                    
                    if (!empty($result2))
                        if($result2->num_rows > 0) {
                           // $ii=0;
                            while($row2 = $result2->fetch_assoc()) {              
                                $ctg_empresa[] = array(
                                    'id' => $row2["id"]
                                    , 'descripcion' => $row2["descripcion"]
                                    , 'estado'=>$row2["estado"]
                                );
                            }
                        } else {
                            $ctg_empresa[] = null;
                        }
                        else $ctg_empresa[] = null;*/
                    
                    $results[] = array(
                        //"id" => $row["id"]
                         "id" => $id[$i]
                        //, 'id_opc_principal' => ($row["id_opc_principal"])
                        , 'id_opc_padre' => ($row["id_opc_padre"])
                        , 'padre' => ($row["padre"])
                        , 'descripcion' => ($row["descripcion"])
                        , 'url' => ($row["url"])
                        , 'orden'=>$row["orden"]
                        , 'estado'=>$row["estado"]
                        , 'sec_opc_principal' => $resultsOpcPpal[$i]
                    );
                    $json = array("status"=>1, "info"=>$results);
                    //$ctg_almacen = null;
                    $i++;
                    
            }
        } else {
            $json = array("status"=>0, "info"=>"No existe información con ese criterio.");
        }
        else $json = array("status"=>0, "info"=>"No existe información.");
}
else{
    if(strtoupper($accion) =='I'){// VERIFICACION SI LA ACCION ES INSERCION
        $sql = "
		SELECT MAX(a.id_opc) + 1 as id
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
        if($id_opc_padre=="null" || $id_opc_padre=="0") $id_opc_padre = "NULL";
		if($padre=="null" || $padre=="0") $padre = "NULL";
		
        $sql = "INSERT INTO $bd.$tabla(id_opc, id_menu, id_opc_padre, padre, DESCRIPCION, url, ORDEN, ESTADO, USUARIO_CREACION, FECHA_CREACION)
		VALUE($id, $id_opc_ppal, $id_opc_padre, $padre, '$desc', '$url', $orden, 'A', '$user', '$date')";
        
        //echo $sql;
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
        } else {
            $json = array("status"=>0, "info"=>$conn->error);
        }
    }
    else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES MODIFICACION
		if($id_opc_padre=="null" || $id_opc_padre=="0") $id_opc_padre = "NULL";
		if($padre=="null" || $padre=="0") $padre = "NULL";
		
        $id_opc_ppal = "id_menu=".$id_opc_ppal;
        $id_opc_padre = ", id_opc_padre=".$id_opc_padre;
        $padre = ", padre=".$padre;
        $desc = ", descripcion='".($desc)."'";
        $orden = ", orden='".($orden)."'";
        $url = ", url='".$url."'";
        $estado = ", estado='".strtoupper($estado)."'";
        $user = ", usuario_update='".$user."'";
        $date = ", fecha_update='".date('Y-m-d H:i:s')."'";
        
        
        $sql = "UPDATE $bd.$tabla SET $id_opc_ppal $id_opc_padre $padre $desc $url $orden $estado $user $date
         WHERE id_opc = $id_opc ";
        //echo $sql;
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro actualizado exitosamente.");
        } else {
            $json = array("status"=>0, "error"=>$conn->error);
        }
    }
    else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES INACTIVACION
        $user = ", usuario_update='".$user."'";
        $date = ", fecha_update='".date('Y-m-d H:i:s')."'";
        
        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id_opc = $id_opc";
        
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
        } else {
            $json = array("status"=>0, "error"=>$conn->error);
        }
    }
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVACION
        $user = ", usuario_update='".$user."'";
        $date = ", fecha_update='".date('Y-m-d H:i:s')."'";
        
        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id_opc = $id_opc";
        
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
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
