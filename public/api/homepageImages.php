<?php
header('Access-Control-Allow-Origin: *');

$imagesFolder = 'images'; // Update this to the path of your images folder
$imageExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Add more extensions if needed

// Get the list of image files in the folder
$files = scandir($imagesFolder);

// Filter out non-image files and those not starting with "homepage_"
$imageFiles = array_filter($files, function ($file) use ($imageExtensions) {
    $fileExtension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    return in_array($fileExtension, $imageExtensions) && strpos($file, 'homepage_') === 0;
});

// Convert associative array to indexed array
$imageFiles = array_values($imageFiles);

// Output the JSON response with only filenames
header('Content-Type: application/json');
echo json_encode(['images' => $imageFiles]);
?>
