<?php
require_once '../db.php';
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$ansøgning = $data['ansøgning'];
$felt = $data['felt'];
$nyværdi = $data['nyværdi'];

try {
    $stmt = $pdo->prepare("INSERT INTO application_fields (application_id, title, textbox) SELECT a.id, ?, ? FROM applications a WHERE a.name = ?");
    $stmt->execute([$felt, $nyværdi, $ansøgning]);

    echo json_encode(['success' => 'Felt tilføjet']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>