# Homepage matcher upgrade - 2026-06-24

Goal link: help a visitor answer "What meal delivery service should I use?" within 60 seconds.

Completed locally:
- Added Ireland to the homepage matcher country dropdown so the visible Ireland country shortcut is also supported in the primary 60-second flow.
- Updated `script.js` so the matcher recognizes Ireland and routes Irish users into `/countries/ireland/...` recommendation paths.
- Added a `Next:` instruction to every matcher result so the user gets a practical follow-up check after the recommendation.
- Added result-panel actions: open best-fit shortlist plus compare all top picks.
- Added lightweight styling for the matcher result next-step and action row.

Current deployment state:
- Not deployed after this local matcher upgrade.
- Also waiting to deploy the local comparison verdict upgrade from the previous progress note.
