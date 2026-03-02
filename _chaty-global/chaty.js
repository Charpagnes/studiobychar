/**
 * Chaty Widget - Universal Contact Widget
 * Version: 1.0.0
 * License: MIT
 *
 * Usage:
 *   window.ChatyConfig = {
 *     accentColor: "#C08A74",
 *     channels: [...]
 *   };
 *   <script src="chaty.js"></script>
 */

(function () {
  "use strict";

  // Default config - override via window.ChatyConfig
  var defaultConfig = {
    accentColor: "#C08A74",
    position: "bottom-left",
    autoClose: 30000,
    zoneDetection: true,
    channels: [
      {
        name: "Facebook_Messenger",
        label: "Facebook Messenger",
        url: "https://m.me/1BsJcmAYLn",
        color: "#0084FF",
        icon: "messenger"
      },
      {
        name: "Instagram",
        label: "Instagram",
        url: "https://www.instagram.com/studioby.char/",
        color: "#E4405F",
        icon: "instagram"
      },
      {
        name: "LinkedIn",
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/shot-by-char/",
        color: "#0077B5",
        icon: "linkedin"
      }
    ]
  };

  var config = window.ChatyConfig ? Object.assign({}, defaultConfig, window.ChatyConfig) : defaultConfig;

  var isMobile = window.innerWidth <= 480;
  var iconSize = isMobile ? 36 : 49;
  var itemGap = isMobile ? 9 : 11;
  var bottomOffset = 18;
  var leftOffset = 18;

  function getSvgIcon(iconName, color, accentColor) {
    var svgs = {
      messenger: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="' + color + '"/><path d="M19.5 9.5C13.701 9.5 9 13.748 9 19.074c0 3.014 1.474 5.702 3.778 7.456V30l3.294-1.81c.878.244 1.81.376 2.778.376 5.799 0 10.5-4.248 10.5-9.574S25.299 9.5 19.5 9.5zm1.04 12.878l-2.674-2.852-5.22 2.852 5.74-6.096 2.74 2.852 5.154-2.852-5.74 6.096z" fill="white"/></svg>',
      instagram: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="' + color + '"/><rect x="11" y="11" width="17" height="17" rx="5" stroke="white" stroke-width="1.8" fill="none"/><circle cx="19.5" cy="19.5" r="4" stroke="white" stroke-width="1.8" fill="none"/><circle cx="25" cy="14" r="1.2" fill="white"/></svg>',
      linkedin: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="' + color + '"/><path d="M15.186 14.359a1.583 1.583 0 11-3.167 0 1.583 1.583 0 013.167 0zM15.25 16.75h-3.042v9.75h3.042v-9.75zm4.846 0h-3.014v9.75h3.014v-5.12c0-2.848 3.694-3.081 3.694 0v5.12h3.032v-6.175c0-4.806-5.467-4.631-6.726-2.264V16.75z" fill="white"/></svg>'
    };
    return svgs[iconName] || svgs.messenger;
  }

  function createWidget() {
    var isOpen = false;
    var autoCloseTimer = null;
    var channelEls = [];
    var triggerTooltipVisible = false;

    // Detect if device supports touch
    var isTouchDevice = function() {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    };
    var hasTouchSupport = isTouchDevice();

    var triggerSvg = '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.5" cy="19.5" r="19.5" fill="' + config.accentColor + '"/><path d="M26.4 13H13.6C12.72 13 12 13.72 12 14.6V23.4C12 24.28 12.72 25 13.6 25H16L19.5 28L23 25H26.4C27.28 25 28 24.28 28 23.4V14.6C28 13.72 27.28 13 26.4 13Z" fill="white"/><circle cx="15.5" cy="19" r="1.25" fill="' + config.accentColor + '"/><circle cx="19.5" cy="19" r="1.25" fill="' + config.accentColor + '"/><circle cx="23.5" cy="19" r="1.25" fill="' + config.accentColor + '"/></svg>';

    var closeSvg = '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.5" cy="19.5" r="19.5" fill="' + config.accentColor + '"/><path d="M25 14L14 25M14 14L25 25" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>';

    var triggerEl = document.createElement("div");
    triggerEl.id = "chaty-trigger";
    triggerEl.style.cssText = [
      "position:fixed",
      "bottom:" + bottomOffset + "px",
      "left:" + leftOffset + "px",
      "width:" + iconSize + "px",
      "height:" + iconSize + "px",
      "border-radius:50%",
      "cursor:pointer",
      "z-index:10010",
      "line-height:0",
      "transition:transform 0.2s ease"
    ].join(";");
    triggerEl.innerHTML = triggerSvg;

    if (!hasTouchSupport) {
      // Desktop: use hover to open
      triggerEl.onmouseenter = function() {
        triggerEl.style.transform = "scale(1.15)";
        if (!isOpen) openWidget();
      };
      triggerEl.onmouseleave = function() { triggerEl.style.transform = "scale(1)"; };
    }

    // Mobile/Touch: tap to toggle
    if (hasTouchSupport) {
      triggerEl.ontouchstart = function(e) {
        e.preventDefault();
        triggerEl.style.transform = "scale(1.15)";
        isOpen ? closeWidget() : openWidget();
      };
      triggerEl.ontouchend = function(e) {
        e.preventDefault();
        triggerEl.style.transform = "scale(1)";
      };
    }

    var triggerTooltip = document.createElement("div");
    triggerTooltip.style.cssText = [
      "position:fixed",
      "bottom:" + (bottomOffset + iconSize / 2) + "px",
      "left:" + (leftOffset + iconSize + 20) + "px",
      "background:" + config.accentColor,
      "color:#fff",
      "padding:7px 11px",
      "border-radius:4px",
      "font-size:13px",
      "font-weight:300",
      "z-index:10009",
      "opacity:0",
      "pointer-events:none",
      "white-space:nowrap",
      "font-family:Inter,sans-serif",
      "letter-spacing:0.3px",
      "transform:translateY(50%) scale(0.9)",
      "transform-origin:left center",
      "transition:opacity 0.2s ease, transform 0.2s ease"
    ].join(";");
    triggerTooltip.textContent = "Contact us";
    document.body.appendChild(triggerTooltip);
    document.body.appendChild(triggerEl);

    config.channels.forEach(function(ch, idx) {
      var itemEl = document.createElement("div");
      var stackBottom = bottomOffset + iconSize + itemGap + idx * (iconSize + itemGap);

      itemEl.style.cssText = [
        "position:fixed",
        "bottom:" + bottomOffset + "px",
        "left:" + leftOffset + "px",
        "width:" + iconSize + "px",
        "height:" + iconSize + "px",
        "border-radius:50%",
        "z-index:10009",
        "opacity:0",
        "pointer-events:none",
        "line-height:0",
        "transition:bottom 0.3s ease, opacity 0.3s ease, transform 0.2s ease"
      ].join(";");

      var link = document.createElement("a");
      link.href = ch.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", ch.label);
      link.style.cssText = "display:block;width:" + iconSize + "px;height:" + iconSize + "px;border-radius:50%;line-height:0;position:relative;";
      link.innerHTML = getSvgIcon(ch.icon, ch.color, config.accentColor);

      var svgEl = link.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", iconSize);
        svgEl.setAttribute("height", iconSize);
        svgEl.style.filter = "grayscale(100%)";
        svgEl.style.transition = "filter 0.2s ease";
      }

      var channelTooltip = document.createElement("div");
      channelTooltip.style.cssText = [
        "position:absolute",
        "top:50%",
        "left:" + (iconSize + 20) + "px",
        "background:" + config.accentColor,
        "color:#fff",
        "padding:7px 11px",
        "border-radius:4px",
        "font-size:13px",
        "font-weight:300",
        "z-index:10008",
        "opacity:0",
        "pointer-events:none",
        "white-space:nowrap",
        "font-family:Inter,sans-serif",
        "letter-spacing:0.3px",
        "transform:translateY(-50%) scale(0.9)",
        "transform-origin:left center",
        "transition:opacity 0.2s ease, transform 0.2s ease"
      ].join(";");
      channelTooltip.textContent = ch.label;
      link.appendChild(channelTooltip);

      link.addEventListener("mouseenter", function() {
        channelTooltip.style.opacity = "1";
        channelTooltip.style.transform = "translateY(-50%) scale(1.1)";
        itemEl.style.transform = "scale(1.15)";
        if (svgEl) svgEl.style.filter = "grayscale(0%)";
      });
      link.addEventListener("mouseleave", function() {
        channelTooltip.style.opacity = "0";
        channelTooltip.style.transform = "translateY(-50%) scale(0.9)";
        itemEl.style.transform = "scale(1)";
        if (svgEl) svgEl.style.filter = "grayscale(100%)";
      });

      itemEl.appendChild(link);
      document.body.appendChild(itemEl);
      channelEls.push({ el: itemEl, bottom: stackBottom });
    });

    function openWidget() {
      isOpen = true;
      triggerEl.innerHTML = closeSvg;
      channelEls.forEach(function(item, idx) {
        item.el.style.transitionDelay = (idx * 0.06) + "s";
        item.el.style.bottom = item.bottom + "px";
        item.el.style.opacity = "1";
        item.el.style.pointerEvents = "auto";
      });
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      if (config.autoClose) autoCloseTimer = setTimeout(function() {
        if (isOpen) closeWidget();
      }, config.autoClose);
    }

    function closeWidget() {
      isOpen = false;
      triggerEl.innerHTML = triggerSvg;
      channelEls.forEach(function(item) {
        item.el.style.transitionDelay = "0s";
        item.el.style.bottom = "-" + (iconSize + 10) + "px";
        item.el.style.opacity = "0";
        item.el.style.pointerEvents = "none";
      });
      if (autoCloseTimer) { clearTimeout(autoCloseTimer); autoCloseTimer = null; }
    }

    // Click handler for desktop only (mobile uses touch)
    if (!hasTouchSupport) {
      triggerEl.onclick = function(e) {
        e.stopPropagation();
        isOpen ? closeWidget() : openWidget();
      };
    }

    if (config.zoneDetection) {
      document.addEventListener("mousemove", function(e) {
        var vH = window.innerHeight;
        var vW = window.innerWidth;
        var isInZone = e.clientY > vH * 0.6 && e.clientX < vW * 0.4;

        if (isInZone && !isOpen) {
          if (!triggerTooltipVisible) {
            triggerTooltip.style.opacity = "1";
            triggerTooltip.style.transform = "translateY(50%) scale(1.1)";
            triggerTooltipVisible = true;
          }
        } else if (!isInZone && isOpen) {
          closeWidget();
        } else if (!isInZone && triggerTooltipVisible) {
          triggerTooltip.style.opacity = "0";
          triggerTooltip.style.transform = "translateY(50%) scale(0.9)";
          triggerTooltipVisible = false;
        }
      });
    }

    document.addEventListener("click", function(e) {
      if (!isOpen) return;
      var onChannel = channelEls.some(function(item) { return item.el.contains(e.target); });
      if (!triggerEl.contains(e.target) && !onChannel) closeWidget();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
