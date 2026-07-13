# False Summits: Interactive Case Archive — V4 Compact Case Board

A static, GitHub Pages-ready documentary microsite for the feature documentary **False Summits**.

Version 4 reorganises the previous route-board build into a denser, lower-scroll investigation interface.

## What changed in V4

- Reduced the main navigation to five sections:
  - Case Board
  - Evidence
  - People
  - Questions
  - Film
- Combined the previous Timeline, Route Map, Medical Tracker, Communication Track and Relationship elements into the central **Case Board**.
- Converted long scrolling sections into:
  - layer toggles
  - a split-screen inspector panel
  - compact evidence rows
  - people selector + profile panel
  - issue/discrepancy accordions
  - modals only for full evidence detail
- Kept the interactive Gunung Tahan Route Board image and marker system.
- Preserved all existing core data in `data.js`.

## Files

```txt
index.html
style.css
app.js
data.js
README.md
assets/images/gunung-tahan-route-board.png
```

## How to run locally

Open `index.html` in a browser.

No build tools, backend, package manager, or external framework is required.

## How to deploy on GitHub Pages

1. Unzip this package.
2. Replace the files in the root of your GitHub repository.
3. Commit and push.
4. In GitHub, enable Pages from the repository settings if not already enabled.

## How the compact layout works

### Case Board

The Case Board is the primary public interface. It uses the illustrated route board as the visual anchor, with layer buttons:

- All
- Route
- Medical
- Communication
- Timeline

Clicking a route marker, timeline row, medical marker, or issue thread loads details into the right-hand inspector panel on desktop. On mobile the inspector appears below the board.

### Evidence

The Evidence section now uses a compact table/list rather than large cards. Search and filters remain available.

### People

People are shown as a selector list. Clicking a person updates the profile panel with linked events and evidence.

### Questions

Discrepancies and investigative themes are grouped into accordions to reduce scrolling and improve focus.

## Adding content

Edit `data.js`.

Main arrays:

- `timelineEvents`
- `evidenceItems`
- `people`
- `medicalMarkers`
- `discrepancies`
- `routeMarkers`
- `issueThreads`
- `photoItems`
- `relationshipMap`

## Public evidence safety reminder

Before publishing real documents, photos, audio or transcripts, review and redact sensitive data:

- phone numbers
- IC/passport numbers
- private addresses
- unrelated third-party information
- unnecessary private medical identifiers
- unredacted autopsy details that are not required for public understanding

The archive should continue to distinguish between verified records, witness recollections, editorial analysis and unresolved discrepancies.
