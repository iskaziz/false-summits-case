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

Route-board hotspots are stored in `data.js` under `routeMarkers`. Each entry positions one clickable dot on the route-board image and feeds the marker inspector, the Milestone Tracks panel, and the Case Board layer tabs.

Example marker (values below are placeholders — replace with real content, not evidentiary text):

```js
{
  id: "RM-001",              // required — unique ID, used for lookups and links
  title: "Example Waypoint",  // required — shown as the inspector heading and hotspot tooltip
  x: 11,                      // required — horizontal position, percent of image width (0–100)
  y: 45.7,                    // required — vertical position, percent of image height (0–100)
  mapLabel: "M1",             // optional — short label shown on the hotspot itself; falls back to shortLabel or blank
  markerType: "briefing",     // optional — controls hotspot color and which layer tab includes it
                               //   (e.g. "briefing" | "medical" | "decision" | "route" | "communication" | "debrief"); defaults to "route" if omitted
  track: "Mountain Elevation Milestones", // optional — must exactly match "Mountain Elevation Milestones" or
                               //   "Ground Communication Track" to appear in the Milestone Tracks panel; other markers still
                               //   appear on the map but are not grouped into either track lane
  linkedTimelineEvents: ["TL-001"], // optional — IDs from `timelineEvents`; shown in the marker's "Linked timeline" list and
                               //   required (at least one ID that resolves to a real timelineEvents record) for the marker
                               //   to appear under the Case Board "Timeline" layer tab
  location: "Example Location",   // optional — shown in the inspector meta grid
  keyIssue: "Example issue label", // optional — shown in the inspector meta grid; falls back to "Requires clarification"
  people: ["P-001"],          // optional — IDs from `people`; rendered as badges
  evidence: ["FS-TR-001"],    // optional — IDs from `evidenceItems`; shown in the "Linked evidence" list
  summary: "Example summary text describing this point on the route.", // optional — main inspector body text
  rajaFocus: "Example note on how this point relates to the case."     // optional — shown in a highlighted callout if present
}
```

Only `id`, `title`, `x`, and `y` are required for a hotspot to render and be clickable; every other field is optional and only affects what the inspector, track panel, or layer filters show for that marker.

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

## V6.2 Map-First Unboxed Layout

This build removes the boxed route-board presentation and makes the map itself fill the full visible screen beneath the header.

Changes:

- Route board fills the viewport instead of sitting inside a card/box.
- Controls are compact floating pills over the map.
- Inspector has been moved below the map to reduce visual clutter.
- Timeline rail sits below the inspector as a compact horizontal strip.
- Text, buttons, tables, accordions, and panels have been tightened to reduce scrolling.
- Header and footer are slimmer.

The map remains zoomable and pannable, with hotspots still aligned to the route-board image coordinate layer.

## V6.3 Track Navigation + Pinch Zoom

This build refines the map-first interface:

- Hotspot labels are suppressed on the map to reduce overlap.
- Hotspots are now smaller subtle dots for direct map selection.
- A compact **Milestone Tracks** panel below the map displays:
  - Mountain Elevation Milestones
  - Ground Communication Track
  - Chronological Timeline
- Track cards can be clicked to update the inspector below the map.
- The map supports pinch-to-zoom on touch devices in addition to zoom buttons and drag-to-pan.
- The older compressed rail is hidden to avoid duplicate timeline presentation.


## V6.4 Horizontal Pan Mode

This build removes zoom/pinch as the primary route-board interaction.

Changes:

- Zoom buttons are removed from the map interface.
- Pinch zoom is disabled.
- The route board uses a fixed-height horizontal pan/scroll viewer.
- Users can drag or horizontally scroll to move across the board.
- Hotspots remain clickable because they are still locked to the same image layer.
- Milestone Tracks remain the primary way to navigate detailed route/timeline entries.


## V6.4.1 Pan Crop Fix

This build corrects the horizontal pan viewer:

- The map canvas now starts at the true top-left of the image.
- The image is no longer centered with hidden overflow.
- The top edge, left edge, and right edge are reachable through normal scroll/pan.
- Hotspot coordinates remain attached to the same image layer.
- The route board uses full-height fitting first, then horizontal overflow where needed.


## V6.4.2 Layer Strip + Scroll Fix

This build fixes two usability issues:

- The All / Route / Medical / Communication / Timeline controls are moved above the map so they no longer block the top of the route board.
- The map now captures wheel and trackpad scrolling inside the map area.
- Trackpad vertical scroll pans down the map.
- Trackpad horizontal scroll pans sideways.
- Shift + mouse wheel pans horizontally.
- The floating map control overlay is removed to keep the map unobstructed.
