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
  Building2,
  FolderKanban,
  Clock,
  CheckCircle2
} from 'lucide-react'

const ArchitectDetail = ({ architects, setArchitects, projects, isAdmin }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const architect = architects.find(a => a.id === id)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState(architect || {})

  if (!architect) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Architect not found</p>
        <Button onClick={() => navigate('/architects')} className="mt-4">
          Back to Architects
        </Button>
      </div>
    )
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setArchitects(architects.map(a => a.id === id ? { ...formData, id } : a))
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this architect?')) {
      setArchitects(architects.filter(a => a.id !== id))
      navigate('/architects')
    }
  }

  const getArchitectProjects = () => {
    return projects.filter(p => p.architects && p.architects.includes(id))
  }

  const activeProjects = getArchitectProjects().filter(p => p.status === 'started')
  const completedProjects = getArchitectProjects().filter(p => p.status === 'finished')
  const onHoldProjects = getArchitectProjects().filter(p => p.status === 'on-hold')
  const allProjects = getArchitectProjects()

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/architects')} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Architects
      </Button>

      {/* Architect Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{architect.name}</h1>
          {architect.company && (
            <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
              <Building2 className="w-5 h-5" />
              {architect.company}
            </div>
          )}
          <div className="space-y-2">
            {architect.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${architect.email}`} className="hover:text-foreground transition-colors">
                  {architect.email}
                </a>
              </div>
            )}
            {architect.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href={`tel:${architect.phone}`} className="hover:text-foreground transition-colors">
                  {architect.phone}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <Button variant="outline" onClick={() => { setFormData(architect); setIsEditDialogOpen(true); }}>
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
            <DialogTitle>Edit Architect</DialogTitle>
            <DialogDescription>Update architect details</DialogDescription>
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
                placeholder="Smith Architecture Studio"
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

export default ArchitectDetail

