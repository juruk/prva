// GitHub Backup Service
// Automatically backs up data to GitHub repository

class GitHubBackupService {
  constructor() {
    this.token = localStorage.getItem('github_token') || null
    this.username = localStorage.getItem('github_username') || null
    this.repo = localStorage.getItem('github_repo') || null
    this.branch = localStorage.getItem('github_branch') || 'main'
    this.isConfigured = !!(this.token && this.username && this.repo)
  }

  // Configure GitHub credentials
  configure(token, username, repo, branch = 'main') {
    this.token = token
    this.username = username
    this.repo = repo
    this.branch = branch
    
    localStorage.setItem('github_token', token)
    localStorage.setItem('github_username', username)
    localStorage.setItem('github_repo', repo)
    localStorage.setItem('github_branch', branch)
    
    this.isConfigured = true
  }

  // Clear configuration
  clearConfiguration() {
    this.token = null
    this.username = null
    this.repo = null
    this.branch = 'main'
    
    localStorage.removeItem('github_token')
    localStorage.removeItem('github_username')
    localStorage.removeItem('github_repo')
    localStorage.removeItem('github_branch')
    
    this.isConfigured = false
  }

  // Get file content from GitHub
  async getFileContent(path) {
    if (!this.isConfigured) {
      throw new Error('GitHub not configured')
    }

    const url = `https://api.github.com/repos/${this.username}/${this.repo}/contents/${path}?ref=${this.branch}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (response.status === 404) {
        return null // File doesn't exist
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()
      return {
        content: atob(data.content), // Decode base64
        sha: data.sha
      }
    } catch (error) {
      console.error('Error getting file from GitHub:', error)
      throw error
    }
  }

  // Upload file to GitHub
  async uploadFile(path, content, message, sha = null) {
    if (!this.isConfigured) {
      throw new Error('GitHub not configured')
    }

    const url = `https://api.github.com/repos/${this.username}/${this.repo}/contents/${path}`
    
    const body = {
      message: message,
      content: btoa(unescape(encodeURIComponent(content))), // Encode to base64
      branch: this.branch
    }

    if (sha) {
      body.sha = sha // Required for updating existing files
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`GitHub API error: ${error.message}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error uploading file to GitHub:', error)
      throw error
    }
  }

  // Rotate backups (keep last 3 versions)
  async rotateBackups(newBackupData) {
    if (!this.isConfigured) {
      throw new Error('GitHub not configured')
    }

    try {
      // Get existing backups
      const latest = await this.getFileContent('backups/backup-latest.json')
      const previous1 = await this.getFileContent('backups/backup-previous-1.json')

      // Rotate: previous-1 → previous-2
      if (previous1) {
        await this.uploadFile(
          'backups/backup-previous-2.json',
          previous1.content,
          'Rotate backup: previous-1 → previous-2',
          (await this.getFileContent('backups/backup-previous-2.json'))?.sha
        )
      }

      // Rotate: latest → previous-1
      if (latest) {
        await this.uploadFile(
          'backups/backup-previous-1.json',
          latest.content,
          'Rotate backup: latest → previous-1',
          previous1?.sha
        )
      }

      // Upload new backup as latest
      await this.uploadFile(
        'backups/backup-latest.json',
        JSON.stringify(newBackupData, null, 2),
        `Auto-backup: ${new Date().toISOString()}`,
        latest?.sha
      )

      return { success: true, timestamp: new Date().toISOString() }
    } catch (error) {
      console.error('Error rotating backups:', error)
      throw error
    }
  }

  // Create backup from current data
  async createBackup(projects, architects, contractors) {
    const backupData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      projects,
      architects,
      contractors
    }

    try {
      await this.rotateBackups(backupData)
      
      // Update last backup timestamp
      localStorage.setItem('last_backup_time', backupData.timestamp)
      localStorage.setItem('last_backup_status', 'success')
      
      return { success: true, timestamp: backupData.timestamp }
    } catch (error) {
      localStorage.setItem('last_backup_status', 'failed')
      localStorage.setItem('last_backup_error', error.message)
      throw error
    }
  }

  // Get all available backups
  async getBackups() {
    if (!this.isConfigured) {
      throw new Error('GitHub not configured')
    }

    const backups = []

    try {
      // Get latest backup
      const latest = await this.getFileContent('backups/backup-latest.json')
      if (latest) {
        const data = JSON.parse(latest.content)
        backups.push({
          version: 'Latest',
          timestamp: data.timestamp,
          data: data
        })
      }

      // Get previous-1 backup
      const previous1 = await this.getFileContent('backups/backup-previous-1.json')
      if (previous1) {
        const data = JSON.parse(previous1.content)
        backups.push({
          version: 'Previous 1',
          timestamp: data.timestamp,
          data: data
        })
      }

      // Get previous-2 backup
      const previous2 = await this.getFileContent('backups/backup-previous-2.json')
      if (previous2) {
        const data = JSON.parse(previous2.content)
        backups.push({
          version: 'Previous 2',
          timestamp: data.timestamp,
          data: data
        })
      }

      return backups
    } catch (error) {
      console.error('Error getting backups:', error)
      throw error
    }
  }

  // Restore from backup
  async restoreBackup(backupVersion) {
    if (!this.isConfigured) {
      throw new Error('GitHub not configured')
    }

    const filePath = backupVersion === 'Latest' 
      ? 'backups/backup-latest.json'
      : backupVersion === 'Previous 1'
      ? 'backups/backup-previous-1.json'
      : 'backups/backup-previous-2.json'

    try {
      const backup = await this.getFileContent(filePath)
      if (!backup) {
        throw new Error('Backup not found')
      }

      const data = JSON.parse(backup.content)
      return data
    } catch (error) {
      console.error('Error restoring backup:', error)
      throw error
    }
  }

  // Get last backup status
  getLastBackupStatus() {
    return {
      timestamp: localStorage.getItem('last_backup_time'),
      status: localStorage.getItem('last_backup_status'),
      error: localStorage.getItem('last_backup_error')
    }
  }

  // Test GitHub connection
  async testConnection() {
    if (!this.isConfigured) {
      throw new Error('GitHub not configured')
    }

    try {
      const url = `https://api.github.com/repos/${this.username}/${this.repo}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        throw new Error('Cannot access repository')
      }

      return { success: true, message: 'Connection successful' }
    } catch (error) {
      throw new Error(`Connection failed: ${error.message}`)
    }
  }
}

// Export singleton instance
export const githubBackup = new GitHubBackupService()

