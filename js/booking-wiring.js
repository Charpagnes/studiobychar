/* Wire all booking buttons to Acuity Scheduling config.
   Each button needs: data-booking="keyName"
   This script handles href setting, GA events, new tab behavior, and fallbacks. */

(function () {
    // Wait for config to load
    var maxWaits = 50;
    var waits = 0;

    var wireButtons = function () {
        var bookingConfig = window.SBC && window.SBC.bookingLinks;
        if (!bookingConfig) {
            if (waits < maxWaits) {
                waits++;
                setTimeout(wireButtons, 100);
            }
            return;
        }

        // GA4 tracking (if configured in window.SBC.ga4)
        var gaId = window.SBC && window.SBC.ga4;
        var fireGAEvent = function (eventName, eventData) {
            if (!gaId || typeof gtag === 'undefined') return;
            gtag('event', eventName, eventData || {});
        };

        // Find all buttons with data-booking attribute
        document.querySelectorAll('[data-booking]').forEach(function (btn) {
            var key = btn.getAttribute('data-booking');
            var url = bookingConfig[key];

            // If blank, warn and use fallback
            if (!url || url.startsWith('#')) {
                console.warn('Acuity booking link not set: ' + key);
                url = '/book/';
            }

            // Set href
            btn.href = url;

            // Attach click handler for GA and new tab behavior
            btn.addEventListener('click', function (e) {
                // Fire GA event based on key
                var eventName = 'booking_started';
                if (key === 'callShowPlans' || key === 'callSocial') {
                    eventName = 'call_booked';
                } else if (key === 'productionBrief') {
                    eventName = 'quote_submitted';
                }
                fireGAEvent(eventName, { booking_type: key });

                // For Acuity links, open in new tab (target="_blank" + rel="noopener")
                if (url !== '/book/' && !url.startsWith('#')) {
                    e.preventDefault();
                    window.open(url, '_blank', 'noopener');
                }
            });
        });

        // Hide The Set rental card if rentSet link is blank/not set
        var rentSetUrl = bookingConfig.rentSet;
        if (!rentSetUrl || rentSetUrl.startsWith('#')) {
            var rentSetCard = document.querySelector('[data-rent-set-card]');
            if (rentSetCard) {
                rentSetCard.style.display = 'none';
            }
        }
    };

    // Wire on DOM ready or after page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireButtons);
    } else {
        wireButtons();
    }
})();
