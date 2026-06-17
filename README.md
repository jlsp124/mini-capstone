# The Future I'm Building

Static GitHub Pages site for Jovan Pahal's CLE 10 Mini Capstone.

## Run Locally

No build step is required. Serve the folder with a small static server:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/mini-capstone/
```

If you are already inside this repo folder when running the server, use:

```text
http://localhost:8000/
```

## Modes

- Landing screen: default route, with `Begin the Story` and `Read Mode`.
- Story mode: `?mode=story`
- Reader mode: `?mode=reader`

Story mode is a scroll-driven cinematic story. The down/right arrows, Page Down, and space move forward; the up/left arrows and Page Up move backward.

## Replace Assets

Every visual placeholder shows the expected replacement path on the card. Add real files at these exact paths when you are ready to replace the placeholders:

```text
assets/photos/kindergarten-still.jpg
assets/photos/japan-photo.jpg
assets/screenshots/ableton-session.jpg
assets/screenshots/github-project.jpg
assets/photos/dad-opening-day-practice.jpg
assets/photos/kindergarten-dentist-video-still.jpg
assets/screenshots/music-production-notes.jpg
assets/dental/Visualization_DigitalModelUnsectioned_18-28.stl
assets/dental/Visualization_DigitalModelUnsectioned_38-48.stl
```

The STL viewer in scene 12 starts with a polished Three.js fallback model and keeps the exact file paths visible.

Recommended image formats are `.jpg`, `.png`, or `.webp`. Keep filenames exactly the same unless you also update the matching path in `app.js`.

The current version intentionally does not request missing image files, so absent photos and screenshots never create broken image icons.

To turn an image placeholder into a live image panel:

1. Add the image file at the exact listed path.
2. Open `app.js`.
3. Add that path to `liveImageAssets`.

Example:

```js
const liveImageAssets = new Set([
  "assets/photos/japan-photo.jpg",
]);
```

Only add a path to `liveImageAssets` after the file exists.

To enable the real dental STL models:

1. Add both `.stl` files at the exact paths listed above.
2. Open `app.js`.
3. Change:

```js
const loadDentalStlFiles = false;
```

to:

```js
const loadDentalStlFiles = true;
```

If STL loading fails or the files are not enabled, the fallback model stays in place.

## GitHub Pages Deployment

This site is designed to be served from:

```text
/mini-capstone/
```

For GitHub Pages:

1. Push these files to the `main` branch.
2. In the GitHub repo, open `Settings` -> `Pages`.
3. Set source to `Deploy from a branch`.
4. Choose `main` and `/root`.
5. Save.

The published URL should look like:

```text
https://jlsp124.github.io/mini-capstone/
```

## Optional Comments Backend

The comments section only appears at the end of Reader Mode, after Sources. It is hidden in Presentation Mode.

By default, comments are not connected and the UI shows:

```text
Comments are not connected yet.
```

To connect a backend later, set this before `app.js` loads in `index.html`:

```html
<script>
  window.CAPSTONE_COMMENTS_ENDPOINT = "https://your-comments-endpoint.example.com/comments";
</script>
```

The frontend sends:

```json
{
  "name": "Anonymous",
  "message": "Comment text"
}
```

The name field is optional and defaults to `Anonymous`. Messages are limited to 2000 characters.

## Libraries

- Native scroll and IntersectionObserver for story mode
- Three.js with STLLoader and OrbitControls for the dental model viewer
