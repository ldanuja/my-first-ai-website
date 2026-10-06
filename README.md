# Carwash website

A static site — no build step, no server code.

```
index.html      page structure
styles.css      all styling (colours at the top, in :root)
main.js         fills the page from content.json, sets the footer year
content.json    your business details — edit this file
```

Keep all four files together in the same place.

## Editing your details
Open `content.json` and replace every `[PLACEHOLDER]`: business name, area, phone,
WhatsApp number (digits only with country code, e.g. 6591234567), email, social handle,
address, opening hours and services. Add or remove entries in `"services"` and `"hours"`
and the page updates to match. Set `"featured": true` on one service to give it the dark
"Most popular" card; `"icon"` can be `"car"`, `"sparkle"` or `""`.

Tip: also update the placeholders written directly in `index.html`. They are shown if the
JSON can't load, and search engines read them before the script runs.

## Previewing on your computer
Browsers block `content.json` when you double-click `index.html` (file://), so the page
shows its built-in placeholder text. To preview with your JSON, run a local server in this folder:
- VS Code: install the "Live Server" extension and click "Go Live", or
- Terminal: `python3 -m http.server` then open http://localhost:8000

Once deployed, it works normally.

## Adding photos
1. Put your photos next to `index.html`.
2. In `index.html`, swap each placeholder box for the `<div class="media"><img ...></div>`
   line in the comment above it, and change `images/hero.jpg` to your photo's file name.

## Deploying (pick one)
- **Netlify Drop**: go to app.netlify.com/drop and drag this whole folder in.
- **GitHub Pages**: push the folder to a repo, then Settings › Pages › deploy from the main branch.
- **Vercel / Cloudflare Pages**: import the folder or repo. No build command; output directory is the root.
- **Any web host**: upload all the files together to the public folder.

## Changing the colour
Edit `--accent` (buttons) and `--navy` (dark sections) at the top of `styles.css`.
