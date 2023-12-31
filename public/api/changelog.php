<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');

include 'db.php';

$sql = "SELECT c.id, c.title, c.description, GROUP_CONCAT(cc.change_description) AS changes, c.date_added FROM changelog c LEFT JOIN changelog_changes cc ON c.id = cc.changelog_id GROUP BY c.id ORDER BY c.date_added DESC;";

try {
    $result = $pdo->query($sql);

    if ($result->rowCount() > 0) {
        $changelogData = $result->fetchAll(PDO::FETCH_ASSOC);

        foreach ($changelogData as &$entry) {
            if ($entry['changes']) {
                $entry['changes'] = explode(',', $entry['changes']);
            } else {
                $entry['changes'] = [];
            }
        }

        header('Content-Type: application/json');
        echo json_encode($changelogData);
    } else {
        echo json_encode(['error' => 'No changelog entries found.']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}

$pdo = null;
?>
