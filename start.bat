@echo off
title GitGud Platinum Tracker - Local Server
echo ========================================================
echo Starting GitGud Tracker Local Web Server...
echo ========================================================
echo.
echo Opening http://localhost:8000 in your browser...
start http://localhost:8000
python -m http.server 8000
pause
