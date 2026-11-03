# Crops and resizes Sancy factory photos into web-ready JPEGs under public/sites/sancy.
# Usage: powershell -File scripts/prepare-sancy-images.ps1 [-SourceDir "D:\az\Thương hiệu SANSY\Anh xưởng sancy\Canon - Copy"]
param(
  [string]$SourceDir = "D:\az\Thương hiệu SANSY\Anh xưởng sancy\Canon - Copy"
)

Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot "..\public\sites\sancy"
New-Item -ItemType Directory -Force $outDir | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L

# Crop rectangles are fractions of the source (x, y, width, height).
$jobs = @(
  @{ Source = "IMG_4670.JPG"; Out = "hero.jpg"; Crop = @(0.30, 0.0, 0.533, 1.0); Width = 1200 },
  @{ Source = "IMG_4655.JPG"; Out = "factory-main.jpg"; Crop = @(0.0, 0.15, 1.0, 0.75); Width = 1600 },
  @{ Source = "IMG_4682.JPG"; Out = "factory-detail.jpg"; Crop = @(0.30, 0.25, 0.50, 0.75); Width = 900 }
)

foreach ($job in $jobs) {
  $src = [System.Drawing.Image]::FromFile((Join-Path $SourceDir $job.Source))
  $c = $job.Crop
  $rect = New-Object System.Drawing.Rectangle ([int]($src.Width * $c[0])), ([int]($src.Height * $c[1])), ([int]($src.Width * $c[2])), ([int]($src.Height * $c[3]))
  $height = [int]($job.Width * $rect.Height / $rect.Width)

  $dest = New-Object System.Drawing.Bitmap $job.Width, $height
  $g = [System.Drawing.Graphics]::FromImage($dest)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $job.Width, $height), $rect, [System.Drawing.GraphicsUnit]::Pixel)

  $dest.Save((Join-Path $outDir $job.Out), $jpegCodec, $encoderParams)
  $g.Dispose(); $dest.Dispose(); $src.Dispose()
  Write-Output "$($job.Out): $($job.Width)x$height"
}
