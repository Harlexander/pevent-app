<?php 
// define('DBSERVER', '127.0.0.1');
// define('DBUSERNAME', 'root');
// define('DBPASSWORD', '');
// define('DBNAME', 'christem_conf');
define('DBSERVER', '127.0.0.1');
define('DBUSERNAME', 'christem_alex');
define('DBPASSWORD', 'TO,B)N(bTZJB');
define('DBNAME', 'christem_conf');

 
/* Attempt to connect to MySQL database */
$conn = mysqli_connect(DBSERVER, DBUSERNAME, DBPASSWORD, DBNAME);
 
// Check conn
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$href = 'https://christembassy-ism.org/conferencing/'
?>