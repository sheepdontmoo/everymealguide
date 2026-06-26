# Decision measurement progress - 2026-06-24

## Mission

Help a visitor answer "What meal delivery service should I use?" within 60 seconds.

## Local change

- Added `data-decision-path` attributes to homepage instant-answer links.
- Added `decision_path_click` event tracking in `script.js`.
- The event records the chosen path, link label, destination, page title, path, and timestamp through the existing event pipeline.

## Why this matters

The site can now measure which first-minute recommendation paths visitors actually choose:

- prepared meals
- meal kits
- budget meals
- high-protein meals
- family meals
- kids meals
- UK meal kits
- example-brand clicks

## Success metric supported

- Visitor reaches a recommendation in under 3 clicks.
- Homepage explains site purpose in under 5 seconds.
- Future affiliate-click growth can be segmented by initial decision path.

## Status

- Local only.
- Deploy after approval with the public-copy guard.
