# GitHub Auto-Sync Setup Guide

## ✅ What's Implemented

Your app now has **automatic GitHub synchronization**:

1. **Auto-Load on Page Open**
   - When any user opens the app, data loads from GitHub automatically
   - All users see the same data
   - Falls back to localStorage if GitHub unavailable

2. **Auto-Save on Changes**
   - When admin makes changes, data saves to GitHub automatically
   - Saves to localStorage first (fast)
   - Then syncs to GitHub (backup)

3. **Sync Status Indicator**
   - Shows current sync status in header
   - "Synced ✓" - Data is up to date
   - "Syncing..." - Currently saving
   - "Sync Error" - Problem occurred
   - "Local Only" - GitHub not configured

4. **Error Handling**
   - Graceful fallback to localStorage
   - Continues working even if GitHub unavailable
   - Error messages for troubleshooting

---

## 🚀 One-Time Setup (Admin Only)

### Step 1: Generate GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Fill in:
   - **Note**: `Construction PM App`
   - **Expiration**: `No expiration` (or your preference)
   - **Scopes**: Check ☑️ `repo` (Full control of private repositories)
3. Click **"Generate token"**
4. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Configure in App

1. Deploy the new version (instructions below)
2. Open: https://juruk.github.io/prva/
3. Login as admin (password: `admin123`)
4. Click **"Setup GitHub Storage"** button in header
5. Enter:
   - **Owner**: `juruk`
   - **Repository**: `prva`
   - **Token**: (paste your token from Step 1)
6. Click **"Test Connection"**
   - Should show: "✓ Connection successful"
7. Click **"Save Configuration"**
8. Done!

### Step 3: Initial Data Upload (If You Have Existing Data)

If you already have projects/architects/contractors:

1. After configuring GitHub storage
2. The app will automatically save your existing data to GitHub
3. Wait for "Synced ✓" badge in header
4. Check GitHub: https://github.com/juruk/prva/tree/main/data
   - You should see: `projects.json`, `architects.json`, `contractors.json`

---

## 📋 How It Works

### For All Users:

1. **Open app** → Loads data from GitHub automatically
2. **See projects** → Same data for everyone
3. **Read-only users** → Can view all data
4. **No setup needed** → Just login and use

### For Admin:

1. **Add/edit project** → Saves to GitHub automatically
2. **See "Syncing..."** → Data being saved
3. **See "Synced ✓"** → Data saved successfully
4. **Other users** → Will see changes when they refresh

---

## 🔒 Security

### GitHub Token
- Stored in browser localStorage only
- Not sent to any server
- Only you can access it
- Can be revoked anytime at: https://github.com/settings/tokens

### Repository Privacy
**Recommendation**: Make repository private

1. Go to: https://github.com/juruk/prva/settings
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Make private"
5. Confirm

This ensures only people with access to the repository can see the data.

### Token Permissions
The token only has access to:
- Your `prva` repository
- Nothing else in your GitHub account

To revoke access:
1. Go to: https://github.com/settings/tokens
2. Find "Construction PM App"
3. Click "Delete"

---

## 🧪 Testing After Setup

### Test 1: Data Sync
1. Login as admin
2. Add a test project
3. Wait for "Synced ✓" badge
4. Check GitHub: https://github.com/juruk/prva/tree/main/data/projects.json
5. You should see your project in the JSON file

### Test 2: Multi-User
1. Open app in different browser (or incognito)
2. Login (admin or read-only)
3. You should see the same projects
4. Changes made by admin appear for all users

### Test 3: Offline Fallback
1. Disconnect internet
2. App still works (uses localStorage)
3. Shows "Sync Error" badge
4. Reconnect internet
5. Syncs automatically, shows "Synced ✓"

---

## 📊 Sync Status Meanings

| Badge | Meaning | Action Needed |
|-------|---------|---------------|
| **Local Only** | GitHub not configured | Admin: Configure GitHub storage |
| **Ready** | GitHub configured, idle | None - ready to sync |
| **Syncing...** | Currently saving to GitHub | Wait - in progress |
| **Synced ✓** | Data up to date on GitHub | None - all good |
| **Sync Error** | Problem saving to GitHub | Check internet, check token |

---

## 🆘 Troubleshooting

### "Sync Error" Badge

**Possible causes:**
1. No internet connection
2. GitHub token expired/revoked
3. Repository deleted
4. API rate limit (unlikely with 10 users)

**Solutions:**
1. Check internet connection
2. Reconfigure GitHub storage with new token
3. Check repository exists: https://github.com/juruk/prva
4. Wait an hour (rate limit resets)

### "Connection failed" When Testing

**Possible causes:**
1. Wrong owner/repo name
2. Invalid token
3. Token doesn't have `repo` scope

**Solutions:**
1. Double-check: Owner=`juruk`, Repo=`prva`
2. Generate new token
3. Make sure `repo` scope is checked

### Data Not Syncing

**Check:**
1. Are you logged in as admin? (read-only can't save)
2. Is sync status "Synced ✓"?
3. Check browser console (F12) for errors
4. Try logout and login again

### Users See Different Data

**Cause:** One user has old cached data

**Solution:**
1. Have user refresh page (F5)
2. Or clear browser cache
3. Data will reload from GitHub

---

## 🔄 Daily Usage

### For Admin:
1. Login
2. Make changes
3. Wait for "Synced ✓"
4. Done - changes saved to GitHub

### For Read-Only Users:
1. Login
2. View data
3. Refresh page to see latest changes
4. Done

### For All Users:
- Data loads automatically on page open
- No manual sync needed
- Just use the app normally

---

## 📈 Monitoring

### Check GitHub Data:
- Go to: https://github.com/juruk/prva/tree/main/data
- You should see 3 files:
  - `projects.json` - All projects
  - `architects.json` - All architects
  - `contractors.json` - All contractors

### Check Sync History:
- Go to: https://github.com/juruk/prva/commits/main/data
- See all changes with timestamps
- Can revert to previous version if needed

### Check API Usage:
- Go to: https://github.com/settings/tokens
- Click on your token
- See usage stats

---

## 🎯 Expected Behavior

### First Time (After Setup):
1. Admin configures GitHub
2. Existing data uploads to GitHub
3. "Synced ✓" appears
4. Other users see data immediately

### Daily Use:
1. Users open app → data loads from GitHub
2. Admin makes changes → saves to GitHub
3. Other users refresh → see changes
4. All automatic, no manual sync

### Offline:
1. App works with localStorage
2. Shows "Sync Error"
3. When online, syncs automatically

---

## ✅ Success Checklist

After setup, verify:

- [ ] GitHub token generated
- [ ] Token configured in app
- [ ] "Test Connection" shows success
- [ ] Sync status shows "Synced ✓"
- [ ] Data visible on GitHub (https://github.com/juruk/prva/tree/main/data)
- [ ] Other users can see data
- [ ] Changes by admin appear for all users
- [ ] Repository is private (recommended)

---

## 📞 Support

If you have issues:

1. Check this guide's Troubleshooting section
2. Check browser console (F12) for errors
3. Verify GitHub token is valid
4. Try reconfiguring GitHub storage
5. Check repository exists and is accessible

---

## 🎉 You're Done!

Your app now has:
- ✅ Automatic data loading from GitHub
- ✅ Automatic data saving to GitHub
- ✅ Shared data across all users
- ✅ Automatic backup
- ✅ Version history
- ✅ Offline fallback
- ✅ Sync status indicator

**All users will see the same data automatically!**

