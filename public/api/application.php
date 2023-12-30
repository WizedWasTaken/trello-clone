<?php
include 'db.php';

$sql = "SELECT * FROM applications";
$result = $pdo->query($sql);

if ($result->rowCount() > 0) {
    $applications = [];

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $application = [
            "id" => $row["id"],
            "name" => $row["name"],
            "closed" => (bool)$row["closed"],
            "color" => $row["color"]
        ];

        $fieldsSql = "SELECT * FROM application_fields WHERE application_id = :id";
        $fieldsResult = $pdo->prepare($fieldsSql);
        $fieldsResult->bindParam(':id', $row["id"], PDO::PARAM_INT);
        $fieldsResult->execute();

        $application["fields"] = $fieldsResult->fetchAll(PDO::FETCH_ASSOC);

        $applications[] = $application;
    }

    echo json_encode($applications);
} else {
    echo "0 results";
}
?>
