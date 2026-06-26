# Every Meal Guide Production Environment Precheck

Status date: 2026-06-23

Purpose: prevent a public deploy with placeholder domain or contact settings.

## Required Variables

Set these before a production build:

```powershell
$env:SITE_URL="https://your-approved-domain.com"
$env:CONTACT_EMAIL="hello@your-approved-domain.com"
```

Then run:

```powershell
npm.cmd run predeploy:env
npm.cmd run build
```

## What The Precheck Blocks

1. Missing `SITE_URL`.
2. Missing `CONTACT_EMAIL`.
3. Non-HTTPS production URL.
4. Localhost or obvious placeholder domains.
5. Invalid email format.
6. Obvious placeholder email domains.

## What The Precheck Warns About

It warns if the contact email domain does not match the site domain. That can be valid, but it should be intentional before affiliate applications.

## Approval Reminder

Passing this precheck does not approve deployment.

Before any public deploy, use:

```powershell
npm.cmd run launch:approval
```

Then get explicit user approval for the domain and provider.
