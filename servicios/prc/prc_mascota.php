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
$tabla = "prc_mascotas";
$tabla2 = "ctg_vacunas";
$tabla3 = "ctg_tipovacunas";
$tabla4 = "ctg_tipomascotas";
$tabla5 = "ctg_municpios";
$tabla6 = "sec_usuarios";
$tabla7 = "ctg_departamentos";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_mascota = isset($_GET['id']) ? $_GET['id'] : '';
$id_tipomascota = isset($_GET['tpmascota']) ? $_GET['tpmascota'] : '';
$id_mun = isset($_GET['muni']) ? $_GET['muni'] : '';
$usuario = isset($_GET['dueno']) ? $_GET['dueno'] : '';
$direccion = isset($_GET['direccion']) ? $_GET['direccion'] : '';
$estado_direc = isset($_GET['estadodir']) ? $_GET['estadodir'] : '';
$nombremasc = isset($_GET['nmasc']) ? $_GET['nmasc'] : '';
$codigo = isset($_GET['codigo']) ? $_GET['codigo'] : '';
$nacim = isset($_GET['nacim']) ? $_GET['nacim'] : '';
$foto = isset($_GET['foto']) ? $_GET['foto'] : '';
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = isset($_GET['user']) ? $_GET['user'] : '';

$json = "no has seteado nada.";
/*function imageToBase64($imagePath)
{
    $imageData = file_get_contents($imagePath);
    $base64 = base64_encode($imageData);
    return $base64;
}*/

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
    if (!empty($id_mascota)) $id_mascota = "m.id_mascota='$id_mascota'";
    else $id_mascota = "1=1";
    if (!empty($usuario)) $usuario = "AND m.usuario='$usuario'";
    else $usuario = "";
    if (!empty($nombremasc)) $nombremasc = "AND m.nombremascota LIKE '%'$nombremasc%'";
    else $nombremasc = "";
    if (!empty($estado)) $estado = "AND m.estado='$estado'";
    else $estado = "";
    if (!empty($codigo)) $codigo= "AND m.codigo='$codigo'";
    else $codigo = "";


    $sql = "SELECT m.id_mascota,m.id_tipomascota,d.id_departamento,m.id_municipio, u.usuario, u.email,
    u.telefono,m.nombremascota,m.estado,t.tipomascota,m.foto,
    d.descripcion as depto,mu.descripcion as muni,m.direccion,m.estado_direc,m.codigo,m.nacimiento 
    FROM $bd.prc_mascotas m, $bd.ctg_tipomascotas t, $bd.ctg_municipios mu,
    $bd.sec_usuario u, $bd.ctg_departamentos d 
    WHERE $id_mascota $usuario $nombremasc $estado $codigo AND 
	 m.id_tipomascota=t.id_tipomascota AND m.usuario=u.usuario 
    AND m.id_municipio=mu.id_municipio AND mu.id_departamento=d.id_departamento";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            $i = 0;
            while ($row = $result->fetch_assoc()) {
                $idm = $row["id_mascota"];
                /*if (!empty($row["foto"])) $foto = ($row["foto"]);
                else $foto = "";*/

                $mascota[] = array(
                    'idmasc' => $row["id_mascota"],
                    'idtpmasc' => $row["id_tipomascota"],
                    'idmuni' => $row["id_municipio"],
                    'iddepto' => $row["id_departamento"],
                    'depto' => ($row["depto"]),
                    'muni' => ($row["muni"]),
                    'dueno'  => $row["usuario"],
                    'mail' => ($row["email"]),
                    'telefono' => ($row["telefono"]),
                    'nmasc' => ($row["nombremascota"]),
                    'tipomasc' => ($row["tipomascota"]),
                    'direccion' => ($row["direccion"]),
                    'estadodir' => ($row["estado_direc"]),
                    'nacim' => $row["nacimiento"],
                    'foto' =>  $row["foto"],
                    'codigo' => $row["codigo"],
                    'estado' => $row["estado"]
                );

                $sql2 = "SELECT v.id_vacuna,v.id_mascota,v.id_tipovacuna,
                t.nombrevacuna,DATE(v.fecha_creacion) AS fecha_creacion
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
                                'fecha_creacion' => $row2["fecha_creacion"]
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
                    if (!is_null($row["id"])) $id_mascota = $row["id"];
                    else $id_mascota = 1;
                }
            } else {
                $id_mascota = 1;
            }
        } else $id_mascota = 1;

        $date = date('Y-m-d H:i:s');
        //$nacim = date_create_from_format('Y-m-d', $nacim);


        $sql = "INSERT INTO 
        $bd.$tabla(id_mascota, usuario,id_tipomascota,id_municipio,direccion,estado_direc,
        nombremascota, codigo,nacimiento,foto,estado,usuario_creacion, fecha_creacion) 
		VALUE($id_mascota, $usuario,$id_tipomascota,$id_mun,'$direccion',
        '$estado_direc','$nombremasc','$codigo','$nacim','$foto','A','$user', '$date')";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    } else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES ACTUALIZACION
        $id_tipomascota = " id_tipomascota=" . $id_tipomascota;
        $id_mun = " ,id_municipio=" . $id_mun;
        $direccion = ",direccion='" . $direccion . "'";
        $estado_direc = ",estado_direc='" . $estado_direc . "'";
        $nombremasc = ",nombremascota='" . $nombremasc . "'";
        $codigo = ",codigo='" . $codigo . "'";
        $nacim = ",nacimiento='" . $nacim . "'";
        $estado = ",estado='" . $estado . "'";
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";
        if (!empty($foto)) $foto = ",foto='" . ($foto) . "'";
        else $foto = ",foto=foto";

        $sql = "UPDATE $bd.$tabla SET $id_tipomascota $id_mun $direccion 
        $estado_direc $nombremasc $codigo $nacim $foto $estado $user $date 
         WHERE id_mascota = $id_mascota ";

        echo $sql;
        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro actualizado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . date('Y-m-d H:i:s') . "'";

        $sql = "UPDATE $bd.$tabla SET estado='I' $user $date WHERE id_mascota = $id_mascota ";

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
            $json = array("status" => 1, "info" => "Registro activado exitosamente.");
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
