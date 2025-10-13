# GitHub Pages Deployment Fix

## The Problem

You're seeing a blank white screen or 404 error because GitHub Pages is looking for files in the wrong location. The built application files are in the `/dist` folder, but GitHub Pages is trying to serve from the root.

## Solution: Use GitHub Actions for Deployment

We need to use GitHub Actions to automatically deploy the `/dist` folder to GitHub Pages.

---

## Step-by-Step Fix

### Step 1: Create GitHub Actions Workflow File

1. **On your local computer, open File Explorer**
   - Navigate to: `C:\PRVA\construction-pm-app`

2. **Create the `.github` folder:**
   - Right-click in the folder
   - Select "New" → "Folder"
   - Name it: `.github` (with the dot at the beginning)
   - Press Enter

3. **Create the `workflows` folder inside `.github`:**
   - Open the `.github` folder you just created
   - Right-click inside
   - Select "New" → "Folder"
   - Name it: `workflows`
   - Press Enter

4. **Create the workflow file:**
   - Open the `workflows` folder
   - Right-click inside
   - Select "New" → "Text Document"
   - Name it: `deploy.yml` (make sure to remove the `.txt` extension)
   - If Windows asks about changing file extension, click "Yes"

5. **Edit the workflow file:**
   - Right-click on `deploy.yml`
   - Select "Open with" → "Notepad"
   - Copy and paste the following content:

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

   - Save the file (File → Save)
   - Close Notepad

### Step 2: Commit and Push the Workflow File

1. **Open Command Prompt:**
   - Press `Windows Key + R`
   - Type `cmd` and press Enter

2. **Navigate to your project:**
   - Type: `cd C:\PRVA\construction-pm-app`
   - Press Enter

3. **Add the new files:**
   - Type: `git add .`
   - Press Enter

4. **Commit the changes:**
   - Type: `git commit -m "Add GitHub Actions workflow for deployment"`
   - Press Enter

5. **Push to GitHub:**
   - Type: `git push origin main`
   - Press Enter
   - Wait for the push to complete

### Step 3: Configure GitHub Pages Settings

1. **Go to your repository:**
   - Open browser: https://github.com/juruk/prva

2. **Go to Settings:**
   - Click the "Settings" tab at the top

3. **Go to Pages:**
   - Scroll down the left sidebar
   - Click "Pages" (under "Code and automation")

4. **Change the Source:**
   - Under "Source", select **"GitHub Actions"** (NOT "Deploy from a branch")
   - **Important**: This is different from before!
   - You don't need to click Save - it saves automatically

### Step 4: Verify Deployment

1. **Check Actions Tab:**
   - Go to: https://github.com/juruk/prva
   - Click the "Actions" tab at the top
   - You should see a workflow running called "Deploy to GitHub Pages"
   - Wait for it to complete (green checkmark)
   - This usually takes 2-3 minutes

2. **Check Deployment:**
   - Once the workflow shows a green checkmark
   - Go back to "Settings" → "Pages"
   - You should now see: "Your site is live at https://juruk.github.io/prva/"

3. **Visit Your Site:**
   - Go to: https://juruk.github.io/prva/
   - You should see the login page
   - **No more blank screen!**

---

## Troubleshooting

### Issue: Workflow fails with error

**Check the Actions tab:**
1. Go to: https://github.com/juruk/prva/actions
2. Click on the failed workflow
3. Look for error messages

**Common fixes:**
- Make sure `package.json` and `vite.config.js` are in the repository
- Verify the `dist` folder is being created during build
- Check that `npm run build` works locally

### Issue: Still seeing blank screen

**Check browser console:**
1. Press F12 in your browser
2. Click "Console" tab
3. Look for errors

**Common causes:**
- Base path in `vite.config.js` might be wrong
- Files might not be loading due to path issues

**Fix:**
1. Open `C:\PRVA\construction-pm-app\vite.config.js`
2. Make sure it has:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/prva/',
})
```
3. If you changed it, rebuild and push:
```bash
npm run build
git add .
git commit -m "Fix base path"
git push origin main
```

### Issue: 404 error on page refresh

This is normal for single-page apps on GitHub Pages. To fix:

1. Create a `404.html` file in the `public` folder
2. Copy the content from `index.html`
3. Rebuild and push

---

## Quick Reference

### File Structure After Fix:
```
C:\PRVA\construction-pm-app\
├── .github/
│   └── workflows/
│       └── deploy.yml          ← NEW FILE
├── src/
├── dist/
├── package.json
├── vite.config.js
└── ...
```

### Commands to Deploy Changes:
```bash
cd C:\PRVA\construction-pm-app
npm run build
git add .
git commit -m "Your change description"
git push origin main
```

### Important URLs:
- **Repository**: https://github.com/juruk/prva
- **Actions**: https://github.com/juruk/prva/actions
- **Settings**: https://github.com/juruk/prva/settings/pages
- **Live Site**: https://juruk.github.io/prva/

---

## What Changed?

### Before (Incorrect):
- GitHub Pages tried to serve from root folder
- No build process
- Files in `/dist` were ignored

### After (Correct):
- GitHub Actions builds the app automatically
- Deploys only the `/dist` folder
- Runs on every push to main branch

---

## Next Steps After Fix

1. ✅ Create `.github/workflows/deploy.yml` file
2. ✅ Push to GitHub
3. ✅ Change Pages source to "GitHub Actions"
4. ✅ Wait for workflow to complete
5. ✅ Visit https://juruk.github.io/prva/
6. ✅ Test the application
7. ✅ Change default passwords

---

## Need More Help?

If you're still seeing issues:

1. **Check the Actions tab** for error messages
2. **Check browser console** (F12 → Console)
3. **Verify the workflow file** was created correctly
4. **Make sure** GitHub Pages source is set to "GitHub Actions"

The workflow file automates everything - it will:
- Install dependencies
- Build your app
- Deploy to GitHub Pages
- All automatically on every push!

---

**This fix should resolve your blank screen issue!** 🎉

