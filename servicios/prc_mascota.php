<?php
include_once('../config.php');

$bd = "dbMyPet";
$tabla = "prc_mascotas";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id_mascota = isset($_GET['id_mascota']) ? $_GET['id_mascota'] : '';
$id_tipomascota = isset($_GET['id_tipomascota']) ? $_GET['id_tipomascota'] : '';
$id_mun = isset($_GET['id_mun']) ? $_GET['id_mun'] : '';
$id_usuario = isset($_GET['id_usuario']) ? $_GET['id_usuario'] : '';
$direccion= utf8_decode(isset($_GET['direccion']) ? $_GET['direccion'] : '');
$estado_direc = isset($_GET['estado_direc']) ? $_GET['estado_direc'] : '';
$nombremasc = utf8_decode(isset($_GET['nombremasc']) ? $_GET['nombremasc'] : '');
$codigo = utf8_decode(($_GET['codigo']) ? $_GET['codigo'] : '');
$edad = utf8_decode(($_GET['edad']) ? $_GET['edad'] : '');
$foto = utf8_decode(isset($_GET['foto']) ? $_GET['foto'] : '');
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';
$user = utf8_decode(isset($_GET['user']) ? $_GET['user'] : '');

$json = "no has seteado nada.";

if (strtoupper($accion) == 'C') { //VERIFICACION SI LA ACCION ES CONSULTA
    /*if (!empty($id_mun)) $id_mun = "A.id_municipio='$id_mun'";
    else $id_mun = "1=1";
    if (!empty($id_depto)) $id_depto = "AND A.id_departamento='$id_depto'";
    else $id_depto = "AND 1=1";
    if (!empty($municipio)) $municipio = "AND A.municipio LIKE '%'$municipio%'";
    else $municipio = "";
    if (!empty($estado)) $estado = "AND A.estado='$estado'";
    else $estado = "";*/

    $sql = "SELECT m.id_mascota, u.id_usuario, u.mail,u.telefono,m.nombremascota,
    d.departamento,mu.municipio,m.direccion,m.estado_direc,m.codigo,m.edad 
    FROM prc_mascotas m,sec_usuarios u, ctg_tipomascotas t, ctg_municipios mu, ctg_departamentos d 
    WHERE m.id_tipomascota=t.id_tipomascota AND m.id_usuario=u.id_usuario 
    AND mu.id_departamento=d.id_departamento";
    //WHERE $id_opc $id_opc_ppal $id_rol ";

    $result = $conn->query($sql);

    if (!empty($result))
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $results[] = array(
                    "id_mascota" => $row["id_mascota"], 
                    'id_usuario'  => $row["id_usuario"],
                    'mail' => utf8_decode($row["mail"]),
                    'telefono' => utf8_decode($row["telefono"]),
                    'nombremascota' => utf8_decode($row["nombremascota"]),
                    'departamento' => utf8_decode($row["departamento"]),
                    'municipio' => utf8_decode($row["municipio"]),
                    'direccion' => utf8_decode($row["direccion"]),
                    'estado_direc' => utf8_decode($row["estado_direc"]),
                    'edad' => utf8_decode($row["edad"]),
                    'foto' => utf8_decode($row["foto"]),
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

        $date = (new DateTime())->format('Y-m-d');
        $edad=date_create_from_format('Y-m-d', $edad);

        $sql = "INSERT INTO 
        $bd.$tabla(id_mascota, id_usuario,id_tipomascota,id_municipio,direccion,estado_direc,
        nombremascota, codigo,edad,foto,estado,usuario_creacion, fecha_creacion) 
		VALUE($id_mascota, $id_usuario,$id_tipomascota,$id_mun,$direccion,
        $estado_direc,$nombremasc,$codigo,$edad,$foto,'A','$user', '$date')";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro almacenado exitosamente.");
        } else {
            $json = array("status" => 0, "info" => $conn->error);
        }
    } else if (strtoupper($accion) == 'U') { // VERIFICACION SI LA ACCION ES ACTUALIZACION
        $id_mascota = " id_departamento=" . $id_depto;
        //$id_usuario = " ,id_departamento=" . $id_depto;
        $id_tipomascota = " ,id_departamento=" . $id_depto;
        $id_mun = " ,id_departamento=" . $id_depto;
        $direccion = ",direccion='" . $direccion . "'";
        $estado_direc= ",estado_direc='" . $estado_direc . "'";
        $nombremasc= ",nombremascota='" . $nombremasc . "'";
        $codigo = ",codigo='" . $codigo . "'";
        $edad = ",edad='" . $edad . "'";
        $foto = ",foto='" . $foto . "'";
        $estado = ",estado='" . $estado . "'";
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla SET $id_mascota $id_tipomascota $id_mun $direccion 
        $estado_direc $nombremasc $codigo $edad $foto $estado $user $date 
         WHERE id_mascota = $id_mascota ";

        echo $sql;
        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'D') { // VERIFICACION SI LA ACCION ES ELIMINACION
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla SET estado='I' WHERE id_mascota = $id_mascota ";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'A') { // VERIFICACION SI LA ACCION ES ACTIVAR EL REGISTRO
        $user = ", usuario_update='" . $user . "'";
        $date = ", fecha_update='" . (new DateTime())->format('Y-m-d') . "'";

        $sql = "UPDATE $bd.$tabla SET estado='A' WHERE id_mascota = $id_mascota ";

        if ($conn->query($sql) === TRUE) {
            $json = array("status" => 1, "info" => "Registro eliminado exitosamente.");
        } else {
            $json = array("status" => 0, "error" => $conn->error);
        }
    } else if (strtoupper($accion) == 'DM') { // VERIFICACION SI LA ACCION ES CON RELACION CON LOS DEPARTAMENTOS

        $sql = "select * from ctg_municipios where id_departamento=$id_depto";

        $result = $conn->query($sql);

        if (!empty($result))
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $results[] = array(
                        "id" => $row["id_municipio"], 'municipio' => utf8_decode($row["municipio"])
                    );
                    $json = array("status" => 1, "info" => $results);
                }
            } else {
                $json = array("status" => 0, "info" => "No existe información con ese criterio.");
            }
        else $json = array("status" => 0, "info" => "No existe información.");
    } else if (strtoupper($accion) == 'CU') { // VERIFICACION SI LA ACCION ES UNA CONSULTA DE UN REGISTRO PARA CARGARLO A UN FORMULARIO

        $sql = "select id_municipio,departamento,municipio,M.estado
        from ctg_municipios M,ctg_departamentos D 
        where M.id_departamento=D.id_departamento AND 
        id_municipio=$id_mun";

        $result = $conn->query($sql);

        if (!empty($result))
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $results[] = array(
                        "id" => $row["id_municipio"], 'departamento' => utf8_decode($row["departamento"]), 'municipio' => utf8_decode($row["municipio"]), 'estado' => utf8_decode($row["estado"])
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
