<?php
require 'db.php'; // Gunakan koneksi dari db.php

// Pastikan metode request adalah POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dari form
    $confession = trim($_POST["confession"]);

    if (!empty($confession)) {
        // Persiapkan query
        $stmt = $conn->prepare("INSERT INTO confessions (message) VALUES (?)");
        $stmt->bind_param("s", $confession);

        // Eksekusi query
        if ($stmt->execute()) {
            echo "Confession berhasil dikirim!";
        } else {
            echo "Gagal menyimpan confession.";
        }

        // Tutup statement
        $stmt->close();
    } else {
        echo "Confession tidak boleh kosong!";
    }
}

// Tutup koneksi database
$conn->close();
?>
