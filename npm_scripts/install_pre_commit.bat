@ECHO OFF

ECHO Checking if pre-commit is installed...

WHERE pre-commit
IF %ERRORLEVEL% NEQ 0 ECHO pre-commit wasn't found. Instructions to install - https://pre-commit.com/#install
WHERE gitleaks
IF %ERRORLEVEL% NEQ 0 ECHO gitleaks wasn't found. Instructions to install - https://github.com/zricethezav/gitleaks

ECHO Installing pre-commit hooks...
pre-commit install

PAUSE>nul
ECHO IMPORTANT - DO NOT IGNORE ABOVE AS THEY ARE REQUIRED TO COMPLY WITH OPEN SOURCING POLICY
