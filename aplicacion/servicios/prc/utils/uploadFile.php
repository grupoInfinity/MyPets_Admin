<?php
include_once('../config.php'); 

$target_dir = "uploads/";
$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
$msg="";
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
		$msg="File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
		$msg="File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
	$msg="Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
	$msg="Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
	$msg="Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
	$msg="Sorry, your file was not uploaded.";
	$results[] = array(
			"id" => $id,
			'msg' => $msg
		);
	$json = array("status"=>0, "info"=>$results);
// if everything is ok, try to upload file
} else {
	/*
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
    $filename = $target_file;
	*/
    $filename = $_FILES["fileToUpload"]["tmp_name"];
	$file = fopen($filename, "rb");
	$contents = fread($file, filesize($filename));
	fclose($file);
	unlink($filename);
	
	//unlink($target_file);
	
	$img = base64_encode($contents);
	
	/*
	 * Operaciones de base de datos*/
	
	//$bd = "gi_facturacion";
	$tabla = "ctg_prod_img";
	$accion = isset($_POST['accion']) ? $_POST['accion'] : '';
	$id = isset($_POST['id']) ? $_POST['id'] : '';
	$sql = "";
	$msg = "";
	$tipo = "data:image/$imageFileType;base64,";	
	$campo = isset($_GET['campo']) ? $_GET['campo'] : '';
	$referencia = isset($_GET['referencia']) ? $_GET['referencia'] : '';
	
	if(strtoupper($accion) =='I'){
	    
	    $img = $tipo.$img;

	    $img2 = " image='".$img."'";
	    
    	$sql = "UPDATE $bd.$tabla SET $img2 WHERE id_prod=$id";
    	$msg = $id."|".$img;
		$msg="Imagen actualizado.";
		$results[] = array(
			"id" => $id,
			'img' => $img,
			'msg' => $msg
			
		);
	}
	
	//echo $sql;
	if ($conn->query($sql) === TRUE) {
	    $json = array("status"=>1, "info"=>$results);
	} else {
	    $json = array("status"=>0, "info"=>$conn->error);
	}
	//echo base64_encode($contents);

	
	if(strtoupper($accion) =='U'){
	    $id=1;
	    $sql = "SELECT MAX(CAST(A.id AS DECIMAL)) + 1 as id
            		FROM $bd.$tabla A";
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
	    $img = $tipo.$img;
	    
    	$sql = "INSERT INTO $bd.$tabla ($campo, id, image)
    		    VALUE($referencia, $id, '$img')";
    	$msg = $id."|".$img;
	}
	
	//echo $sql;
	if ($conn->query($sql) === TRUE) {
	    $json = array("status"=>1, "info"=>$msg);
	} else {
	    $json = array("status"=>0, "info"=>$conn->error);
	}
	
	/* Output header */
	//header('Content-type: application/json; charset=UTF-8');
	//header('Access-Control-Allow-Origin: *');
	echo json_encode($json);
}
?>