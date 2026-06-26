# Every Meal Guide Approval Gates

## Purpose

Separate safe local preparation from actions that publish, spend money, submit to third parties, or create external account state.

## Safe Without Extra Approval

These are local-only actions:

1. Edit HTML, CSS, JavaScript, and generator files.
2. Add or update local docs.
3. Run `npm run build`.
4. Run local audit scripts.
5. Preview at `http://127.0.0.1:4173/`.
6. Draft affiliate emails.
7. Draft launch copy.
8. Prepare domain shortlists.
9. Prepare SEO briefs and roadmaps.

## Requires Explicit Approval

Do not do these without direct user approval in the current chat.

| Action | Why approval is needed | Approval phrase example |
|---|---|---|
| Buy domain | spends money and creates ownership | `Approve buying [domain]` |
| Deploy public site | publishes public content | `Approve deploying Every Meal Guide` |
| Add DNS records | changes live domain routing | `Approve DNS changes for [domain]` |
| Submit Search Console sitemap | creates external indexing action | `Approve Search Console submission` |
| Connect analytics | may create tracking and account state | `Approve analytics setup` |
| Apply to affiliate program | sends business/application info | `Approve applying to [program]` |
| Send outreach email | sends external message | `Approve sending this email` |
| Add real affiliate URL | changes monetized outbound behavior | `Approve adding [brand] affiliate URL` |
| Run paid ads | spends money | `Approve ad spend` |

## Before Deployment Approval

Confirm:

1. `npm run audit:visual` has no failures or failures are accepted.
2. `npm run audit:launch` has no failures or failures are accepted.
3. Browser visual QA from `VISUAL_QA_CHECKLIST.md` is complete.
4. Final domain is chosen.
5. Contact email is chosen.
6. `SITE_URL` and `CONTACT_EMAIL` are set for build.

## Before Affiliate Application Approval

Confirm:

1. Public site is live.
2. Contact email works.
3. Methodology page is live.
4. Affiliate disclosure page is live.
5. Privacy page is live.
6. Top money pages are live.
7. No fake prices, fake coupons, or fake testing claims are present.
8. Application copy from `seo/affiliate-application-kit.md` is reviewed.

## Evidence Rule

After any approved external action, record evidence in:

```text
daily/YYYY-MM-DD.md
```
