<?php
require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT id, title, description, category FROM rules ORDER BY category, id");
    $rules = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$rules) {
        echo json_encode(['error' => 'No rules found.']);
    } else {
        header('Content-Type: application/json');
        echo json_encode($rules);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>
