<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');

include 'db.php';

// Fetch changelog entries from the database
$sql = "SELECT id, title, description, image_url, created_at FROM changelog ORDER BY id DESC";
try {
    $result = $pdo->query($sql);

    if ($result->rowCount() > 0) {
        // Fetch the results into an associative array
        $changelogData = $result->fetchAll(PDO::FETCH_ASSOC);

        // Return the data as JSON
        header('Content-Type: application/json');
        echo json_encode($changelogData);
    } else {
        echo "No changelog entries found.";
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}

// Close the database connection
$pdo = null;
?>
