#!/bin/bash

# Script to push BrilliantEigentikiData2025 to GitHub
# Run this after creating the repository on GitHub

echo "🚀 Pushing BrilliantEigentikiData2025 to GitHub..."
echo ""

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote 'origin' found"
    git remote -v
    echo ""
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo ""
        echo "🌐 Next steps:"
        echo "1. Visit your repository on GitHub"
        echo "2. Deploy on Vercel: https://vercel.com/new"
        echo "3. Or deploy on Netlify: https://app.netlify.com/start"
    else
        echo ""
        echo "❌ Push failed. Please check:"
        echo "   - Your GitHub credentials are configured"
        echo "   - The repository exists on GitHub"
        echo "   - You have push access to the repository"
    fi
else
    echo "⚠️  No remote configured yet."
    echo ""
    echo "📋 First, create the repository on GitHub:"
    echo "   1. Go to: https://github.com/new"
    echo "   2. Repository name: BrilliantEigentikiData2025"
    echo "   3. Don't initialize with README, .gitignore, or license"
    echo "   4. Click 'Create repository'"
    echo ""
    echo "📤 Then run these commands:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/BrilliantEigentikiData2025.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "   (Replace YOUR_USERNAME with your GitHub username)"
    exit 1
fi

