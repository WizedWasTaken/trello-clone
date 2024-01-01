<?php
require_once '../db.php';
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$ansøgning = $data['ansøgning'];
$felt = $data['felt'];
$nyværdi = $data['nyværdi'];

try {
    $stmt = $pdo->prepare("UPDATE application_fields af INNER JOIN applications a ON af.application_id = a.id SET af.textbox = ? WHERE a.name = ? AND af.title = ?");
    $stmt->execute([$nyværdi, $ansøgning, $felt]);

    echo json_encode(['success' => 'Felt ændret']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>