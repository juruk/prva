import { Cloud, CloudOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge.jsx'

const SyncStatus = ({ status, error, enabled }) => {
  if (!enabled) {
    return (
      <Badge variant="outline" className="gap-1">
        <CloudOff className="w-3 h-3" />
        Local Only
      </Badge>
    )
  }

  switch (status) {
    case 'syncing':
      return (
        <Badge variant="secondary" className="gap-1">
          <RefreshCw className="w-3 h-3 animate-spin" />
          Syncing...
        </Badge>
      )
    
    case 'synced':
      return (
        <Badge variant="default" className="gap-1 bg-green-600">
          <CheckCircle2 className="w-3 h-3" />
          Synced
        </Badge>
      )
    
    case 'error':
      return (
        <Badge variant="destructive" className="gap-1" title={error || 'Sync error'}>
          <AlertCircle className="w-3 h-3" />
          Sync Error
        </Badge>
      )
    
    default:
      return (
        <Badge variant="outline" className="gap-1">
          <Cloud className="w-3 h-3" />
          Ready
        </Badge>
      )
  }
}

export default SyncStatus

