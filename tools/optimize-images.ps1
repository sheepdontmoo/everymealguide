# Resize + recompress JPEGs in assets/images so pages stay fast.
# Native GDI+ (System.Drawing) — no npm/ImageMagick dependency.
# hero/ -> max 1600px wide, everything else -> max 800px wide, JPEG quality 72.
# Re-run any time after generating new images. Idempotent-ish (skips if already small enough).
param(
  [string]$Root = (Join-Path $PSScriptRoot "..\assets\images"),
  [int]$Quality = 72
)
Add-Type -AssemblyName System.Drawing
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$qParam = [System.Drawing.Imaging.Encoder]::Quality
$eps = New-Object System.Drawing.Imaging.EncoderParameters(1)
$eps.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($qParam, [long]$Quality)

$before = 0; $after = 0
Get-ChildItem $Root -Recurse -File -Include *.jpg, *.jpeg | ForEach-Object {
  $file = $_.FullName
  $maxW = if ($file -match '\\hero\\') { 1600 } else { 800 }
  $before += $_.Length
  $img = [System.Drawing.Image]::FromFile($file)
  $w = $img.Width; $h = $img.Height
  if ($w -le $maxW) { $newW = $w; $newH = $h } else { $newW = $maxW; $newH = [int][math]::Round($h * $maxW / $w) }
  $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $newW, $newH)
  $g.Dispose(); $img.Dispose()
  $tmp = "$file.tmp"
  $bmp.Save($tmp, $enc, $eps)
  $bmp.Dispose()
  Move-Item -Force $tmp $file
  $sz = (Get-Item $file).Length
  $after += $sz
  "{0,-26} {1,5}x{2,-5} {3,7:N0} KB" -f $_.Name, $newW, $newH, ($sz / 1KB)
}
"--- before {0:N1} MB  ->  after {1:N1} MB ({2:N0}% smaller) ---" -f ($before/1MB), ($after/1MB), (100 - ($after/$before*100))
