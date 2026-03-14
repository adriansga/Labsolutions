@echo off
cd /d "%~dp0"
git config user.email "kontakt@ailab.pl"
git add .
git commit -m "Update %date% %time%"
git push origin main
echo.
echo Gotowe! Strona zaktualizowana.
pause
