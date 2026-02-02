$ErrorActionPreference = "Stop"

$iconsDir = Join-Path $PSScriptRoot "..\src-tauri\icons"
$sourceIcon = Join-Path $iconsDir "icon.png"

$sizes = @(
    @{name="32x32.png"; size=32},
    @{name="128x128.png"; size=128},
    @{name="128x128@2x.png"; size=256},
    @{name="Square30x30Logo.png"; size=30},
    @{name="Square44x44Logo.png"; size=44},
    @{name="Square71x71Logo.png"; size=71},
    @{name="Square89x89Logo.png"; size=89},
    @{name="Square107x107Logo.png"; size=107},
    @{name="Square142x142Logo.png"; size=142},
    @{name="Square150x150Logo.png"; size=150},
    @{name="Square284x284Logo.png"; size=284},
    @{name="Square310x310Logo.png"; size=310},
    @{name="StoreLogo.png"; size=50}
)

if (-not (Test-Path $sourceIcon)) {
    Write-Host "错误: 找不到源图标文件: $sourceIcon" -ForegroundColor Red
    Write-Host "请将你的原始 logo.png 文件重命名为 icon.png 并放在 src-tauri/icons 目录下" -ForegroundColor Yellow
    exit 1
}

Write-Host "开始生成图标..." -ForegroundColor Green
Write-Host "源文件: $sourceIcon`n" -ForegroundColor Cyan

try {
    Add-Type -AssemblyName System.Drawing
    
    $sourceImage = [System.Drawing.Image]::FromFile($sourceIcon)
    
    foreach ($sizeInfo in $sizes) {
        $outputPath = Join-Path $iconsDir $sizeInfo.name
        $size = $sizeInfo.size
        
        $bitmap = New-Object System.Drawing.Bitmap($size, $size)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        
        $graphics.DrawImage($sourceImage, 0, 0, $size, $size)
        
        $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $graphics.Dispose()
        $bitmap.Dispose()
        
        Write-Host "x 生成 $($sizeInfo.name) ($($size)x$($size))" -ForegroundColor Green
    }
    
    $sourceImage.Dispose()
    
    Write-Host "`n图标生成完成！" -ForegroundColor Green
    Write-Host "`n注意: icon.ico 和 icon.icns 需要使用专门的工具生成:" -ForegroundColor Yellow
    Write-Host "  - Windows .ico: 可以使用 https://convertico.com/ 或 ImageMagick" -ForegroundColor Cyan
    Write-Host "  - macOS .icns: 可以使用 iconutil (macOS 自带) 或在线工具" -ForegroundColor Cyan
    
} catch {
    Write-Host "错误: $_" -ForegroundColor Red
    exit 1
}