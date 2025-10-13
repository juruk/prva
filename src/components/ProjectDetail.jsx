import CollapsibleCard from './CollapsibleCard'
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
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
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Plus, 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Pause,
  Users as UsersIcon,
  HardHat,
  Briefcase,
  UserCheck
} from 'lucide-react'
import GanttChart from './GanttChart'

const ProjectDetail = ({ projects, setProjects, architects, contractors, isAdmin }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPhaseDialogOpen, setIsPhaseDialogOpen] = useState(false)
  const [isArchitectDialogOpen, setIsArchitectDialogOpen] = useState(false)
  const [isContractorDialogOpen, setIsContractorDialogOpen] = useState(false)
  const [isFileLinkDialogOpen, setIsFileLinkDialogOpen] = useState(false)
  const [isInvestorDialogOpen, setIsInvestorDialogOpen] = useState(false)
  const [isSupervisorDialogOpen, setIsSupervisorDialogOpen] = useState(false)
  const [editingPhase, setEditingPhase] = useState(null)
  const [editingInvestor, setEditingInvestor] = useState(null)
  const [editingSupervisor, setEditingSupervisor] = useState(null)
  const [selectedArchitects, setSelectedArchitects] = useState([])
  const [selectedContractors, setSelectedContractors] = useState([])
  
  const [formData, setFormData] = useState(project || {})
  const [phaseFormData, setPhaseFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    contractor: ''
  })
  const [fileLinkFormData, setFileLinkFormData] = useState({
    title: '',
    url: '',
    description: ''
  })
  const [investorFormData, setInvestorFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  })
  const [supervisorFormData, setSupervisorFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  })

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    )
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setProjects(projects.map(p => p.id === id ? { ...formData, id } : p))
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id))
      navigate('/projects')
    }
  }

  const handleAddPhase = () => {
    setEditingPhase(null)
    setPhaseFormData({
      name: '',
      startDate: '',
      endDate: '',
      contractor: ''
    })
    setIsPhaseDialogOpen(true)
  }

  const handleEditPhase = (phase, index) => {
    setEditingPhase({ ...phase, index })
    setPhaseFormData(phase)
    setIsPhaseDialogOpen(true)
  }

  const handleDeletePhase = (index) => {
    if (confirm('Are you sure you want to delete this phase?')) {
      const updatedPhases = project.phases.filter((_, i) => i !== index)
      setProjects(projects.map(p => 
        p.id === id ? { ...p, phases: updatedPhases } : p
      ))
    }
  }

  const handlePhaseSubmit = (e) => {
    e.preventDefault()
    const updatedPhases = [...(project.phases || [])]
    
    if (editingPhase !== null) {
      updatedPhases[editingPhase.index] = phaseFormData
    } else {
      updatedPhases.push(phaseFormData)
    }
    
    setProjects(projects.map(p => p.id === id ? { ...p, phases: updatedPhases } : p))
    setIsPhaseDialogOpen(false)
  }

  const handleManageArchitects = () => {
    setSelectedArchitects(project.architects || [])
    setIsArchitectDialogOpen(true)
  }

  const handleManageContractors = () => {
    setSelectedContractors(project.contractors || [])
    setIsContractorDialogOpen(true)
  }

  const handleSaveArchitects = () => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, architects: selectedArchitects } : p
    ))
    setIsArchitectDialogOpen(false)
  }

  const handleSaveContractors = () => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, contractors: selectedContractors } : p
    ))
    setIsContractorDialogOpen(false)
  }

  const toggleArchitect = (archId) => {
    if (selectedArchitects.includes(archId)) {
      setSelectedArchitects(selectedArchitects.filter(id => id !== archId))
    } else {
      setSelectedArchitects([...selectedArchitects, archId])
    }
  }

  const toggleContractor = (contrId) => {
    if (selectedContractors.includes(contrId)) {
      setSelectedContractors(selectedContractors.filter(id => id !== contrId))
    } else {
      setSelectedContractors([...selectedContractors, contrId])
    }
  }

  const handleAddFileLink = (e) => {
    e.preventDefault()
    const updatedFileLinks = [...(project.fileLinks || []), fileLinkFormData]
    setProjects(projects.map(p => 
      p.id === id ? { ...p, fileLinks: updatedFileLinks } : p
    ))
    setFileLinkFormData({ title: '', url: '', description: '' })
    setIsFileLinkDialogOpen(false)
  }

  const handleDeleteFileLink = (index) => {
    if (confirm('Are you sure you want to delete this file link?')) {
      const updatedFileLinks = project.fileLinks.filter((_, i) => i !== index)
      setProjects(projects.map(p => 
        p.id === id ? { ...p, fileLinks: updatedFileLinks } : p
      ))
    }
  }

  // Investor management functions
  const handleAddInvestor = () => {
    setEditingInvestor(null)
    setInvestorFormData({
      name: '',
      company: '',
      phone: '',
      email: ''
    })
    setIsInvestorDialogOpen(true)
  }

  const handleEditInvestor = (investor, index) => {
    setEditingInvestor({ ...investor, index })
    setInvestorFormData(investor)
    setIsInvestorDialogOpen(true)
  }

  const handleDeleteInvestor = (index) => {
    if (confirm('Are you sure you want to delete this investor?')) {
      const updatedInvestors = (project.investors || []).filter((_, i) => i !== index)
      setProjects(projects.map(p => 
        p.id === id ? { ...p, investors: updatedInvestors } : p
      ))
    }
  }

  const handleInvestorSubmit = (e) => {
    e.preventDefault()
    const updatedInvestors = [...(project.investors || [])]
    
    if (editingInvestor !== null) {
      updatedInvestors[editingInvestor.index] = investorFormData
    } else {
      updatedInvestors.push(investorFormData)
    }
    
    setProjects(projects.map(p => p.id === id ? { ...p, investors: updatedInvestors } : p))
    setIsInvestorDialogOpen(false)
  }

  // Supervisor management functions
  const handleAddSupervisor = () => {
    setEditingSupervisor(null)
    setSupervisorFormData({
      name: '',
      company: '',
      phone: '',
      email: ''
    })
    setIsSupervisorDialogOpen(true)
  }

  const handleEditSupervisor = (supervisor, index) => {
    setEditingSupervisor({ ...supervisor, index })
    setSupervisorFormData(supervisor)
    setIsSupervisorDialogOpen(true)
  }

  const handleDeleteSupervisor = (index) => {
    if (confirm('Are you sure you want to delete this supervisor?')) {
      const updatedSupervisors = (project.supervisors || []).filter((_, i) => i !== index)
      setProjects(projects.map(p => 
        p.id === id ? { ...p, supervisors: updatedSupervisors } : p
      ))
    }
  }

  const handleSupervisorSubmit = (e) => {
    e.preventDefault()
    const updatedSupervisors = [...(project.supervisors || [])]
    
    if (editingSupervisor !== null) {
      updatedSupervisors[editingSupervisor.index] = supervisorFormData
    } else {
      updatedSupervisors.push(supervisorFormData)
    }
    
    setProjects(projects.map(p => p.id === id ? { ...p, supervisors: updatedSupervisors } : p))
    setIsSupervisorDialogOpen(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'started':
        return <Clock className="w-5 h-5" />
      case 'finished':
        return <CheckCircle2 className="w-5 h-5" />
      case 'on-hold':
        return <Pause className="w-5 h-5" />
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
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/projects')} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Button>

      {/* Project Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`w-4 h-4 rounded-full mt-2 ${getStatusColor(project.status)}`} />
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="gap-1">
                {getStatusIcon(project.status)}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
              </Badge>
              {(project.startDate || project.endDate) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {project.startDate && (
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  )}
                  {project.startDate && project.endDate && <span>→</span>}
                  {project.endDate && (
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <Button variant="outline" onClick={() => { setFormData(project); setIsEditDialogOpen(true); }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Architects Card */}
        <CollapsibleCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                Architects
              </CardTitle>
              {isAdmin && (
                <Button size="sm" variant="outline" onClick={handleManageArchitects}>
                  Manage
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {project.architects && project.architects.length > 0 ? (
              <div className="space-y-2">
                {project.architects.map((archId) => {
                  const arch = architects.find(a => a.id === archId)
                  return arch ? (
                    <Link key={archId} to={`/architects/${archId}`}>
                      <div className="p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                        <p className="font-medium">{arch.name}</p>
                        {arch.company && <p className="text-sm text-muted-foreground">{arch.company}</p>}
                        {arch.email && (
                          <p className="text-xs text-muted-foreground mt-1">
                            📧 {arch.email}
                          </p>
                        )}
                        {arch.phone && (
                          <p className="text-xs text-muted-foreground">
                            📞 {arch.phone}
                          </p>
                        )}
                      </div>
                    </Link>
                  ) : null
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No architects assigned</p>
            )}
          </CardContent>
        </Card>

        {/* Contractors Card */}
        <CollapsibleCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <HardHat className="w-5 h-5" />
                Contractors
              </CardTitle>
              {isAdmin && (
                <Button size="sm" variant="outline" onClick={handleManageContractors}>
                  Manage
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {project.contractors && project.contractors.length > 0 ? (
              <div className="space-y-2">
                {project.contractors.map((contrId) => {
                  const contr = contractors.find(c => c.id === contrId)
                  return contr ? (
                    <Link key={contrId} to={`/contractors/${contrId}`}>
                      <div className="p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                        <p className="font-medium">{contr.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {contr.company && <p className="text-sm text-muted-foreground">{contr.company}</p>}
                          {contr.specialty && (
                            <Badge variant="secondary" className="text-xs">{contr.specialty}</Badge>
                          )}
                        </div>
                        {contr.email && (
                          <p className="text-xs text-muted-foreground mt-1">
                            📧 {contr.email}
                          </p>
                        )}
                        {contr.phone && (
                          <p className="text-xs text-muted-foreground">
                            📞 {contr.phone}
                          </p>
                        )}
                      </div>
                    </Link>
                  ) : null
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No contractors assigned</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Investor & Supervisor Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investors Card */}
        <CollapsibleCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Investors
              </CardTitle>
              {isAdmin && (
                <Button size="sm" variant="outline" onClick={handleAddInvestor}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {project.investors && project.investors.length > 0 ? (
              <div className="space-y-2">
                {project.investors.map((investor, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-accent/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {investor.name && (
                          <p className="font-medium">{investor.name}</p>
                        )}
                        {investor.company && (
                          <p className="text-sm text-muted-foreground">{investor.company}</p>
                        )}
                        {investor.email && (
                          <p className="text-xs text-muted-foreground mt-1">
                            📧 {investor.email}
                          </p>
                        )}
                        {investor.phone && (
                          <p className="text-xs text-muted-foreground">
                            📞 {investor.phone}
                          </p>
                        )}
                      </div>
                      {isAdmin && (
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditInvestor(investor, index)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteInvestor(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No investors added</p>
            )}
          </CardContent>
        </Card>

        {/* Supervisors Card */}
        <CollapsibleCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Supervisors
              </CardTitle>
              {isAdmin && (
                <Button size="sm" variant="outline" onClick={handleAddSupervisor}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {project.supervisors && project.supervisors.length > 0 ? (
              <div className="space-y-2">
                {project.supervisors.map((supervisor, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-accent/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {supervisor.name && (
                          <p className="font-medium">{supervisor.name}</p>
                        )}
                        {supervisor.company && (
                          <p className="text-sm text-muted-foreground">{supervisor.company}</p>
                        )}
                        {supervisor.email && (
                          <p className="text-xs text-muted-foreground mt-1">
                            📧 {supervisor.email}
                          </p>
                        )}
                        {supervisor.phone && (
                          <p className="text-xs text-muted-foreground">
                            📞 {supervisor.phone}
                          </p>
                        )}
                      </div>
                      {isAdmin && (
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditSupervisor(supervisor, index)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteSupervisor(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No supervisors added</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Location Link */}
      {project.locationLink && (
        <CollapsibleCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a 
              href={project.locationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              📍 View Location
            </a>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {project.notes && (
        <CollapsibleCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{project.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* File Links */}
      <CollapsibleCard>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Files & Links
            </CardTitle>
            {isAdmin && (
              <Button size="sm" variant="outline" onClick={() => setIsFileLinkDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {project.fileLinks && project.fileLinks.length > 0 ? (
            <div className="space-y-2">
              {project.fileLinks.map((link, index) => (
                <div key={index} className="flex items-start justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <div>
                      <p className="font-medium text-blue-600 hover:underline">{link.title}</p>
                      {link.description && (
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      )}
                    </div>
                  </a>
                  {isAdmin && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDeleteFileLink(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No files or links added yet</p>
          )}
        </CardContent>
      </Card>

      {/* Gantt Chart */}
      {project.phases && project.phases.length > 0 && (
        <CollapsibleCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Project Timeline
            </CardTitle>
            <CardDescription>Visual representation of project phases</CardDescription>
          </CardHeader>
          <CardContent>
            <GanttChart phases={project.phases} contractors={contractors} />
          </CardContent>
        </Card>
      )}

      {/* Phases */}
      <CollapsibleCard>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle>Phases ({project.phases?.length || 0})</CardTitle>
              <CardDescription>Project phases and milestones</CardDescription>
            </div>
            {isAdmin && <Button onClick={handleAddPhase} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Phase
            </Button>}
          </div>
        </CardHeader>
        <CardContent>
          {project.phases && project.phases.length > 0 ? (
            <div className="space-y-3">
              {project.phases.map((phase, index) => (
                <div key={index} className="p-4 border rounded-lg bg-accent/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-lg">{phase.name}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {phase.startDate && new Date(phase.startDate).toLocaleDateString()} - {phase.endDate && new Date(phase.endDate).toLocaleDateString()}
                      </div>
                      {phase.contractor && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Contractor: {phase.contractor}
                        </p>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditPhase(phase, index)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeletePhase(index)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No phases added yet</p>
          )}
        </CardContent>
      </Card>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
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

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Phase Dialog */}
      <Dialog open={isPhaseDialogOpen} onOpenChange={setIsPhaseDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPhase ? 'Edit Phase' : 'Add New Phase'}</DialogTitle>
            <DialogDescription>{project.name}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePhaseSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phaseName">Phase Name *</Label>
              <Input
                id="phaseName"
                value={phaseFormData.name}
                onChange={(e) => setPhaseFormData({ ...phaseFormData, name: e.target.value })}
                required
                placeholder="Demolition, Electrical Work, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={phaseFormData.startDate}
                onChange={(e) => setPhaseFormData({ ...phaseFormData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={phaseFormData.endDate}
                onChange={(e) => setPhaseFormData({ ...phaseFormData, endDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
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
              <Button type="submit">{editingPhase ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Manage Architects Dialog */}
      <Dialog open={isArchitectDialogOpen} onOpenChange={setIsArchitectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Architects</DialogTitle>
            <DialogDescription>Select architects for this project</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {architects.map((arch) => (
              <div
                key={arch.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedArchitects.includes(arch.id) ? 'bg-primary/10 border-primary' : 'hover:bg-accent'
                }`}
                onClick={() => toggleArchitect(arch.id)}
              >
                <p className="font-medium">{arch.name}</p>
                {arch.company && <p className="text-sm text-muted-foreground">{arch.company}</p>}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsArchitectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveArchitects}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Contractors Dialog */}
      <Dialog open={isContractorDialogOpen} onOpenChange={setIsContractorDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Contractors</DialogTitle>
            <DialogDescription>Select contractors for this project</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {contractors.map((contr) => (
              <div
                key={contr.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedContractors.includes(contr.id) ? 'bg-primary/10 border-primary' : 'hover:bg-accent'
                }`}
                onClick={() => toggleContractor(contr.id)}
              >
                <p className="font-medium">{contr.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {contr.company && <p className="text-sm text-muted-foreground">{contr.company}</p>}
                  {contr.specialty && <Badge variant="secondary" className="text-xs">{contr.specialty}</Badge>}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContractorDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveContractors}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add File Link Dialog */}
      <Dialog open={isFileLinkDialogOpen} onOpenChange={setIsFileLinkDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add File Link</DialogTitle>
            <DialogDescription>Add a link to external files or documents</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddFileLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkTitle">Title *</Label>
              <Input
                id="linkTitle"
                value={fileLinkFormData.title}
                onChange={(e) => setFileLinkFormData({ ...fileLinkFormData, title: e.target.value })}
                required
                placeholder="e.g., Floor Plans, Budget Sheet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUrl">URL *</Label>
              <Input
                id="linkUrl"
                type="url"
                value={fileLinkFormData.url}
                onChange={(e) => setFileLinkFormData({ ...fileLinkFormData, url: e.target.value })}
                required
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkDescription">Description</Label>
              <Textarea
                id="linkDescription"
                value={fileLinkFormData.description}
                onChange={(e) => setFileLinkFormData({ ...fileLinkFormData, description: e.target.value })}
                placeholder="Optional description..."
                rows={2}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFileLinkDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Link</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Investor Dialog */}
      <Dialog open={isInvestorDialogOpen} onOpenChange={setIsInvestorDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingInvestor ? 'Edit Investor' : 'Add Investor'}</DialogTitle>
            <DialogDescription>Enter investor contact information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvestorSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="investorName">Name</Label>
              <Input
                id="investorName"
                value={investorFormData.name}
                onChange={(e) => setInvestorFormData({ ...investorFormData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investorCompany">Company</Label>
              <Input
                id="investorCompany"
                value={investorFormData.company}
                onChange={(e) => setInvestorFormData({ ...investorFormData, company: e.target.value })}
                placeholder="Investment Group LLC"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investorPhone">Phone</Label>
              <Input
                id="investorPhone"
                type="tel"
                value={investorFormData.phone}
                onChange={(e) => setInvestorFormData({ ...investorFormData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investorEmail">Email</Label>
              <Input
                id="investorEmail"
                type="email"
                value={investorFormData.email}
                onChange={(e) => setInvestorFormData({ ...investorFormData, email: e.target.value })}
                placeholder="investor@example.com"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInvestorDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingInvestor ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Supervisor Dialog */}
      <Dialog open={isSupervisorDialogOpen} onOpenChange={setIsSupervisorDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingSupervisor ? 'Edit Supervisor' : 'Add Supervisor'}</DialogTitle>
            <DialogDescription>Enter supervisor contact information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSupervisorSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supervisorName">Name</Label>
              <Input
                id="supervisorName"
                value={supervisorFormData.name}
                onChange={(e) => setSupervisorFormData({ ...supervisorFormData, name: e.target.value })}
                placeholder="Jane Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisorCompany">Company</Label>
              <Input
                id="supervisorCompany"
                value={supervisorFormData.company}
                onChange={(e) => setSupervisorFormData({ ...supervisorFormData, company: e.target.value })}
                placeholder="Construction Oversight Inc"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisorPhone">Phone</Label>
              <Input
                id="supervisorPhone"
                type="tel"
                value={supervisorFormData.phone}
                onChange={(e) => setSupervisorFormData({ ...supervisorFormData, phone: e.target.value })}
                placeholder="+1 (555) 987-6543"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisorEmail">Email</Label>
              <Input
                id="supervisorEmail"
                type="email"
                value={supervisorFormData.email}
                onChange={(e) => setSupervisorFormData({ ...supervisorFormData, email: e.target.value })}
                placeholder="supervisor@example.com"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsSupervisorDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingSupervisor ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectDetail

