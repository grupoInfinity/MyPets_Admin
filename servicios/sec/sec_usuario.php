<?php
include_once('../config.php'); 
//include_once('../ip.php'); 

header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}
$tabla = "sec_usuario";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$usr = isset($_GET['usr']) ? $_GET['usr'] : '';
$idUser = isset($_GET['idUser']) ? $_GET['idUser'] : '';
$tipouser = isset($_GET['tipouser']) ? $_GET['tipouser'] : '';
$idEmpleado = utf8_encode(isset($_GET['idEmpleado']) ? $_GET['idEmpleado'] : '');
$id_almacen = utf8_encode(isset($_GET['id_almacen']) ? $_GET['id_almacen'] : '');
$clave = utf8_encode(isset($_GET['clave']) ? $_GET['clave'] : '');
$nuevaClave = utf8_encode(isset($_GET['nuevaClave']) ? $_GET['nuevaClave'] : '');
$confirmarClave = utf8_encode(isset($_GET['confirmarClave']) ? $_GET['confirmarClave'] : '');
$nombre = utf8_encode(isset($_GET['nombre']) ? $_GET['nombre'] : '');
$apellido = utf8_encode(isset($_GET['apellido']) ? $_GET['apellido'] : '');
$email = utf8_encode(isset($_GET['email']) ? $_GET['email'] : '');

