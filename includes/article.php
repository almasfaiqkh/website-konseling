<?php
// Path file artikel (sesuaikan dengan lokasi di project)
$articleFile = "../assets/articles/article.txt";

if (file_exists($articleFile)) {
    $content = file_get_contents($articleFile);
    $lines = explode("\n", $content); // Pisahkan berdasarkan baris

    $formattedContent = "";
    $inList = false; // Status apakah sedang dalam list atau tidak

    foreach ($lines as $line) {
        $trimmed = trim($line); // Hapus spasi di awal dan akhir

        if (empty($trimmed)) {
            $formattedContent .= "<br>"; // Buat baris kosong untuk paragraf baru
        } elseif (preg_match('/^# (.*)/', $trimmed, $matches)) {
            $formattedContent .= "<h1>{$matches[1]}</h1>";
        } elseif (preg_match('/^## (.*)/', $trimmed, $matches)) {
            $formattedContent .= "<h2>{$matches[1]}</h2>";
        } elseif (preg_match('/^### (.*)/', $trimmed, $matches)) {
            $formattedContent .= "<h3>{$matches[1]}</h3>";
        } elseif (preg_match('/^- (.*)/', $trimmed, $matches)) {
            if (!$inList) {
                $formattedContent .= "<ul>"; // Mulai list baru
                $inList = true;
            }
            $formattedContent .= "<li>{$matches[1]}</li>";
        } else {
            if ($inList) {
                $formattedContent .= "</ul>"; // Tutup list sebelum paragraf baru
                $inList = false;
            }
            $formattedContent .= "<p>{$trimmed}</p>";
        }
    }

    if ($inList) {
        $formattedContent .= "</ul>"; // Tutup list jika masih terbuka
    }

    // Bungkus dengan div untuk CSS styling
    echo "<div class='article-box'>";
    echo $formattedContent;
    echo "</div>";
} else {
    echo "<p>Artikel tidak ditemukan.</p>";
}
