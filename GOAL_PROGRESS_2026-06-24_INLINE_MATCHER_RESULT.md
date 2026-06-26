# Inline matcher result progress - 2026-06-24

## Mission

Help visitors answer "What meal delivery service should I use?" within 60 seconds of landing.

## Local change

- The homepage matcher now shows an inline recommendation instead of immediately navigating away.
- The answer explains why the suggested lane fits: prepared meals, meal kits, budget, high-protein, vegan, vegetarian, or family.
- The visitor can still open the full shortlist with one clear button.
- The matcher emits `matcher_result_shown` for measurement.

## Why this matters

The first recommendation now appears on the homepage after one click. The second click opens the deeper shortlist, keeping the journey under the three-click target.

## Status

- Local only.
- Not deployed in this turn.
