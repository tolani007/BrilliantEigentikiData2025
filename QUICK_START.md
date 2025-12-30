# Quick Start - Push to GitHub & Deploy

## 🎯 Repository Name: BrilliantEigentikiData2025

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: **BrilliantEigentikiData2025**
3. Description: "Animated Year in Review presentation for Brilliant.org learning data"
4. Public or Private (your choice)
5. **Don't** check any initialization options
6. Click "Create repository"

## Step 2: Push to GitHub

Run these commands in your terminal:

```bash
cd "/Users/tiki/Desktop/machine learning hub/data/year-in-review"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/BrilliantEigentikiData2025.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

## Step 3: Deploy (Choose One)

### Option A: Vercel (Recommended - Fastest)

1. Go to: https://vercel.com/new
2. Sign in with GitHub
3. Import repository: **BrilliantEigentikiData2025**
4. Click "Deploy" (Vercel auto-detects React)
5. Done! Your site is live 🎉

**Your live URL:** `https://brilliant-eigentiki-data-2025.vercel.app`

### Option B: Netlify

1. Go to: https://app.netlify.com/start
2. Sign in with GitHub
3. Import repository: **BrilliantEigentikiData2025**
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy site"

**Your live URL:** `https://brilliant-eigentiki-data-2025.netlify.app`

## Step 4: Update README with Live Link

After deployment, edit `README.md` and add:

```markdown
## 🌐 Live Demo

**View the live site:** https://your-actual-deployment-url.vercel.app
```

## ✅ Done!

Your project is now:
- ✅ On GitHub
- ✅ Deployed and live
- ✅ Shareable with anyone
- ✅ Fully functional

## 🔒 Security Note

Your personal data folders (`analytics/` and `production/`) are **NOT** included in the repository. Only processed statistics are included, which are safe to share.

