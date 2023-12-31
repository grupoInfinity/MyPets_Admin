<?php
include_once('../config.php');

header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
	die();
}
$tabla = "sec_opc_rol";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_opc_ppal = isset($_GET['id_opc_ppal']) ? $_GET['id_opc_ppal'] : '';
$id_opc = (isset($_GET['id_opc']) ? $_GET['id_opc'] : '');
$id_padre = (isset($_GET['id_opc_padre']) ? $_GET['id_opc_padre'] : '');
$id_rol = (isset($_GET['id_rol']) ? $_GET['id_rol'] : '');

$user = (isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
	if (!empty($id_opc)) $id_opc = "A.id_opc=$id_opc";
	else $id_opc = "1=1";
	if (!empty($id_padre)) $id_padre = "AND C.id_opc=$id_padre";
	else $id_padre = "";
	if (!empty($id_menu)) $id_menu = " A.id_opc_ppal=$id_opc_ppal";
	else $id_menu = "";
	if (!empty($id_rol)) $id_rol = "AND A.id_rol = $id_rol";
	else $id_rol = "";

	/*$sql = " SELECT A.id_opc_ppal, A.id_empresa, A.id_opc, A.id_rol, B.orden, B.acceso_directo, C.padre, ifnull(C.id_opc_padre, 0) AS id_opc_padre
	FROM $bd.$tabla A
	INNER JOIN $bd.sec_opc_principal B ON B.id = A.id_opc_ppal
	INNER JOIN $bd.sec_opcion C ON C.id_empresa = A.id_empresa AND C.id_opc_principal = A.id_opc_ppal AND C.id = A.id_opc 
	WHERE $id_opc_ppal $id_opc $id_empresa $id_rol $id_padre 
	ORDER BY CAST(B.orden AS DECIMAL) ASC ";*/
	$sql = "SELECT A.id_menu, A.id_opc, A.id_rol, B.orden, 
	B.acceso_directo, C.padre, IFNULL(C.id_opc_padre, 0) AS id_opc_padre
	FROM $bd.sec_opc_rol A
	INNER JOIN $bd.sec_menu B ON B.id_menu = A.id_menu
	INNER JOIN $bd.sec_opcion C ON C.id_menu = A.id_menu AND C.id_opc = A.id_opc 
	WHERE $id_opc $id_opc_ppal $id_rol $id_padre 
	ORDER BY CAST(B.orden AS DECIMAL) ASC";

	//echo $sql;
	$result = $conn->query($sql);
	if (!empty($result))
		if ($result->num_rows > 0) {
			$i = 0;
			while ($row = $result->fetch_assoc()) {

				$id_opc_ppal = $row["id_menu"];
				$id_opc = $row["id_opc"];
				$id_rol = $row["id_rol"];

				$id[] = array(
					'id_opc_ppal' => $id_opc_ppal, 
					'id_opc' => $id_opc, 
					'id_rol' => $id_rol
				);
				$sql2 = "
				SELECT A.id_opc, A.descripcion, A.estado
				FROM $bd.sec_opcion A
				WHERE A.id_opc = $id_opc AND A.id_menu= $id_opc_ppal";

				//  echo $sql2;
				$result2 = $conn->query($sql2);
				if (!empty($result2))
					if ($result2->num_rows > 0) {
						while ($row2 = $result2->fetch_assoc()) {
							$resultsOpc[] = array(
								'id' => $row2["id_opc"], 
								'descripcion' => ($row2["descripcion"]), 
								'estado' => $row2["estado"]
							);
						}
					} else {
						$resultsOpc[] = null;
					}
				else $resultsOpc[] = null;
				/*****************************************************************************************/

				$sql2 = "
				SELECT A.id_menu, A.descripcion, A.estado
				FROM $bd.sec_menu A
				WHERE A.id_menu = $id_opc_ppal ";

				//echo $sql2;
				$result2 = $conn->query($sql2);

				if (!empty($result2))
					if ($result2->num_rows > 0) {
						while ($row2 = $result2->fetch_assoc()) {
							$resultsOpcPpal[] = array(
								'id' => $row2["id_menu"], 'descripcion' => ($row2["descripcion"]), 'estado' => $row2["estado"]
							);
						}
					} else {
						$resultsOpcPpal[] = null;
					}
				else $resultsOpcPpal[] = null;

				/*****************************************************************************************/
				$sql2 = "
				SELECT A.id_rol, A.descripcion, A.estado
				FROM $bd.sec_rol A
				WHERE A.id_rol = $id_rol";

				//echo $sql2;
				$result2 = $conn->query($sql2);

				if (!empty($result2))
					if ($result2->num_rows > 0) {
						while ($row2 = $result2->fetch_assoc()) {
							$resultsRol[] = array(
								'id' => $row2["id_rol"], 'descripcion' => ($row2["descripcion"]), 'estado' => $row2["estado"]
							);
						}
					} else {
						$resultsRol[] = null;
					}
				else $resultsRol[] = null;

				$results[] = array(
					"id" => $id[$i],
					'orden' => $row['orden'],
					'padre' => $row['padre'],
					'id_opc_padre' => $row['id_opc_padre'],
					'acceso_directo' => $row['acceso_directo'],
					'secOpc' => $resultsOpc[$i],
					'secRol' => $resultsRol[$i],
					'secOpcPpal' => $resultsOpcPpal[$i]
				);

				$json = array("status" => 1, "info" => $results);
				$i++;
			}
		} else {
			$json = array("status" => 0, "info" => "No existe información con ese criterio.");
		}
	else $json = array("status" => 0, "info" => "No existe información.");
} 
else {
	if (strtoupper($accion) == 'CP') { //VERIFICACION SI LA ACCION ES CONSULTA DE MENUS PADRES
		if (!empty($id_opc)) $id_opc = "AND A.id_opc=$id_opc";
		else $id_opc = "";
		if (!empty($id_padre)) $id_padre = "AND C.id_opc=$id_padre";
		else $id_padre = "";
		if (!empty($id_opc_ppal)) $id_opc_ppal = " A.id_menu=$id_opc_ppal";
		else $id_opc_ppal = " 1=1";
		if (!empty($id_rol)) $id_rol = "AND A.id_rol = $id_rol";
		else $id_rol = "AND 1=1";

		$sql = "SELECT X.id_menu, X.id_opc, X.id_rol, X.orden, X.padre, X.url	
		FROM
		(
			SELECT A.id_menu, A.id_opc, A.id_rol, C.orden, C.padre, C.url
			FROM $bd.sec_opc_rol A 
			INNER JOIN $bd.sec_opcion C ON C.id_menu = A.id_menu 
			AND C.id_opc = A.id_opc AND C.padre =1
			WHERE $id_opc_ppal $id_rol 

			UNION ALL

			SELECT A.id_menu, A.id_opc, A.id_rol, C.orden, C.padre, C.url
			FROM $bd.sec_opc_rol A 
			INNER JOIN $bd.sec_opcion C ON C.id_menu = A.id_menu 
			AND C.id_opc = A.id_opc AND C.padre IS NULL AND C.id_opc_padre IS NULL
			WHERE $id_opc_ppal $id_rol 
		) X
		ORDER BY X.id_menu, X.orden ASC";

		//echo $sql;
		$result = $conn->query($sql);
		if (!empty($result))
			if ($result->num_rows > 0) {
				$i = 0;
				while ($row = $result->fetch_assoc()) {

					$id_opc_ppal = $row["id_menu"];
					$id_opc = $row["id_opc"];
					$id_rol = $row["id_rol"];

					$id[] = array(
						'id_opc_ppal' => $id_opc_ppal, 'id_opc' => $id_opc, 'id_rol' => $id_rol
					);
					/*****************************************************************************************/
					$sql2 = "SELECT A.id_opc, A.descripcion, A.estado
					FROM $bd.sec_opcion A
					WHERE A.id_opc = $id_opc AND A.id_menu= $id_opc_ppal";

					//  echo $sql2;
					$result2 = $conn->query($sql2);
					if (!empty($result2))
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$resultsOpc[] = array(
									'id' => $row2["id_opc"], 'descripcion' => ($row2["descripcion"]), 'estado' => $row2["estado"]
								);
							}
						} else {
							$resultsOpc[] = null;
						}
					else $resultsOpc[] = null;
					/*****************************************************************************************/

					$sql2 = "SELECT A.id_menu, A.descripcion, A.estado, A.menu_icon
					FROM $bd.sec_menu A
					WHERE A.id_menu = $id_opc_ppal";

					// echo $sql2;
					$result2 = $conn->query($sql2);

					if (!empty($result2))
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$resultsOpcPpal[] = array(
									'id' => $row2["id_menu"], 'descripcion' => ($row2["descripcion"]), 'menu_icon' => $row2["menu_icon"], 'estado' => $row2["estado"]
								);
							}
						} else {
							$resultsOpcPpal[] = null;
						}
					else $resultsOpcPpal[] = null;

					/*****************************************************************************************/
					$sql2 = "
					SELECT A.id_rol, A.descripcion, A.estado
					FROM $bd.sec_rol A
					WHERE A.id_rol = $id_rol";

					//echo $sql2;
					$result2 = $conn->query($sql2);

					if (!empty($result2))
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$resultsRol[] = array(
									'id' => $row2["id_rol"], 'descripcion' => ($row2["descripcion"]), 'estado' => $row2["estado"]
								);
							}
						} else {
							$resultsRol[] = null;
						}
					else $resultsRol[] = null;

					/*****************************************************************************************/
					/*$sql2 = "
					SELECT A.id, A.descripcion, A.estado
					FROM $bd.ctg_empresa A
					WHERE A.id = $id_empresa";
								
								//echo $sql2;
								$result2 = $conn->query($sql2);
								
								if (!empty($result2))
									if($result2->num_rows > 0) {
										while($row2 = $result2->fetch_assoc()) {
											$resultsEmpresa[] = array(
												'id' => $row2["id"]
												, 'descripcion' => ($row2["descripcion"])
												, 'estado'=>$row2["estado"]
											);
										}
									} else {
										$resultsEmpresa[] = null;
									}
									else $resultsEmpresa[] = null;*/

					/*****************************************************************************************/
					$href = str_replace("menuMaster.", "", $row['url']);
					$href = str_replace("()", "", $href);
					$results[] = array(
						"id" => $id[$i],
						'orden' => $row['orden'],
						'padre' => $row['padre'],
						'url' => $row['url'],
						'href' => $href,
						//'id_opc_padre' => $row['id_opc_padre'],
						//'acceso_directo' => $row['acceso_directo'],
						'secOpc' => $resultsOpc[$i],
						'secRol' => $resultsRol[$i],
						'secOpcPpal' => $resultsOpcPpal[$i]
					);

					$json = array("status" => 1, "info" => $results);
					$i++;
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
	} else if (strtoupper($accion) == 'CH') { //VERIFICACION SI LA ACCION ES CONSULTA DE MENUS HIJOS
		if (!empty($id_opc)) $id_opc = "AND A.id_opc=$id_opc";
		else $id_opc = "";
		if (!empty($id_padre)) $id_padre = "AND C.id_opc_padre=$id_padre";
		else $id_padre = "";
		if (!empty($id_opc_ppal)) $id_opc_ppal = " A.id_menu=$id_opc_ppal";
		else $id_opc_ppal = " 1=1";
		if (!empty($id_rol)) $id_rol = "AND A.id_rol = $id_rol";
		else $id_rol = "AND 1=1";

		$sql = "SELECT A.id_menu, A.id_opc, A.id_rol, C.orden, C.url, ifnull(CC.descripcion,'') as desc_padre
		FROM $bd.sec_opc_rol A 
		INNER JOIN $bd.sec_opcion C ON C.id_menu = A.id_menu AND C.id_opc = A.id_opc
		LEFT JOIN $bd.sec_opcion CC ON CC.id_opc = C.id_opc_padre
		WHERE $id_opc_ppal $id_padre $id_rol 
		ORDER BY C.orden ASC";

		//echo $sql;
		$result = $conn->query($sql);
		if (!empty($result))
			if ($result->num_rows > 0) {
				$i = 0;
				while ($row = $result->fetch_assoc()) {

					$id_opc_ppal = $row["id_menu"];
					$id_opc = $row["id_opc"];
					$id_rol = $row["id_rol"];

					$id[] = array(
						'id_opc_ppal' => $id_opc_ppal, 'id_opc' => $id_opc, 'id_rol' => $id_rol
					);
					/*****************************************************************************************/
					$sql2 = "SELECT A.id_opc, A.descripcion, A.estado
					FROM $bd.sec_opcion A
					WHERE A.id_opc = $id_opc AND A.id_menu= $id_opc_ppal";

					//  echo $sql2;
					$result2 = $conn->query($sql2);
					if (!empty($result2))
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$resultsOpc[] = array(
									'id' => $row2["id_opc"], 
									'descripcion' => ($row2["descripcion"]), 
									'estado' => $row2["estado"]
								);
							}
						} else {
							$resultsOpc[] = null;
						}
					else $resultsOpc[] = null;
					/*****************************************************************************************/

					$sql2 = "
					SELECT A.id_menu, A.descripcion, A.estado
					FROM $bd.sec_menu A
					WHERE A.id_menu = $id_opc_ppal";

					// echo $sql2;
					$result2 = $conn->query($sql2);

					if (!empty($result2))
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$resultsOpcPpal[] = array(
									'id' => $row2["id_menu"], 'descripcion' => $row2["descripcion"], 'estado' => $row2["estado"]
								);
							}
						} else {
							$resultsOpcPpal[] = null;
						}
					else $resultsOpcPpal[] = null;

					/*****************************************************************************************/
					$sql2 = "
					SELECT A.id_rol, A.descripcion, A.estado
					FROM $bd.sec_rol A
					WHERE A.id_rol = $id_rol";

					//echo $sql2;
					$result2 = $conn->query($sql2);

					if (!empty($result2))
						if ($result2->num_rows > 0) {
							while ($row2 = $result2->fetch_assoc()) {
								$resultsRol[] = array(
									'id' => $row2["id_rol"], 'descripcion' => $row2["descripcion"], 'estado' => $row2["estado"]
								);
							}
						} else {
							$resultsRol[] = null;
						}
					else $resultsRol[] = null;

					$href = str_replace("menuMaster.", "", $row['url']);
					$href = str_replace("()", "", $href);
					$results[] = array(
						"id" => $id[$i],
						'orden' => $row['orden'],
						'url' => $row['url'],
						'desc_padre' => ($row['desc_padre']),
						'href' => $href,
						'secOpc' => $resultsOpc[$i],
						'secRol' => $resultsRol[$i],
						'secOpcPpal' => $resultsOpcPpal[$i]
					);

					$json = array("status" => 1, "info" => $results);
					$i++;
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
	} 
	else if (strtoupper($accion) == 'I') { // VERIFICACION SI LA ACCION ES INSERCION
		/*  $sql = "
		SELECT MAX(a.id_opc) + 1 as id_opc
		FROM $bd.$tabla a";
	    
	    $result = $conn->query($sql);
	    
	    if (!empty($result) || !is_null($result)){
	        if ($result->num_rows > 0) {
	            
	            while($row = $result->fetch_assoc()) {
	                if(!is_null($row["id_opc"])) $id_opc=$row["id_opc"];
	                else $id_rol=1;
	            }
	        } else {
	            $id_opc=1;
	        }
	    }
	    else $id_opc=1;*/
		$date = date('Y-m-d H:i:s');

		$sql = "INSERT INTO $bd.$tabla(id_menu, id_opc, id_rol, USUARIO_CREACION, FECHA_CREACION) 
		VALUE ($id_opc_ppal, $id_opc, $id_rol, '$user', '$date')";
		//echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
		} else {
			$json = array("status" => 0, "info" => $conn->error);
		}
	} 
	else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES ACTUALIZACION

		// $id_rol = "id_rol=".$id_rol;
		// $nid_opc = ", id_opc=".$nid_opc;
		$id_opc = " id_opc=" . $id_opc;
		// $nid_opc_ppal = " id_opc_ppal=".$nid_opc_ppal;
		$user = ", usuario_update='" . $user . "'";
		$date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

		$sql = "UPDATE $bd.$tabla SET $id_opc $user $date 
		WHERE id_menu = $id_opc_ppal AND id_rol = $id_rol";
		//echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	} 
	else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
		$user = ", usuario_update='" . $user . "'";
		$date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

		$sql = "DELETE FROM $bd.$tabla WHERE id_opc = $id_opc AND id_rol = $id_rol";
		//echo $sql;
		if ($conn->query($sql) === TRUE) {
			$json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
		} else {
			$json = array("status" => 0, "error" => $conn->error);
		}
	} 
	else if (strtoupper($accion) == 'OP') { // VERIFICACION SI LA ACCION DE LAS OPCIONES PRINCIPALES

		$sql = "SELECT DISTINCT opcppal.id_menu, opcppal.descripcion, opcppal.menu_icon,
		ifnull(opcppal.acceso_directo, 0) as acceso_directo
		FROM $bd.sec_menu opcppal
		INNER JOIN $bd.sec_opc_rol opcr ON opcr.id_menu = opcppal.id_menu 
		INNER JOIN $bd.sec_rol_usuario rusr ON rusr.usuario = '$user' AND rusr.id_rol = opcr.id_rol 
		WHERE opcppal.estado = 'A'
		ORDER BY opcppal.orden";

		//echo $sql;

		$result = $conn->query($sql);

		if (!empty($result))
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$results[] = array(
						"id_menu" => $row["id_menu"], 
						'descripcion' => ($row["descripcion"]), 
						'menu_icon' => ($row["menu_icon"]), 
						'acceso_directo' => ($row["acceso_directo"])
					);
					$json = array("status" => 1, "info" => $results);
				}
			} else {
				$json = array("status" => 0, "info" => "No existe información con ese criterio.");
			}
		else $json = array("status" => 0, "info" => "No existe información.");
	} 
	else if (strtoupper($accion) == 'OU') { // VERIFICACION SI LA ACCION DE LAS OPCIONES DE LOS USUARIOS

		$sql = "SELECT DISTINCT opc.id_opc, opc.id_menu, IFNULL(opc.id_opc_padre,'NA') as id_opc_padre
		, IFNULL(opc.padre,'') AS padre, opc.descripcion, opc.url, opc.estado
        , opc.usuario_creacion, opc.fecha_creacion, opc.usuario_update, opc.fecha_update , opc.orden
		FROM $bd.sec_rol_usuario rusr
		INNER JOIN $bd.sec_opc_rol opcr ON opcr.id_rol = rusr.id_rol
		INNER JOIN $bd.sec_opcion opc ON opc.id_opc = opcr.id_opc 
		AND COALESCE(opc.id_menu, -1) = COALESCE(opcr.id_menu, -1) AND opc.estado = 'A'
		INNER JOIN $bd.sec_usuario us ON us.usuario = rusr.usuario AND us.estado = 'A' 
		AND us.usuario = '$user' WHERE 1=1 ORDER BY opc.orden";
		//echo $sql;
		$result = $conn->query($sql);

		if (!empty($result))
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$results[] = array(
						"id" => $row["id_opc"], 
						'id_opc_principal' => ($row["id_menu"]), 
						'id_opc_padre' => ($row["id_opc_padre"]), 
						'padre' => ($row["padre"]), 
						'descripcion' => ($row["descripcion"]), 
						'url' => ($row["url"])
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

echo json_encode($json);
//*/
