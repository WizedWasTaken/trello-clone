<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');

include 'db.php';

$sql = "SELECT id, title, description, date_added FROM news ORDER BY date_added DESC;";

try {
    $result = $pdo->query($sql);

    if ($result->rowCount() > 0) {
        $newsData = $result->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($newsData);
    } else {
        echo "No news entries found.";
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}

$pdo = null;
?>
