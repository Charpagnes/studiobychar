1. Project overview
Studio by Char is a Chiang Mai–based creative production studio offering an upmarket lifestyle photo studio, podcast and video sets, and full production services for brands and creators. The website is a fast static site using pure HTML (plus CSS and minimal JS) with an airy, elegant visual style and elegant typography.

Target word counts: Home 800–1000, Studio 700–900, Podcast & Video 700–900, Production Services 900–1200, Portfolio 500–700, About 700–1000, Book 500–800. Each section should have enough detail to be helpful for SEO and readers, not just headings and bullets. Do not use em dashes. When expanding a page, stay within the target word range and balance copy across sections so no single block feels like a wall of text.

Primary goals and SEO targets.

2. File and URL structure (hard requirement)
Physical folder structure (repo):

text
/project-root
  index.html              # Home (root)
  /pages
    studio.html           # Studio – The Concept
    podcast-video.html    # Podcast & Video – The Set
    production-services.html
    portfolio.html
    about.html
    book.html
  /images                 # All photos (WebP)
    *.webp
  /css
    style.css             # Main stylesheet
  /js                     # Optional light JS, if needed
    main.js
  /assets                 # (Optional) fonts, icons, etc.
This pattern—index.html at root, inner pages under /pages/, shared assets under /images, /css, /js—is a common, sensible structure for static sites.

Linking rules:

Home: /index.html (often just /).

Inner pages: /pages/studio.html, /pages/podcast-video.html, etc.

From index.html to inner pages:

href="pages/studio.html"

href="pages/podcast-video.html"

From inner pages back to Home:

href="../index.html"

From inner page to another inner page (same folder):

href="production-services.html" (no ../ needed if they are all inside /pages/).

Image paths:

From index.html:

<img src="images/downstairs-studio.webp" alt="...">

From any file inside /pages/:

<img src="../images/downstairs-studio.webp" alt="...">

This matches standard relative path practices for static sites where HTML lives in both root and a pages/ subdirectory.

3. Site map mapped to files
Page	File	URL	Notes
Home	index.html	/	Root entry, routes to rental vs production.
Studio – The Concept	pages/studio.html	/pages/studio.html	Studio rental only.
Podcast & Video – The Set	pages/podcast-video.html	/pages/podcast-video.html	Podcast & video floor.
Production Services	pages/production-services.html	/pages/production-services.html	Service detail.
Portfolio	pages/portfolio.html	/pages/portfolio.html	Work by category.
About	pages/about.html	/pages/about.html	Vision, philosophy, Chiang Mai.
Book	pages/book.html	/pages/book.html	Enquiry hub.
In <nav>, all menu links should use these relative paths from the current file (e.g. from inner pages, Home is ../index.html).
​

4. Visual direction & “anti‑gravity” (unchanged, but tied to structure)
One shared stylesheet at /css/style.css used by index.html and all /pages/*.html to keep typography, header, and “floating” card visuals consistent.
​
​

All imagery in /images as WebP; filenames aligned to sections (e.g. hero-studio.webp, upstairs-podcast-floor.webp).

Optional /js/main.js for very light enhancements only (e.g. header fade or subtle scroll reveals), not required for core UX.

5. Page‑by‑page content (same as previous PRD, now explicitly bound to files)
Nothing changes in the content plan, just associate each with its file:

Home content spec → index.html in root.

Studio – The Concept → pages/studio.html.

Podcast & Video – The Set → pages/podcast-video.html.

Production Services → pages/production-services.html.

Portfolio → pages/portfolio.html.

About → pages/about.html.

Book → pages/book.html.

Each page:

Links to shared CSS: <link rel="stylesheet" href="/css/style.css"> (root‑relative) or ../css/style.css from /pages/ depending on how you serve it.

Uses correct relative paths for images as described above.

6. SEO and technical notes (updated for structure)
sitemap.xml at root should list: /, /pages/studio.html, /pages/podcast-video.html, /pages/production-services.html, /pages/portfolio.html, /pages/about.html, /pages/book.html.

robots.txt at root allows crawl of / and /pages/.

Keep all CSS and JS under their respective folders (/css, /js) for clean organisation and easy caching.

