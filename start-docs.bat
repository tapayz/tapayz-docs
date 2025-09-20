@echo off
REM Tapayz Documentation Server Startup Script for Windows
REM Usage: start-docs.bat

echo 🚀 Starting Tapayz Documentation Server...

REM Check if PM2 is installed
where pm2 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PM2 is not installed. Installing PM2...
    npm install -g pm2
)

REM Create logs directory if it doesn't exist
if not exist "logs" mkdir logs

REM Build the documentation
echo 📦 Building documentation...
call yarn build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed!
    exit /b 1
)

REM Stop any existing instance
echo 🛑 Stopping existing instances...
pm2 delete tapayz-docs 2>nul

REM Start the application with PM2
echo ▶️  Starting with PM2...
pm2 start ecosystem.config.js
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to start with PM2!
    exit /b 1
)

REM Save PM2 configuration
echo 💾 Saving PM2 configuration...
pm2 save

REM Show status
echo 📊 Application Status:
pm2 status

echo.
echo ✅ Tapayz Documentation Server is now running!
echo 🌐 Access URL: http://localhost:5000
echo.
echo 📝 Useful commands:
echo   yarn logs     - View logs
echo   yarn restart  - Restart server
echo   yarn stop     - Stop server
echo   yarn delete   - Delete PM2 process
echo.