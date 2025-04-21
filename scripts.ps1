
Write-Host "==============================="
Write-Host " Afiliado Hacker PRO - MENU"
Write-Host "==============================="
Write-Host "1. Instalar dependências (npm install)"
Write-Host "2. Iniciar projeto (npm run dev)"
Write-Host "3. Build de produção (npm run build)"
Write-Host "4. Start (npm run start)"
Write-Host "5. Reinstalar (limpar node_modules e instalar novamente)"
Write-Host "6. Atualizar pacotes (npm update)"
Write-Host "7. Limpar cache do npm"
Write-Host "0. Sair"

$opcao = Read-Host "`nEscolha uma opção"

switch ($opcao) {
    "1" { npm install }
    "2" { npm run dev }
    "3" { npm run build }
    "4" { npm run start }
    "5" { Remove-Item -Recurse -Force "node_modules"; Remove-Item -Force package-lock.json; npm install }
    "6" { npm update }
    "7" { npm cache clean --force }
    "0" { exit }
    default { Write-Host "Opção inválida." }
}
