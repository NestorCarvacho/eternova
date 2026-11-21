# Lee RAILWAY_API_TOKEN del .env en la raíz y muestra el proyecto Eternova (GraphQL).
# No imprime secretos. Para cambiar variables usa el dashboard o el CLI con cuenta.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path "$root\.env")) {
  Write-Error "Crea .env con RAILWAY_API_TOKEN=..."
}
Get-Content "$root\.env" | ForEach-Object {
  if ($_ -match '^\s*RAILWAY_API_TOKEN=(.*)$') { $script:token = $matches[1].Trim() }
  if ($_ -match '^\s*RAILWAY_TOKEN=(.*)$' -and -not $script:token) { $script:token = $matches[1].Trim() }
}
if (-not $token) { Write-Error "Falta RAILWAY_API_TOKEN en .env" }

$query = '{"query":"{ projects { edges { node { id name services { edges { node { id name } } } } } } }"}'
$body = Join-Path $env:TEMP "railway-q.json"
[System.IO.File]::WriteAllText($body, $query)
$result = curl.exe -sS -H "Authorization: Bearer $token" -H "Content-Type: application/json" -d "@$body" https://backboard.railway.com/graphql/v2
Remove-Item $body -ErrorAction SilentlyContinue
Write-Output $result