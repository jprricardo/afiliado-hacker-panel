@echo off
echo === Limpando node_modules do Git com segurança ===
echo.

set /p confirm1=Remover 'node_modules' do controle de versão? [s/n] 
if /I not "%confirm1%"=="s" goto fim

echo.
git rm -r --cached node_modules
if %errorlevel% neq 0 (
  echo Erro ao remover node_modules do Git.
  goto fim
)

echo.
set /p confirm2=Adicionar 'node_modules/' ao .gitignore se ainda não estiver? [s/n] 
if /I "%confirm2%"=="s" (
  findstr /C:"node_modules/" .gitignore >nul 2>&1
  if errorlevel 1 (
    echo node_modules/>>.gitignore
    echo Linha adicionada ao .gitignore.
  ) else (
    echo .gitignore já contém node_modules/
  )
)

echo.
set /p confirm3=Fazer commit e push automático? [s/n] 
if /I "%confirm3%"=="s" (
  git add .gitignore
  git commit -m "Remover node_modules do Git e atualizar .gitignore"
  git push
)

:fim
echo.
echo Pronto. Pressione qualquer tecla para sair...
pause >nul
