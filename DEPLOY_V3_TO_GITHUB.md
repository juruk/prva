# Deploy Version 3.0 to GitHub - Complete Guide

## Overview

This guide will walk you through **every single step** to deploy Construction PM App v3.0 to GitHub Pages.

**What you're deploying:**
- ✅ Fixed URL routing (shows `/prva/` in URLs)
- ✅ GitHub data storage feature
- ✅ Collapsible sections infrastructure
- ✅ All previous v2.0 features

**Time needed:** 10-15 minutes  
**Difficulty:** Easy (just follow each step)

---

## Prerequisites

Before starting, make sure you have:
- [ ] Extracted `construction-pm-app-v3.zip` to `C:\PRVA\`
- [ ] Git installed on your computer
- [ ] Node.js installed on your computer
- [ ] Access to GitHub repository: https://github.com/juruk/prva

---

## Part 1: Prepare Your Local Files

### Step 1: Extract the New Version

1. **Locate the zip file:**
   - Find `construction-pm-app-v3.zip` (usually in Downloads)

2. **Extract to C:\PRVA:**
   - Right-click on `construction-pm-app-v3.zip`
   - Select "Extract All..."
   - Change destination to: `C:\PRVA`
   - **Important**: Check "Replace files in destination" if asked
   - Click "Extract"

3. **Verify extraction:**
   - Open File Explorer
   - Navigate to: `C:\PRVA\construction-pm-app`
   - You should see:
     - `src` folder
     - `dist` folder
     - `package.json`
     - `vite.config.js`
     - `V3_UPDATES_GUIDE.md` (new file)
     - `V3_QUICK_REFERENCE.md` (new file)

### Step 2: Open Command Prompt

1. **Press** `Windows Key + R`
2. **Type:** `cmd`
3. **Press** Enter

### Step 3: Navigate to Project Folder

1. **In Command Prompt, type:**
   ```
   cd C:\PRVA\construction-pm-app
   ```

2. **Press** Enter

3. **Verify you're in the right place:**
   - Your prompt should show: `C:\PRVA\construction-pm-app>`

---

## Part 2: Check Current Status

### Step 4: Check Git Status

1. **Type:**
   ```
   git status
   ```

2. **Press** Enter

3. **What you'll see:**
   - If this is the first time: "fatal: not a git repository"
   - If already initialized: List of changed files

**If you see "fatal: not a git repository", continue to Step 5.**  
**If you see a list of files, skip to Step 6.**

### Step 5: Initialize Git (First Time Only)

**Only do this if Step 4 showed "fatal: not a git repository"**

1. **Initialize Git repository:**
   ```
   git init
   ```
   Press Enter

2. **Add remote repository:**
   ```
   git remote add origin https://github.com/juruk/prva.git
   ```
   Press Enter

3. **Set default branch:**
   ```
   git branch -M main
   ```
   Press Enter

4. **Verify remote:**
   ```
   git remote -v
   ```
   Press Enter
   
   You should see:
   ```
   origin  https://github.com/juruk/prva.git (fetch)
   origin  https://github.com/juruk/prva.git (push)
   ```

---

## Part 3: Build the Application

### Step 6: Install Dependencies

1. **Type:**
   ```
   npm install
   ```

2. **Press** Enter

3. **Wait** for installation to complete (2-5 minutes)
   - You'll see lots of text scrolling
   - This is normal
   - Wait for the command prompt to return

4. **Verify success:**
   - You should see: "added XXX packages"
   - No ERROR messages (warnings are okay)

### Step 7: Build Production Version

1. **Type:**
   ```
   npm run build
   ```

2. **Press** Enter

3. **Wait** for build to complete (30-60 seconds)

4. **Verify success:**
   - You should see: "✓ built in X.XXs"
   - No errors

5. **Check build output:**
   ```
   dir dist
   ```
   Press Enter
   
   You should see:
   - `index.html`
   - `assets` folder
   - `favicon.ico`

---

## Part 4: Commit Changes to Git

### Step 8: Add All Files

1. **Type:**
   ```
   git add .
   ```
   **Important:** The dot (.) means "add all files"

2. **Press** Enter

3. **Verify files are staged:**
   ```
   git status
   ```
   Press Enter
   
   You should see files listed in green under "Changes to be committed"

### Step 9: Commit Changes

1. **Type:**
   ```
   git commit -m "v3.0: Fix URLs, add GitHub storage, update features"
   ```
   **Important:** Keep the quotes around the message

2. **Press** Enter

3. **Verify commit:**
   - You should see a summary of files changed
   - Something like: "XX files changed, XXX insertions(+), XXX deletions(-)"

---

## Part 5: Push to GitHub

### Step 10: Push Changes to GitHub

1. **Type:**
   ```
   git push -u origin main
   ```

2. **Press** Enter

3. **Authenticate (if prompted):**
   - A browser window may open for GitHub login
   - OR you may see a prompt for username/password
   - **Enter your GitHub credentials**
   - If you have 2FA enabled, you'll need a Personal Access Token instead of password

4. **Wait for push to complete**
   - You'll see progress messages
   - Wait for "Branch 'main' set up to track remote branch 'main' from 'origin'"

5. **Verify success:**
   - You should see: "Writing objects: 100%"
   - No error messages

### Step 11: Verify Files on GitHub

1. **Open your browser**

2. **Go to:**
   ```
   https://github.com/juruk/prva
   ```

3. **Check that you see:**
   - All your project files
   - `src` folder
   - `dist` folder
   - `V3_UPDATES_GUIDE.md`
   - `V3_QUICK_REFERENCE.md`
   - `.github/workflows/deploy.yml`

4. **Check the commit message:**
   - You should see your commit message at the top
   - "v3.0: Fix URLs, add GitHub storage, update features"

---

## Part 6: Verify GitHub Pages Deployment

### Step 12: Check GitHub Actions

1. **Go to Actions tab:**
   ```
   https://github.com/juruk/prva/actions
   ```

2. **You should see:**
   - A workflow running: "Deploy to GitHub Pages"
   - Orange dot (in progress) or green checkmark (completed)

3. **Wait for completion:**
   - If orange dot: Wait 2-3 minutes
   - Refresh the page
   - Should turn into green checkmark ✓

4. **If you see a red X (failed):**
   - Click on the workflow
   - Click on the "deploy" job
   - Look for error messages
   - See Troubleshooting section below

### Step 13: Check GitHub Pages Settings

1. **Go to repository settings:**
   ```
   https://github.com/juruk/prva/settings/pages
   ```

2. **Verify configuration:**
   - **Source:** Should be "GitHub Actions"
   - **NOT** "Deploy from a branch"

3. **Check deployment status:**
   - You should see: "Your site is live at https://juruk.github.io/prva/"
   - Green checkmark next to it

---

## Part 7: Test Your Live Site

### Step 14: Visit Your Application

1. **Open browser**

2. **Go to:**
   ```
   https://juruk.github.io/prva/
   ```

3. **What you should see:**
   - The login page
   - NOT a blank screen
   - NOT a 404 error

4. **If you see blank screen or 404:**
   - Wait 5 more minutes (first deployment can take longer)
   - Clear browser cache (Ctrl + Shift + Delete)
   - Try incognito/private mode (Ctrl + Shift + N)

### Step 15: Test URL Routing

1. **Login to the app:**
   - Username: (leave blank or any text)
   - Password: `admin123`
   - Click Login

2. **Test navigation:**
   - Click "Projects" in the menu
   - **Check URL:** Should show `https://juruk.github.io/prva/projects`
   - ✅ Correct if it shows `/prva/projects`
   - ❌ Wrong if it shows just `/projects`

