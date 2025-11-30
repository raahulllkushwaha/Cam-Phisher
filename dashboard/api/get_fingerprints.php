<?php
/**
 * CamPhish Dashboard API - Get Fingerprints
 * Author: Rahul Kushwaha
 * Returns fingerprint data from JSON files
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Base path to the root CamPhish directory (relative to this API file location)
$basePath = dirname(dirname(__DIR__));

$fingerprints = [];

// Get fingerprint JSON files
$fingerprintFiles = glob($basePath . '/fingerprints/*.json');

if (is_array($fingerprintFiles) && count($fingerprintFiles) > 0) {
    foreach ($fingerprintFiles as $file) {
        if (!is_readable($file)) {
            continue;
        }
        
        $content = file_get_contents($file);
        if ($content === false) {
            continue;
        }
        
        $data = json_decode($content, true);
        if (is_array($data)) {
            $fingerprints[] = $data;
        }
    }
    
    // Sort by timestamp descending (newest first)
    usort($fingerprints, function($a, $b) {
        $timeA = isset($a['unixTimestamp']) ? $a['unixTimestamp'] : 0;
        $timeB = isset($b['unixTimestamp']) ? $b['unixTimestamp'] : 0;
        return $timeB <=> $timeA;
    });
}

echo json_encode($fingerprints);
