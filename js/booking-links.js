/* Acuity Scheduling booking links - one source of truth for all booking buttons.
   Update these values and every button on the site automatically uses them.
   Use empty string to disable a booking link (or "" + description for disabled-by-design).
   This config is loaded by booking-wiring.js which handles:
   - Setting href on buttons with data-booking attributes
   - Opening links in new tabs with GA tracking
   - Falling back to /book for blank links
   - Hiding rentSet card when that link is blank
*/

window.SBC = window.SBC || {};
window.SBC.bookingLinks = {
    // Studio rentals: by the hour, day, or time block
    podcastSession:      "https://app.acuityscheduling.com/schedule.php?owner=40529975&appointmentType=98937811",  // #1 Podcast Session in The Set (hourly)
    rentConcept4hr:      "https://app.acuityscheduling.com/schedule.php?owner=40529975&appointmentType=98936357",  // #2 Rent The Concept, 4hr minimum
    conceptAfterHours:   "",                    // #3 The Concept, 17:00–21:00 slot (not available)
    rentSet:             "https://app.acuityscheduling.com/schedule.php?owner=40529975&appointmentType=98937811",  // #4 Rent The Set (podcast space)

    // Quick bookings: fixed packages, book and pay now
    headshots:           "https://app.acuityscheduling.com/schedule.php?owner=40529975&appointmentType=99020417",  // #5 Headshot Session
    compCards:           "https://app.acuityscheduling.com/schedule.php?owner=40529975&appointmentType=99020443",  // #6 Model Comp Card Shoot

    // Discovery calls: 20 minutes to shape a plan
    callShowPlans:       "https://app.acuityscheduling.com/schedule.php?owner=40529975&appointmentType=99025911",  // #7 Discovery Call: Podcast & YouTube Plans (Podcast Pro, YouTube Growth, Studio Bundle)
    callSocial:          "https://app.acuityscheduling.com/schedule.php?owner=40529975&appointmentType=99025911",  // #8 Discovery Call: Social Media Management

    // Quoted projects: send a brief, get a quote
    productionBrief:     ""                     // #9 Production Brief Call (product, fashion, production, video, editing) - not available
};

// Studio Bundle member session (not in the main flow; linked from footer and policies)
window.SBC.bookingLinks.memberStudioBundle = "";   // #10 Studio Bundle Member Session (private booking link for members) - not available
