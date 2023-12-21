<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');

$host = 'noahnielsen.dk.mysql';
$dbname = 'noahnielsen_dkfivemtestsite';
$username = 'noahnielsen_dkfivemtestsite';
$password = '123456';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
