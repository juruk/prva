import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
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
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Wrench,
  Building2,
  FolderKanban,
  Clock,
  CheckCircle2
} from 'lucide-react'

const ContractorDetail = ({ contractors, setContractors, projects, isAdmin }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const contractor = contractors.find(c => c.id === id)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState(contractor || {})

  if (!contractor) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Contractor not found</p>
        <Button onClick={() => navigate('/contractors')} className="mt-4">
          Back to Contractors
        </Button>
      </div>
    )
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setContractors(contractors.map(c => c.id === id ? { ...formData, id } : c))
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this contractor?')) {
      setContractors(contractors.filter(c => c.id !== id))
      navigate('/contractors')
    }
  }

  const getContractorProjects = () => {
    return projects.filter(p => p.contractors && p.contractors.includes(id))
  }

  const activeProjects = getContractorProjects().filter(p => p.status === 'started')
  const completedProjects = getContractorProjects().filter(p => p.status === 'finished')
  const onHoldProjects = getContractorProjects().filter(p => p.status === 'on-hold')
  const allProjects = getContractorProjects()

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
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/contractors')} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Contractors
      </Button>

      {/* Contractor Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{contractor.name}</h1>
          {contractor.company && (
            <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
              <Building2 className="w-5 h-5" />
              {contractor.company}
            </div>
          )}
          {contractor.specialty && (
            <Badge className={`mb-4 ${getSpecialtyColor(contractor.specialty)}`}>
              <Wrench className="w-4 h-4 mr-2" />
              {contractor.specialty}
            </Badge>
          )}
          <div className="space-y-2">
            {contractor.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${contractor.email}`} className="hover:text-foreground transition-colors">
                  {contractor.email}
                </a>
              </div>
            )}
            {contractor.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href={`tel:${contractor.phone}`} className="hover:text-foreground transition-colors">
                  {contractor.phone}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <Button variant="outline" onClick={() => { setFormData(contractor); setIsEditDialogOpen(true); }}>
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allProjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{activeProjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completedProjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">On Hold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{onHoldProjects.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Active Projects
            </CardTitle>
            <CardDescription>Currently working on these projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {project.phases?.length || 0} phases
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        Started
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Completed Projects
            </CardTitle>
            <CardDescription>Project history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {project.phases?.length || 0} phases
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Finished
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Projects */}
      {allProjects.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No projects assigned yet</p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contractor</DialogTitle>
            <DialogDescription>Update contractor details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="ABC Construction Company"
              />
            </div>

            <div>
              <Label htmlFor="specialty">Specialty Field *</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
    </div>
  )
}

export default ContractorDetail