3. **Test page refresh:**
   - Press F5 to refresh the page
   - Should stay on the same page
   - Should NOT show 404 error

4. **Test all menu items:**
   - Dashboard → URL should show `/prva/dashboard`
   - Projects → URL should show `/prva/projects`
   - Architects → URL should show `/prva/architects`
   - Contractors → URL should show `/prva/contractors`

### Step 16: Test GitHub Storage Feature

1. **Look for the button:**
   - In the header (top right area)
   - Should see "Setup GitHub Storage" button
   - **Note:** Only visible when logged in as admin

2. **Click the button:**
   - A dialog should open
   - Shows configuration form
   - Has fields for Owner, Repository, Token

3. **Close the dialog:**
   - You don't need to configure it now
   - Just verify the button works

---

## Part 8: Verification Checklist

### Complete Functionality Test

Go through this checklist to verify everything works:

#### URL Routing
- [ ] Base URL is `https://juruk.github.io/prva/`
- [ ] Projects page shows `/prva/projects` in URL
- [ ] Project detail shows `/prva/projects/[id]` in URL
- [ ] Architects page shows `/prva/architects` in URL
- [ ] Contractors page shows `/prva/contractors` in URL
- [ ] Page refresh doesn't cause 404 error
- [ ] Browser back/forward buttons work

#### GitHub Storage
- [ ] "Setup GitHub Storage" button visible (admin only)
- [ ] Button opens configuration dialog
- [ ] Dialog has all required fields
- [ ] Can close dialog without errors

#### Core Features (from v2.0)
- [ ] Can login with admin password
- [ ] Can login with read-only password
- [ ] Dashboard loads correctly
- [ ] Can view projects list
- [ ] Can view project details
- [ ] Can add multiple investors
- [ ] Can add multiple supervisors
- [ ] Can view architects
- [ ] Can view contractors

#### Build & Deployment
- [ ] GitHub Actions workflow completed successfully
- [ ] No errors in Actions tab
- [ ] Files visible in GitHub repository
- [ ] Site loads without errors

---

## Troubleshooting

### Issue: "git is not recognized"

**Solution:**
1. Git is not installed
2. Install Git from: https://git-scm.com/download/win
3. Restart Command Prompt after installation
4. Try again

### Issue: "npm is not recognized"

**Solution:**
1. Node.js is not installed
2. Install Node.js from: https://nodejs.org
3. Restart Command Prompt after installation
4. Try again

