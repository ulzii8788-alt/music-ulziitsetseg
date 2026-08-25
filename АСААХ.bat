@echo off
title Hogjim Olzii System - Local Server
cd /d "%~dp0"
echo.
echo ==========================================
echo    HOGJIM OLZII SYSTEM - starting server
echo ==========================================
echo.
node _server.js
echo.
echo Server stopped. Press any key to close...
pause >nul
