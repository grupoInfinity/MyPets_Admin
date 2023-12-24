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
$tabla = "prc_mascotas";
$tabla2 = "ctg_vacunas";
$tabla3 = "ctg_tipovacunas";
$tabla4 = "ctg_tipomascotas";
$tabla5 = "ctg_municpios";
$tabla6 = "sec_usuarios";
$tabla7 = "ctg_departamentos";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_mascota = isset($_GET['id_mascota']) ? $_GET['id_mascota'] : '';
$id_tipomascota = isset($_GET['id_tipomascota']) ? $_GET['id_tipomascota'] : '';
$id_mun = isset($_GET['id_mun']) ? $_GET['id_mun'] : '';
$usuario = isset($_GET['usuario']) ? $_GET['usuario'] : '';
$direccion = isset($_GET['direccion']) ? $_GET['direccion'] : '';
$estado_direc = isset($_GET['estado_direc']) ? $_GET['estado_direc'] : '';
$nombremasc = isset($_GET['nombremasc']) ? $_GET['nombremasc'] : '';
$codigo = isset($_GET['codigo']) ? $_GET['codigo'] : '';
$nacim = isset($_GET['nacim']) ? $_GET['nacim'] : '';
$foto = isset($_GET['foto']) ? $_GET['foto'] : '';
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = isset($_GET['user']) ? $_GET['user'] : '';

$json = "no has seteado nada.";
function imageToBase64($imagePath) {
    $imageData = file_get_contents($imagePath);
    $base64 = base64_encode($imageData);
    return $base64;
}

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
    if (!empty($id_mascota)) $id_mascota = "m.id_mascota='$id_mascota'";
    else $id_mascota = "1=1";
    if (!empty($usuario)) $usuario = "AND m.usuario='$usuario'";
    else $usuario = "";
    if (!empty($nombremasc)) $nombremasc = "AND m.nombremascota LIKE '%'$nombremasc%'";
    else $nombremasc = "";
    if (!empty($estado)) $estado = "AND A.estado='$estado'";
    else $estado = "";


    $sql = "SELECT m.id_mascota, u.usuario, u.email,u.telefono,m.nombremascota,
    d.descripcion as depto,mu.descripcion as muni,m.direccion,m.estado_direc,m.codigo,m.nacimiento 
    FROM $bd.prc_mascotas m, $bd.ctg_tipomascotas t, $bd.ctg_municipios mu,
    $bd.sec_usuario u, $bd.ctg_departamentos d 
    WHERE $id_mascota $usuario $nombremasc $estado AND 
	 m.id_tipomascota=t.id_tipomascota AND m.usuario=u.usuario 
    AND m.id_municipio=mu.id_municipio AND mu.id_departamento=d.id_departamento";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            $i=0;
            while ($row = $result->fetch_assoc()) {
                $idm=$row["id_mascota"];
                $mascota[] = array(
                    'id_mascota' => $row["id_mascota"],
                    'usuario'  => $row["usuario"],
                    'mail' => ($row["email"]),
                    'telefono' => ($row["telefono"]),
                    'nombremascota' => ($row["nombremascota"]),
                    'departamento' => ($row["depto"]),
                    'municipio' => ($row["muni"]),
                    'direccion' => ($row["direccion"]),
                    'estado_direc' => ($row["estado_direc"]),
                    'nacim' => $row["nacimiento"],
                    //'foto' =>  imageToBase64($row["foto"]),
                    'codigo' => $row["codigo"]
                );
                
                $sql2="SELECT v.id_vacuna,v.id_mascota,v.id_tipovacuna,
                t.nombrevacuna,DATE(v.fecha_creacion) AS fecha_creacion,v.estado
                FROM $bd.prc_vacunas v, $bd.prc_mascotas m, $bd.ctg_tipovacunas t 
                WHERE v.id_mascota=$idm AND 
                v.id_mascota=m.id_mascota AND v.id_tipovacuna=t.id_tipovacuna";

                $result2 = $conn->query($sql2);

				if (!empty($result2))
					if ($result2->num_rows > 0) {
						while ($row2 = $result2->fetch_assoc()) {
							$vacuna[] = array(
								'idvacuna' => $row2["id_vacuna"], 
                                'idmascota' => $row2["id_mascota"], 
                                'idtipovacuna' => $row2["id_tipovacuna"],
                                'nombrevacuna' => $row2["nombrevacuna"],
                                'fecha_creacion' => $row2["fecha_creacion"],
                                'estado' => $row2["estado"]
							);
						}
					} else {
						$vacuna[] = null;
					}
				else $vacuna[] = null;

                $results[] = array(
					'mascota' => $mascota[$i],
					'vacuna' => $vacuna[$i]
				);
                $json = array("status" => 1, "info" => $results);
                $i++;
            }
        } else {
            $json = array("status" => 0, "info" => "No existe información con ese criterio.");
        }
    else $json = array("status" => 0, "info" => "No existe información.");
} else {
    if (strtoupper($accion) == 'I') { // VERIFICACION SI LA ACCION ES INSERCION
        //AGREGAR ORDEN DE ID
        $sql = "
		SELECT MAX(a.id_mascota) + 1 as id
		FROM $bd.$tabla a";

        $result = $conn->query($sql);

        if (!empty($result) || !is_null($result)) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {
                    if (!is_null($row["id"])) $id_mun = $row["id"];
                    else $id_mun = 1;
                }
            } else {
                $id_mun = 1;
            }
        } else $id_mun = 1;

        $date = date('Y-m-d H:i:s');
        $nacim = date_create_from_format('Y-m-d', $nacim);
        

        $sql = "INSERT INTO 
        $bd.$tabla(id_mascota, id_usuario,id_tipomascota,id_municipio,direccion,estado_direc,
        nombremascota, codigo,nacimiento,foto,estado,usuario_creacion, fecha_creacion) 
		VALUE($id_mascota, $id_usuario,$id_tipomascota,$id_mun,'$direccion',
        '$estado_direc','$nombremasc','$codigo','$nacim','$foto','$estado','$user', '$date')";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    } else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES ACTUALIZACION
        $id_mascota = " id_mascota=" . $id_mascota;
        $id_tipomascota = " ,id_tipomascota=" . $id_tipomascota;
        $id_mun = " ,id_municipio=" . $id_mun;
        $direccion = ",direccion='" . $direccion . "'";
        $estado_direc = ",estado_direc='" . $estado_direc . "'";
        $nombremasc = ",nombremascota='" . $nombremasc . "'";
        $codigo = ",codigo='" . $codigo . "'";
        $nacim = ",nacimiento='" . $nacim . "'";
        $foto = ",foto='" . $foto . "'";
        $estado = ",estado='" . $estado . "'";
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla SET $id_mascota $id_tipomascota $id_mun $direccion 
        $estado_direc $nombremasc $codigo $nacim $foto $estado $user $date 
         WHERE id_mascota = $id_mascota ";

        echo $sql;
        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla SET estado='I' $user WHERE id_mascota = $id_mascota ";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ACTIVAR EL REGISTRO
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla SET estado='A' $user $date WHERE id_mascota = $id_mascota ";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } 
}
$conn->close();

/* Output header */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($json);
//*/