### Issue: "Permission denied" when pushing

**Solution:**
1. Check your GitHub username and password
2. If you have 2FA enabled:
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Select `repo` scope
   - Use token as password

### Issue: GitHub Actions workflow fails

**Solution:**
1. Go to: https://github.com/juruk/prva/actions
2. Click on the failed workflow
3. Click on "deploy" job
4. Look for error message

**Common errors:**
- "npm install failed" → Check `package.json` exists
- "npm run build failed" → Check `vite.config.js` exists
- "Missing environment" → Check workflow file has `environment:` section

### Issue: Site shows 404 error

**Solution:**
1. Wait 10 minutes after first push
2. Check GitHub Pages settings:
   - Go to: https://github.com/juruk/prva/settings/pages
   - Source should be "GitHub Actions"
3. Check Actions tab for successful deployment
4. Clear browser cache
5. Try incognito mode

### Issue: Site shows blank white screen

**Solution:**
1. Check browser console (F12 → Console tab)
2. Look for errors
3. Common causes:
   - Base path wrong in `vite.config.js`
   - Should be `base: '/prva/'`
4. If wrong, fix and redeploy:
   ```
   npm run build
   git add .
   git commit -m "Fix base path"
   git push
   ```

### Issue: URLs still don't show /prva/

**Solution:**
1. Clear browser cache completely
2. Try incognito/private mode
3. Check `vite.config.js` has `base: '/prva/'`
4. Check `App.jsx` has `basename="/prva"` on Router
5. Rebuild and redeploy if needed

### Issue: "Failed to push some refs"

**Solution:**
1. Repository has changes you don't have locally
2. Pull first:
   ```
   git pull origin main
   ```
3. Then push:
   ```
   git push origin main
   ```

---

## Future Updates

### How to Deploy Changes Later

Whenever you make changes to the app:

1. **Make your changes** in `C:\PRVA\construction-pm-app\`

2. **Build:**
   ```
   npm run build
   ```

3. **Commit:**
   ```
   git add .
   git commit -m "Description of your changes"
   ```

4. **Push:**
   ```
   git push origin main
   ```

5. **Wait 2-3 minutes** for GitHub Actions to deploy

6. **Visit:** https://juruk.github.io/prva/

### Quick Commands Reference

```bash
# Navigate to project
cd C:\PRVA\construction-pm-app

# Check status
git status

# Build application
npm run build

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

---

## Success Criteria

Your deployment is successful when:

- [ ] ✅ All files pushed to GitHub
- [ ] ✅ GitHub Actions workflow completed (green checkmark)
- [ ] ✅ Site loads at https://juruk.github.io/prva/
- [ ] ✅ URLs show `/prva/` in the path
- [ ] ✅ Login works
- [ ] ✅ Navigation works
- [ ] ✅ GitHub Storage button appears
- [ ] ✅ No 404 errors
- [ ] ✅ No blank screens
- [ ] ✅ All features work

---

## Important URLs

- **Repository:** https://github.com/juruk/prva
- **Actions:** https://github.com/juruk/prva/actions
- **Settings:** https://github.com/juruk/prva/settings/pages
- **Live Site:** https://juruk.github.io/prva/

---

## What to Do After Deployment

### Immediate Actions
1. ✅ Test all URLs
2. ✅ Test login
3. ✅ Test navigation
4. ✅ Verify GitHub Storage button appears

### Recommended Actions
1. Change default passwords (see `PASSWORD_SETUP.md`)
2. Configure GitHub Storage (see `V3_UPDATES_GUIDE.md` Section 2)
3. Create a data backup
4. Share the app with your team

### Optional Actions
1. Implement collapsible sections (see `V3_UPDATES_GUIDE.md` Section 3)
2. Customize styling
3. Add more projects/data

---

## Support

If you encounter issues:

1. **Check this guide's Troubleshooting section**
2. **Check browser console** (F12 → Console)
3. **Check GitHub Actions logs** (Actions tab)
4. **Verify all files are committed** (`git status`)
5. **Try clearing browser cache**

---

## Summary

**What You Did:**
1. ✅ Extracted v3.0 files to C:\PRVA
2. ✅ Installed dependencies with npm install
3. ✅ Built production version with npm run build
4. ✅ Committed changes to Git
5. ✅ Pushed to GitHub
6. ✅ Verified deployment
7. ✅ Tested live site

**What You Have Now:**
- ✅ Working app at https://juruk.github.io/prva/
- ✅ Correct URL routing with /prva/
- ✅ GitHub Storage feature ready to use
- ✅ All v2.0 features (multiple investors/supervisors)
- ✅ Automatic deployment via GitHub Actions

**Next Steps:**
1. Configure GitHub Storage
2. Change default passwords
3. Start using the app!

---

**Congratulations! Your Construction PM App v3.0 is now live!** 🎉

**Live URL:** https://juruk.github.io/prva/

---

**Version:** 3.0.0  
**Status:** ✅ Deployed  
**Date:** October 2025

