#!/bin/bash

# Script to push BrilliantEigentikiData2025 to GitHub

echo "🚀 Pushing BrilliantEigentikiData2025 to GitHub..."
echo ""

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote 'origin' already configured"
    git remote -v
else
    echo "⚠️  No remote configured yet."
    echo ""
    echo "Please run these commands:"
    echo ""
    echo "  git remote add origin https://github.com/YOUR_USERNAME/BrilliantEigentikiData2025.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    echo ""
    echo "Replace YOUR_USERNAME with your GitHub username."
    exit 1
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Visit your repository: https://github.com/YOUR_USERNAME/BrilliantEigentikiData2025"
    echo "2. Deploy on Vercel: https://vercel.com/new"
    echo "3. Or deploy on Netlify: https://app.netlify.com/start"
    echo ""
else
    echo ""
    echo "❌ Push failed. Please check your GitHub credentials and repository URL."
fi

