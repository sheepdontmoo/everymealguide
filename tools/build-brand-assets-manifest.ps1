param(
  [string]$BrandUniverse = "C:\codex\dinner-compare\seo\global-brand-universe.csv",
  [string]$Output = "C:\codex\dinner-compare\seo\brand-assets-manifest.csv"
)

$ErrorActionPreference = "Stop"

function ConvertTo-Slug([string]$value) {
  $slug = $value.ToLowerInvariant() -replace '&', ' and '
  $slug = $slug -replace '[^a-z0-9]+', '-'
  return $slug.Trim('-')
}

function Get-DomainFromUrl([string]$url) {
  if ([string]::IsNullOrWhiteSpace($url)) {
    return ""
  }

  try {
    $uri = [Uri]$url
    return $uri.Host -replace '^www\.', ''
  } catch {
    return ""
  }
}

$rows = Import-Csv -LiteralPath $BrandUniverse

$manifest = $rows |
  Where-Object { $_.brand } |
  Group-Object brand |
  ForEach-Object {
    $brand = $_.Name
    $group = $_.Group
    $slug = ConvertTo-Slug $brand
    $officialUrl = ($group.official_url | Where-Object { $_ } | Select-Object -First 1)
    $domain = Get-DomainFromUrl $officialUrl
    $countries = ($group.country | Where-Object { $_ } | Sort-Object -Unique) -join "|"
    $categories = ($group.category | Where-Object { $_ } | Sort-Object -Unique) -join "|"
    $affiliateTarget = ($group.affiliate_program_target | Where-Object { $_ } | Sort-Object -Unique) -join "|"

    [pscustomobject]@{
      brand = $brand
      slug = $slug
      official_url = $officialUrl
      domain = $domain
      countries = $countries
      categories = $categories
      affiliate_program_target = $affiliateTarget
      logo_status = "needs_source"
      logo_source_type = ""
      logo_source_url = ""
      local_logo_path = "assets/brands/$slug/logo.png"
      logo_permission = "unverified"
      meal_photo_status = "needs_source"
      meal_photo_source_type = ""
      meal_photo_source_url = ""
      local_meal_photo_path = "assets/brands/$slug/meal.jpg"
      creative_status = "pending_affiliate_approval"
      approved_for_site = "no"
      last_checked = ""
      notes = "Use official media kit, approved affiliate creatives, or trusted logo API only. Do not scrape Google Images."
    }
  } |
  Sort-Object brand

$manifest | Export-Csv -LiteralPath $Output -NoTypeInformation -Encoding UTF8

Write-Host "Brand asset manifest written to $Output"
Write-Host "Rows: $($manifest.Count)"
