import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog.jsx'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Plus, Clock, CheckCircle2, Pause, ArrowRight, Users as UsersIcon, HardHat } from 'lucide-react'

const ProjectsList = ({ projects, setProjects, architects, contractors, isAdmin }) => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    status: 'started',
    startDate: '',
    endDate: '',
    architects: [],
    contractors: [],
    notes: '',
    phases: [],
    fileLinks: [],
    investors: [],
    supervisors: [],
    locationLink: ''
  })

  const handleAddProject = () => {
    setFormData({
      name: '',
      status: 'started',
      startDate: '',
      endDate: '',
      architects: [],
      contractors: [],
      notes: '',
      phases: [],
      fileLinks: [],
      investors: [],
      supervisors: [],
      locationLink: ''
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProjects([...projects, { ...formData, id: Date.now().toString() }])
    setIsDialogOpen(false)
  }

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

  const filteredProjects = filterStatus === 'all' 
    ? projects 
    : projects.filter(p => p.status === filterStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your construction projects</p>
        </div>
        {isAdmin && (
          <Button onClick={handleAddProject} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button 
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('all')}
        >
          All ({projects.length})
        </Button>
        <Button 
          variant={filterStatus === 'started' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('started')}
          className="gap-2"
        >
          <Clock className="w-4 h-4" />
          Started ({projects.filter(p => p.status === 'started').length})
        </Button>
        <Button 
          variant={filterStatus === 'finished' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('finished')}
          className="gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Finished ({projects.filter(p => p.status === 'finished').length})
        </Button>
        <Button 
          variant={filterStatus === 'on-hold' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('on-hold')}
          className="gap-2"
        >
          <Pause className="w-4 h-4" />
          On Hold ({projects.filter(p => p.status === 'on-hold').length})
        </Button>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No projects found. Add your first project to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                      </CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.architects && project.architects.length > 0 && (
                    <div>
                      <p className="text-sm font-medium flex items-center gap-1 mb-1">
                        <UsersIcon className="w-3 h-3" />
                        Architects ({project.architects.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.architects.slice(0, 2).map((archId, idx) => {
                          const arch = architects.find(a => a.id === archId)
                          return arch ? (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {arch.name}
                            </Badge>
                          ) : null
                        })}
                        {project.architects.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.architects.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {project.contractors && project.contractors.length > 0 && (
                    <div>
                      <p className="text-sm font-medium flex items-center gap-1 mb-1">
                        <HardHat className="w-3 h-3" />
                        Contractors ({project.contractors.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.contractors.slice(0, 2).map((contrId, idx) => {
                          const contr = contractors.find(c => c.id === contrId)
                          return contr ? (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {contr.name}
                            </Badge>
                          ) : null
                        })}
                        {project.contractors.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.contractors.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      {project.phases?.length || 0} phases
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Add Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Create a new construction project
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Office Remodeling - Building A"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="started">Started</SelectItem>
                  <SelectItem value="finished">Finished</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationLink">Location Link</Label>
              <Input
                id="locationLink"
                type="url"
                value={formData.locationLink}
                onChange={(e) => setFormData({ ...formData, locationLink: e.target.value })}
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional project notes..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectsList

