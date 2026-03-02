# Chaty Widget - Universal Floating Contact Widget

A lightweight, configurable floating contact widget that can be installed on any website with a single script tag. Features a smooth, modern design with customizable colors, channels, and behavior.

**Version:** 1.1.0
**Status:** Production Ready ✓

## Features

- **Fixed Positioning**: Trigger button stays in place while scrolling
- **Smooth Animations**: Elegant hover effects and auto-expand behavior
- **Grayscale Icons**: Icons are monochrome until hover, with color on interaction
- **Zone Detection**: Auto-closes when user moves away from the widget area
- **Auto-Close**: Configurable auto-close timeout
- **Responsive**: Adapts sizing for mobile and desktop
- **No Dependencies**: Pure vanilla JavaScript, no jQuery or frameworks required
- **Configurable**: Customize accent color, channels, position, and behavior

## Installation

### Option 1: Using Loader Script (Recommended)

The easiest way to add Chaty to any website:

```html
<!-- In your <head> tag, add config -->
<script>
  window.ChatyConfig = {
    accentColor: "#C08A74",
    position: "bottom-left",
    autoClose: 30000,
    zoneDetection: true,
    channels: [
      {
        name: "Facebook_Messenger",
        label: "Facebook Messenger",
        url: "https://m.me/your-page-id",
        color: "#0084FF",
        icon: "messenger"
      },
      {
        name: "Instagram",
        label: "Instagram",
        url: "https://www.instagram.com/your-handle/",
        color: "#E4405F",
        icon: "instagram"
      },
      {
        name: "LinkedIn",
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/your-company/",
        color: "#0077B5",
        icon: "linkedin"
      }
    ]
  };
</script>

<!-- Load the widget -->
<script src="https://your-cdn.com/chaty-loader.js"></script>
```

The loader will automatically fetch the CSS and widget JavaScript from the same directory.

### Option 2: Direct Script Include

If you prefer to load the CSS and script directly:

```html
<!-- In your <head> tag -->
<link rel="stylesheet" href="https://your-cdn.com/chaty.min.css">

<!-- Before closing </body> tag -->
<script src="https://your-cdn.com/chaty.js"></script>
```

Then set your configuration before the script loads:

```html
<script>
  window.ChatyConfig = { /* config here */ };
</script>
```

### Option 3: NPM Package

```bash
npm install @studiobychar/chaty-widget
```

```html
<!-- In your <head> tag -->
<link rel="stylesheet" href="node_modules/@studiobychar/chaty-widget/chaty.min.css">

<!-- Before closing </body> tag -->
<script src="node_modules/@studiobychar/chaty-widget/chaty.js"></script>
```

## Configuration

### `window.ChatyConfig` Object

All options are optional. Defaults are shown below:

```javascript
window.ChatyConfig = {
  // Accent color for trigger button and tooltips
  accentColor: "#C08A74",

  // Position of the widget (currently supports "bottom-left")
  position: "bottom-left",

  // Auto-close timeout in milliseconds (set to 0 to disable)
  autoClose: 30000,

  // Enable zone detection (closes widget when moving away)
  zoneDetection: true,

  // Array of contact channels
  channels: [
    {
      name: "Facebook_Messenger",           // Unique identifier
      label: "Facebook Messenger",           // Hover tooltip text
      url: "https://m.me/your-page-id",     // Link destination
      color: "#0084FF",                      // Channel color
      icon: "messenger"                      // Icon type: messenger, instagram, linkedin
    },
    // ... more channels
  ]
};
```

### Supported Icon Types

- `messenger` - Facebook Messenger icon
- `instagram` - Instagram icon
- `linkedin` - LinkedIn icon

## Examples

### Studio by Char

```javascript
window.ChatyConfig = {
  accentColor: "#C08A74",
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
```

### Single Channel

```javascript
window.ChatyConfig = {
  accentColor: "#2563EB",
  channels: [
    {
      name: "Instagram",
      label: "Follow on Instagram",
      url: "https://www.instagram.com/your-handle/",
      color: "#E4405F",
      icon: "instagram"
    }
  ]
};
```

### With Auto-Close Disabled

```javascript
window.ChatyConfig = {
  accentColor: "#C08A74",
  autoClose: 0, // Never auto-close
  zoneDetection: false, // Keep widget open when moving away
  channels: [
    // ... your channels
  ]
};
```

## Behavior

### Desktop Interaction

1. **Hover on trigger button**: Widget expands with animation
   - Trigger button scales to 115%
   - Channel icons appear above with staggered animation
   - "Contact us" tooltip appears

2. **Hover on channel icon**: Icon highlights
   - Icon scales to 115%
   - Color filter removes (goes from grayscale to full color)
   - Channel tooltip appears with label

3. **Click on channel**: Opens link in new tab

4. **Move away from widget**:
   - If `zoneDetection: true`, widget closes when moving beyond bottom 40% and left 40% of screen
   - Otherwise, widget closes when mouse leaves the widget area

5. **Click outside**: Widget closes immediately

6. **Auto-close**: Widget closes after `autoClose` milliseconds of inactivity

### Mobile/Touch Interaction

1. **Tap trigger button**: Widget expands with animation
   - Trigger button scales to 115%
   - Channel icons appear above with staggered animation
   - "Contact us" tooltip appears

2. **Tap trigger button again**: Widget closes with animation

3. **Tap on channel icon**: Opens link in new tab

4. **Tap outside widget**: Widget closes immediately

5. **Auto-close**: Widget closes after `autoClose` milliseconds of inactivity

### Zone Detection

When enabled, the widget monitors mouse movement and:
- Shows "Contact us" tooltip when cursor is in the bottom-left 40% of screen
- Automatically closes the widget when cursor leaves that zone
- Helps prevent widget from being annoying to users not interested in contact

## Styling

The widget uses inline styles and minimal CSS. All elements are positioned fixed in the bottom-left corner with:
- Icon size: 49px (mobile: 36px)
- Gap between icons: 11px (mobile: 9px)
- Offset from bottom/left: 18px
- Tooltip: 20px from icon center, vertically centered

The widget is fully self-contained and won't interfere with your site's existing styles.

## Customization

### Change Colors Globally

```javascript
window.ChatyConfig = {
  accentColor: "#FF5733", // Changes trigger and tooltip color
  channels: [
    {
      name: "WhatsApp",
      label: "WhatsApp",
      url: "https://wa.me/1234567890",
      color: "#25D366", // Individual channel color
      icon: "messenger" // Note: custom icons would need code modification
    }
  ]
};
```

### Reposition Widget

Currently, the widget only supports bottom-left positioning. To change this, modify line 20 in `chaty.js`:

```javascript
var position = "bottom-left"; // Change to implement other positions
```

### Mobile vs Desktop Sizing

The widget automatically detects screen width (480px breakpoint) and adjusts:
- Desktop: 49px icons, 11px gaps, 18px offsets
- Mobile: 36px icons, 9px gaps, 18px offsets

## Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: 11+
- IE: Not supported (ES5 features required)

## Performance

- **File Size**:
  - chaty.js: ~4 KB minified
  - chaty.min.css: ~2 KB minified
  - Total: ~6 KB (loaded asynchronously)
- **DOM Elements**: Creates 7 DOM elements (1 trigger + channels + tooltips)
- **No JavaScript Framework Dependencies**: Pure vanilla JavaScript

## Troubleshooting

### Widget not appearing

1. Check browser console for errors
2. Ensure `window.ChatyConfig` is set before script loads
3. Verify URLs are correct
4. Check that CSS is loaded (network tab in DevTools)

### Widget appears but styling is off

1. Clear browser cache
2. Ensure `chaty.min.css` is fully loaded
3. Check that no other CSS is conflicting (unlikely, very scoped)

### Channels not clickable

1. Ensure `channels` array is properly configured
2. Verify `url` field contains valid URLs
3. Check browser console for JavaScript errors

## API

### Window Object

The widget exposes no public API methods - all configuration is done via `window.ChatyConfig`.

### Events

Currently, the widget doesn't emit custom events. Future versions may add:
- `chaty:open` - Widget opened
- `chaty:close` - Widget closed
- `chaty:click` - Channel clicked

## Future Enhancements

Potential improvements for future versions:
- Bottom-right, top-left, top-right positioning options
- Custom icon support
- Event emitters for integration
- Session tracking/analytics
- A/B testing for message variants
- Rate limiting (show tooltip only once per session)

## License

MIT - Feel free to use in your projects!

## Support

For issues or questions:
- Check the examples above
- Review the configuration options
- Inspect browser console for error messages
