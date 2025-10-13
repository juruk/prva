import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Users, HardHat } from 'lucide-react'

const Navigation = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/architects', icon: Users, label: 'Architects' },
    { path: '/contractors', icon: HardHat, label: 'Contractors' },
  ]

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

