(function () {
    var cfg = window.SBC || { links: {}, ga4: "" };

    // Fill [data-link] hrefs from config. "#..." values mean not set yet, so the fallback href stays.
    document.querySelectorAll("[data-link]").forEach(function (a) {
        var url = cfg.links[a.getAttribute("data-link")];
        if (url && url.charAt(0) !== "#") a.setAttribute("href", url);
    });

    // GA4 loads only when an ID is set. Events: booking_started, quote_submitted, call_booked, line_click, whatsapp_click.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    if (cfg.ga4) {
        var s = document.createElement("script");
        s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + cfg.ga4;
        document.head.appendChild(s);
        gtag("js", new Date()); gtag("config", cfg.ga4);
    }
    document.addEventListener("click", function (e) {
        var el = e.target.closest("[data-event]");
        if (el) gtag("event", el.getAttribute("data-event"), { link_url: el.href || "" });
    });

    // Sticky-shrink header + mobile menu
    var header = document.querySelector("[data-sticky-header]");
    if (header) {
        var sentinel = document.createElement("div");
        sentinel.style.cssText = "position:absolute;top:0;width:1px;height:1px;pointer-events:none";
        document.body.prepend(sentinel);
        new IntersectionObserver(function (en) {
            header.dataset.scrolled = String(!en[0].isIntersecting);
        }, { rootMargin: "-1px 0px 0px 0px" }).observe(sentinel);

        var btn = header.querySelector(".menu-btn");
        var setMenu = function (open) {
            document.documentElement.classList.toggle("menu-open", open);
            btn.setAttribute("aria-expanded", String(open));
        };
        btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
        header.querySelectorAll(".nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    }

    // Logo cursor: follows the mouse, dark on light backgrounds and light on dark ones
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        var cur = document.createElement("div");
        cur.className = "cursor is-dark";
        cur.setAttribute("aria-hidden", "true");
        cur.innerHTML = "<span></span>";
        document.body.appendChild(cur);
        document.documentElement.classList.add("has-cursor");

        var cx = 0, cy = 0, queued = false;
        var luminance = function (rgb) {
            var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
            return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
        };
        // Walk up to the first element with a visible background (or a data-cursor override).
        // Returns "light" (cursor goes light, background is dark), "mid" (lilac, pink, orange) or "dark".
        var bgTone = function (el) {
            for (; el && el !== document.documentElement; el = el.parentElement) {
                if (el.dataset && el.dataset.cursor) return el.dataset.cursor;
                var m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
                if (m && (m.length < 4 || +m[3] > 0.5)) {
                    var l = luminance(m.map(Number));
                    return l < 0.18 ? "light" : l < 0.55 ? "mid" : "dark";
                }
            }
            return "dark";
        };
        var paint = function () {
            queued = false;
            cur.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
            var el = document.elementFromPoint(cx, cy);
            var native = el && (el.closest("input, textarea, select, iframe"));
            cur.classList.toggle("is-on", !native);
            var tone = bgTone(el);
            cur.classList.toggle("is-light", tone === "light");
            cur.classList.toggle("is-mid", tone === "mid");
            cur.classList.toggle("is-dark", tone === "dark");
            cur.classList.toggle("is-link", !!(el && el.closest("a, button, label, summary")));
        };
        document.addEventListener("mousemove", function (e) {
            cx = e.clientX; cy = e.clientY;
            if (!queued) { queued = true; requestAnimationFrame(paint); }
        }, { passive: true });
        document.addEventListener("mouseleave", function () { cur.classList.remove("is-on"); });
        document.addEventListener("mouseenter", function () { cur.classList.add("is-on"); });
    }

    // Mix and match picker: carry the choice into the quote link and the brief
    var picker = document.querySelector(".picker");
    if (picker) {
        var mixLink = document.getElementById("mix-link");
        var updateMix = function () {
            var c = picker.querySelector('input[name="concept"]:checked');
            var s = picker.querySelector('input[name="set"]:checked');
            if (c && s) mixLink.href = "/quote/?concept=" + encodeURIComponent(c.value) + "&set=" + encodeURIComponent(s.value);
        };
        picker.addEventListener("change", updateMix);
        updateMix();
    }

    // Quote form: prefill from the picker, then send the brief
    var qf = document.getElementById("quote-form");
    if (qf) {
        var params = new URLSearchParams(location.search);
        if (params.get("concept") && params.get("set")) {
            qf.elements.references.value = "Mix and match: The Concept (" + params.get("concept") + ") with The Set (" + params.get("set") + ")";
        }
        qf.addEventListener("submit", function (e) {
            e.preventDefault();
            var data = {};
            new FormData(qf).forEach(function (v, k) { data[k] = v; });
            gtag("event", "quote_submitted");
            var done = function () { location.href = "/thank-you/"; };
            if (cfg.quoteEndpoint) {
                fetch(cfg.quoteEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
                    .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
                    .catch(function () { qf.querySelector("button").insertAdjacentText("afterend", " Something went wrong. Please message us on LINE or WhatsApp."); });
            } else {
                var wa = (cfg.links.whatsapp || "").split("?")[0];
                var text = "New quote request\nName: " + data.name + "\nContact: " + data.contact + "\nBrand: " + data.brand + "\nSells: " + data.sells +
                    "\nProject: " + data.type + "\nShots: " + data.shots + "\nUsage: " + data.usage + "\nDates: " + data.dates +
                    "\nBudget: " + data.budget + "\nReferences: " + data.references;
                window.open(wa + "?text=" + encodeURIComponent(text), "_blank", "noopener");
                done();
            }
        });
    }

    // Folder tiles: tap the tab to open or close (hover does the same on desktop through CSS)
    document.querySelectorAll("[data-folder]").forEach(function (tile) {
        var tab = tile.querySelector(".folder-tab");
        tab.addEventListener("click", function () {
            var open = tile.classList.toggle("is-open");
            tab.setAttribute("aria-expanded", String(open));
        });
    });
})();
