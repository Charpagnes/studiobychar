/**
 * Chaty Widget Loader - Universal installer for any website
 * Version: 1.0.0
 * License: MIT
 *
 * Usage:
 *   <script>
 *     window.ChatyConfig = {
 *       accentColor: "#C08A74",
 *       channels: [...]
 *     };
 *   </script>
 *   <script src="https://your-cdn.com/chaty-loader.js"></script>
 */

(function() {
  "use strict";

  // Get the current script's directory to load resources from the same location
  var currentScript = document.currentScript ||
    Array.from(document.scripts).pop();
  var baseUrl = currentScript ?
    currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1) :
    './_chaty-global/';

  /**
   * Load external resource (CSS or JS)
   * @param {string} url - URL of the resource to load
   * @param {string} type - 'css' or 'js'
   * @param {function} callback - Optional callback when loaded
   */
  function loadResource(url, type, callback) {
    if (type === 'css') {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = callback;
      link.onerror = function() {
        console.error('Chaty: Failed to load CSS from ' + url);
        if (callback) callback();
      };
      document.head.appendChild(link);
    } else if (type === 'js') {
      var script = document.createElement('script');
      script.src = url;
      script.onload = callback;
      script.onerror = function() {
        console.error('Chaty: Failed to load JS from ' + url);
        if (callback) callback();
      };
      document.body.appendChild(script);
    }
  }

  /**
   * Initialize Chaty widget
   */
  function initChaty() {
    // Ensure config exists (user can override via window.ChatyConfig)
    if (!window.ChatyConfig) {
      console.warn('Chaty: No configuration found. Set window.ChatyConfig before loading.');
      return;
    }

    // Load CSS first
    loadResource(baseUrl + 'chaty.min.css', 'css', function() {
      // Then load the main widget script
      loadResource(baseUrl + 'chaty.js', 'js', function() {
        // Widget is now initialized
        console.log('Chaty widget loaded successfully');
      });
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChaty);
  } else {
    // DOM already loaded
    initChaty();
  }
})();
