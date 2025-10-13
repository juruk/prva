# GitHub Deployment Guide - Construction Project Manager

**Personalized for Your Setup**

- Local Folder: C:\PRVA
- GitHub Repository: https://github.com/juruk/prva
- Live URL (after deployment): https://juruk.github.io/prva

---

## Prerequisites

Before you begin, make sure you have:

1. Git installed on your computer
   - Download from: https://git-scm.com/downloads
   - Verify installation: Open Command Prompt and type: git --version

2. GitHub account created
   - You already have this: juruk

3. Application files extracted to C:\PRVA
   - Download the ZIP file I provided
   - Extract all contents to C:\PRVA folder

---

## Step 1: Verify Your Local Folder

1. Open File Explorer
2. Navigate to C:\PRVA
3. You should see these folders and files:
   - dist/ folder (contains the built application)
   - src/ folder (contains source code)
   - node_modules/ folder (if present)
   - package.json file
   - vite.config.js file
   - README.md file
   - Other documentation files

---

## Step 2: Create GitHub Repository (If Not Already Created)

If you haven't created the repository yet:

1. Go to https://github.com
2. Log in with your account (juruk)
3. Click the "+" icon in the top-right corner
4. Select "New repository"
5. Enter repository details:
   - Repository name: prva
   - Description: Construction Project Management System
   - Visibility: Choose Public (required for free GitHub Pages)
   - DO NOT check "Initialize with README"
   - DO NOT add .gitignore or license yet
6. Click "Create repository"

If the repository already exists at https://github.com/juruk/prva:
- You can skip this step and proceed to Step 3

---

## Step 3: Initialize Git in Your Local Folder

1. Open Command Prompt (or PowerShell)
   - Press Windows + R
   - Type cmd and press Enter

2. Navigate to your project folder:

cd C:\PRVA

3. Initialize Git repository:

git init

4. Configure Git with your information (if not already done):

git config user.name "juruk"
git config user.email "your-email@example.com"

(Replace with your actual email address used on GitHub)

---

## Step 4: Update Repository Configuration

Since the application was configured for a generic repository name, we need to update it for your specific repository:

1. Open the file C:\PRVA\vite.config.js in a text editor (Notepad, VS Code, etc.)

2. Find this line:
   base: '/construction-pm-app/',

3. Change it to:
   base: '/prva/',

4. Save the file

---

## Step 5: Rebuild the Application

Since we changed the configuration, we need to rebuild:

1. Make sure you're still in C:\PRVA in Command Prompt

2. Install dependencies (if not already installed):

npm install

3. Rebuild the application:

npm run build

4. Wait for the build to complete (should take 10-30 seconds)

---

## Step 6: Prepare Files for Git

1. Create a .gitignore file to exclude unnecessary files. Run these commands one by one:

echo node_modules/ > .gitignore
echo .DS_Store >> .gitignore
echo dist/.git >> .gitignore

2. Add all files to Git:

git add .

3. Create your first commit:

git commit -m "Initial commit: Construction Project Manager"

---

## Step 7: Connect to GitHub Repository

1. Add your GitHub repository as the remote:

git remote add origin https://github.com/juruk/prva.git

2. Verify the remote was added:

git remote -v

You should see:
origin  https://github.com/juruk/prva.git (fetch)
origin  https://github.com/juruk/prva.git (push)

---

## Step 8: Push Code to GitHub

1. Push your code to GitHub:

git branch -M main
git push -u origin main

2. If prompted for credentials:
   - Username: juruk
   - Password: Use a Personal Access Token (not your GitHub password)

