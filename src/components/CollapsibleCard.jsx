import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown, ChevronUp } from 'lucide-react'

const CollapsibleCard = ({ title, icon: Icon, children, defaultOpen = true, headerAction }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            {Icon && <Icon className="w-5 h-5" />}
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {headerAction}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-8 p-0"
            >
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
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

export default CollapsibleCard

