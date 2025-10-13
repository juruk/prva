# GitHub Auto-Backup Setup Guide

## Overview

This guide will help you set up **automatic backups to GitHub** for your Construction Project Manager application. Once configured, the app will automatically save your data to GitHub after every change, keeping the last 3 versions.

---

## 🎯 What You'll Get

- **Automatic backups** after every data change (create, edit, delete)
- **Version history** - keeps the last 3 backup versions
- **Cloud storage** - your data safely stored on GitHub
- **Team collaboration** - share data with team members
- **Disaster recovery** - restore from any of the last 3 backups

---

## 📋 Prerequisites

- A GitHub account (free)
- Your Construction PM app deployed and accessible
- 5-10 minutes for setup

---

## 🚀 Step-by-Step Setup

### Step 1: Create a GitHub Repository for Backups

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository settings:
   - **Name**: `construction-pm-backups` (or any name you prefer)
   - **Description**: "Automated backups for Construction Project Manager"
   - **Visibility**: 
     - Choose **Private** (recommended for business data)
     - Or **Public** if you don't mind data being visible
   - **Initialize**: Check "Add a README file"
4. Click **"Create repository"**

### Step 2: Create a Personal Access Token

GitHub requires a token for automated access to your repository.

1. Go to **GitHub Settings**:
   - Click your profile picture (top right) → **Settings**
   
2. Navigate to **Developer settings**:
   - Scroll down the left sidebar
   - Click **Developer settings** (at the bottom)
   
3. Create a **Personal Access Token**:
   - Click **Personal access tokens** → **Tokens (classic)**
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   
4. Configure the token:
   - **Note**: `Construction PM Auto-Backup`
   - **Expiration**: Choose duration (recommend: **No expiration** or **1 year**)
   - **Scopes**: Check **only** these permissions:
     - ✅ `repo` (Full control of private repositories)
       - This automatically checks all sub-items
   
5. Click **"Generate token"** at the bottom

6. **IMPORTANT**: Copy the token immediately!
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Save it somewhere safe** - you won't be able to see it again
   - If you lose it, you'll need to create a new one

### Step 3: Configure the App

**Option A: Manual Configuration (Recommended)**

The GitHub backup feature requires code integration. Here's how to enable it:

1. **Update App.jsx** to integrate the GitHub backup service:

```javascript
// Add this import at the top of src/App.jsx
import { initGitHubBackup, backupToGitHub } from './services/githubBackup'

// Add this inside the App component, after the state declarations
useEffect(() => {
  // Initialize GitHub backup if configured
  const githubConfig = localStorage.getItem('githubConfig')
  if (githubConfig) {
    const config = JSON.parse(githubConfig)
    initGitHubBackup(config)
  }
}, [])

// Modify your setProjects, setArchitects, setContractors functions to trigger backups
const updateProjects = (newProjects) => {
  setProjects(newProjects)
  localStorage.setItem('projects', JSON.stringify(newProjects))
  
  // Trigger GitHub backup
  backupToGitHub({
    projects: newProjects,
    architects,
    contractors
  })
}

// Do the same for setArchitects and setContractors
```

2. **Add GitHub Configuration UI** to your app settings:

Create a new component `src/components/GitHubSettings.jsx`:

