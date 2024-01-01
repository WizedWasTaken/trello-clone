<?php
require_once '../db.php';
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$closed = $data['closed'] ? 1 : 0;
$color = $data['color'];
$fields = $data['fields'];

try {
    $stmt = $pdo->prepare("INSERT INTO applications (name, closed, color) VALUES (?, ?, ?)");
    $stmt->execute([$name, $closed, $color]);

    $applicationId = $pdo->lastInsertId();

    foreach ($fields as $field) {
        $stmt = $pdo->prepare("INSERT INTO application_fields (title, textbox, application_id) VALUES (?, ?, ?)");
        $stmt->execute([$field['title'], $field['textbox'] ? 1 : 0, $applicationId]);
    }

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => 'Kategori sletted.']);
    } else {
        echo json_encode(['error' => 'ingen kategori fundet med den valgte titel.']);
    }

    echo json_encode(['success' => 'Application added']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>