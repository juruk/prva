import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { HardHat, Download, Upload, LogOut, Shield, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge.jsx'
import './App.css'
import Dashboard from './components/Dashboard'
import ProjectsList from './components/ProjectsList'
import ProjectDetail from './components/ProjectDetail'
import ArchitectsList from './components/ArchitectsList'
import ArchitectDetail from './components/ArchitectDetail'
import ContractorsList from './components/ContractorsList'
import ContractorDetail from './components/ContractorDetail'
import Navigation from './components/Navigation'
import Login from './components/Login'

function App() {
  const [projects, setProjects] = useState([])
  const [architects, setArchitects] = useState([])
  const [contractors, setContractors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null) // 'admin' or 'readonly'

  // Check authentication on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('construction_auth')
    const savedRole = localStorage.getItem('construction_role')
    if (savedAuth === 'true' && savedRole) {
      setIsAuthenticated(true)
      setUserRole(savedRole)
    }
  }, [])

  // Handle login
  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
    localStorage.setItem('construction_auth', 'true')
    localStorage.setItem('construction_role', role)
  }

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem('construction_auth')
    localStorage.removeItem('construction_role')
  }

  // Migration utility: Convert old single investor/supervisor to array format
  const migrateProjectData = (projects) => {
    return projects.map(project => {
      const migratedProject = { ...project }
      
      // Migrate investor from object to array
      if (project.investor && !Array.isArray(project.investor)) {
        // Check if it has any data
        if (project.investor.name || project.investor.company || project.investor.email || project.investor.phone) {
          migratedProject.investors = [project.investor]
        } else {
          migratedProject.investors = []
        }
        delete migratedProject.investor
      } else if (!project.investors) {
        migratedProject.investors = []
      }
      
      // Migrate supervisor from object to array
      if (project.supervisor && !Array.isArray(project.supervisor)) {
        // Check if it has any data
        if (project.supervisor.name || project.supervisor.company || project.supervisor.email || project.supervisor.phone) {
          migratedProject.supervisors = [project.supervisor]
        } else {
          migratedProject.supervisors = []
        }
        delete migratedProject.supervisor
      } else if (!project.supervisors) {
        migratedProject.supervisors = []
      }
      
      return migratedProject
    })
  }

  // Load data from localStorage on mount
  useEffect(() => {
    if (isAuthenticated) {
      const savedProjects = localStorage.getItem('construction_projects')
      const savedArchitects = localStorage.getItem('construction_architects')
      const savedContractors = localStorage.getItem('construction_contractors')

      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects)
        const migratedProjects = migrateProjectData(parsedProjects)
        setProjects(migratedProjects)
        // Save migrated data back to localStorage
        localStorage.setItem('construction_projects', JSON.stringify(migratedProjects))
      }
      if (savedArchitects) setArchitects(JSON.parse(savedArchitects))
      if (savedContractors) setContractors(JSON.parse(savedContractors))
    }
  }, [isAuthenticated])

  // Save data to localStorage whenever it changes (only for admin)
  useEffect(() => {
    if (isAuthenticated && userRole === 'admin') {
      localStorage.setItem('construction_projects', JSON.stringify(projects))
    }
  }, [projects, isAuthenticated, userRole])

  useEffect(() => {
    if (isAuthenticated && userRole === 'admin') {
      localStorage.setItem('construction_architects', JSON.stringify(architects))
    }
  }, [architects, isAuthenticated, userRole])

  useEffect(() => {
    if (isAuthenticated && userRole === 'admin') {
      localStorage.setItem('construction_contractors', JSON.stringify(contractors))
    }
  }, [contractors, isAuthenticated, userRole])

  // Export data as JSON
  const handleExport = () => {
    const data = {
      projects,
      architects,
      contractors,
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `construction-pm-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Import data from JSON (admin only)
  const handleImport = (event) => {
    if (userRole !== 'admin') {
      alert('Only administrators can import data.')
      return
    }

    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.projects) setProjects(data.projects)
          if (data.architects) setArchitects(data.architects)
          if (data.contractors) setContractors(data.contractors)
          alert('Data imported successfully!')
        } catch (error) {
          alert('Error importing data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  // Check if user is admin
  const isAdmin = userRole === 'admin'

  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <HardHat className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Construction PM</h1>
                  <p className="text-sm text-muted-foreground">Project Management System</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Access Level Badge */}
                <Badge 
                  variant={isAdmin ? "default" : "secondary"}
                  className="gap-1 px-3 py-1"
                >
                  {isAdmin ? (
                    <>
                      <Shield className="w-3 h-3" />
                      Admin
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      Read-Only
                    </>
                  )}
                </Badge>

                {/* Export/Import Buttons */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExport}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
                {isAdmin && (
                  <label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 cursor-pointer"
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4" />
                        Import Data
                      </span>
                    </Button>
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImport} 
                      className="hidden" 
                    />
                  </label>
                )}

                {/* Logout Button */}
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  projects={projects} 
                  architects={architects} 
                  contractors={contractors} 
                />
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProjectsList 
                  projects={projects} 
                  setProjects={setProjects}
                  architects={architects}
                  contractors={contractors}
                  isAdmin={isAdmin}
                />
              } 
            />
            <Route 
              path="/projects/:id" 
              element={
                <ProjectDetail 
                  projects={projects} 
                  setProjects={setProjects}
                  architects={architects}
                  contractors={contractors}
                  isAdmin={isAdmin}
                />
              } 
            />
            <Route 
              path="/architects" 
              element={
                <ArchitectsList 
                  architects={architects} 
                  setArchitects={setArchitects}
                  projects={projects}
                  isAdmin={isAdmin}
                />
              } 
            />
            <Route 
              path="/architects/:id" 
              element={
                <ArchitectDetail 
                  architects={architects} 
                  setArchitects={setArchitects}
                  projects={projects}
                  isAdmin={isAdmin}
                />
              } 
            />
            <Route 
              path="/contractors" 
              element={
                <ContractorsList 
                  contractors={contractors} 
                  setContractors={setContractors}
                  projects={projects}
                  isAdmin={isAdmin}
                />
              } 
            />
            <Route 
              path="/contractors/:id" 
              element={
                <ContractorDetail 
                  contractors={contractors} 
                  setContractors={setContractors}
                  projects={projects}
                  isAdmin={isAdmin}
                />
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-12 py-6 bg-card">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Construction Project Manager © 2025 | Data stored locally in your browser</p>
            <p className="mt-1">⚠️ Remember to export your data regularly for backup</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

