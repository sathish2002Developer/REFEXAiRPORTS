@echo off
cd /d "%~dp0backend"
echo Seeding Home, About, Our Assets, For Travelers, Lounge, Navbar...
call npm run seed:website
pause
