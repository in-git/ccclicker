# 安装 Windows SDK 以获取 signtool
Write-Host "检查 signtool 是否已安装..." -ForegroundColor Green

# 常见的 signtool 路径
$possiblePaths = @(
    "${env:ProgramFiles(x86)}\Windows Kits\10\bin\*\x64\signtool.exe",
    "${env:ProgramFiles}\Windows Kits\10\bin\*\x64\signtool.exe",
    "${env:ProgramFiles(x86)}\Microsoft SDKs\Windows\*\bin\signtool.exe"
)

$signtoolPath = $null
foreach ($path in $possiblePaths) {
    $found = Get-ChildItem -Path $path -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $signtoolPath = $found.FullName
        break
    }
}

if ($signtoolPath) {
    Write-Host "找到 signtool: $signtoolPath" -ForegroundColor Green

    # 添加到 PATH 环境变量
    $pathDir = Split-Path $signtoolPath
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($currentPath -notlike "*$pathDir*") {
        [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$pathDir", "User")
        Write-Host "已将 signtool 添加到 PATH" -ForegroundColor Green
        Write-Host "请重启 PowerShell 以使更改生效" -ForegroundColor Yellow
    }
} else {
    Write-Host "未找到 signtool，需要安装 Windows SDK" -ForegroundColor Red
    Write-Host "请访问: https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/" -ForegroundColor Yellow
    Write-Host "或运行: winget install Microsoft.WindowsSDK" -ForegroundColor Yellow
}