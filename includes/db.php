<?php
$host = "localhost"; // Sesuaikan jika menggunakan host lain
$user = "root"; // Username default XAMPP adalah "root"
$pass = ""; // Password default XAMPP kosong
$dbname = "confession_db"; // Sesuaikan dengan nama database yang digunakan

$conn = new mysqli($host, $user, $pass, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
