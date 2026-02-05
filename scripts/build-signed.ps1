# Tauri 应用构建和签名脚本
param(
    [string]$CertPath = "",
    [string]$CertPassword = "",
    [string]$TimestampUrl = "http://timestamp.digicert.com"
)

Write-Host "开始构建 Tauri 应用..." -ForegroundColor Green

# 查找 signtool.exe
$signtoolPath = $null
$possiblePaths = @(
    "${env:ProgramFiles(x86)}\Windows Kits\10\bin\*\x64\signtool.exe",
    "${env:ProgramFiles}\Windows Kits\10\bin\*\x64\signtool.exe",
    "${env:ProgramFiles(x86)}\Microsoft SDKs\Windows\*\bin\signtool.exe"
)

foreach ($path in $possiblePaths) {
    $found = Get-ChildItem -Path $path -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $signtoolPath = $found.FullName
        break
    }
}

# 检查必要的工具
if ($CertPath -and -not $signtoolPath) {
    Write-Host "错误: 找不到 signtool.exe" -ForegroundColor Red
    Write-Host "请运行: .\scripts\install-signtool.ps1" -ForegroundColor Yellow
    exit 1
}

if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 找不到 cargo" -ForegroundColor Red
    Write-Host "请安装 Rust: https://rustup.rs/" -ForegroundColor Yellow
    exit 1
}

# 检查 src-tauri 目录
if (-not (Test-Path "src-tauri")) {
    Write-Host "错误: 找不到 src-tauri 目录" -ForegroundColor Red
    Write-Host "请在项目根目录运行此脚本" -ForegroundColor Yellow
    exit 1
}

# 构建应用
Write-Host "正在构建应用..." -ForegroundColor Cyan
Set-Location "src-tauri"

# 尝试使用本地 Tauri CLI，如果没有则使用全局的
if (Test-Path "../node_modules/.bin/tauri.cmd") {
    & "../node_modules/.bin/tauri.cmd" build --verbose
} else {
    cargo tauri build --verbose
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败!" -ForegroundColor Red
    exit 1
}

Write-Host "构建完成!" -ForegroundColor Green

# 如果没有提供证书路径，尝试查找默认证书
if (-not $CertPath -and (Test-Path "../cert.pfx")) {
    $CertPath = "../cert.pfx"
    $CertPassword = "your-cert-password"
    Write-Host "使用默认证书: cert.pfx" -ForegroundColor Yellow
}

# 如果提供了证书路径，则进行签名
if ($CertPath -and (Test-Path $CertPath)) {
    Write-Host "开始对 exe 文件进行数字签名..." -ForegroundColor Yellow

    # 查找生成的 exe 文件
    $exeFiles = Get-ChildItem -Path "target\release\bundle\msi" -Filter "*.exe" -Recurse -ErrorAction SilentlyContinue

    foreach ($exe in $exeFiles) {
        Write-Host "正在签名: $($exe.FullName)" -ForegroundColor Cyan

        # 使用 signtool 进行签名
        $signArgs = @(
            "sign"
            "/f", $CertPath
            "/p", $CertPassword
            "/t", $TimestampUrl
            "/v"
            $exe.FullName
        )

        & $signtoolPath @signArgs

        if ($LASTEXITCODE -eq 0) {
            Write-Host "签名成功: $($exe.Name)" -ForegroundColor Green
        } else {
            Write-Host "签名失败: $($exe.Name)" -ForegroundColor Red
        }
    }

    # 签名 MSI 文件
    $msiFiles = Get-ChildItem -Path "target\release\bundle\msi" -Filter "*.msi" -Recurse -ErrorAction SilentlyContinue

    foreach ($msi in $msiFiles) {
        Write-Host "正在签名: $($msi.FullName)" -ForegroundColor Cyan

        $signArgs = @(
            "sign"
            "/f", $CertPath
            "/p", $CertPassword
            "/t", $TimestampUrl
            "/v"
            $msi.FullName
        )

        & $signtoolPath @signArgs

        if ($LASTEXITCODE -eq 0) {
            Write-Host "签名成功: $($msi.Name)" -ForegroundColor Green
        } else {
            Write-Host "签名失败: $($msi.Name)" -ForegroundColor Red
        }
    }

    $totalFiles = $exeFiles.Count + $msiFiles.Count
    if ($totalFiles -eq 0) {
        Write-Host "警告: 未找到需要签名的文件" -ForegroundColor Yellow
    } else {
        Write-Host "签名完成，共处理 $totalFiles 个文件" -ForegroundColor Green
    }
} else {
    Write-Host "未提供证书路径，跳过签名步骤" -ForegroundColor Yellow
    Write-Host "注意: 未签名的 exe 文件可能会被浏览器标记为不安全" -ForegroundColor Red
}

Write-Host "构建流程完成!" -ForegroundColor Green