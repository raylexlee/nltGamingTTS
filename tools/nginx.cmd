cd nginx-1.28.0
REM start nginx.exe

REM 1. FORCE KILL any background Edge instances brought up by Windows updates
echo Killing hidden Edge background processes...
taskkill /f /im msedge.exe 2>nul

REM 2. Launch Edge with BOTH the debugging port and a separate profile directory
echo Launching Microsoft Edge in Isolated Debug Mode...
start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --remote-debugging-port=9222 --remote-allow-origins=* --user-data-dir="C:\Users\Raylex Lee\edge-debug-profile" http://127.0.0.1:8004

REM Wait 3 seconds for port 9222 to open
timeout /t 3 /nobreak

cd /d "C:\Users\Raylex Lee\edge-debug"
echo Running Node script...
node.exe stream-logs.js
pause