To create a Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name: "Construction PM App"
   - Select scopes: Check "repo" (full control of private repositories)
   - Click "Generate token"
   - Copy the token (you won't see it again!)
   - Use this token as your password when pushing

3. Wait for the push to complete

4. Verify on GitHub:
   - Go to https://github.com/juruk/prva
   - You should see all your files

---

## Step 9: Deploy to GitHub Pages

Now we'll deploy the dist folder to GitHub Pages:

1. Navigate to the dist folder:

cd dist

2. Initialize Git in the dist folder:

git init
git add .
git commit -m "Deploy Construction PM App"

3. Push to the gh-pages branch:

git branch -M gh-pages
git remote add origin https://github.com/juruk/prva.git
git push -f origin gh-pages

4. Go back to the main folder:

cd ..

---

## Step 10: Enable GitHub Pages

1. Go to your repository: https://github.com/juruk/prva

2. Click on "Settings" tab (top menu)

3. In the left sidebar, click "Pages"

4. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "gh-pages"
   - Folder: Select "/ (root)"

5. Click "Save"

6. Wait 1-3 minutes for deployment

7. Refresh the page - you should see:
   "Your site is live at https://juruk.github.io/prva/"

---

## Step 11: Access Your Live Application

1. Open your browser

2. Go to: https://juruk.github.io/prva/

3. You should see the login screen for your Construction Project Manager!

4. Log in with:
   - Admin: admin123
   - Read-Only: view123

---

## Success!

Your Construction Project Manager is now live at:
https://juruk.github.io/prva/

You can share this URL with your team members!

---

## Updating Your Application

When you make changes and want to update the live site:

1. Make your changes in C:\PRVA

2. Rebuild the application:

cd C:\PRVA
npm run build

3. Commit and push changes to main branch:

git add .
git commit -m "Update: description of changes"
git push origin main

4. Deploy the updated dist folder:

cd dist
git add .
git commit -m "Deploy updates"
git push -f origin gh-pages
cd ..

5. Wait 1-3 minutes for GitHub Pages to update

6. Refresh https://juruk.github.io/prva/ to see changes

---

## Troubleshooting

### Issue: "Permission denied" when pushing

Solution: You need to use a Personal Access Token instead of your password.
- Follow the instructions in Step 8 to create a token
- Use the token as your password when Git asks for credentials

### Issue: "Repository not found"

Solution: Make sure the repository exists at https://github.com/juruk/prva
- Check that you're logged in as juruk
- Verify the repository name is exactly prva (lowercase)

### Issue: 404 error when accessing the live site

Solution:
1. Make sure GitHub Pages is enabled (Step 10)
2. Wait 3-5 minutes for initial deployment
3. Check that the gh-pages branch exists in your repository
4. Verify the base in vite.config.js is set to /prva/

### Issue: Application loads but shows errors

Solution:
1. Clear your browser cache
2. Check browser console for errors (F12)
3. Verify the base path in vite.config.js matches your repository name
4. Rebuild and redeploy

### Issue: Changes not appearing on live site

Solution:
1. Clear browser cache (Ctrl + Shift + Delete)
2. Wait 3-5 minutes for GitHub Pages to update
3. Try accessing in incognito/private browsing mode
4. Verify you pushed to the gh-pages branch

---

## Security Reminders

Before Sharing with Your Team:

1. Change Default Passwords
   - Edit C:\PRVA\src\components\Login.jsx
   - Find the ADMIN_PASSWORD and READONLY_PASSWORD constants
   - Change admin123 and view123 to your own secure passwords
   - Rebuild and redeploy

2. Remove Development Info Box
   - Edit C:\PRVA\src\components\Login.jsx
   - Remove or comment out the development password display section
   - Rebuild and redeploy

3. Data Backup
   - Regularly export your data using the "Export Data" button
   - Store backups in a secure location
   - Consider setting up the optional GitHub backup system

---

## Optional: Set Up Automatic Deployment

For easier updates, you can set up a script:

1. Create a file C:\PRVA\deploy.bat with this content:

@echo off
echo Building application...
call npm run build

echo Deploying to GitHub Pages...
cd dist
git add .
git commit -m "Deploy: %date% %time%"
git push -f origin gh-pages
cd ..

echo Deployment complete!
echo Your site will be updated at https://juruk.github.io/prva/ in 1-3 minutes
pause

2. Save the file

3. To deploy updates, just double-click deploy.bat

---

## Need Help?

If you encounter any issues during deployment:

1. Check the troubleshooting section above
2. Verify all commands were executed in the correct folder
3. Make sure Git is properly installed
4. Ensure you have internet connection
5. Check that your GitHub credentials are correct

---

## Summary

Your Construction Project Manager is now deployed at:
https://juruk.github.io/prva/

Local Folder: C:\PRVA
GitHub Repository: https://github.com/juruk/prva
Main Branch: main (source code)
Deployment Branch: gh-pages (live site)

Congratulations! Your application is live and ready to use!

---

Last Updated: October 10, 2025
Version: 2.1
Status: Ready to Deploy

