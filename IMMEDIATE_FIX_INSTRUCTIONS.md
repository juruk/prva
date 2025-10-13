# IMMEDIATE FIX - Blank Screen Issue

## What Happened?

Your site shows a blank screen because GitHub Pages is trying to serve files from the root folder, but your built application is in the `/dist` folder.

## Quick Fix (5 Minutes)

Follow these exact steps to fix the issue:

---

## Step 1: Add GitHub Actions Workflow

### On Your Computer:

1. **Open File Explorer** (Windows Key + E)

2. **Navigate to:** `C:\PRVA\construction-pm-app`

3. **Create folder structure:**
   - Right-click → New → Folder → Name it: `.github`
   - Open the `.github` folder
   - Right-click → New → Folder → Name it: `workflows`
   - You should now have: `C:\PRVA\construction-pm-app\.github\workflows\`

4. **Create the workflow file:**
   - Inside the `workflows` folder, right-click → New → Text Document
   - Rename it to: `deploy.yml` (remove the .txt extension)
   - Right-click on `deploy.yml` → Open with Notepad

5. **Paste this content into the file:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

6. **Save and close** the file

---

## Step 2: Push to GitHub

1. **Open Command Prompt:**
   - Press `Windows Key + R`
   - Type: `cmd`
   - Press Enter

2. **Navigate to project:**
   ```
   cd C:\PRVA\construction-pm-app
   ```
   Press Enter

3. **Add files:**
   ```
   git add .
   ```
   Press Enter

4. **Commit:**
   ```
   git commit -m "Add GitHub Actions deployment workflow"
   ```
   Press Enter

5. **Push:**
   ```
   git push origin main
   ```
   Press Enter

---

## Step 3: Change GitHub Pages Settings

1. **Open browser and go to:**
   ```
   https://github.com/juruk/prva/settings/pages
   ```

2. **Under "Source":**
   - Click the dropdown
   - Select **"GitHub Actions"**
   - **DO NOT select "Deploy from a branch"**

3. **That's it!** It saves automatically.

---

## Step 4: Wait for Deployment

1. **Go to Actions tab:**
   ```
   https://github.com/juruk/prva/actions
   ```

2. **You should see:**
   - A workflow running called "Deploy to GitHub Pages"
   - It will show an orange dot (in progress)
   - Wait 2-3 minutes
   - It will turn into a green checkmark ✓

3. **Once you see the green checkmark:**
   - Go to: `https://juruk.github.io/prva/`
   - Your site should now work!
   - You should see the login page

---

## Verification Checklist

After following the steps above:

- [ ] `.github/workflows/deploy.yml` file exists in your project
- [ ] You pushed the changes to GitHub
- [ ] GitHub Pages source is set to "GitHub Actions"
- [ ] Workflow completed successfully (green checkmark in Actions tab)
- [ ] Site loads at https://juruk.github.io/prva/
- [ ] You see the login page (not blank screen)

---

## If You Still See Blank Screen

1. **Clear your browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Click "Clear data"

2. **Try incognito/private mode:**
   - Press `Ctrl + Shift + N` (Chrome)
   - Or `Ctrl + Shift + P` (Firefox)
   - Visit: https://juruk.github.io/prva/

3. **Check browser console:**
   - Press `F12`
   - Click "Console" tab
   - Look for any red error messages
   - Take a screenshot if you see errors

---

## Why This Fixes It

**Before:**
- GitHub Pages looked in root folder for `index.html`
- Your `index.html` is in `/dist` folder
- Result: 404 or blank screen

**After:**
- GitHub Actions builds your app
- Automatically deploys `/dist` folder contents
- GitHub Pages serves the correct files
- Result: Working application!

---

## Future Deployments

From now on, whenever you make changes:

1. Make your changes in `C:\PRVA\construction-pm-app`
2. Run: `npm run build`
3. Run: `git add .`
4. Run: `git commit -m "Description of changes"`
5. Run: `git push origin main`
6. GitHub Actions will automatically deploy!

---

## Need Help?

If the workflow fails:
1. Go to: https://github.com/juruk/prva/actions
2. Click on the failed workflow
3. Look at the error message
4. Common issues:
   - Make sure `package.json` exists
   - Make sure `vite.config.js` exists
   - Make sure `npm run build` works locally

---

## Summary

**What you need to do:**
1. Create `.github/workflows/deploy.yml` file ✓
2. Copy the YAML content into it ✓
3. Push to GitHub ✓
4. Change Pages source to "GitHub Actions" ✓
5. Wait for deployment ✓
6. Visit your site ✓

**Time needed:** 5 minutes  
**Difficulty:** Easy (just copy and paste)  
**Result:** Working application at https://juruk.github.io/prva/

---

**Let's fix this now!** 🚀