```javascript
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function GitHubSettings() {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('githubConfig')
    return saved ? JSON.parse(saved) : {
      username: '',
      repo: '',
      token: '',
      branch: 'main'
    }
  })

  const [status, setStatus] = useState('')

  const handleSave = () => {
    localStorage.setItem('githubConfig', JSON.stringify(config))
    setStatus('✅ Configuration saved! Backups will now sync to GitHub.')
    setTimeout(() => setStatus(''), 3000)
  }

  const handleTest = async () => {
    setStatus('Testing connection...')
    // Test GitHub API connection
    try {
      const response = await fetch(`https://api.github.com/repos/${config.username}/${config.repo}`, {
        headers: {
          'Authorization': `token ${config.token}`
        }
      })
      
      if (response.ok) {
        setStatus('✅ Connection successful!')
      } else {
        setStatus('❌ Connection failed. Check your credentials.')
      }
    } catch (error) {
      setStatus('❌ Error: ' + error.message)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Auto-Backup</CardTitle>
        <CardDescription>Configure automatic backups to GitHub</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>GitHub Username</Label>
          <Input
            value={config.username}
            onChange={(e) => setConfig({ ...config, username: e.target.value })}
            placeholder="your-username"
          />
        </div>
        
        <div>
          <Label>Repository Name</Label>
          <Input
            value={config.repo}
            onChange={(e) => setConfig({ ...config, repo: e.target.value })}
            placeholder="construction-pm-backups"
          />
        </div>
        
        <div>
          <Label>Personal Access Token</Label>
          <Input
            type="password"
            value={config.token}
            onChange={(e) => setConfig({ ...config, token: e.target.value })}
            placeholder="ghp_xxxxxxxxxxxx"
          />
        </div>
        
        <div>
          <Label>Branch</Label>
          <Input
            value={config.branch}
            onChange={(e) => setConfig({ ...config, branch: e.target.value })}
            placeholder="main"
          />
        </div>
        
        {status && (
          <div className="p-3 bg-accent rounded-md text-sm">
            {status}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button onClick={handleTest} variant="outline">Test Connection</Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

3. **Add the settings component** to your app (e.g., in a Settings page or modal)

**Option B: Use Export/Import with Manual GitHub Commits**

If you prefer a simpler approach without code changes:

1. Use the **Export Data** button regularly to download your data
2. Manually commit the JSON file to your GitHub repository
3. Keep the last 3 versions by renaming files:
   - `backup-latest.json`
   - `backup-previous-1.json`
   - `backup-previous-2.json`

---

## 📁 Backup File Structure

Once configured, your GitHub repository will contain:

```
construction-pm-backups/
├── README.md
├── backups/
│   ├── backup-latest.json          (Most recent backup)
│   ├── backup-previous-1.json      (Second most recent)
│   └── backup-previous-2.json      (Third most recent)
```

Each backup file contains:
- All projects (with dates, phases, file links)
- All architects (with company info)
- All contractors (with company info)
- Timestamp of backup

---

## 🔄 How Auto-Backup Works

1. **You make a change** (create, edit, or delete data)
2. **App saves locally** (to browser localStorage)
3. **App triggers backup** (sends data to GitHub)
4. **GitHub rotates versions**:
   - Current `backup-latest.json` → `backup-previous-1.json`
   - Current `backup-previous-1.json` → `backup-previous-2.json`
   - Current `backup-previous-2.json` → deleted
   - New backup → `backup-latest.json`

---

## 🔧 Restoring from Backup

### Method 1: Using Import Data

1. Go to your GitHub repository
2. Navigate to `backups/` folder
3. Click on the backup file you want to restore
4. Click **"Raw"** button
5. Copy the entire JSON content
6. Save it as a `.json` file on your computer
7. In the app, click **Import Data** and select the file

### Method 2: Direct Download

1. Go to your GitHub repository
2. Navigate to `backups/` folder
3. Click on the backup file
4. Click **"Download"** button
5. In the app, click **Import Data** and select the downloaded file

---

## 🔒 Security Best Practices

### Token Security

- ✅ **DO**: Keep your token private and secure
- ✅ **DO**: Use a private repository for sensitive data
- ✅ **DO**: Set token expiration and rotate regularly
- ❌ **DON'T**: Share your token with anyone
- ❌ **DON'T**: Commit your token to public code repositories
- ❌ **DON'T**: Use tokens with more permissions than needed

### Repository Security

- Use **Private repositories** for business data
- Enable **two-factor authentication** on your GitHub account
- Regularly review **repository access** and collaborators
- Consider **branch protection rules** for the main branch

---

## 👥 Team Collaboration

### Sharing Data with Team Members

1. **Add collaborators** to your GitHub repository:
   - Go to repository **Settings** → **Collaborators**
   - Click **"Add people"**
   - Enter their GitHub username or email

2. **Team members can access backups**:
   - They clone/download the repository
   - Import the latest backup into their app instance
   - Each person maintains their own local data
   - Backups are shared via GitHub

### Workflow for Multiple Users

- **Option A**: One admin manages data, others have read-only access
- **Option B**: Multiple admins, coordinate who makes changes
- **Option C**: Each person exports/imports to sync data manually

---

## 🐛 Troubleshooting

### "403 Forbidden" Error

**Cause**: Token doesn't have proper permissions

**Solution**:
1. Check token has `repo` scope enabled
2. Verify repository name is correct
3. Ensure token hasn't expired
4. Try creating a new token

### "404 Not Found" Error

**Cause**: Repository doesn't exist or name is wrong

**Solution**:
1. Verify repository name exactly matches (case-sensitive)
2. Check username is correct
3. Ensure repository exists and you have access

### Backups Not Triggering

**Cause**: GitHub configuration not properly initialized

**Solution**:
1. Check configuration is saved in browser localStorage
2. Verify all fields are filled correctly
3. Test connection using the Test button
4. Check browser console for error messages

### Rate Limiting

**Cause**: Too many API requests to GitHub

**Solution**:
- GitHub allows 5,000 requests per hour for authenticated users
- If you hit the limit, wait an hour or reduce backup frequency
- Consider batching multiple changes before triggering backup

---

## 📊 Monitoring Backups

### Check Backup Status

1. Go to your GitHub repository
2. Click on the `backups/` folder
3. Check the **last commit time** for each file
4. Verify files are being updated after changes

### Backup History

- GitHub keeps full commit history
- You can view all previous versions of backup files
- Click on a file → **"History"** to see all changes
- Restore from any point in history if needed

---

## 🎓 Advanced Features

### Custom Backup Schedule

Modify `githubBackup.js` to add debouncing:

```javascript
let backupTimeout
export function backupToGitHub(data) {
  clearTimeout(backupTimeout)
  backupTimeout = setTimeout(() => {
    // Actual backup logic here
  }, 5000) // Wait 5 seconds after last change
}
```

### Backup Notifications

Add visual feedback when backups complete:

```javascript
export async function backupToGitHub(data) {
  try {
    // Backup logic...
    showNotification('✅ Backup successful')
  } catch (error) {
    showNotification('❌ Backup failed: ' + error.message)
  }
}
```

### Multiple Backup Locations

Configure backups to multiple repositories for redundancy:

```javascript
const backupConfigs = [
  { username: 'user1', repo: 'backup-primary', token: 'xxx' },
  { username: 'user2', repo: 'backup-secondary', token: 'yyy' }
]
```

---

## 📝 Summary

✅ **Setup Steps**:
1. Create GitHub repository
2. Generate personal access token
3. Configure app with credentials
4. Test connection
5. Start using the app - backups happen automatically!

✅ **Benefits**:
- Automatic cloud backups
- Version history (last 3 versions)
- Team collaboration
- Disaster recovery
- Free hosting on GitHub

✅ **Maintenance**:
- Check backups occasionally
- Rotate tokens annually
- Review repository access
- Export data for local backups too

---

## 🆘 Need Help?

- **GitHub Docs**: [docs.github.com](https://docs.github.com)
- **Personal Access Tokens**: [GitHub Token Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- **GitHub API**: [api.github.com](https://docs.github.com/en/rest)

---

**Your data is now protected with automatic GitHub backups!** 🎉

