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

try {
    $stmt = $pdo->prepare("DELETE FROM rules WHERE category = ?");
    $stmt->execute([$title]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => 'Kategori sletted.']);
    } else {
        echo json_encode(['error' => 'ingen kategori fundet med den valgte titel.']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>