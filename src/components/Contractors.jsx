import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog.jsx'
import { Plus, Edit, Trash2, Mail, Phone, Wrench, FolderKanban, History } from 'lucide-react'

const Contractors = ({ contractors, setContractors, projects }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContractor, setEditingContractor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: ''
  })

  const handleAddContractor = () => {
    setEditingContractor(null)
    setFormData({
      name: '',
      phone: '',
      email: '',
      specialty: ''
    })
    setIsDialogOpen(true)
  }

  const handleEditContractor = (contractor) => {
    setEditingContractor(contractor)
    setFormData(contractor)
    setIsDialogOpen(true)
  }

  const handleDeleteContractor = (id) => {
    if (confirm('Are you sure you want to delete this contractor?')) {
      setContractors(contractors.filter(c => c.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingContractor) {
      setContractors(contractors.map(c => c.id === editingContractor.id ? { ...formData, id: c.id } : c))
    } else {
      setContractors([...contractors, { ...formData, id: Date.now() }])
    }
    setIsDialogOpen(false)
  }

  const getContractorProjects = (contractorName) => {
    const projectsWithPhases = []
    projects.forEach(project => {
      if (project.phases) {
        const hasPhases = project.phases.some(phase => phase.contractor === contractorName)
        if (hasPhases) {
          projectsWithPhases.push(project)
        }
      }
    })
    return projectsWithPhases
  }

  const getActiveProjects = (contractorName) => {
    return getContractorProjects(contractorName).filter(p => p.status === 'started')
  }

  const getCompletedProjects = (contractorName) => {
    return getContractorProjects(contractorName).filter(p => p.status === 'finished')
  }

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Electrical': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Plumbing': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'HVAC': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      'Carpentry': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      'Painting': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Flooring': 'bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-300',
      'Demolition': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'General': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
    return colors[specialty] || colors['General']
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Contractors</h2>
          <p className="text-muted-foreground">Manage your contractor network</p>
        </div>
        <Button onClick={handleAddContractor} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Contractor
        </Button>
      </div>

      {/* Contractors Grid */}
      {contractors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No contractors found. Add your first contractor to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contractors.map((contractor) => {
            const activeProjects = getActiveProjects(contractor.name)
            const completedProjects = getCompletedProjects(contractor.name)
            const allProjects = getContractorProjects(contractor.name)

            return (
              <Card key={contractor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{contractor.name}</CardTitle>
                      </div>
                      {contractor.specialty && (
                        <Badge className={`mb-2 ${getSpecialtyColor(contractor.specialty)}`}>
                          <Wrench className="w-3 h-3 mr-1" />
                          {contractor.specialty}
                        </Badge>
                      )}
                      <CardDescription className="space-y-1">
                        {contractor.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3" />
                            {contractor.email}
                          </div>
                        )}
                        {contractor.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3" />
                            {contractor.phone}
                          </div>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditContractor(contractor)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteContractor(contractor.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {activeProjects.length}
                      </p>
                      <p className="text-xs text-muted-foreground">Active Projects</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {completedProjects.length}
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>

                  {/* Current Projects */}
                  {activeProjects.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-1">
                        <FolderKanban className="w-3 h-3" />
                        Current Projects
                      </p>
                      <div className="space-y-1">
                        {activeProjects.map((project) => (
                          <div key={project.id} className="text-sm p-2 border rounded bg-accent/50">
                            {project.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project History */}
                  {completedProjects.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-1">
                        <History className="w-3 h-3" />
                        Project History
                      </p>
                      <div className="space-y-1">
                        {completedProjects.slice(0, 3).map((project) => (
                          <div key={project.id} className="text-sm p-2 border rounded bg-muted/50 text-muted-foreground">
                            {project.name}
                          </div>
                        ))}
                        {completedProjects.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center pt-1">
                            +{completedProjects.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {allProjects.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No projects assigned yet
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Add/Edit Contractor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingContractor ? 'Edit Contractor' : 'Add New Contractor'}</DialogTitle>
            <DialogDescription>
              {editingContractor ? 'Update contractor details' : 'Add a new contractor to your network'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="ABC Construction Co."
              />
            </div>

            <div>
              <Label htmlFor="specialty">Specialty Field *</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
                placeholder="Electrical, Plumbing, HVAC, etc."
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@abcconstruction.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingContractor ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Contractors

