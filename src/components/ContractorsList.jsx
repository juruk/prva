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
import { Plus, Mail, Phone, Wrench, Building2, ArrowRight } from 'lucide-react'

const ContractorsList = ({ contractors, setContractors, projects, isAdmin }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    specialty: ''
  })

  const handleAddContractor = () => {
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      specialty: ''
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setContractors([...contractors, { ...formData, id: Date.now().toString() }])
    setIsDialogOpen(false)
  }

  const getContractorProjects = (contractorId) => {
    const projectsWithPhases = []
    projects.forEach(project => {
      if (project.contractors && project.contractors.includes(contractorId)) {
        projectsWithPhases.push(project)
      }
    })
    return projectsWithPhases
  }

  const getActiveProjects = (contractorId) => {
    return getContractorProjects(contractorId).filter(p => p.status === 'started')
  }

  const getCompletedProjects = (contractorId) => {
    return getContractorProjects(contractorId).filter(p => p.status === 'finished')
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
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Contractors</h2>
          <p className="text-muted-foreground">Manage your contractor network</p>
        </div>
        {isAdmin && <Button onClick={handleAddContractor} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Contractor
        </Button>}
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
            const activeProjects = getActiveProjects(contractor.id)
            const completedProjects = getCompletedProjects(contractor.id)

            return (
              <Link key={contractor.id} to={`/contractors/${contractor.id}`}>
                <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{contractor.name}</CardTitle>
                        {contractor.company && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <Building2 className="w-3 h-3" />
                            {contractor.company}
                          </div>
                        )}
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

      {/* Add Contractor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contractor</DialogTitle>
            <DialogDescription>
              Add a new contractor to your network
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
                placeholder="ABC Construction Co."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="ABC Construction Company"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty Field *</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
                placeholder="Electrical, Plumbing, HVAC, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@abcconstruction.com"
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

export default ContractorsList

