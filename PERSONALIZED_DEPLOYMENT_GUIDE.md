# `GitHub Deployment Guide - Construction Project Manager

**Personalized for Your Setup**

- **Local Folder**: `C:\PRVA`

- **GitHub Repository**: `https://github.com/juruk/prva`

- **Live URL** (after deployment): `https://juruk.github.io/prva`

---

## Prerequisites

Before you begin, make sure you have:

1. **Git installed** on your computer
  - Download from: [https://git-scm.com/downloads](https://git-scm.com/downloads)
  - Verify installation: Open Command Prompt and type `git --version`

1. **GitHub account** created
  - You already have this: `juruk`

1. **Application files** extracted to `C:\PRVA`
  - Download the ZIP file I provided
  - Extract all contents to `C:\PRVA` folder

---

## Step 1: Verify Your Local Folder

1. Open **File Explorer**

1. Navigate to `C:\PRVA`

1. You should see these folders and files:
  - `dist/` folder (contains the built application)
  - `src/` folder (contains source code)
  - `node_modules/` folder (if present)
  - `package.json` file
  - `vite.config.js` file
  - `README.md` file
  - Other documentation files

---

## Step 2: Create GitHub Repository (If Not Already Created)

**If you haven't created the repository yet:**

1. Go to [https://github.com](https://github.com)

1. Log in with your account (`juruk`)

1. Click the **"+"** icon in the top-right corner

1. Select **"New repository"**

1. Enter repository details:
  - **Repository name**: `prva`
  - **Description**: "Construction Project Management System"
  - **Visibility**: Choose **Public** (required for free GitHub Pages)
  - **DO NOT** check "Initialize with README"
  - **DO NOT** add .gitignore or license yet

1. Click **"Create repository"**

**If the repository already exists at **[**https://github.com/juruk/prva**](https://github.com/juruk/prva)**:**

- You can skip this step and proceed to Step 3

---

## Step 3: Initialize Git in Your Local Folder

1. Open **Command Prompt** (or **PowerShell**)
  - Press `Windows + R`
  - Type `cmd` and press Enter

1. Navigate to your project folder:

1. Initialize Git repository:

1. Configure Git with your information (if not already done):

---

## Step 4: Update Repository Configuration

Since the application was configured for a generic repository name, we need to update it for your specific repository:

1. Open the file `C:\PRVA\vite.config.js` in a text editor (Notepad, VS Code, etc.)

1. Find this line:

1. Change it to:

1. Save the file

---

## Step 5: Rebuild the Application

Since we changed the configuration, we need to rebuild:

1. Make sure you're still in `C:\PRVA` in Command Prompt

1. Install dependencies (if not already installed):

1. Rebuild the application:

1. Wait for the build to complete (should take 10-30 seconds)

---

## Step 6: Prepare Files for Git

1. Create a `.gitignore` file to exclude unnecessary files:

1. Add all files to Git:

1. Create your first commit:

---

## Step 7: Connect to GitHub Repository

1. Add your GitHub repository as the remote:

1. Verify the remote was added:

---

## Step 8: Push Code to GitHub

1. Push your code to GitHub:

1. **If prompted for credentials:**
  - **Username**: `juruk`
  - **Password**: Use a **Personal Access Token** (not your GitHub password)
  - Go to: [https://github.com/settings/tokens](https://github.com/settings/tokens)
  - Click "Generate new token" → "Generate new token (classic)"
  - Give it a name: "Construction PM App"
  - Select scopes: Check **"repo"** (full control of private repositories)
  - Click "Generate token"
  - **Copy the token** (you won't see it again!)
  - Use this token as your password when pushing

1. Wait for the push to complete

1. Verify on GitHub:
  - Go to [https://github.com/juruk/prva](https://github.com/juruk/prva)
  - You should see all your files

---

## Step 9: Deploy to GitHub Pages

Now we'll deploy the `dist` folder to GitHub Pages:

1. Navigate to the dist folder:

1. Initialize Git in the dist folder:

1. Push to the `gh-pages` branch:

1. Go back to the main folder:

---

## Step 10: Enable GitHub Pages

1. Go to your repository: [https://github.com/juruk/prva](https://github.com/juruk/prva)

1. Click on **"Settings"** tab (top menu)

1. In the left sidebar, click **"Pages"**

1. Under "Build and deployment":
  - **Source**: Select **"Deploy from a branch"**
  - **Branch**: Select **"gh-pages"**
  - **Folder**: Select **"/ (root)"**

1. Click **"Save"**

1. Wait 1-3 minutes for deployment

1. Refresh the page - you should see:

---

## Step 11: Access Your Live Application

1. Open your browser

1. Go to: [**https://juruk.github.io/prva/**](https://juruk.github.io/prva/)

1. You should see the login screen for your Construction Project Manager!

1. Log in with:
  - **Admin**: `admin123`
  - **Read-Only**: `view123`

---

## 🎉 Success!

Your Construction Project Manager is now live at:

### [**https://juruk.github.io/prva/**](https://juruk.github.io/prva/)

You can share this URL with your team members!

---

## Updating Your Application

When you make changes and want to update the live site:

1. Make your changes in `C:\PRVA`

1. Rebuild the application:

1. Commit and push changes to main branch:

1. Deploy the updated dist folder:

1. Wait 1-3 minutes for GitHub Pages to update

1. Refresh [https://juruk.github.io/prva/](https://juruk.github.io/prva/) to see changes

---

## Troubleshooting

### Issue: "Permission denied" when pushing

**Solution**: You need to use a Personal Access Token instead of your password.

- Follow the instructions in Step 8 to create a token

- Use the token as your password when Git asks for credentials

### Issue: "Repository not found"

**Solution**: Make sure the repository exists at [https://github.com/juruk/prva](https://github.com/juruk/prva)

- Check that you're logged in as `juruk`

- Verify the repository name is exactly `prva` (lowercase)

### Issue: 404 error when accessing the live site

**Solution**:

1. Make sure GitHub Pages is enabled (Step 10)

1. Wait 3-5 minutes for initial deployment

1. Check that the `gh-pages` branch exists in your repository

1. Verify the `base` in `vite.config.js` is set to `/prva/`

### Issue: Application loads but shows errors

**Solution**:

1. Clear your browser cache

1. Check browser console for errors (F12)

1. Verify the `base` path in `vite.config.js` matches your repository name

1. Rebuild and redeploy

### Issue: Changes not appearing on live site

**Solution**:

1. Clear browser cache (Ctrl + Shift + Delete)

1. Wait 3-5 minutes for GitHub Pages to update

1. Try accessing in incognito/private browsing mode

1. Verify you pushed to the `gh-pages` branch

---

## Security Reminders

### Before Sharing with Your Team:

1. **Change Default Passwords**
  - Edit `C:\PRVA\src\components\Login.jsx`
  - Find the `ADMIN_PASSWORD` and `READONLY_PASSWORD` constants
  - Change `admin123` and `view123` to your own secure passwords
  - Rebuild and redeploy

1. **Remove Development Info Box**
  - Edit `C:\PRVA\src\components\Login.jsx`
  - Remove or comment out the development password display section
  - Rebuild and redeploy

1. **Data Backup**
  - Regularly export your data using the "Export Data" button
  - Store backups in a secure location
  - Consider setting up the optional GitHub backup system

---

## Optional: Set Up Automatic Deployment

For easier updates, you can set up a script:

1. Create a file `C:\PRVA\deploy.bat`:

1. Save the file

1. To deploy updates, just double-click `deploy.bat`

---

## Need Help?

If you encounter any issues during deployment:

1. Check the troubleshooting section above

1. Verify all commands were executed in the correct folder

1. Make sure Git is properly installed

1. Ensure you have internet connection

1. Check that your GitHub credentials are correct

---

## Summary

Your Construction Project Manager is now deployed at:

### [**https://juruk.github.io/prva/**](https://juruk.github.io/prva/)

**Local Folder**: `C:\PRVA`**GitHub Repository**: `https://github.com/juruk/prva`**Main Branch**: `main` (source code)**Deployment Branch**: `gh-pages` (live site)

**Congratulations! Your application is live and ready to use!** 🎉

---

**Last Updated**: October 10, 2025**Version**: 2.1**Status**: Ready to Deploy ✅

