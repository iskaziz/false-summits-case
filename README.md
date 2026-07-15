# False Summits: Interactive Case Archive — V6 Fullscreen Route Board

Static microsite prototype for the feature documentary **False Summits**.

Version 6 makes the route board the dominant full-screen element. Supporting archive controls are compressed into the header and footer so the visual reconstruction remains on screen.

## Sections

- Case Board
- Evidence
- People
- Questions
- Film

## V5 Route Board Improvements

- The full Gunung Tahan route board is shown by default.
- Users can zoom in, zoom out, reset, fit the map, and open full-screen map mode.
- The map can be dragged/panned after zooming.
- Clickable numbered hotspots remain locked to the route board image.
- Route, medical, communication, and timeline layers are still controlled by the layer tabs.
- Selected route markers update the inspector panel instead of creating extra scrolling.

## File Structure

```txt
index.html
style.css
app.js
data.js
assets/images/gunung-tahan-route-board.png
```

## How to Run Locally

Open `index.html` directly in a browser.

No build tools, backend, or framework are required.

## GitHub Pages Deployment

1. Replace the files in your repository root.
2. Commit and push.
3. Enable GitHub Pages from the repository settings if not already enabled.
4. Use the root folder as the publishing source.

## Editing Hotspots

Route-board hotspots are stored in `data.js` under `routeMarkers`.

Each marker uses percentage coordinates:

```js
{
  id: "RM-001",
  title: "Sungai Relau Base Camp",
  x: 10,
  y: 34
}
```

Adjust `x` and `y` to reposition a marker relative to the route-board image.

## Public Evidence Safety

This archive should distinguish clearly between verified records, witness recollections, unresolved discrepancies, and editorial analysis. Redact sensitive personal information before publishing source material publicly.

## V5.1 Map Viewer Fix

This build corrects the route board zoom behaviour:

- The route board now calculates a true fit-to-screen base scale from the image's natural dimensions.
- The **Fit** and **Reset** buttons return to the full-board overview.
- Zoom now starts from the fitted full-board view, not from a cropped 100% image view.
- Hotspots are locked to the same image coordinate layer, so they stay aligned while zooming and panning.
- Visible hotspot markers are now small labelled dots (`M1–M5`, `C1–C3`, `D`) instead of misleading sequential numbers.


## V6 Fullscreen Layout

- The **Case Board** is now structured as a fullscreen route-board experience.
- The route board occupies the main viewport area.
- Layer controls and zoom controls sit above the map.
- Archive counters remain visible in the top strip.
- The inspector is now an overlay panel inside the map area so the board remains visible.
- The compressed timeline rail moves to the footer strip beneath the map.
- Evidence, People, Questions, and Film remain available through the main navigation.


## V6.1 Refinement

This build refines the fullscreen route-board interface:

- Header height is reduced to give the route board more screen space.
- The inspector is collapsible.
- The timeline rail can be hidden.
- On mobile, the timeline rail auto-hides and the inspector starts collapsed.
- A cinematic “Enter Map” overlay introduces the board and then clears the screen.
- The map remains the primary visual element while Evidence, People, Questions, and Film remain available from the header.
