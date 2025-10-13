import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog.jsx'
import { Github, CheckCircle2, AlertCircle, Settings } from 'lucide-react'
import githubStorage from '../services/githubStorage'

const GitHubStorageConfig = ({ onConfigured }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')
  const [token, setToken] = useState('')
  const [isConfigured, setIsConfigured] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  useEffect(() => {
    // Check if already configured
    const configured = githubStorage.loadCredentials()
    setIsConfigured(configured)
    if (configured) {
      setOwner(githubStorage.owner)
      setRepo(githubStorage.repo)
    }
  }, [])

  const handleTest = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      githubStorage.initialize(owner, repo, token)
      await githubStorage.testConnection()
      setTestResult({ success: true, message: 'Connection successful!' })
      setIsConfigured(true)
      if (onConfigured) {
        onConfigured()
      }
    } catch (error) {
      setTestResult({ success: false, message: error.message })
      setIsConfigured(false)
    } finally {
      setIsTesting(false)
    }
  }

  const handleDisconnect = () => {
    githubStorage.clearCredentials()
    setIsConfigured(false)
    setOwner('')
    setRepo('')
    setToken('')
    setTestResult(null)
  }

  const handleSave = () => {
    if (isConfigured) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Github className="w-4 h-4" />
        {isConfigured ? (
          <>
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            GitHub Connected
          </>
        ) : (
          <>
            <Settings className="w-3 h-3" />
            Setup GitHub Storage
          </>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub Storage Configuration
            </DialogTitle>
            <DialogDescription>
              Store your application data in a GitHub repository for backup and sync across devices.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Status Alert */}
            {isConfigured && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  GitHub storage is configured and ready to use.
                </AlertDescription>
              </Alert>
            )}

            {/* Configuration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Repository Settings</CardTitle>
                <CardDescription>
                  Enter your GitHub repository details where data will be stored.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="owner">Repository Owner (Username or Organization)</Label>
                  <Input
                    id="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="e.g., juruk"
                    disabled={isConfigured}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repo">Repository Name</Label>
                  <Input
                    id="repo"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    placeholder="e.g., prva"
                    disabled={isConfigured}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token">Personal Access Token</Label>
                  <Input
                    id="token"
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    disabled={isConfigured}
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a token at: <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/settings/tokens</a>
                    <br />
                    Required permissions: <code className="bg-muted px-1 py-0.5 rounded">repo</code> (Full control of private repositories)
                  </p>
                </div>

                {/* Test Result */}
                {testResult && (
                  <Alert className={testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                    {testResult.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                      {testResult.message}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {!isConfigured ? (
                    <Button
                      onClick={handleTest}
                      disabled={!owner || !repo || !token || isTesting}
                      className="flex-1"
                    >
                      {isTesting ? 'Testing...' : 'Test & Save Connection'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleDisconnect}
                      variant="destructive"
                      className="flex-1"
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Setup Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Go to <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Settings → Personal Access Tokens</a></li>
                  <li>Click "Generate new token (classic)"</li>
                  <li>Give it a name like "Construction PM App"</li>
                  <li>Select the <code className="bg-muted px-1 py-0.5 rounded">repo</code> scope (full control)</li>
                  <li>Click "Generate token" and copy it</li>
                  <li>Paste the token above and click "Test & Save Connection"</li>
                </ol>
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Your token is stored locally in your browser and never sent anywhere except GitHub's API.
                    Data will be stored in a <code className="bg-muted px-1 py-0.5 rounded">data/</code> folder in your repository.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            {isConfigured && (
              <Button onClick={handleSave}>
                Done
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GitHubStorageConfig

