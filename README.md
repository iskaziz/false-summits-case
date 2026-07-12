# False Summits: Interactive Case Archive

A polished static microsite prototype for the feature documentary **False Summits**.

This prototype is designed as a public-facing documentary evidence archive for reconstructing the 2022 Gunung Tahan expedition that ended in the death of Raja Azlan Shah.

## What is included

- `index.html` — single-page microsite shell
- `style.css` — forensic case-file/digital archive visual design
- `app.js` — navigation, search, filters, modals, linked records
- `data.js` — structured data for timeline events, evidence, people, medical markers, discrepancies
- `README.md` — this file

## Features

- Tab-based navigation without reloads
- Landing page / case file cover
- Case overview dashboard
- Expedition timeline
- Searchable evidence locker
- Evidence type and status filters
- Evidence detail modal viewer
- Witness profile cards
- Placeholder route map with clickable markers
- Medical tracker
- Discrepancy matrix
- Film / trailer placeholder section
- Responsive desktop, tablet, and mobile layout

## How to run locally

Open `index.html` directly in a browser.

No server, backend, build step, npm install, or external framework is required.

## How to deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root.
3. Go to repository **Settings** → **Pages**.
4. Set the source to the main branch root.
5. Publish.

## Editing content

Most archive content is stored inside `data.js`:

- `timelineEvents`
- `evidenceItems`
- `people`
- `medicalMarkers`
- `discrepancies`
- `overviewModules`

To add new evidence, copy an existing object in `evidenceItems` and update the fields.

## Public evidence safety

This prototype includes public-facing summaries and placeholder file paths only.

Before publishing real documents, review and redact:

- phone numbers
- home addresses
- IC/passport numbers
- private medical identifiers
- full unredacted autopsy details not necessary for public understanding
- private family information
- unrelated third-party personal data

The site’s editorial tone is intentionally neutral. It uses terms such as:

- unresolved discrepancy
- duty-of-care question
- information blackout
- witness account
- requires clarification

Avoid unsupported accusatory language in public-facing copy.
