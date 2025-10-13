import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { Plus, Mail, Phone, Building2, ArrowRight } from 'lucide-react'

const ArchitectsList = ({ architects, setArchitects, projects, isAdmin }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  })

  const handleAddArchitect = () => {
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: ''
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setArchitects([...architects, { ...formData, id: Date.now().toString() }])
    setIsDialogOpen(false)
  }

  const getArchitectProjects = (architectId) => {
    return projects.filter(p => p.architects && p.architects.includes(architectId))
  }

  const getActiveProjects = (architectId) => {
    return getArchitectProjects(architectId).filter(p => p.status === 'started')
  }

  const getCompletedProjects = (architectId) => {
    return getArchitectProjects(architectId).filter(p => p.status === 'finished')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Architects</h2>
          <p className="text-muted-foreground">Manage your architect network</p>
        </div>
        {isAdmin && <Button onClick={handleAddArchitect} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Architect
        </Button>}
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
            const activeProjects = getActiveProjects(architect.id)
            const completedProjects = getCompletedProjects(architect.id)

            return (
              <Link key={architect.id} to={`/architects/${architect.id}`}>
                <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{architect.name}</CardTitle>
                        {architect.company && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <Building2 className="w-3 h-3" />
                            {architect.company}
                          </div>
                        )}
                        <CardDescription className="space-y-1">
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
                      <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {activeProjects.length}
                        </p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {completedProjects.length}
                        </p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {/* Add Architect Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Architect</DialogTitle>
            <DialogDescription>
              Add a new architect to your network
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Smith Architecture Studio"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.smith@example.com"
              />
            </div>

            <div className="space-y-2">
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
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ArchitectsList

