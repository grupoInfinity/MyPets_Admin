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
$tabla = "sec_opc_principal";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$orden = isset($_GET['orden']) ? $_GET['orden'] : '';
$id_opc_ppal = isset($_GET['id']) ? $_GET['id'] : '';
$desc = utf8_encode(isset($_GET['desc']) ? $_GET['desc'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$menuicon = isset($_GET['menuicon']) ? $_GET['menuicon'] : '';
$accesoDirecto = isset($_GET['accesoDirecto']) ? $_GET['accesoDirecto'] : '';
$user = (isset($_GET['user']) ? $_GET['user'] : '');
$id_empresa = (isset($_GET['id_empresa']) ? $_GET['id_empresa'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
    if(!empty($id_opc_ppal)) $id_opc_ppal="A.id='$id_opc_ppal'";
    else $id_opc_ppal="1=1";
    if(!empty($desc)) $desc="AND A.descripcion LIKE '%$desc%'";
    else $desc="";
    if(!empty($menuicon)) $menuicon="AND A.menu_icon LIKE '%$menuicon%'";
    else $menuicon="";
	if(!empty($accesoDirecto)) $accesoDirecto="AND A.acceso_directo LIKE '%$accesoDirecto%'";
    else $accesoDirecto="";
    if(!empty($estado)) $estado="AND A.estado='$estado'";
    else $estado="";
    if(!empty($id_empresa)) $id_empresa="AND A.id_empresa='$id_empresa'";
    else $id_empresa="";
    
    $sql = "
	SELECT A.id, A.descripcion, A.menu_icon, A.estado, A.id_empresa, A.orden, A.acceso_directo
	FROM $bd.$tabla A
	WHERE $id_opc_ppal $desc $menuicon $estado $id_empresa $accesoDirecto
	ORDER BY A.id";
    //echo $sql;
    $result = $conn->query($sql);
    
    if (!empty($result))
        if($result->num_rows > 0) {
            $i=0;
            while($row = $result->fetch_assoc()) {
                $id_opc_ppal = $row["id"];
                $id_empresa  = $row["id_empresa"];             
                
                $id[] = array(
                    'id' => $id_opc_ppal
                    , 'id_empresa' => $id_empresa
                   
                );
                /*****************************************************/
                $sql2 = "
					SELECT A.id, A.descripcion, A.estado
					FROM $bd.ctg_empresa A
					WHERE A.id = $id_empresa";
			        
			        //echo $sql2;
			        $result2 = $conn->query($sql2);
			        
			        if (!empty($result2))
			            if($result2->num_rows > 0) {
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
			            else $ctg_empresa[] = null;
                /*****************************************************/
                $results[] = array(
                    "id" => $id[$i],
					
                    'id_empresa' => ($row["id_empresa"]), 
                    'descripcion' => ($row["descripcion"]), 
                    'menu_icon'=>$row["menu_icon"], 
                    'orden'=>$row["orden"],
                    'acceso_directo'=>$row["acceso_directo"],
                    'estado'=>$row["estado"],
                    'ctg_empresa' => $ctg_empresa[$i],
                );
                $json = array("status"=>1, "info"=>$results);
                $i++;
            }
        } else {
            $json = array("status"=>0, "info"=>"No existe informacion con ese criterio....");
        }
        else $json = array("status"=>0, "info"=>"No existe información.");
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
        
        $sql = "INSERT INTO $bd.$tabla(ID, ID_EMPRESA, DESCRIPCION, ESTADO, MENU_ICON, ORDEN, ACCESO_DIRECTO, USUARIO_CREACION, FECHA_CREACION) 
		VALUE($id, $id_empresa, '".($desc)."', 'A','$menuicon', $orden, $accesoDirecto, '$user', '$date')";
        
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro almacenado exitosamente.");
        } else {
            $json = array("status"=>0, "info"=>$conn->error);
        }
    }
    else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES MODIFICACION
        
        $desc = "descripcion='".($desc)."'";
        $estado = ", estado='".strtoupper($estado)."'";
        $menuicon = ", menu_icon='".$menuicon."'";
        $orden = ", orden=".$orden;
        $accesoDirecto = ", acceso_directo=".$accesoDirecto;
        $user = ", usuario_modificacion='".$user."'";
        $date = ", fecha_modificacion='".date('Y-m-d H:i:s')."'";
        
        
        $sql = "UPDATE $bd.$tabla SET $desc $menuicon $estado $accesoDirecto $orden $user $date WHERE id = $id_opc_ppal AND id_empresa = $id_empresa";
        
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro actualizado exitosamente.");
        } else {
            $json = array("status"=>0, "error"=>$conn->error);
        }
    }
    else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES INACTIVACION
        $user = ", usuario_modificacion='".$user."'";
        $date = ", fecha_modificacion='".date('Y-m-d H:i:s')."'";
        
        $sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE id = $id_opc_ppal AND id_empresa = $id_empresa";
        
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
        } else {
            $json = array("status"=>0, "error"=>$conn->error);
        }
    } 
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVACION
        $user = ", usuario_modificacion='".$user."'";
        $date = ", fecha_modificacion='".date('Y-m-d H:i:s')."'";
        
        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id = $id_opc_ppal AND id_empresa = $id_empresa";
        
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
