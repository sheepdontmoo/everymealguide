# Design Skill And Repo Route For Every Meal Guide

This is the recommended frontend design route after reviewing the current site and the available GitHub options.

## Growth use case

Every Meal Guide needs to look trustworthy enough for affiliate approvals and consumer clicks. The design goal is not novelty; it is higher trust, clearer first click, better comparison readability, and stronger conversion into `/go/` routes.

## Usage/startup cost

- Installing a skill or cloning a design repo is low-cost locally but still changes the Codex environment or project structure.
- Do not install or rebuild the stack without Darren approving the exact route.
- Avoid long-running redesign loops until the site has shipped the current clarity fixes.

## Best route

Use a design skill as guidance, not a full repo migration.

### Recommended skill

`pbakaus/impeccable`

Why:

- It is explicitly positioned as a frontend design skill for Codex-compatible coding agents.
- It focuses on escaping generic AI SaaS-template design.
- It is a better fit for sharpening an existing interface than cloning an unrelated landing-page repo.

### Secondary skill option

`vipulgupta2048/codex-skills`

Why:

- It includes a Codex frontend design skill focused on distinctive production-grade UI.
- It may be useful if Impeccable does not install cleanly or does not map well to this static SEO site.

## Why not migrate to a template repo right now

Generic Tailwind/Next/Astro templates such as Play Tailwind, AstroWind, Cruip, or Flowbite can look polished, but migrating Every Meal Guide into one now has risks:

- The current site already has thousands of generated SEO pages.
- A full template migration risks breaking routes, sitemap, `/go/` pages, and generated content.
- Most SaaS templates solve a different problem than a comparison engine.

## Recommended design process

1. Keep the current static/SEO architecture.
2. Use Impeccable-style guidance to redesign the homepage, best-page template, review template, comparison template, and country template.
3. Preserve all current routes.
4. Preserve `/go/` pages.
5. Preserve sitemap and robots.
6. Improve CSS and templates in place.
7. Deploy only after Darren approves.

## First design sprint

Target these surfaces:

- Homepage above the fold.
- `best/meal-delivery-services`.
- `best/prepared-meal-delivery`.
- `vs/hellofresh-vs-gousto`.
- `reviews/factor`.
- Country page template.

## Success criteria

- User immediately understands what the site does.
- User sees curated choices before any giant table.
- Affiliate disclosure is close to money links.
- CTA color is consistently Every Meal Guide orange.
- Logo has padding and clear brand presence.
- Pages feel like a buyer guide, not a database dump.
- SEO route structure stays intact.

## Exact approval phrase

If Darren wants the skill installed, use this approval phrase:

`Install Impeccable for the Every Meal Guide design sprint.`

Then install from the GitHub repo and restart Codex if required.
