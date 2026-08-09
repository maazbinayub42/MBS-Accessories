<?php
$host = "127.0.0.1";
$user = "root";
$pass = "";
$dbname = "mbs_db";
$port = 3307; // Aapka XAMPP wala port

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>