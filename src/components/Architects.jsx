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
import { Plus, Edit, Trash2, Mail, Phone, FolderKanban, History } from 'lucide-react'

const Architects = ({ architects, setArchitects, projects }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingArchitect, setEditingArchitect] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const handleAddArchitect = () => {
    setEditingArchitect(null)
    setFormData({
      name: '',
      phone: '',
      email: ''
    })
    setIsDialogOpen(true)
  }

  const handleEditArchitect = (architect) => {
    setEditingArchitect(architect)
    setFormData(architect)
    setIsDialogOpen(true)
  }

  const handleDeleteArchitect = (id) => {
    if (confirm('Are you sure you want to delete this architect?')) {
      setArchitects(architects.filter(a => a.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingArchitect) {
      setArchitects(architects.map(a => a.id === editingArchitect.id ? { ...formData, id: a.id } : a))
    } else {
      setArchitects([...architects, { ...formData, id: Date.now() }])
    }
    setIsDialogOpen(false)
  }

  const getArchitectProjects = (architectName) => {
    return projects.filter(p => p.architect === architectName)
  }

  const getActiveProjects = (architectName) => {
    return getArchitectProjects(architectName).filter(p => p.status === 'started')
  }

  const getCompletedProjects = (architectName) => {
    return getArchitectProjects(architectName).filter(p => p.status === 'finished')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Architects</h2>
          <p className="text-muted-foreground">Manage your architect network</p>
        </div>
        <Button onClick={handleAddArchitect} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Architect
        </Button>
      </div>

      {/* Architects Grid */}
      {architects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No architects found. Add your first architect to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {architects.map((architect) => {
            const activeProjects = getActiveProjects(architect.name)
            const completedProjects = getCompletedProjects(architect.name)
            const allProjects = getArchitectProjects(architect.name)

            return (
              <Card key={architect.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{architect.name}</CardTitle>
                      <CardDescription className="mt-2 space-y-1">
                        {architect.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3" />
                            {architect.email}
                          </div>
                        )}
                        {architect.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3" />
                            {architect.phone}
                          </div>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditArchitect(architect)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteArchitect(architect.id)}
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

      {/* Add/Edit Architect Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingArchitect ? 'Edit Architect' : 'Add New Architect'}</DialogTitle>
            <DialogDescription>
              {editingArchitect ? 'Update architect details' : 'Add a new architect to your network'}
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
                placeholder="John Smith"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.smith@example.com"
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
                {editingArchitect ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Architects

