param(
  [string]$SiteUrl = "https://www.everymealguide.com",
  [string]$ContactEmail = "hello@everymealguide.com"
)

$ErrorActionPreference = "Stop"

Write-Host "Every Meal Guide production deploy" -ForegroundColor Cyan
Write-Host "This will deploy the current local folder to Vercel production." -ForegroundColor Yellow
Write-Host "Site URL: $SiteUrl"
Write-Host "Contact email: $ContactEmail"
Write-Host ""

$confirmation = Read-Host "Type DEPLOY to continue"

if ($confirmation -ne "DEPLOY") {
  Write-Host "Deploy cancelled. No live changes made." -ForegroundColor Yellow
  exit 0
}

$env:SITE_URL = $SiteUrl
$env:CONTACT_EMAIL = $ContactEmail

npx.cmd --yes vercel@latest deploy --yes --prod --archive=tgz

Write-Host ""
Write-Host "Deploy command finished. Now run the post-launch checklist manually before claiming the site is updated." -ForegroundColor Green
Write-Host "Checklist: C:\codex\dinner-compare\POST_LAUNCH_INDEXING_AND_MEASUREMENT_CHECKLIST.md"
