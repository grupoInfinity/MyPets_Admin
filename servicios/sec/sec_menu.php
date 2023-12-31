﻿<?php
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
$tabla = "sec_menu";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$orden = isset($_GET['orden']) ? $_GET['orden'] : '';
$id_opc_ppal = isset($_GET['id']) ? $_GET['id'] : '';
$desc = utf8_encode(isset($_GET['desc']) ? $_GET['desc'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$menuicon = isset($_GET['menu_icon']) ? $_GET['menu_icon'] : '';
$accesoDirecto = isset($_GET['acceso_directo']) ? $_GET['acceso_directo'] : '';
$user = (isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
    if(!empty($id_opc_ppal)) $id_opc_ppal="A.id_menu='$id_opc_ppal'";
    else $id_opc_ppal="1=1";
    if(!empty($desc)) $desc="AND A.descripcion LIKE '%$desc%'";
    else $desc="";
    if(!empty($menuicon)) $menuicon="AND A.menu_icon LIKE '%$menuicon%'";
    else $menuicon="";
	if(!empty($accesoDirecto)) $accesoDirecto="AND A.acceso_directo LIKE '%$accesoDirecto%'";
    else $accesoDirecto="";
    if(!empty($estado)) $estado="AND A.estado='$estado'";
    else $estado="";
    
    $sql = "
	SELECT A.id_menu, A.descripcion, A.menu_icon, A.estado, A.orden, A.acceso_directo
	FROM $bd.$tabla A
	WHERE $id_opc_ppal $desc $menuicon $estado $accesoDirecto
	ORDER BY A.id_menu";
    //echo $sql;
    $result = $conn->query($sql);
    
    if (!empty($result))
        if($result->num_rows > 0) {
            $i=0;
            while($row = $result->fetch_assoc()) {
                $id_opc_ppal = $row["id_menu"];            
                
                /*****************************************************/
                $results[] = array(
                    "id" => $id_opc_ppal,
                    'descripcion' => ($row["descripcion"]), 
                    'menu_icon'=>$row["menu_icon"], 
                    'orden'=>$row["orden"],
                    'acceso_directo'=>$row["acceso_directo"],
                    'estado'=>$row["estado"]
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
		SELECT MAX(a.id_menu) + 1 as id
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
        
        $sql = "INSERT INTO $bd.$tabla(ID, DESCRIPCION, ESTADO, MENU_ICON, ORDEN, ACCESO_DIRECTO, USUARIO_CREACION, FECHA_CREACION) 
		VALUE($id, '".($desc)."', 'A','$menuicon', $orden, $accesoDirecto, '$user', '$date')";
        
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
        $user = ", usuario_update='".$user."'";
        $date = ", fecha_update='".date('Y-m-d H:i:s')."'";
        
        
        $sql = "UPDATE $bd.$tabla SET $desc $menuicon $estado $accesoDirecto $orden $user $date 
        WHERE id_menu = $id_opc_ppal";
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
        
        $sql = "UPDATE $bd.$tabla set estado='I' $user $date 
        WHERE id_menu = $id_opc_ppal";
        
        if ($conn->query($sql) === TRUE) {
            $json = array("status"=>1, "info"=>"Registro eliminado exitosamente.");
        } else {
            $json = array("status"=>0, "error"=>$conn->error);
        }
    } 
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVACION
        $user = ", usuario_update='".$user."'";
        $date = ", fecha_update='".date('Y-m-d H:i:s')."'";
        
        $sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE id_menu = $id_opc_ppal ";
        
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
