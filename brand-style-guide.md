# Every Meal Guide Brand Style Guide

## Brand Idea

Every Meal Guide is a buyer cockpit for easy dinner decisions. It should feel smarter than a coupon site, warmer than a finance comparison table, and more practical than a recipe blog.

## Positioning Line

```text
Find the easy dinner service that actually fits your week.
```

## Design Personality

- Editorial, warm, decisive.
- Consumer-first, not brand-first.
- Slightly premium but not luxury.
- Practical and direct, with clear warnings about subscription traps.
- Food-adjacent without becoming a recipe magazine.

## Visual Direction

Use a modern editorial comparison look:

- Warm white and oat backgrounds.
- Tomato red for action and urgency.
- Sage green for safe/fit/trust moments.
- Charcoal sections for serious decision modules.
- Large serif headlines paired with compact high-weight sans labels.
- Rounded cards, but not soft SaaS blobs.
- Decision modules should feel like designed buyer tools, not generic blog cards.

## Core Colors

```css
--bg: #ffffff;
--ink: #241f1d;
--muted: #706761;
--line: #e6dfd8;
--soft: #f7f2ec;
--sage: #dce8d6;
--sage-ink: #334834;
--tomato: #d8412f;
--tomato-dark: #a92d22;
--oat: #fbf7f1;
```

## Typography

Current local stack:

- Headlines: Georgia, Times New Roman, serif.
- Body/UI: Trebuchet MS, Verdana, sans-serif.

Future upgrade option:

- Use a distinctive editorial serif for H1/H2.
- Use a clean humanist sans for cards, labels, and controls.
- Avoid default Inter/Roboto/system-stack sameness unless a future design system requires it.

## Page Anatomy

Money pages should follow this rhythm:

1. Disclosure and freshness.
2. Buyer-cockpit hero.
3. Quick answer.
4. Premium ranking or comparison cards.
5. Decision module.
6. Buying checklist.
7. Methodology/trust panel.
8. Source-backed latest checks.
9. FAQ.
10. Related links.
11. Sticky mobile deal CTA.

## Component Rules

### Hero

- Include a short kicker.
- Use one clear H1.
- Add a verdict card on the right for buyer action.
- Avoid generic hero badges or fake metrics.

### Ranking Cards

Each card should include:

- Rank/best-for badge.
- Brand name.
- Verdict chip.
- Short plain-English verdict.
- Type, best-for, and watch-out fact cards.
- Pros and watch-outs.
- Strong CTA.
- Small trust note under CTA.

### Deal Pages

Deal pages must never only list discounts.

Always show:

- Headline offer check.
- Best buyer.
- Second-box risk.
- Checkout check.
- Skip/cancel warning.

### Comparison Pages

Use tables only with editorial framing.

Add:

- choose-if blocks
- skip-if blocks
- winner-by-situation strips
- decision warning cards

## Copy Voice

Use short, direct buyer language:

- "Check the second box."
- "Match the routine first."
- "The biggest discount is not always the best deal."
- "Choose prepared meals if you do not want to cook."
- "Do not trust a national ranking until you check delivery coverage."

Avoid:

- fake first-hand testing
- fake exact prices
- fake coupon guarantees
- "ultimate guide" filler language
- brand-flattering copy that ignores buyer fit

## Image Direction

If using Magnific, Canva, stock, or image generation later:

- Show real dinner contexts, not sterile ingredient piles.
- Prefer warm overhead table scenes, prepared meal trays, recipe cards, boxes on counters, and quick weeknight kitchen moments.
- Avoid generic smiling families, AI-perfect food, and impossible glossy meals.
- Keep images secondary to the decision product.

## Motion Direction

Use restrained motion:

- subtle page-load reveal
- hover lift on ranking cards
- sticky mobile CTA

Avoid:

- spinning badges
- gimmicky counters
- excessive parallax

## Implemented Polish Notes

- Ranking cards use hover lift and a stronger first-card highlight.
- Money pages use subtle page-load rise motion when reduced motion is not requested.
- CTAs use tomato-to-dark hover treatment and stronger focus states.
- Tables retain semantic structure but get better elevation and row hover feedback.
- Mobile money pages reserve bottom space for the sticky deal CTA.

## Conversion Rules

- Every money page needs a visible CTA before the user scrolls too far.
- Every CTA should tell the buyer what useful check happens next: current offer, delivery fit, menu details, price, or terms.
- Affiliate links remain sponsored/nofollow.
- Never hide disclosure.
- Help the user avoid bad-fit subscriptions; trust drives long-term clicks.
