# Run this once to download real brand logos into assets/logos/brands/
# Usage: cd "C:\claude code\everymealguide" ; .\tools\download-brand-logos.ps1
#
# After running, files will appear at /assets/logos/brands/{slug}.png
# The site JS picks them up automatically — no code changes needed.
# To replace any logo, just overwrite the file with the same name.

$out = "C:\claude code\everymealguide\assets\logos\brands"
New-Item -ItemType Directory -Force $out | Out-Null

# Clearbit Logo API — free, returns 128x128 PNG
# https://clearbit.com/logo
$brands = @(
  @{ slug = "hellofresh";   domain = "hellofresh.com" },
  @{ slug = "factor";       domain = "factor75.com" },
  @{ slug = "gousto";       domain = "gousto.co.uk" },
  @{ slug = "cookunity";    domain = "cookunity.com" },
  @{ slug = "everyplate";   domain = "everyplate.com" },
  @{ slug = "home-chef";    domain = "homechef.com" },
  @{ slug = "dinnerly";     domain = "dinnerly.com" },
  @{ slug = "mindful-chef"; domain = "mindfulchef.com" },
  @{ slug = "green-chef";   domain = "greenchef.com" },
  @{ slug = "marley-spoon"; domain = "marleyspoon.com" },
  @{ slug = "purple-carrot"; domain = "purplecarrot.com" },
  @{ slug = "blue-apron";   domain = "blueapron.com" },
  @{ slug = "sunbasket";    domain = "sunbasket.com" },
  @{ slug = "freshly";      domain = "freshly.com" },
  @{ slug = "meal-prep-pro"; domain = "mealpreppro.com" }
)

$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
$ok = 0; $fail = 0

foreach ($b in $brands) {
  $file = Join-Path $out "$($b.slug).png"
  $url  = "https://logo.clearbit.com/$($b.domain)"
  try {
    Invoke-WebRequest -Uri $url -OutFile $file -Headers $headers -TimeoutSec 10 -ErrorAction Stop
    $bytes = (Get-Item $file).Length
    Write-Host "  OK  $($b.slug) ($bytes bytes)" -ForegroundColor Green
    $ok++
  } catch {
    Write-Host "  --  $($b.slug) not found ($($_.Exception.Message.Split('.')[0]))" -ForegroundColor Yellow
    $fail++
  }
}

Write-Host "`nDone: $ok downloaded, $fail skipped."
Write-Host "Logos saved to: $out"
Write-Host ""
Write-Host "To add a logo manually:"
Write-Host "  Copy a PNG to assets/logos/brands/{slug}.png"
Write-Host "  Slugs must match the brand name on deal cards / review pages"
Write-Host "  e.g. 'HelloFresh' -> hellofresh.png, 'Home Chef' -> home-chef.png"
