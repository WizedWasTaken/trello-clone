<?php
require_once '../db.php';
header('Access-Control-Allow-Origin: *');

$userAgent = $_SERVER['HTTP_USER_AGENT'];
if (strpos($userAgent, 'Mozilla') !== false || strpos($userAgent, 'Chrome') !== false) {
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];
$description = $data['description'];

try {
    $stmt = $pdo->prepare("INSERT INTO news (title, description) VALUES (?, ?)");
    $stmt->execute([$title, $description]);

    echo json_encode(['success' => 'Nyhed added']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>