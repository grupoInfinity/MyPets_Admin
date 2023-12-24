<?php
	$servername = "localhost";
	$username = "userSQL";
	$password = "pasf2";
	$bd="dbMyPet";
	//*/
	
	/*
	$servername = "localhost";
	$username = "u657509964_admin_erp";
	$password = "Ginfinity2021";
	$bd = "u395190840_erp";
	//*/
	

	// Create connection
	$conn = new mysqli($servername, $username, $password);
	date_default_timezone_set('America/El_Salvador');
	
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	//echo "Connected successfully";
	
	define('WP_MEMORY_LIMIT', '64M');
	
	header('Content-type: application/json; charset=UTF-8');
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
	header("Allow: GET, POST, OPTIONS, PUT, DELETE");
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == "OPTIONS") {
		die();
	}
	
	
?>