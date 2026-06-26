# Every Meal Guide Launch Command Center

Status date: 2026-06-24

Purpose: keep the route from local build to live money asset explicit, approval-safe, and measurable.

## Current Position

Every Meal Guide is a strong local build, not a live monetized business yet.

| Gate | State | Owner action needed |
|---|---|---|
| Local static site | Ready locally | Keep improving pages and rebuild after changes |
| Brand accountability | Ready locally | Refresh P0/P1 offers before launch |
| SEO foundation | Ready locally | Deploy, then submit sitemap |
| Affiliate structure | Ready locally | Apply after live domain/contact email |
| Visual QA | Not complete | Run browser-led QA and fix issues |
| Domain | Not complete | Pick and buy/point domain |
| Public deploy | Not complete | Deploy to Vercel |
| Analytics | Not complete | Connect Plausible/GA after approval |
| Search Console | Not complete | Verify domain and submit sitemap |
| Affiliate approvals | Not complete | Apply after live site is credible |
| Real affiliate URLs | Not complete | Add only after approval |
| Revenue proof | Not complete | Needs traffic, clicks, and merchant-side conversion |

## 100% Definition

The goal is only complete when all of these are true:

1. The public site is live on the chosen domain.
2. Homepage and top money pages are visually checked on desktop and mobile.
3. Sitemap and robots are live.
4. Search Console is connected and sitemap submitted.
5. Analytics records pageviews and affiliate clicks.
6. At least one affiliate program is approved.
7. At least one real approved affiliate URL is connected through `/go/{brand}/`.
8. Source notes for every promoted company are current.
9. No watchlist brand is treated as an active recommendation.
10. Launch docs identify the next revenue milestone.

## Safe Local Commands

```powershell
npm.cmd run build
npm.cmd run preview
npm.cmd run launch:status
```

These are safe local commands. They do not publish the site or apply to affiliate programs.

## Commands That Need Approval First

Do not run these without explicit user approval:

1. Public deploy.
2. Domain purchase or DNS changes.
3. Search Console verification.
4. Analytics installation on a live domain.
5. Affiliate applications.
6. Adding real affiliate URLs.
7. Sending outreach emails.

## Next Best Sequence

1. Run visual QA and fix visible issues.
2. Pick domain.
3. Deploy public preview on Vercel.
4. Connect domain.
5. Verify top pages live.
6. Submit sitemap.
7. Connect analytics.
8. Apply to P0 affiliate programs.
9. Add first approved affiliate URL.
10. Track first affiliate click and merchant-side result.

## Weekly Operating Rhythm After Launch

1. Refresh top offers.
2. Check Search Console queries.
3. Check affiliate clicks by page and brand.
4. Improve pages with impressions but low clicks.
5. Add pages only when the brand can be accounted for.
