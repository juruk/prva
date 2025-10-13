# Deploy to GitHub - Simple Guide with Commands

## STEP 1: Extract Files

1. Find `construction-pm-app-v3-FINAL.zip` in your Downloads
2. Right-click → Extract All
3. Extract to: `C:\PRVA`
4. Replace files if asked

## STEP 2: Open Command Prompt

1. Press `Windows Key + R`
2. Type: `cmd`
3. Press Enter

## STEP 3: Go to Project Folder

Type this command and press Enter:

```
cd C:\PRVA\construction-pm-app
```

## STEP 4: Check if Git is Initialized

Type this command and press Enter:

```
git status
```

**If you see "fatal: not a git repository"**, run these 3 commands:

```
git init
```

```
git remote add origin https://github.com/juruk/prva.git
```

```
git branch -M main
```

**If you see a list of files**, skip to STEP 5.

## STEP 5: Install Dependencies

Type this command and press Enter (wait 2-5 minutes):

```
npm install
```

Wait until you see "added XXX packages" and the prompt returns.

## STEP 6: Build the Application

Type this command and press Enter (wait 30-60 seconds):

```
npm run build
```

Wait until you see "✓ built in X.XXs"

## STEP 7: Add All Files to Git

Type this command and press Enter:

```
git add .
```

(The dot is important - it means "all files")

## STEP 8: Commit Changes

Type this command and press Enter:

```
git commit -m "v3.0: Fix URLs, add GitHub storage, update features"
```

(Keep the quotes)

## STEP 9: Push to GitHub

Type this command and press Enter:

```
git push -u origin main
```

You may need to login to GitHub. Enter your username and password (or token if you have 2FA).

Wait until you see "Branch 'main' set up to track remote branch"

## STEP 10: Wait for Deployment

1. Open browser
2. Go to: https://github.com/juruk/prva/actions
3. Wait for green checkmark (2-3 minutes)

## STEP 11: Test Your Site

Go to: https://juruk.github.io/prva/

You should see the login page.

## STEP 12: Test URLs

1. Login with password: `admin123`
2. Click "Projects"
3. Check URL - should show: `https://juruk.github.io/prva/projects`
4. If it shows `/prva/projects` → SUCCESS!

---

## All Commands in Order (Copy-Paste)

```
cd C:\PRVA\construction-pm-app
git status
npm install
npm run build
git add .
git commit -m "v3.0: Fix URLs, add GitHub storage, update features"
git push -u origin main
```

---

## If Git Not Initialized (First Time)

Run these BEFORE the commands above:

```
git init
git remote add origin https://github.com/juruk/prva.git
git branch -M main
```

---

## Troubleshooting

**"git is not recognized"**
- Install Git: https://git-scm.com/download/win
- Restart Command Prompt

**"npm is not recognized"**
- Install Node.js: https://nodejs.org
- Restart Command Prompt

**404 error on website**
- Wait 10 minutes
- Clear browser cache
- Try incognito mode

**Blank white screen**
- Press F12 in browser
- Check Console tab for errors
- Clear cache and try again

---

## What Gets Fixed

✅ URLs now show `/prva/` in path  
✅ GitHub Storage feature added  
✅ All v2.0 features work  

---

## Your Live Site

https://juruk.github.io/prva/

Login password: `admin123`

---

That's it! Simple and working.

