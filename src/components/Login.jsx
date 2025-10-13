import { useState } from 'react'
import { HardHat, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  // Default passwords - Admin should change these in the code
  const ADMIN_PASSWORD = 'admin123'
  const READONLY_PASSWORD = 'view123'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (password === ADMIN_PASSWORD) {
      onLogin('admin')
    } else if (password === READONLY_PASSWORD) {
      onLogin('readonly')
    } else {
      setError('Invalid password. Please try again.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto bg-black dark:bg-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center">
            <HardHat className="w-8 h-8 text-white dark:text-black" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Construction PM</CardTitle>
            <CardDescription className="text-base mt-2">
              Project Management System
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Enter Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Access Application
            </Button>

            <div className="pt-4 border-t">
              <div className="text-xs text-muted-foreground space-y-2">
                <p className="font-medium text-foreground mb-2">Access Levels:</p>
                <div className="space-y-1">
                  <p>• <span className="font-medium">Admin</span>: Full access (create, edit, delete)</p>
                  <p>• <span className="font-medium">Read-Only</span>: View-only access</p>
                </div>
                <p className="mt-4 text-center italic">
                  Contact administrator for access credentials
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password Info for Development - Remove in production */}
      <div className="fixed bottom-4 right-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 text-xs max-w-xs shadow-lg">
        <p className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Development Info</p>
        <p className="text-yellow-800 dark:text-yellow-200 mb-1">Admin: <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">admin123</code></p>
        <p className="text-yellow-800 dark:text-yellow-200">Read-Only: <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">view123</code></p>
        <p className="text-yellow-700 dark:text-yellow-300 mt-2 italic">Remove this box in production!</p>
      </div>
    </div>
  )
}

export default Login

