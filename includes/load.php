<?php
require 'db.php'; // Sesuaikan dengan koneksi database

$query = "SELECT message FROM confessions ORDER BY created_at DESC";
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    echo '<div class="confession-bubble">' . htmlspecialchars($row['message']) . '</div>';
}
?>
