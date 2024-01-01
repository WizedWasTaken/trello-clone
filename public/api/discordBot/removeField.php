<?php
require_once '../db.php';
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$ansøgning = $data['ansøgning'];
$felt = $data['felt'];

try {
    $stmt = $pdo->prepare("DELETE af FROM application_fields af INNER JOIN applications a ON af.application_id = a.id WHERE a.name = ? AND af.title = ?");
    $stmt->execute([$ansøgning, $felt]);

    echo json_encode(['success' => 'Felt fjernet']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>