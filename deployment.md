# 🚀 Deployment Guide - DSA Playground on GitHub Pages

This guide will help you deploy your DSA Playground to GitHub Pages for free hosting.

## 📋 Prerequisites

- ✅ Code already pushed to GitHub repository: `GaneshPatil7517/DSA-Playground`
- ✅ Node.js and npm installed
- ✅ GitHub account with repository access

## 🔧 Setup Steps

### Step 1: Configure GitHub Repository Settings

1. Go to your repository: https://github.com/GaneshPatil7517/DSA-Playground
2. Click on **Settings** (top menu)
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This will use the workflow file we created (`.github/workflows/deploy.yml`)

### Step 2: Push the Configuration Files

The following files have been added to your project:
- `frontend/vite.config.js` - Vite configuration with base path
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
- Updated `package.json` with deployment scripts

Now commit and push these changes:

```powershell
cd "c:\Users\HP\Music\DSA Mini Project"
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

### Step 3: Wait for Deployment

1. Go to your repository: https://github.com/GaneshPatil7517/DSA-Playground
2. Click on **Actions** tab
3. You'll see a workflow running called "Deploy to GitHub Pages"
4. Wait for it to complete (usually takes 2-3 minutes)
5. Once complete, your site will be live! ✅

### Step 4: Access Your Live Site

Your DSA Playground will be available at:
**https://ganeshpatil7517.github.io/DSA-Playground/**

## 🔄 Automatic Updates

Every time you push code to the `main` branch:
1. GitHub Actions automatically builds your project
2. Deploys the latest version to GitHub Pages
3. Your live site updates within 2-3 minutes

## 🛠️ Manual Deployment (Alternative Method)

If you prefer to deploy manually:

```powershell
cd "c:\Users\HP\Music\DSA Mini Project\frontend"
npm run deploy
```

This will build and deploy directly to the `gh-pages` branch.

## 📱 Features Available Online

Once deployed, visitors can access:
- ✅ 5 Sorting Algorithm Visualizers (Bubble, Selection, Insertion, Merge, Quick)
- ✅ Linked List with Memory Addresses
- ✅ Stack Simulator (LIFO)
- ✅ Queue Simulator (FIFO)
- ✅ Binary Search Tree Visualizer
- ✅ Pathfinding Algorithms (BFS, DFS)
- ✅ Dark/Light Mode Toggle
- ✅ Step-by-step Mode with Code Display
- ✅ Custom Array Input & Presets

## 🐛 Troubleshooting

### Issue: 404 Error on Refresh
If you get a 404 error when refreshing a page:
- This is normal for client-side routing on GitHub Pages
- Users should navigate using the navbar instead of direct URLs

### Issue: Build Failed
Check the Actions tab for error messages:
1. Go to **Actions** tab
2. Click on the failed workflow
3. Review the error logs
4. Fix the issue and push again

### Issue: Site Not Updating
1. Check if the workflow completed successfully
2. Clear your browser cache (Ctrl + Shift + Delete)
3. Try in incognito/private mode

## 📊 Check Deployment Status

Visit the Actions tab to monitor deployments:
https://github.com/GaneshPatil7517/DSA-Playground/actions

## 🎉 Share Your Project

Once deployed, share your live project:
- **Live URL**: https://ganeshpatil7517.github.io/DSA-Playground/
- **GitHub Repo**: https://github.com/GaneshPatil7517/DSA-Playground
- Add to your resume, portfolio, LinkedIn!

## 📝 Next Steps After Deployment

1. Test all features on the live site
2. Share the link with friends/recruiters
3. Add the live URL to your GitHub repository description
4. Continue adding new features - they'll auto-deploy!

---

**Note**: The first deployment might take 5-10 minutes. Subsequent deployments are faster (2-3 minutes).