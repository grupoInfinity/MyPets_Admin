<?php

	$servername = "localhost";
	$username = "root";
	$password = "root";
/*
	//$servername = "";
	//$servername = "";
	
	//$username = "userSQL";
	//$username = "";
	
	//$password = "pasf2";
	//$password = "";
*/
	
	// Create connection
	$conn = new mysqli($servername, $username, $password);
	
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	//echo "Connected successfully";
?>