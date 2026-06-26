# Every Meal Guide Deploy Notes

## Recommendation

Use Vercel for the fastest first public launch if you want the smoothest Codex-to-live workflow. Use Cloudflare Pages if you want the cheapest static hosting plus Cloudflare DNS in one place. The site is plain static HTML/CSS/JS, so either route works.

## Fastest Live Path: Vercel

1. Create a GitHub repository for `C:\codex\dinner-compare`.
2. Push the project files.
3. In Vercel, choose `Add New Project`.
4. Import the GitHub repository.
5. Framework preset: `Other`.
6. Build command: `npm run build`.
7. Output directory: `./`.
8. Deploy.
9. Add the custom domain after the preview URL works.
10. Update DNS at the domain provider using the records Vercel gives you.

## Alternative: Cloudflare Pages

Use Cloudflare Pages for the first launch.

1. Create a GitHub repository for `C:\codex\dinner-compare`.
2. Push the project files.
3. In Cloudflare, open `Workers & Pages`.
4. Choose `Create application`.
5. Choose `Pages`.
6. Connect the GitHub repository.
7. Build command: `npm run build`.
8. Output directory: `/`.
9. Deploy.
10. Add the custom domain after the preview URL works.

## Direct Upload Alternative

Cloudflare Pages also supports direct upload for prebuilt static assets. Because this project is plain HTML, CSS, and JavaScript, the whole project folder can be uploaded once content and affiliate links are final.

## Prelaunch Checklist

- Confirm final domain and update `siteUrl` in `tools/generate-pages.mjs`.
- Add approved affiliate URLs to `affiliatePrograms` in `tools/generate-pages.mjs`.
- Build with the final public URL and mailbox:

```powershell
$env:SITE_URL="https://yourdomain.com"
$env:CONTACT_EMAIL="hello@yourdomain.com"
npm run build
```

- Submit `/sitemap.xml` in Google Search Console after launch.
- Add analytics once the domain is live.
- Confirm `/methodology/`, `/affiliate-disclosure/`, `/privacy/`, and `/contact/` are accurate before scaling paid traffic or email capture.
