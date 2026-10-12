# Bea Son Portfolio — Go Live Edition

This version uses **only HTML, CSS, and JavaScript**. No Node.js, Vite, React, npm, or build command is needed.

## Open in VS Code
1. Extract this ZIP and open its folder in VS Code.
2. Install **Live Server** by Ritwick Dey if needed.
3. Right-click **index.html** > **Open with Live Server**, or click **Go Live**.
4. Your browser will open the portfolio at a local `127.0.0.1:5500` address.

## Edit the portfolio
- `content.js` contains projects, UI/UX activities, creative work, tools, services and the FOREVER case study. Edit it to add real titles, descriptions and image paths.
- `styles.css` controls the visual design.
- `images/` is for your real screenshots and portrait. Add paths such as `images/forever-home.png` to the corresponding `images` array in `content.js`.
- `cv/` is for your actual CV PDF. The CV button is deliberately disabled until you add a real CV file and activate its link in `script.js`.
- `profile.email` and social links are blank until you provide them. The contact form does not send email yet; it clearly tells visitors that delivery is not connected.

## Navigate the pages
Navigation uses URLs such as `#/projects`, `#/activities`, `#/creative`, and `#/projects/forever` so page links continue working with Live Server or simple static hosting.

## Publish publicly
Upload the extracted **files** to a static host (e.g. GitHub Pages or Netlify), preserving the folder structure. A Go Live URL is **only local** and cannot be shared as a public portfolio link.
