@echo off
setlocal enabledelayedexpansion

call "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat"

if errorlevel 1 (
    echo Error: Failed to initialize Visual Studio environment
    pause
    exit /b 1
)

echo Visual Studio environment initialized successfully
echo.
echo Starting Tauri development server...
echo.

npm run tauri:dev

if errorlevel 1 (
    echo.
    echo Error: Development server failed
    pause
    exit /b 1
)

pause