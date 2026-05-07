# RS Sales Playbook — Deployment Script
# يـ deploy الـ MkDocs site على GitHub Pages في خطوة واحدة

param(
    [string]$Mode = "deploy"  # "deploy" or "first-time"
)

$ErrorActionPreference = "Stop"
$ghExe = "$env:USERPROFILE\gh-cli\bin\gh.exe"

Write-Host "=== RS Sales Playbook — Deploy ===" -ForegroundColor Cyan

# Step 1: Build the site
Write-Host "`n[1/4] Building MkDocs site..." -ForegroundColor Yellow
mkdocs build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Site built" -ForegroundColor Green

# Step 2: Check git status
Write-Host "`n[2/4] Checking git..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repo..." -ForegroundColor Yellow
    git init
    git branch -M main
    git config user.name "Said Tantawy"
    git config user.email "said.tantawy153@gmail.com"
}

# Step 3: First-time setup (create repo + push)
if ($Mode -eq "first-time") {
    Write-Host "`n[3/4] First-time setup..." -ForegroundColor Yellow

    # Check gh auth
    & $ghExe auth status 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  محتاج تـ login في GitHub الأول. هيفتحلك browser..." -ForegroundColor Yellow
        & $ghExe auth login --web --git-protocol https --hostname github.com
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Auth failed" -ForegroundColor Red
            exit 1
        }
    }

    # Create the repo (private)
    Write-Host "Creating private repo on GitHub..." -ForegroundColor Yellow
    & $ghExe repo create Performancepsycho/rs-sales-playbook --private --description "RS Sales Playbook — السكريبتات الكاملة لفريق سيلز RS Financial Services"

    # Add remote
    git remote add origin https://github.com/Performancepsycho/rs-sales-playbook.git
}

# Step 4: Commit + push
Write-Host "`n[4/4] Committing and pushing..." -ForegroundColor Yellow
git add .
git commit -m "Update RS Sales Playbook content"
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed" -ForegroundColor Red
    exit 1
}

# Step 5: Deploy to GitHub Pages (gh-pages branch)
Write-Host "`n[Bonus] Deploying to GitHub Pages..." -ForegroundColor Yellow
mkdocs gh-deploy --force

Write-Host "`n=== ✅ Done! ===" -ForegroundColor Green
Write-Host "🌐 Your site is live at:" -ForegroundColor Cyan
Write-Host "   https://performancepsycho.github.io/rs-sales-playbook/" -ForegroundColor White
Write-Host "`n📝 ملاحظة: لو ده أول مرة، GitHub Pages بياخد 2-5 دقايق يبقى live." -ForegroundColor Yellow
