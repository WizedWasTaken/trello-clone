<?php
require_once '../db.php';
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'];
$description = $data['description'];
$changes = $data['changes'];

try {
    $stmt = $pdo->prepare("INSERT INTO changelog (title, description) VALUES (?, ?)");
    $stmt->execute([$title, $description]);

    $changelogId = $pdo->lastInsertId();

    foreach ($changes as $change) {
        $stmt = $pdo->prepare("INSERT INTO changelog_changes (changelog_id, change_description) VALUES (?, ?)");
        $stmt->execute([$changelogId, $change]);
    }

    echo json_encode(['success' => 'Changelog added']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>