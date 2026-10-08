@echo off
echo.
echo ============================================
echo   Lucky Star Jar - Setup ^& Start
echo ============================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed.
  echo Please download and install it from: https://nodejs.org
  echo Then run this file again.
  pause
  exit /b
)

echo Installing dependencies (this may take a minute)...
call npm install

echo.
echo Starting the app...
echo.
echo Once you see "serving on port 5000", open your browser and go to:
echo   http://localhost:5000
echo.
echo Press Ctrl+C to stop the app.
echo.

npm run dev
pause
