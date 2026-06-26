# UX decision-path acceptance criteria

## Mission

A visitor should be able to answer "What meal delivery service should I use?" within 60 seconds of landing on Every Meal Guide.

## Homepage must pass these checks

1. The page explains the site purpose above the fold in plain language.
2. The first interaction produces an inline recommendation, not only a redirect.
3. A visitor can reach a useful shortlist in two clicks or fewer.
4. The page gives concrete starting examples, not only abstract categories.
5. The page explains why recommendations are reader-first.
6. The page teaches the safe decision order: format, delivery area, normal price, cancellation terms.
7. Decision-path clicks are trackable.

## Local guard

Run this before deploying major homepage changes:

```powershell
npm.cmd run guard:homepage-mission
```

This is intentionally separate from the production build for now. It should become part of the build once the homepage mission pattern is stable.

## Current local status

The current local homepage has:

- 60-second promise
- inline matcher result
- instant-answer cards
- decision checklist
- recommendation-trust section
- concrete starting-picks strip
- decision-path click tracking

## Human/analytics gates

- Confirm production analytics destination.
- Check actual click data once traffic exists.
- Use Search Console and analytics to improve the first-click paths.
- Add A/B testing only after meaningful traffic exists.
