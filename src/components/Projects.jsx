import { useState } from 'react'
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
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog.jsx'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Plus, Edit, Trash2, Clock, CheckCircle2, Pause, Calendar, FileText } from 'lucide-react'

const Projects = ({ projects, setProjects, architects, contractors }) => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isPhaseDialogOpen, setIsPhaseDialogOpen] = useState(false)
  const [editingPhase, setEditingPhase] = useState(null)
  const [phaseFormData, setPhaseFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    contractor: ''
  })
  const [formData, setFormData] = useState({
    name: '',
    status: 'started',
    architect: '',
    notes: '',
    phases: []
  })

  const handleAddProject = () => {
    setEditingProject(null)
    setFormData({
      name: '',
      status: 'started',
      architect: '',
      notes: '',
      phases: []
    })
    setIsDialogOpen(true)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setFormData(project)
    setIsDialogOpen(true)
  }

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...formData, id: p.id } : p))
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }])
    }
    setIsDialogOpen(false)
  }

  const handleAddPhase = (project) => {
    setSelectedProject(project)
    setEditingPhase(null)
    setPhaseFormData({
      name: '',
      startDate: '',
      endDate: '',
      contractor: ''
    })
    setIsPhaseDialogOpen(true)
  }

  const handleEditPhase = (project, phase, index) => {
    setSelectedProject(project)
    setEditingPhase({ ...phase, index })
    setPhaseFormData(phase)
    setIsPhaseDialogOpen(true)
  }

  const handleDeletePhase = (project, index) => {
    if (confirm('Are you sure you want to delete this phase?')) {
      const updatedPhases = project.phases.filter((_, i) => i !== index)
      setProjects(projects.map(p => 
        p.id === project.id ? { ...p, phases: updatedPhases } : p
      ))
    }
  }

  const handlePhaseSubmit = (e) => {
    e.preventDefault()
    const updatedProject = { ...selectedProject }
    
    if (editingPhase !== null) {
      updatedProject.phases[editingPhase.index] = phaseFormData
    } else {
      updatedProject.phases = [...(updatedProject.phases || []), phaseFormData]
    }
    
    setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p))
    setIsPhaseDialogOpen(false)
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
        <Button onClick={handleAddProject} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                      <CardTitle>{project.name}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      {getStatusIcon(project.status)}
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.architect && (
                  <div>
                    <p className="text-sm font-medium">Architect</p>
                    <p className="text-sm text-muted-foreground">{project.architect}</p>
                  </div>
                )}
                
                {project.notes && (
                  <div>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Notes
                    </p>
                    <p className="text-sm text-muted-foreground">{project.notes}</p>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Phases ({project.phases?.length || 0})</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddPhase(project)}
                      className="gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Phase
                    </Button>
                  </div>
                  
                  {project.phases && project.phases.length > 0 ? (
                    <div className="space-y-2">
                      {project.phases.map((phase, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-accent/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{phase.name}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {phase.startDate && new Date(phase.startDate).toLocaleDateString()} - {phase.endDate && new Date(phase.endDate).toLocaleDateString()}
                              </div>
                              {phase.contractor && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Contractor: {phase.contractor}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleEditPhase(project, phase, index)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleDeletePhase(project, index)}
                              >
                                <Trash2 className="w-3 h-3 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-2">No phases added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update project details' : 'Create a new construction project'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Office Remodeling - Building A"
              />
            </div>
            
            <div>
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

            <div>
              <Label htmlFor="architect">Architect</Label>
              <Select value={formData.architect} onValueChange={(value) => setFormData({ ...formData, architect: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an architect" />
                </SelectTrigger>
                <SelectContent>
                  {architects.map((architect) => (
                    <SelectItem key={architect.id} value={architect.name}>
                      {architect.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
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
                {editingProject ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Phase Dialog */}
      <Dialog open={isPhaseDialogOpen} onOpenChange={setIsPhaseDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPhase ? 'Edit Phase' : 'Add New Phase'}</DialogTitle>
            <DialogDescription>
              {selectedProject?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePhaseSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phaseName">Phase Name *</Label>
              <Input
                id="phaseName"
                value={phaseFormData.name}
                onChange={(e) => setPhaseFormData({ ...phaseFormData, name: e.target.value })}
                required
                placeholder="Demolition, Electrical Work, etc."
              />
            </div>
            
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={phaseFormData.startDate}
                onChange={(e) => setPhaseFormData({ ...phaseFormData, startDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={phaseFormData.endDate}
                onChange={(e) => setPhaseFormData({ ...phaseFormData, endDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="contractor">Contractor</Label>
              <Select value={phaseFormData.contractor} onValueChange={(value) => setPhaseFormData({ ...phaseFormData, contractor: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contractor" />
                </SelectTrigger>
                <SelectContent>
                  {contractors.map((contractor) => (
                    <SelectItem key={contractor.id} value={contractor.name}>
                      {contractor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsPhaseDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingPhase ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Projects