$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_encode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if(strtoupper($accion) =='C'){ //VERIFICACION SI LA ACCION ES CONSULTA
	if(!empty($usr)) $usr="AND A.usr='$usr'";
	else $usr="";
	if(!empty($nombre)) $nombre="AND A.nombre LIKE '%$nombre%'";
	else $nombre="";
	if(!empty($apellido)) $apellido="AND A.apellido LIKE '%$apellido%'";
	else $apellido="";
	if(!empty($email)) $email="AND A.apellido LIKE '%$email%'";
	else $email="";
	if(!empty($estado)) $estado="AND A.estado='$estado'";
	else $estado="";
	if(!empty($id_almacen)) $id_almacen="AND A.id_almacen='$id_almacen'";
	else $id_almacen="";
	if(!empty($tipouser)) $tipouser="AND A.tipo_usuario='$tipouser'";
	else $tipouser="";
	
	$sql = "SELECT DISTINCT A.usr, A.clave, A.nombre, A.apellido, A.tipo_usuario, A.email, A.estado, A.id_empleado, A.id_almacen
	, B.id_cargo, C.descripcion as cargo
	, B.id_puesto, D.descripcion as puesto
	FROM $bd.$tabla A
	INNER JOIN $bd.ctg_empleado B ON B.id = A.id_empleado
	INNER JOIN $bd.ctg_cargo C ON C.id = B.id_cargo
	INNER JOIN $bd.ctg_puesto D ON D.id = B.id_puesto
	WHERE 1=1 $clave $usr $estado $id_almacen AND A.usr!='system'";
	//echo $sql;
	$result = $conn->query($sql);
	
	if (!empty($result))
		if($result->num_rows > 0) {
			//$i = 0;	
			while($row = $result->fetch_assoc()) {			    
			    $usr = $row["usr"];
				$id_empleado = $row["id_empleado"];
				$id_almacen = $row["id_almacen"];
				$clave = $row["clave"];
				$nombre = $row["nombre"];
				$apellido = $row["apellido"];
				$email = $row["email"];
				$estado = $row["estado"];
				$tipouser = $row["tipo_usuario"];
				$cargo = $row["cargo"];
				$id_cargo = $row["id_cargo"];
				$puesto = $row["puesto"];
				$id_puesto = $row["id_puesto"];

			 
			   // $id_empleado = $row["id_empleado"];
			    
			    /******************************************/
			    
			    $sql2 = "SELECT A.id, A.id_almacen, A.nombre, A.estado
			             FROM $bd.ctg_empleado A
			             WHERE A.id = $id_empleado AND A.id_almacen= $id_almacen";
			    
				//echo $sql2;
			    $result2 = $conn->query($sql2);
			    if (!empty($result2)) {
			        if($result2->num_rows > 0) {
			            while($row2 = $result2->fetch_assoc()) {              
							
							                
			                /******************************************/
			                
			                $sql3 = "SELECT A.id, A.id_depto, A.descripcion, A.estado
                    			             FROM $bd.ctg_almacen A
                    			             WHERE A.id = $id_almacen";
			                
			                $result3 = $conn->query($sql3);
			                if (!empty($result3)) {
			                    if($result3->num_rows > 0) {
			                        while($row3 = $result3->fetch_assoc()) {
			                            $ctg_almacen[] = array(
			                                'id' => $row3["id"],
			                                'id_depto' => $row3["id_depto"],
			                                'descripcion'=>utf8_encode($row3["descripcion"]),
			                                'estado'=>$row3["estado"]
			                            );
			                        }
			                    } else {
			                        $ctg_almacen[] = null;
			                    }
			                }
			                else $ctg_almacen[] = null;
			                
			                $ctg_empleado[] = array(
			                    'id' => $row2["id"],
			                    'id_almacen' => $row2["id_almacen"],
			                    "ctg_almacen" => $ctg_almacen,
			                    'nombre'=>utf8_encode($row2["nombre"]),
			                    'estado'=>$row2["estado"]
			                );
							//$ctg_almacen = null; 			                
			            }
			        } else {
			            $ctg_empleado[] = null;
			        }
			    }
				else $ctg_empleado[] = null;
				
				   
			    /******************************************/
			    
			    $results[] = array(
				
				"usr" => $usr			
				, "id_empleado" => $id_empleado
				, "id_almacen" => $id_almacen
				, 'clave' => utf8_encode($clave)
				, 'nombre' => utf8_encode($nombre)
				, 'apellido' => utf8_encode($apellido)
				, 'email' => utf8_encode($email)
				, 'cargo' => utf8_encode($cargo)
				, 'id_cargo' => ($id_cargo)
				, 'puesto' => utf8_encode($puesto)
				, 'id_puesto' => ($id_puesto)
				, 'tipo_usuario' => utf8_encode($tipouser)
				, 'estado'=>$estado
				, 'ctg_empleado'=>$ctg_empleado
				);
				$json = array("estado"=>1, "info"=>$results);
				//$i ++;
				$ctg_empleado = null;
				$ctg_almacen = null;
				
			}
		} else {
			$json = array("estado"=>0, "info"=>"No existe información con ese criterio.");
		}
	else $json = array("estado"=>0, "info"=>"No existe información.");
}
else{
	if(strtoupper($accion) =='I'){// VERIFICACION SI LA ACCION ES INSERCION
		
		$date = date('Y-m-d');
	
		$sql = "INSERT INTO $bd.$tabla(usr, clave, id_empleado, id_almacen, nombre, apellido, email, estado, tipo_usuario, USUARIO_CREACION, FECHA_CREACION) 
		VALUE('$usr','$clave', $idEmpleado, $id_almacen, '$nombre', '$apellido', '$email', 'A', $tipouser, '$user', '$date')";
		
		if ($conn->query($sql) === TRUE) {
			$json = array("estado"=>1, "info"=>"Registro almacenado exitosamente.");
		} else {
			$json = array("estado"=>0, "info"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='U'){// VERIFICACION SI LA ACCION ES MODIFICACION
	
		if(!empty($clave)) $clave = "clave='".($clave)."'";
		else $clave = "clave=clave";
		if(!empty($nombre)) $nombre = ", nombre='".($nombre)."'";
		else $nombre = "";
		if(!empty($apellido)) $apellido = ", apellido='".($apellido)."'";
		else $apellido = "";
		if(!empty($email)) $email = ", email='".($email)."'";
		else $email = "";
		if(!empty($tipouser)) $tipouser = ", tipo_user=".$tipouser;
		else $tipouser = "";
		if(!empty($idEmpleado)) $idEmpleado = ", id_empleado=".$idEmpleado;
		else $idEmpleado = "";
		if(!empty($id_almacen)) $id_almacen = ", id_almacen=".$id_almacen;
		else $id_almacen = "";
		
				
		$estado = ", estado='".strtoupper($estado)."'";
		$user = ", usuario_modificacion='".$user."'";
		$date = ", fecha_modificacion='".date('Y-m-d H:i:s')."'";
		
		
		$sql = "UPDATE $bd.$tabla SET $clave $idEmpleado $id_almacen $nombre $apellido $email $estado $user $date WHERE usr = '$usr'";
		
		//echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("estado"=>1, "info"=>"Registro actualizado exitosamente.");
		} else {
			$json = array("estado"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='D'){// VERIFICACION SI LA ACCION ES INACTIVACION
		$user = ", usuario_modificacion='".$user."'";
		$date = ", fecha_modificacion='".date('Y-m-d H:i:s')."'";
		
		$sql = "UPDATE $bd.$tabla set estado='I' $user $date WHERE usr = '$usr'";
		
		//echo $sql;
		
		if ($conn->query($sql) === TRUE) {
			$json = array("estado"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("estado"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='A'){// VERIFICACION SI LA ACCION ES ACTIVACION
		$user = ", usuario_modificacion='".$user."'";
		$date = ", fecha_modificacion='".date('Y-m-d H:i:s')."'";
		
		$sql = "UPDATE $bd.$tabla set estado='A' $user $date WHERE usr = '$usr'";
		
		//echo $sql;
		
		if ($conn->query($sql) === TRUE) {
			$json = array("estado"=>1, "info"=>"Registro eliminado exitosamente.");
		} else {
			$json = array("estado"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='LU'){ //VERIFICACION SI LA ACCION ES CONSULTA DEL LOGIN
			if(!empty($usr)) $usr="A.usr='$usr'";
			else $usr = " A.usr = null";
			if(!empty($estado)) $estado="AND A.estado='A'";
			else $estado="AND A.estado=null";
			
			$sql = "
			SELECT A.usr
			FROM $bd.$tabla A, $bd.ctg_empleado	B
			WHERE $usr $estado AND 1=1 AND A.id_empleado=B.id ";

			$result = $conn->query($sql);
			
			if (!empty($result))
				if($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						$results[] = array(
						"usr" => $row["usr"]
						);
						$json = array("estado"=>1, "info"=>$results);
					}
				} else {
					$json = array("estado"=>0, "info"=>"No existe información con ese criterio.");
				}
			else $json = array("estado"=>0, "info"=>"No existe información.");
		}
	else if(strtoupper($accion) =='LP'){ //VERIFICACION SI LA ACCION ES CONSULTA DEL PASSWORD
			$usrAux = $usr;
			if(!empty($usr)) $usr="A.usuario='$usr'";
			else $usr = "A.usuario = null";
			if(!empty($clave)) $clave="AND A.clave='$clave'";
			else $clave = "AND A.clave = null";
			if(!empty($estado)) $estado="AND A.estado='A'";
			else $estado="AND A.estado=null";

		
			//cantidad de usuarios conectados
			/*$band=false;
			
			$sql = "
				SELECT COUNT(A.usr) AS conectados, IFNULL(B.valor2,0) AS valor2
				FROM $bd.sec_log_users A
				INNER JOIN $bd.prc_parametros B ON B.tipo_param = 'SYSTEM' AND B.descripcion = 'QTY_USUARIOS'
				WHERE log_out IS NULL";
				
				echo $sql;
				
			$result = $conn->query($sql);
			
			$conectados =0;
			$valor2 = 0;
			if (!empty($result)){
				if($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						$conectados = $row["conectados"];
						$valor2 = $row["valor2"];
						
						if($conectados<$valor2) $band=true;
						else if($conectados==0) $band=true;
					}
				}
			}*/
			
			//valida si se puede ingresar
			//if($band){
				
				$sql = "SELECT A.usuario/*, A.id_almacen
				, B.nombre, D.descripcion as cargo
				, C.id_tipo_contribuyente
				, B.id_puesto, E.descripcion as puesto*/
				FROM $bd.sec_usuario A
				/*INNER JOIN  $bd.ctg_empleado B ON B.id = A.id_empleado
				LEFT JOIN $bd.ctg_cargo D on D.id = B.id_cargo
				LEFT JOIN $bd.ctg_puesto E on E.id = B.id_puesto*/
				WHERE $usr $estado $clave";
				
				//echo $sql;
				
				$result = $conn->query($sql);
				
				$index_params = 0;
				
				if (!empty($result))
					if($result->num_rows > 0) {
						while($row = $result->fetch_assoc()) {

							/*$id_almacen 			= $row["id_almacen"];
							$nombre 				= $row["nombre"];
							$cargo					= $row["cargo"];
							$id_tipo_contribuyente 	= $row["id_tipo_contribuyente"];
							$id_puesto 	= $row["id_puesto"];
							$puesto 	= $row["puesto"];*/

							/******************************************/
							/*$sql_parametros = "SELECT A.id, A.descripcion, A.valor, A.tipo_param, A.estado
											   FROM $bd.prc_parametros A
											   WHERE A.tipo_param in ('C_ROL_ADM')";
							
							$idRolAdministrador = null;
							$result2 = $conn->query($sql_parametros);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$idRolAdministrador = $row2["valor"];
									}
								}
							}
							
							/******************************************/
							/*$sql_parametros = "SELECT A.id, A.descripcion, A.valor, A.tipo_param, A.estado
							FROM $bd.prc_parametros A
							WHERE A.tipo_param in ('C_ROL_SUP')";
							
							$idRolSupervisor = null;
							$result2 = $conn->query($sql_parametros);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$idRolSupervisor = $row2["valor"];
									}
								}
							}
		 
							/******************************************/
							/*$sql_parametros = "SELECT A.id, A.descripcion, A.valor, A.tipo_param, A.estado
							FROM $bd.prc_parametros A
							WHERE A.tipo_param in ('C_ROL_CAJ')";
							
							$idRolCajero = null;
							$result2 = $conn->query($sql_parametros);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$idRolCajero = $row2["valor"];
									}
								}
							}
		 
							/******************************************/
							//PARAMETROS GENERALES
							/*$gral_params = [];
							$sql_parametros = "SELECT A.id, A.descripcion, A.valor, IFNULL(A.valor2, '') AS valor2, A.tipo_param
							, IFNULL(B.id_naturaleza, '') as id_naturaleza
							FROM $bd.prc_parametros A
							LEFT JOIN $bd.ctg_cuenta B on B.cuenta = A.valor
							WHERE A.tipo_param in ('IVA', 'CTA_CREDITO_FISCAL', 'CTA_DEBITO_FISCAL', 'CTA_RETENCION_IVA_ACTIVO', 'CTA_PERCEPCION_IVA_ACTIVO', 'CTA_RETENCION_IVA_PASIVO', 'CTA_PERCEPCION_IVA_PASIVO')
							AND A.estado  ='A'
							ORDER BY A.id";
							//echo $sql_parametros;;
							$result2 = $conn->query($sql_parametros);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$gral_params[] = array(
											'id' => $row2["id"]
											, 'descripcion' => $row2["descripcion"]
											, 'valor' => $row2["valor"]
											, 'valor2' => $row2["valor2"]
											, 'tipo_param' => $row2["tipo_param"]
											, 'id_naturaleza' => $row2["id_naturaleza"]
										);
									}
								}
							}
							
							/******************************************/
							$isRolAdmin = "N";
							$isRolSupervisor = "N";
							$isRolCajero = "N";
							$isRolCliente = "N";

							$sql_rol = "SELECT A.id_rol
										  FROM $bd.sec_rol_usuario A
										  WHERE $usr";
							//echo $sql_rol; 
							$result2 = $conn->query($sql_rol);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$rol = $row2["id_rol"];
												
										/******************************************/
										
										$sql3 = "SELECT A.id_rol, A.descripcion, A.estado
												 FROM $bd.sec_rol A
												 WHERE A.id_rol = $rol";
												 
										//echo $sql3;
										
										$result3 = $conn->query($sql3);
										if (!empty($result3)) {
											if($result3->num_rows > 0) {
												while($row3 = $result3->fetch_assoc()) {
													$sec_rol[] = array(
														'id' => $row3["id_rol"],
														'descripcion'=>utf8_encode($row3["descripcion"]),
														'estado'=>$row3["estado"]
													);
												}
											} else {
												$sec_rol[] = null;
											}
										}
										else $sec_rol[] = null;
										
										$pos = strpos("roles_adm=".$idRolAdministrador, $rol);
										//if ($pos > 0) {
										if ($idRolAdministrador == $rol) {
											$isRolAdmin = "S";
										}
										
										//echo $idRolSupervisor."\n";
										$pos = strpos("roles_adm=".$idRolSupervisor, $rol);
										//if ($pos > 0) {
										if ($idRolSupervisor== $rol) {
											$isRolSupervisor = "S";
										}
										
										$pos = strpos("roles_adm=".$idRolCajero, $rol);
										//if ($pos > 0) {
										if ($idRolCajero== $rol) {
											$isRolCajero = "S";
										}
										$pos = strpos("roles_adm=".$idRolCliente, $rol);
										//if ($pos > 0) {
										if ($idRolCajero== $rol) {
											$isRolCajero = "S";
										}
									}
								}
							}
							
							//*/
							//*******************************************
							
							$results[] = array(
							  "idUser" => $ultimoId,
							  "usr" => $row["usr"],
							  "isRolAdmin" => $isRolAdmin,
							  "isRolCliente" => $isRolCliente,
							  "sec_rol" => $sec_rol/*,
							  "ctg_almacen" => $ctg_almacen,
							  "ctg_caja" => $ctg_caja
							  , "gral_params" => $gral_params
							  , "nombre" => $nombre 				
							  , "cargo" => $cargo
							  , "id_tipo_contribuyente" => $id_tipo_contribuyente 	
							  , "id_puesto" => $id_puesto 	
							  , "puesto" => $puesto 	
							  , "total_ordenes" => $total_ordenes*/
							  
							);

							//$sec_rol=null;
							$json = array("estado"=>1, "info"=>$results);
						}
					} else {
						$json = array("estado"=>0, "info"=>"No existe información con ese criterio.");
					}
				else $json = array("estado"=>0, "info"=>"No existe información.");
			/*}
			else $json = array("estado"=>0, "info"=>"Cantidad de Usuario conectados alcanzado");*/
			//echo $json;
	}
	else if(strtoupper($accion) =='LP2'){ //VERIFICACION SI LA ACCION ES CONSULTA DEL LOGIN SIN PASSWORD
			$usrAux = $usr;
			if(!empty($usr)) $usr="A.usr='$usr'";
			else $usr = "";
			if(!empty($clave)) $clave="AND A.clave='$clave'";
			else $clave = "";
			if(!empty($estado)) $estado="AND A.estado='A'";
			else $estado="";
			
			//cantidad de usuarios conectados
			$band=false;
			
			$sql = "
				SELECT COUNT(A.usr) AS conectados, IFNULL(B.valor2,0) AS valor2
				FROM $bd.sec_log_users A
				INNER JOIN $bd.prc_parametros B ON B.tipo_param = 'SYSTEM' AND B.descripcion = 'QTY_USUARIOS'
				WHERE log_out IS NULL";
				
				//echo $sql;
				
			$result = $conn->query($sql);
			
			$conectados =0;
			$valor2 = 0;
			if (!empty($result)){
				if($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						$conectados = $row["conectados"];
						$valor2 = $row["valor2"];
						
						if($conectados<$valor2) $band=true;
						else if($conectados==0) $band=true;
					}
				}
			}
			
			//valida si se puede ingresar
			if($band){
				
				$sql = "
				SELECT A.usr, A.id_almacen
				FROM $bd.$tabla A, $bd.ctg_empleado	B
				WHERE $usr $estado $clave AND A.id_empleado=B.id";
				
				//echo $sql;
				
				$result = $conn->query($sql);
				
				if (!empty($result))
					if($result->num_rows > 0) {
						while($row = $result->fetch_assoc()) {

							$id_almacen = $row["id_almacen"];
							
							/******************************************/
							$sql_parametros = "SELECT A.id, A.descripcion, A.valor, A.tipo_param, A.estado
											   FROM $bd.prc_parametros A
											   WHERE A.tipo_param in ('C_ROL_ADM')";
							
							$idRolAdministrador = null;
							$result2 = $conn->query($sql_parametros);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$idRolAdministrador = $row2["valor"];
									}
								}
							}
							
							/******************************************/
							$sql_parametros = "SELECT A.id, A.descripcion, A.valor, A.tipo_param, A.estado
							FROM $bd.prc_parametros A
							WHERE A.tipo_param in ('C_ROL_SUP')";
							
							$idRolSupervisor = null;
							$result2 = $conn->query($sql_parametros);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$idRolSupervisor = $row2["valor"];
									}
								}
							}
		 
							/******************************************/
							$sql_parametros = "SELECT A.id, A.descripcion, A.valor, A.tipo_param, A.estado
							FROM $bd.prc_parametros A
							WHERE A.tipo_param in ('C_ROL_CAJ')";
							
							$idRolCajero = null;
							$result2 = $conn->query($sql_parametros);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$idRolCajero = $row2["valor"];
									}
								}
							}
		 
							/******************************************/
							$isRolAdmin = "N";
							$isRolSupervisor = "N";
							$isRolCajero = "N";
							$sql_rol = "SELECT A.rol
										  FROM $bd.sec_rol_usuario A
										  WHERE $usr";
							//echo $sql_rol; 
							$result2 = $conn->query($sql_rol);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$rol = $row2["rol"];
												
										/******************************************/
										
										$sql3 = "SELECT A.id, A.descripcion, A.estado
												 FROM $bd.sec_rol A
												 WHERE A.id = $rol";
												 
										//echo $sql3;
										
										$result3 = $conn->query($sql3);
										if (!empty($result3)) {
											if($result3->num_rows > 0) {
												while($row3 = $result3->fetch_assoc()) {
													$sec_rol[] = array(
														'id' => $row3["id"],
														'descripcion'=>utf8_encode($row3["descripcion"]),
														'estado'=>$row3["estado"]
													);
												}
											} else {
												$sec_rol[] = null;
											}
										}
										else $sec_rol[] = null;
										
										$pos = strpos("roles_adm=".$idRolAdministrador, $rol);
										//if ($pos > 0) {
										if ($idRolAdministrador == $rol) {
											$isRolAdmin = "S";
										}
										
										//echo $idRolSupervisor."\n";
										$pos = strpos("roles_adm=".$idRolSupervisor, $rol);
										//if ($pos > 0) {
										if ($idRolSupervisor== $rol) {
											$isRolSupervisor = "S";
										}
										
										$pos = strpos("roles_adm=".$idRolCajero, $rol);
										//if ($pos > 0) {
										if ($idRolCajero== $rol) {
											$isRolCajero = "S";
										}
									}
								}
							}
							
							/******************************************/
							$sql2 = "SELECT A.id, A.descripcion, A.estado
							FROM $bd.ctg_almacen A
							WHERE A.id = $id_almacen";
							
						   //echo $sql2;
						   
						   $result2 = $conn->query($sql2);
							if (!empty($result2)) {
							   if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$ctg_almacen[] = array(
										   'id' => $row2["id"],
										   'descripcion'=>utf8_encode($row2["descripcion"]),
										   'estado'=>$row2["estado"]
										);
									}
								} else {
								   $ctg_almacen[] = null;
								}
							}
							else $ctg_almacen[] = null;
							/******************************************/
							$isRolCajero = "N";
							$sql_rol = "SELECT A.rol
										  FROM $bd.sec_rol_usuario A
										  WHERE $usr";
							//echo $sql_rol; 
							$result2 = $conn->query($sql_rol);
							if (!empty($result2)) {
								if($result2->num_rows > 0) {
									while($row2 = $result2->fetch_assoc()) {
										$rol = $row2["rol"];
										/******************************************/
										
										$sql3 = "SELECT A.id, A.descripcion, A.estado
												 FROM $bd.sec_rol A
												 WHERE A.id = $rol and UPPER(A.descripcion) like '%CAJER%'";
												 
										//echo $sql3;
										
										$result3 = $conn->query($sql3);
										if (!empty($result3)) {
											if($result3->num_rows > 0) {
												while($row3 = $result3->fetch_assoc()) {
													$isRolCajero = "S";
												}
											}
										}
									}
								}
							}
							//echo $isRolCajero;
							//******************************************
							
							//VERIFICA LA IP DE LA MÁQUINA
							$ctg_caja=[];	
							if($isRolCajero=="S"){
								$ip = getIP();
								
								//echo $ip;
								$sql2="SELECT A.descripcion_caja, A.ip
								FROM $bd.ctg_almacen_caja A
								WHERE A.id_almacen=$id_almacen AND A.ip = '$ip'";
								//echo $sql2;
								$result2 = $conn->query($sql2);
								if (!empty($result2)) {
									if($result2->num_rows > 0) {
										while($row2 = $result2->fetch_assoc()) {
											$descripcion = $row2["descripcion_caja"];
											$ip = $row2["ip"];

											$ctg_caja[] = array(
											   'descripcion' => $descripcion,
											   'ip'=>$ip
											);
										}
									}
									else $ctg_caja[] = array(
											   'descripcion' => "no ha seteado caja",
											   'ip'=>$ip
											);
								}
								else $ctg_caja[] = array(
											   'descripcion' => "no ha seteado caja",
											   'ip'=>$ip
											);
							}
							//*******************************************
							
							$results[] = array(
							  "idUser" => $ultimoId,
							  "usr" => $row["usr"],
							  "isRolAdmin" => $isRolAdmin,
							  "isRolSupervisor" => $isRolSupervisor,
							  "isRolCajero" => $isRolCajero,
							  "sec_rol" => $sec_rol,
							  "ctg_almacen" => $ctg_almacen,
							  "ctg_caja" => $ctg_caja
							);

							//$sec_rol=null;
							$json = array("estado"=>1, "info"=>$results);
						}
					} else {
						$json = array("estado"=>0, "info"=>"No existe información con ese criterio.");
					}
				else $json = array("estado"=>0, "info"=>"No existe información.");
			}
			else $json = array("estado"=>0, "info"=>"Cantidad de Usuario conectados alcanzado");
			//echo $json;
	}
	else if(strtoupper($accion) =='LO'){// VERIFICACION SI LA ACCION ES LOG OUT
		$date = date('Y-m-d H:i:s');
		$sql = "UPDATE $bd.sec_log_users SET log_out = '$date' WHERE usr = '$usr' and id = $idUser";
	
		//echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("estado"=>1, "info"=>"Logout exitoso.");
		} else {
			$json = array("estado"=>0, "error"=>$conn->error);
		}
	}
	else if(strtoupper($accion) =='UP'){// VERIFICACION SI LA ACCION ES MODIFICACION DE CLAVE
				
		$user = ", usuario_modificacion='".$user."'";
		$date = ", fecha_modificacion='".date('Y-m-d')."'";
		
		$claveActual = "";
		$sql = "
			SELECT A.clave
			FROM $bd.$tabla A
			WHERE usr='$usr'";
			
			//echo $sql;
			
			$result = $conn->query($sql);
			
			if (!empty($result)){
				if($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						$claveActual= $row["clave"];
						/*
						echo "(A)".$claveActual."<br>";
						echo "(AI)".$clave."<br>";
						echo "(NV)".$nuevaClave."<br>";
						echo "(CC)".$confirmarClave."<br>";
						//*/
						if(!strcmp($clave, $claveActual) && !strcmp($nuevaClave,$confirmarClave)){
							$sql = "UPDATE $bd.$tabla SET clave='$nuevaClave' $user $date WHERE usr = '$usr'";
							if ($conn->query($sql) === TRUE) {
								$json = array("estado"=>1, "info"=>"Cambio de Clave realizado exitosamente.");
							} else {
								$json = array("estado"=>0, "error"=>$conn->error);
							}
						}
						else $json = array("estado"=>0, "info"=>"Por favor revise los valores ingresados.");
					}
				} else {
					$json = array("estado"=>0, "info"=>"No existe información con ese criterio.");
				}
			}
			else $json = array("estado"=>0, "info"=>"No existe informacion.");
	}
	
}
$conn->close();

/* Output header */


echo json_encode($json);
//*/
 ?>