# Complete Deployment Guide - Construction PM App v2.0

## Overview

This guide will walk you through **every single step** to deploy your Construction Project Management Application v2.0 to GitHub Pages using:

- **GitHub Repository**: [https://github.com/juruk/prva](https://github.com/juruk/prva)

- **Local Folder**: C:\PRVA

- **Live URL**: [https://juruk.github.io/prva/](https://juruk.github.io/prva/)

⚠️ **Important**: Follow each step exactly as written. Do not skip any steps.

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] Windows computer with administrator access

- [ ] Internet connection

- [ ] GitHub account with access to [https://github.com/juruk/prva](https://github.com/juruk/prva)

- [ ] Git installed on your computer

- [ ] Node.js installed on your computer

- [ ] Downloaded `construction-pm-app-v2.zip` file

---

## Part 1: Software Installation and Setup

### Step 1: Install Git (if not already installed)

1. **Download Git:**
  - Go to: [https://git-scm.com/download/win](https://git-scm.com/download/win)
  - Click "64-bit Git for Windows Setup" (or 32-bit if you have 32-bit Windows)
  - Save the file to your Downloads folder

1. **Install Git:**
  - Double-click the downloaded `.exe` file
  - Click "Yes" if Windows asks for permission
    - Follow the installer:
      - Click "Next" on Welcome screen
      - Click "Next" to accept license
      - **Important**: Leave installation path as default
      - Click "Next" for components (keep defaults)
      - Click "Next" for Start Menu folder
      - **Important**: Select "Use Visual Studio Code as Git's default editor" (or Notepad if you don't have VS Code)
      - **Important**: Select "Git from the command line and also from 3rd-party software"
      - **Important**: Select "Use bundled OpenSSH"
      - **Important**: Select "Use the OpenSSL library"
      - **Important**: Select "Checkout Windows-style, commit Unix-style line endings"
      - **Important**: Select "Use Windows' default console window"
      - **Important**: Select "Default (fast-forward or merge)"
      - **Important**: Select "Git Credential Manager"
      - Click "Install"
      - Click "Finish"

1. **Verify Git Installation:**
  - Press `Windows Key + R`
  - Type `cmd` and press Enter
  - Type: `git --version`
  - Press Enter
  - You should see something like: `git version 2.x.x`
  - If you see this, Git is installed correctly
  - Type `exit` and press Enter to close command prompt

### Step 2: Install Node.js (if not already installed)

1. **Download Node.js:**
  - Go to: [https://nodejs.org](https://nodejs.org)
  - Click the "LTS" version (recommended for most users)
  - Save the file to your Downloads folder

1. **Install Node.js:**
  - Double-click the downloaded `.msi` file
  - Click "Yes" if Windows asks for permission
  - Click "Next" on Welcome screen
  - Click "I accept" and then "Next"
  - **Important**: Leave installation path as default
  - Click "Next" for custom setup (keep defaults)
  - **Important**: Check "Automatically install the necessary tools" if asked
  - Click "Next" then "Install"
  - Wait for installation to complete
  - Click "Finish"

1. **Verify Node.js Installation:**
  - Press `Windows Key + R`
  - Type `cmd` and press Enter
  - Type: `node --version`
  - Press Enter
  - You should see something like: `v18.x.x` or `v20.x.x`
  - Type: `npm --version`
  - Press Enter
  - You should see something like: `9.x.x` or `10.x.x`
  - If you see both versions, Node.js is installed correctly
  - Type `exit` and press Enter to close command prompt

### Step 3: Configure Git with Your GitHub Account

1. **Open Command Prompt:**
  - Press `Windows Key + R`
  - Type `cmd` and press Enter

1. **Set Your Git Username:**
  - Type: `npm --version`
  - Replace "Your Full Name" with your actual name (keep the quotes)
  - Press Enter

1. **Set Your Git Email:**
  - Type: `git config --global user.email "your.email@example.com"`
  - Replace with the email address associated with your GitHub account (keep the quotes)
  - Press Enter

1. **Verify Configuration:**
  - Type: `git config --global user.name`
  - Press Enter - you should see your name
  - Type: `git config --global user.email`
  - Press Enter - you should see your email
  - Type `exit` and press Enter to close command prompt

---

## Part 2: Prepare Local Folder and Files

### Step 4: Create and Prepare Local Folder

1. **Create the C:\PRVA Folder:**
  - Open File Explorer (Windows Key + E)
  - Click on "This PC" in the left sidebar
  - Double-click on "Local Disk (C:)"
  - Right-click in an empty area
  - Select "New" → "Folder"
  - Type: `PRVA`
  - Press Enter

1. **Extract the Application Files:**
  - Locate your downloaded `construction-pm-app-v2.zip` file (usually in Downloads)
  - Right-click on `construction-pm-app-v2.zip`
  - Select "Extract All..."
  - In the destination field, change the path to: `C:\PRVA`
  - **Important**: Make sure "Show extracted files when complete" is checked
  - Click "Extract"
  - Wait for extraction to complete

1. **Verify File Structure:**
  - You should now see a folder at: `C:\PRVA\construction-pm-app`
    - Inside this folder, you should see:
      - `src` folder
      - `dist` folder
      - `package.json` file
      - `vite.config.js` file
      - Various `.md` documentation files
      - Other configuration files

### Step 5: Navigate to the Project Folder

1. **Open Command Prompt in Project Folder:**
  - Press `Windows Key + R`
  - Type `cmd` and press Enter
  - Type: `cd C:\PRVA\construction-pm-app`
  - Press Enter
  - Your command prompt should now show: `C:\PRVA\construction-pm-app>`

1. **Verify You're in the Correct Location:**
  - Type: `dir`
  - Press Enter
    - You should see a list of files including:
      - `package.json`
      - `vite.config.js`
      - `src` directory
      - `dist` directory

---

## Part 3: Install Dependencies and Build

### Step 6: Install Project Dependencies

1. **Install Node Modules:**
  - In the command prompt (should still be in `C:\PRVA\construction-pm-app>`), type:
  - `npm install`
  - Press Enter
  - **Wait patiently** - this may take 2-5 minutes
  - You'll see lots of text scrolling - this is normal
  - When complete, you should see something like: "added XXX packages"
  - You should NOT see any "ERROR" messages (warnings are okay)

1. **Verify Installation:**
  - Type: `dir`
  - Press Enter
  - You should now see a `node_modules` folder in the list

### Step 7: Build the Application

1. **Create Production Build:**
  - Type: `npm run build`
  - Press Enter
  - Wait for the build to complete (usually 30-60 seconds)
  - You should see output ending with something like:
  - You should NOT see any errors

1. **Verify Build:**
  - Type: `dir dist`
  - Press Enter
    - You should see:
      - `index.html`
      - `assets` folder
  - Type: `dir dist\assets`
  - Press Enter
  - You should see `.css` and `.js` files

---

## Part 4: Initialize Git Repository

### Step 8: Initialize Git in Your Local Folder

1. **Initialize Git Repository:**
  - In command prompt (still in `C:\PRVA\construction-pm-app>`), type:
  - `git init`
  - Press Enter
  - You should see: "Initialized empty Git repository in C:/PRVA/construction-pm-app/.git/"

1. **Add GitHub Repository as Remote:**
  - Type: `git remote add origin https://github.com/juruk/prva.git`
  - Press Enter
  - **Important**: Make sure you type the URL exactly as shown

1. **Verify Remote:**
  - Type: `git remote -v`
  - Press Enter
  - You should see:

### Step 9: Prepare Files for Commit

1. **Check Git Status:**
  - Type: `git status`
  - Press Enter
  - You should see a list of "Untracked files" in red

1. **Add All Files to Git:**
  - Type: `git add .`
  - Press Enter
  - **Note**: The dot (.) is important - it means "add all files"

1. **Verify Files Are Staged:**
  - Type: `git status`
  - Press Enter
  - You should now see files listed in green under "Changes to be committed"

1. **Create Initial Commit:**
  - Type: `git commit -m "Initial commit - Construction PM App v2.0"`
  - Press Enter
  - You should see output showing files committed

---

## Part 5: Connect to GitHub and Deploy

### Step 10: Authenticate with GitHub

1. **Set Default Branch:**
  - Type: `git branch -M main`
  - Press Enter

1. **Push to GitHub (First Time):**
  - Type: `git push -u origin main`
  - Press Enter
  - **Important**: You will be prompted to sign in to GitHub
  - A browser window may open, or you may see a login prompt in the command line
  - **Enter your GitHub username and password** (or use GitHub token if you have 2FA enabled)
  - Wait for the push to complete

1. **Verify Push Success:**
  - You should see output ending with something like:
  - If you see this, the push was successful

### Step 11: Verify Files on GitHub

1. **Check GitHub Repository:**
  - Open your web browser
  - Go to: [https://github.com/juruk/prva](https://github.com/juruk/prva)
  - **You should see all your project files listed**
    - Look for:
      - `src` folder
      - `dist` folder
      - `package.json`
      - `README.md`
      - Various `.md` documentation files

1. **If Files Are Missing:**
  - Go back to command prompt
  - Type: `git status`
  - If you see "nothing to commit, working tree clean", the files were pushed
  - If you see untracked files, repeat Step 9

---

## Part 6: Configure GitHub Pages

### Step 12: Enable GitHub Pages

1. **Navigate to Repository Settings:**
  - Go to: [https://github.com/juruk/prva](https://github.com/juruk/prva)
  - Click the "Settings" tab (at the top of the repository page)
  - **Important**: Make sure you're in the repository settings, not your account settings

1. **Find Pages Section:**
  - Scroll down in the left sidebar
  - Click on "Pages" (under "Code and automation")

1. **Configure GitHub Pages:**
  - Under "Source", select "Deploy from a branch"
  - Under "Branch", select "main"
  - Under "Folder", select "/ (root)"
  - Click "Save"

1. **Wait for Deployment:**
  - You should see a message: "GitHub Pages source saved"
  - **Wait 2-5 minutes** for the initial deployment
  - Refresh the page
  - You should see a green checkmark and: "Your site is published at [https://juruk.github.io/prva/](https://juruk.github.io/prva/)"

### Step 13: Verify Deployment

1. **Visit Your Live Site:**
  - Go to: [https://juruk.github.io/prva/](https://juruk.github.io/prva/)
  - **Important**: It may take up to 10 minutes for the site to be fully available
  - If you see a 404 error, wait a few more minutes and try again

1. **Test the Application:**
  - You should see the login page
    - Try logging in with:
      - **Admin**: Password `admin123`
      - **Read-Only**: Password `readonly123`
  - Navigate through the application
  - Test adding investors and supervisors to a project

---

## Part 7: Post-Deployment Verification

### Step 14: Complete Functionality Test

1. **Login Test:**
    - [ ] Can access [https://juruk.github.io/prva/](https://juruk.github.io/prva/)
    - [ ] Login page displays correctly
    - [ ] Can login with admin password
    - [ ] Can login with read-only password
    - [ ] Can logout successfully

1. **Core Features Test:**
    - [ ] Dashboard loads
    - [ ] Can view projects list
    - [ ] Can view project details
    - [ ] Can view architects list
    - [ ] Can view contractors list

1. **New Features Test (Admin Only):**
    - [ ] Can add investors to a project
    - [ ] Can add supervisors to a project
    - [ ] Can edit investor information
    - [ ] Can edit supervisor information
    - [ ] Can delete investors
    - [ ] Can delete supervisors
    - [ ] Multiple investors display correctly
    - [ ] Multiple supervisors display correctly

1. **Data Migration Test:**
    - [ ] If you had existing data, it should appear in the new format
    - [ ] Old single investor/supervisor entries should now appear as arrays

### Step 15: Security Configuration

1. **Change Default Passwords (IMPORTANT):**
  - Open: `C:\PRVA\construction-pm-app\src\components\Login.jsx`
  - Find lines with `admin123` and `readonly123`
  - Change to your preferred passwords
  - Save the file

1. **Rebuild and Redeploy:**
  - In command prompt (C:\PRVA\construction-pm-app>):
  - Type: `npm run build`
  - Press Enter
  - Type: `git add .`
  - Press Enter
  - Type: `git commit -m "Update passwords"`
  - Press Enter
  - Type: `git push`
  - Press Enter
  - Wait 2-5 minutes for GitHub Pages to update

---

## Part 8: Backup and Maintenance

### Step 16: Create Data Backup

1. **Export Current Data:**
  - Go to your live site: [https://juruk.github.io/prva/](https://juruk.github.io/prva/)
  - Login as admin
  - Look for an "Export" button (usually in the navigation or dashboard)
  - Click "Export" to download a JSON backup file
  - Save this file in a safe location (like `C:\PRVA\backups\`)

### Step 17: Future Updates

**To make changes in the future:**

1. **Edit Files:**
  - Make changes to files in `C:\PRVA\construction-pm-app\`
  - Test locally if needed: `npm run dev`

1. **Rebuild:**
  - Open command prompt in `C:\PRVA\construction-pm-app\`
  - Type: `npm run build`

1. **Deploy Changes:**
  - Type: `git add .`
  - Type: `git commit -m "Description of your changes"`
  - Type: `git push`
  - Wait 2-5 minutes for GitHub Pages to update

---

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue: "git is not recognized as an internal or external command"

**Solution:**

- Git is not installed or not in PATH

- Reinstall Git following Step 1 exactly

- Restart command prompt after installation

#### Issue: "npm is not recognized as an internal or external command"

**Solution:**

- Node.js is not installed or not in PATH

- Reinstall Node.js following Step 2 exactly

- Restart command prompt after installation

#### Issue: "Permission denied" when pushing to GitHub

**Solution:**

- Check your GitHub username and password

- If you have 2FA enabled, you need a Personal Access Token instead of password

- Go to GitHub → Settings → Developer settings → Personal access tokens

#### Issue: Site shows 404 error

**Solution:**

- Wait 10 minutes after first deployment

- Check GitHub Pages settings (Step 12)

- Verify `dist` folder exists and has files

- Check that `vite.config.js` has correct base path

#### Issue: Site loads but shows blank page

**Solution:**

- Check browser console for errors (F12 → Console)

- Verify `dist/index.html` exists

- Check that build completed successfully

- Clear browser cache

#### Issue: "Failed to push some refs"

**Solution:**

- The repository might have changes you don't have locally

- Type: `git pull origin main`

- Then try: `git push origin main`

#### Issue: Can't login to the application

**Solution:**

- Default passwords are `admin123` and `readonly123`

- Check browser console for errors

- Verify you're using the correct URL

- Clear browser localStorage: F12 → Application → Local Storage → Clear

### Getting Help

If you encounter issues not covered here:

1. **Check the browser console:**
  - Press F12
  - Click "Console" tab
  - Look for error messages in red

1. **Verify file structure:**
  - Ensure all files are in `C:\PRVA\construction-pm-app\`
  - Check that `dist` folder has `index.html` and `assets` folder

1. **Check GitHub repository:**
  - Verify files were uploaded to [https://github.com/juruk/prva](https://github.com/juruk/prva)
  - Check the "Actions" tab for deployment status

---

## Success Checklist

Your deployment is successful when:

- [ ] ✅ Git and Node.js are installed

- [ ] ✅ Project files are in `C:\PRVA\construction-pm-app\`

- [ ] ✅ `npm install` completed without errors

- [ ] ✅ `npm run build` completed successfully

- [ ] ✅ Files are pushed to [https://github.com/juruk/prva](https://github.com/juruk/prva)

- [ ] ✅ GitHub Pages is enabled and configured

- [ ] ✅ Site loads at [https://juruk.github.io/prva/](https://juruk.github.io/prva/)

- [ ] ✅ Can login with admin and read-only passwords

- [ ] ✅ Can add multiple investors to projects

- [ ] ✅ Can add multiple supervisors to projects

- [ ] ✅ All existing features work correctly

- [ ] ✅ Default passwords have been changed

- [ ] ✅ Data backup has been created

---

## Final Notes

### Important URLs

- **GitHub Repository**: [https://github.com/juruk/prva](https://github.com/juruk/prva)

- **Live Application**: [https://juruk.github.io/prva/](https://juruk.github.io/prva/)

- **Local Files**: C:\PRVA\construction-pm-app\

### Default Credentials

- **Admin**: `admin123` (change this!)

- **Read-Only**: `readonly123` (change this!)

### Key Files

- **Main App**: `src/App.jsx`

- **Login Component**: `src/components/Login.jsx`

- **Project Details**: `src/components/ProjectDetail.jsx`

- **Configuration**: `vite.config.js`

- **Build Output**: `dist/` folder

### Support Documentation

- **QUICK_START_V2.md** - Quick start guide

- **MULTIPLE_INVESTORS_SUPERVISORS.md** - Feature documentation

- **PASSWORD_SETUP.md** - How to change passwords

- **USER_GUIDE.md** - Complete user guide

---

## Congratulations! 🎉

You have successfully deployed Construction Project Management Application v2.0 to GitHub Pages!

Your application is now live at: [**https://juruk.github.io/prva/**](https://juruk.github.io/prva/)

**Next Steps:**

1. Change the default passwords

1. Create a data backup

1. Share the application with your team

1. Start managing your construction projects with multiple investors and supervisors!

---

**Version**: 2.0.0**Deployment Date**: _______________**Status**: ✅ Complete**Live URL**: [https://juruk.github.io/prva/](https://juruk.github.io/prva/)