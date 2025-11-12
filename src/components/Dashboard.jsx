import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { FolderKanban, Users, HardHat, AlertTriangle, CheckCircle2, Clock, Pause } from 'lucide-react'
import { Badge } from '@/components/ui/badge.jsx'

const Dashboard = ({ projects, architects, contractors }) => {
  // Calculate statistics
  const totalProjects = projects.length
  const startedProjects = projects.filter(p => p.status === 'started').length
  const finishedProjects = projects.filter(p => p.status === 'finished').length
  const onHoldProjects = projects.filter(p => p.status === 'on-hold').length
  
  // Get upcoming deadlines (phases ending within 7 days)
  const today = new Date()
  const upcomingDeadlines = []
  
  projects.forEach(project => {
    if (project.phases) {
      project.phases.forEach(phase => {
        if (phase.endDate) {
          const endDate = new Date(phase.endDate)
          const daysUntil = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
          if (daysUntil >= 0 && daysUntil <= 7) {
            upcomingDeadlines.push({
              projectName: project.name,
              phaseName: phase.name,
              endDate: phase.endDate,
              daysUntil,
              contractor: phase.contractor
            })
          }
        }
      })
    }
  })
  
  // Sort by days until deadline
  upcomingDeadlines.sort((a, b) => a.daysUntil - b.daysUntil)
  
  // Get overdue phases
  const overduePhases = []
  projects.forEach(project => {
    if (project.phases && project.status !== 'finished') {
      project.phases.forEach(phase => {
        if (phase.endDate) {
          const endDate = new Date(phase.endDate)
          if (endDate < today) {
            overduePhases.push({
              projectName: project.name,
              phaseName: phase.name,
              endDate: phase.endDate,
              contractor: phase.contractor
            })
          }
        }
      })
    }
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'started':
        return <Clock className="w-4 h-4" />
      case 'finished':
        return <CheckCircle2 className="w-4 h-4" />
      case 'on-hold':
        return <Pause className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'started':
        return 'bg-blue-500'
      case 'finished':
        return 'bg-green-500'
      case 'on-hold':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active management
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Architects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{architects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In network
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractors</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractors.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Phases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overduePhases.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Projects by Status</CardTitle>
          <CardDescription>Overview of current project statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{startedProjects}</p>
                <p className="text-sm text-muted-foreground">Started</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{finishedProjects}</p>
                <p className="text-sm text-muted-foreground">Finished</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <Pause className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{onHoldProjects}</p>
                <p className="text-sm text-muted-foreground">On Hold</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Phases ending within the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingDeadlines.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No upcoming deadlines</p>
          ) : (
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 5).map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{deadline.projectName}</p>
                    <p className="text-sm text-muted-foreground">{deadline.phaseName}</p>
                    {deadline.contractor && (
                      <p className="text-xs text-muted-foreground mt-1">Contractor: {deadline.contractor}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge variant={deadline.daysUntil <= 2 ? "destructive" : "secondary"}>
                      {deadline.daysUntil === 0 ? 'Today' : `${deadline.daysUntil} days`}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(deadline.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overdue Phases */}
      {overduePhases.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Overdue Phases
            </CardTitle>
            <CardDescription>Phases that have passed their deadline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overduePhases.map((phase, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-destructive/50 rounded-lg bg-destructive/5">
                  <div className="flex-1">
                    <p className="font-medium">{phase.projectName}</p>
                    <p className="text-sm text-muted-foreground">{phase.phaseName}</p>
                    {phase.contractor && (
                      <p className="text-xs text-muted-foreground mt-1">Contractor: {phase.contractor}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">Overdue</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {new Date(phase.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Latest project updates</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No projects yet</p>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                    <div>
                      <p className="font-medium">{project.name}</p>
                      {project.architect && (
                        <p className="text-sm text-muted-foreground">Architect: {project.architect}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    {getStatusIcon(project.status)}
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

