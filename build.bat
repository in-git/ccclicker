@echo off
title Auto Clicker - Build

echo.
echo ========================================
echo          Auto Clicker Build
echo ========================================
echo.

REM Check Node.js
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm not found, please install Node.js
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

REM Check dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check certificate
if not exist "cert.pfx" (
    echo First time setup - configuring signing environment...
    call npm run setup-signing
    if %errorlevel% neq 0 (
        echo Failed to setup signing environment
        pause
        exit /b 1
    )
    echo Signing environment setup complete
    echo.
)

echo Starting build process...
echo This may take several minutes for the first build...
call npm run build:release

if %errorlevel% equ 0 (
    echo.
    echo Build completed successfully!
    echo.
    echo Output files location:
    echo    src-tauri\target\release\bundle\msi\
    echo.
    echo Tip: Right-click exe file - Properties - Digital Signatures to view signature
    echo.

    REM Ask to open output directory
    set /p open="Open output directory? (y/n): "
    if /i "%open%"=="y" (
        if exist "src-tauri\target\release\bundle\msi\" (
            start "" "src-tauri\target\release\bundle\msi\"
        ) else (
            echo Output directory not found yet, build may still be in progress
        )
    )
) else (
    echo Build failed or was interrupted
    echo You can run this script again to continue the build
)

echo.
pause