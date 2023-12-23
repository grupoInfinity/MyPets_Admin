<?php
include_once('../config.php');

$bd = "dbMyPet";
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
$usuario = utf8_decode(isset($_GET['usuario']) ? $_GET['usuario'] : '');
$direccion = utf8_decode(isset($_GET['direccion']) ? $_GET['direccion'] : '');
$estado_direc = isset($_GET['estado_direc']) ? $_GET['estado_direc'] : '';
$nombremasc = utf8_decode(isset($_GET['nombremasc']) ? $_GET['nombremasc'] : '');
$codigo = utf8_decode(($_GET['codigo']) ? $_GET['codigo'] : '');
$nacim = utf8_decode(($_GET['nacim']) ? $_GET['nacim'] : '');
$foto = utf8_decode(isset($_GET['foto']) ? $_GET['foto'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

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


    $sql = "SELECT m.id_mascota, u.usuario, u.mail,u.telefono,m.nombremascota,
    d.departamento,mu.municipio,m.direccion,m.estado_direc,m.codigo,m.nacimiento 
    FROM $bd.$tabla m, $bd.$tabla4 t, $bd.$tabla5 mu,$bd.$tabla6 u, $bd.$tabla7 d 
    WHERE $id_mascota $usuario $nombremasc $estado 
    AND m.id_tipomascota=t.id_tipomascota AND m.id_usuario=u.id_usuario 
    AND mu.id_departamento=d.id_departamento  ";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $results[] = array(
                    "id_mascota" => $row["id_mascota"],
                    'usuario'  => $row["usuario"],
                    'mail' => utf8_decode($row["mail"]),
                    'telefono' => utf8_decode($row["telefono"]),
                    'nombremascota' => utf8_decode($row["nombremascota"]),
                    'departamento' => utf8_decode($row["departamento"]),
                    'municipio' => utf8_decode($row["municipio"]),
                    'direccion' => utf8_decode($row["direccion"]),
                    'estado_direc' => utf8_decode($row["estado_direc"]),
                    'nacim' => utf8_decode($row["nacimiento"]),
                    'foto' =>  imageToBase64(utf8_decode($row["foto"])),
                    'codigo' => utf8_decode($row["codigo"])
                );
                $json = array("status" => 1, "info" => $results);
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
                    if (!is_null($row["id_mascota"])) $id_mun = $row["id_mascota"];
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
        '$estado_direc','$nombremasc',$codigo,'$nacim','$foto','$estado','$user', '$date')";

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
