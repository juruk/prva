import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog.jsx'
import { Github, CheckCircle2, XCircle, Settings, RefreshCw } from 'lucide-react'
import { githubBackup } from '../services/githubBackup'

const GitHubConfig = ({ onBackupSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfigured, setIsConfigured] = useState(githubBackup.isConfigured)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)
  
  const [formData, setFormData] = useState({
    token: '',
    username: '',
    repo: '',
    branch: 'main'
  })

  useEffect(() => {
    if (githubBackup.isConfigured) {
      setFormData({
        token: '••••••••••••••••', // Masked
        username: githubBackup.username,
        repo: githubBackup.repo,
        branch: githubBackup.branch
      })
    }
  }, [])

  const handleTest = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      // Temporarily configure with form data
      if (formData.token !== '••••••••••••••••') {
        githubBackup.configure(
          formData.token,
          formData.username,
          formData.repo,
          formData.branch
        )
      }

      const result = await githubBackup.testConnection()
      setTestResult({ success: true, message: result.message })
      setIsConfigured(true)
    } catch (error) {
      setTestResult({ success: false, message: error.message })
    } finally {
      setIsTesting(false)
    }
  }

  const handleSave = () => {
    if (formData.token !== '••••••••••••••••') {
      githubBackup.configure(
        formData.token,
        formData.username,
        formData.repo,
        formData.branch
      )
    }
    setIsConfigured(true)
    setIsOpen(false)
    if (onBackupSuccess) {
      onBackupSuccess()
    }
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to remove GitHub backup configuration?')) {
      githubBackup.clearConfiguration()
      setIsConfigured(false)
      setFormData({
        token: '',
        username: '',
        repo: '',
        branch: 'main'
      })
      setTestResult(null)
    }
  }

  const lastBackup = githubBackup.getLastBackupStatus()

  return (
    <>
      <Button 
        variant={isConfigured ? "outline" : "default"}
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Github className="w-4 h-4" />
        {isConfigured ? 'GitHub Backup' : 'Setup GitHub Backup'}
        {isConfigured && lastBackup.status === 'success' && (
          <CheckCircle2 className="w-3 h-3 text-green-500" />
        )}
        {isConfigured && lastBackup.status === 'failed' && (
          <XCircle className="w-3 h-3 text-red-500" />
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub Auto-Backup Configuration
            </DialogTitle>
            <DialogDescription>
              Configure automatic backups to your GitHub repository. Backups are created after every data change and the last 3 versions are kept.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Configuration Status */}
            {isConfigured && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    GitHub Backup Configured
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Repository:</span>{' '}
                    <code className="bg-muted px-1 rounded">{githubBackup.username}/{githubBackup.repo}</code>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Branch:</span>{' '}
                    <code className="bg-muted px-1 rounded">{githubBackup.branch}</code>
                  </div>
                  {lastBackup.timestamp && (
                    <div>
                      <span className="text-muted-foreground">Last Backup:</span>{' '}
                      {new Date(lastBackup.timestamp).toLocaleString()}
                      {lastBackup.status === 'success' && (
                        <Badge variant="outline" className="ml-2 text-green-600">Success</Badge>
                      )}
                      {lastBackup.status === 'failed' && (
                        <Badge variant="destructive" className="ml-2">Failed</Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Configuration Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="token">GitHub Personal Access Token *</Label>
                <Input
                  id="token"
                  type="password"
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Create a token at: Settings → Developer settings → Personal access tokens → Tokens (classic)
                  <br />
                  Required permissions: <code className="bg-muted px-1 rounded">repo</code>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">GitHub Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="your-username"
                  />
                </div>
                <div>
                  <Label htmlFor="repo">Repository Name *</Label>
                  <Input
                    id="repo"
                    value={formData.repo}
                    onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
                    placeholder="construction-pm-backups"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="main"
                />
              </div>

              {/* Test Connection */}
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={handleTest}
                  disabled={isTesting || !formData.token || !formData.username || !formData.repo}
                  className="gap-2"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Settings className="w-4 h-4" />
                      Test Connection
                    </>
                  )}
                </Button>

                {testResult && (
                  <div className={`flex items-center gap-2 text-sm ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {testResult.message}
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <Card className="bg-muted">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Setup Instructions</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p><strong>1. Create a GitHub Repository</strong></p>
                <p className="text-muted-foreground pl-4">
                  Create a new repository (e.g., "construction-pm-backups") to store your backups.
                  It can be private or public.
                </p>

                <p><strong>2. Generate Personal Access Token</strong></p>
                <p className="text-muted-foreground pl-4">
                  Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
                  <br />
                  Select scope: <code className="bg-background px-1 rounded">repo</code> (Full control of private repositories)
                </p>

                <p><strong>3. Enter Details Above</strong></p>
                <p className="text-muted-foreground pl-4">
                  Fill in your token, username, and repository name, then click "Test Connection"
                </p>

                <p><strong>4. Save Configuration</strong></p>
                <p className="text-muted-foreground pl-4">
                  Once the test succeeds, click "Save" to enable automatic backups
                </p>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="gap-2">
            {isConfigured && (
              <Button type="button" variant="destructive" onClick={handleClear}>
                Clear Configuration
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSave}
              disabled={!testResult?.success}
            >
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GitHubConfig

