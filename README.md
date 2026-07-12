# False Summits: Interactive Case Archive — Version 2

A polished static microsite prototype for the feature documentary **False Summits**.

This project is designed as a public-facing documentary evidence archive for reconstructing the 2022 Gunung Tahan expedition that ended in the death of Raja Azlan Shah.

The site uses a restrained **case file folder + digital evidence database** design. It is intended to help visitors explore the timeline, evidence records, witness/role profiles, medical markers, route reconstruction, photo references, issue threads, relationship mapping, and discrepancies requiring clarification.

## Version 2 Features

- Animated case file landing screen
- Dynamic archive dashboard counters
- “Start Here: Understand the Case in 5 Steps” guided path
- Issue-thread cards for thematic investigation
- Searchable evidence locker
- Evidence type and status filters
- Enhanced evidence modal viewer
- Timeline event modals
- Witness/profile modals
- Stylised interactive route board with clickable markers
- Visual symptom progression board
- Medical marker modals
- Evidence relationship map
- Photo evidence wall with structured placeholders
- Improved discrepancy comparison cards
- Public evidence access badges: Public, Redacted, Summary Only, Private, Pending Review
- Responsive desktop, tablet, and mobile layout
- Reduced-motion support
- No external dependencies

## Files

```txt
false-summits-case/
├── index.html
├── style.css
├── app.js
├── data.js
└── README.md
```

## How to Run Locally

Open `index.html` directly in a browser.

No server, backend, build step, npm install, or external framework is required.

## How to Deploy to GitHub Pages

1. Upload these files to the repository root.
2. Go to repository **Settings → Pages**.
3. Set the source to the `main` branch root.
4. Save and publish.

## Editing Content

Most archive content is stored inside `data.js`.

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
- `overviewModules`
- `startHereSteps`

## Adding a New Evidence Item

Copy an existing object inside `evidenceItems` and update:

- `id`
- `title`
- `type`
- `date`
- `people`
- `locations`
- `tags`
- `issueThreads`
- `status`
- `access`
- `summary`
- `editorialNote`
- `fileUrl`
- `linkedTimelineEvents`
- `linkedDiscrepancies`

Use stable evidence IDs such as:

- `FS-TR-003` for transcripts
- `FS-PM-002` for medical records
- `FS-COM-002` for communications
- `FS-PH-007` for photos

## Adding a Route Marker

Add a new object inside `routeMarkers`.

Required fields:

- `id`
- `title`
- `location`
- `x`
- `y`
- `linkedTimelineEvents`
- `people`
- `summary`
- `keyIssue`
- `evidence`
- `markerType`

The `x` and `y` values are percentage positions on the CSS route board.

## Adding a Photo

Add a new object inside `photoItems`.

If you have a real image, place it inside an assets folder such as:

```txt
assets/images/photo-name.jpg
```

Then update the `imageUrl` field.

If `imageUrl` is empty, the site displays a styled placeholder frame.

## Public Evidence Safety Reminder

Before publishing real materials, review and redact:

- phone numbers
- home addresses
- IC/passport numbers
- private medical identifiers
- full unredacted autopsy details not necessary for public understanding
- private family information
- unrelated third-party personal data
- private WhatsApp numbers or screenshots

## Editorial Tone Rules

Use neutral documentary language:

- “unresolved discrepancy”
- “duty-of-care question”
- “information blackout”
- “witness account”
- “requires clarification”
- “public-interest question”

Avoid unsupported accusatory language.

The archive should distinguish between verified records, witness recollections, unresolved discrepancies, and editorial analysis.

## Version 3: Interactive Route Board Integration

This package adds the generated Gunung Tahan route board as the central interactive reconstruction layer.

### New route-board features

- `assets/images/gunung-tahan-route-board.png` added as the primary visual guide.
- The previous generic CSS route placeholder has been replaced by an interactive image-based route board.
- Clickable hotspots now open modal cards for:
  - Sungai Relau briefing
  - Saturday ascent symptoms
  - Kem Kor arrival and buddy-system issue
  - 10:00 PM briefing and dinner
  - Night push toward Kem Botak
  - Tuesday information blackout
  - “they all ok tu” communication issue
  - Tuesday revelation call
  - 26 March formal debriefing
- Added route-board highlight cards focused on Raja Azlan Shah:
  - Symptom cluster
  - Kem Kor decision point
  - Zara’s information pathway
  - Formal debrief delay

### New / updated data structures

`data.js` now includes or expands:

- `routeMarkers` with visual hotspot coordinates
- `routeBoardHighlights`
- new timeline events `TL-009` and `TL-010`
- evidence item `FS-VIZ-001`
- route-board-linked photo item `FS-PH-005`

### Editorial note

The route board is a documentary reconstruction tool. It is designed to separate mountain movement, medical distress, communication issues, and post-incident debriefing without presenting unresolved matters as legal conclusions.
