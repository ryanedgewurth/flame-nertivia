@echo off
echo Flame Nertivia Setup Script
echo ===========================
echo Making Config Directory
cd
pause
mkdir config/
echo Making Empty Configuration Directories
type NUL > /config/levels.json
type NUL > /config/userconf.json
type NUL > /config/serverconf.json
echo Finished
pause
