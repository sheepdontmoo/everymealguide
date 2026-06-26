# Core Web Vitals workflow

## Goal

Reach and maintain a 90%+ Core Web Vitals pass rate.

## Local guard

Run before major deploys when frontend weight changes:

```powershell
npm.cmd run guard:performance
```

The guard checks:

- `styles.css` size
- `script.js` size
- homepage HTML size
- external homepage image count
- external homepage font count
- oversized local images in `assets`

## What this guard does not prove

This does not prove Core Web Vitals pass rate. It only prevents obvious page-weight regressions.

To prove the success metric, we still need one of:

- Vercel Speed Insights field data
- Chrome UX Report data
- PageSpeed Insights / Lighthouse lab checks
- Real-user analytics once traffic exists

## Current human/tooling gates

- Confirm analytics and performance tooling ownership.
- Decide whether to use Vercel Speed Insights, GA4, Plausible, PageSpeed reports, or a mix.
- Run live checks after deploying the local homepage UX updates.

## Rule

Do not add heavy carousels, large uncompressed images, blocking third-party scripts, or decorative media unless they clearly improve the 60-second decision mission.
