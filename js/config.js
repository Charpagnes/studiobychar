/* ONE place for every booking, contact and tracking value.
   Replace the PLACEHOLDER values when Acuity, LINE and WhatsApp are set up.
   A value starting with "#" is treated as "not set yet": the link keeps its fallback href. */
window.SBC = {
    ga4: "",                                   // GA4 measurement ID, e.g. "G-XXXXXXXXXX". Empty = analytics off
    quoteEndpoint: "",                         // URL that accepts the quote form as JSON. Empty = the brief opens in WhatsApp instead
    links: {
        // A) Book and pay now (Acuity, one link per service)
        studioRental:   "#PLACEHOLDER-acuity-studio-rental",
        podcastHourly:  "#PLACEHOLDER-acuity-podcast-hourly",
        headshots:      "#PLACEHOLDER-acuity-headshots",
        compCards:      "#PLACEHOLDER-acuity-comp-cards",
        // B) 20-minute discovery call (Acuity)
        callPlans:      "#PLACEHOLDER-acuity-call-plans",
        callSocial:     "#PLACEHOLDER-acuity-call-social",
        members:        "#PLACEHOLDER-acuity-members-private",
        // C) Quote form
        quote:          "/quote/",
        // Chat
        line:           "https://line.me/R/ti/p/@PLACEHOLDER",
        whatsapp:       "https://wa.me/66000000000",
        // Social proof and elsewhere
        timeOut:        "#PLACEHOLDER-time-out-article",
        shotByChar:     "https://shotbychar.com",
        instagram:      "https://www.instagram.com/studioby.char",
        facebook:       "https://www.facebook.com/share/1BsJcmAYLn"
    }
};
