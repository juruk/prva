import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown, ChevronUp } from 'lucide-react'

const CollapsibleSection = ({ 
  title, 
  description,
  icon: Icon, 
  children, 
  isOpen, 
  onToggle,
  headerAction 
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={onToggle}>
            {Icon && <Icon className="w-5 h-5" />}
            <div className="flex-1">
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          {headerAction && (
            <div className="ml-2" onClick={(e) => e.stopPropagation()}>
              {headerAction}
            </div>
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          {children}
        </CardContent>
      )}
    </Card>
  )
}

export default CollapsibleSection

