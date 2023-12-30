<?php
header('Access-Control-Allow-Origin: *');

$imagesFolder = 'images';
$imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

$files = scandir($imagesFolder);

$imageFiles = array_filter($files, function ($file) use ($imageExtensions) {
    $fileExtension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    return in_array($fileExtension, $imageExtensions) && strpos($file, 'homepage_') === 0;
});

$imageFiles = array_values($imageFiles);

header('Content-Type: application/json');
echo json_encode(['images' => $imageFiles]);
?>
