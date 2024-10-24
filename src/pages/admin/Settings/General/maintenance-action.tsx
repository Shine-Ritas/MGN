'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import useMutate from '@/hooks/useMutate'

export default function MaintenanceAction({isActive} : {isActive:boolean}) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(isActive)

  const sucessCallback = (response) => {
    if(response){
      setIsMaintenanceMode(!isMaintenanceMode)
    toast({
        title: isMaintenanceMode ? 'Maintenance Mode Disabled' : 'Maintenance Mode Enabled',
        description: isMaintenanceMode
            ? 'Your application is now running normally'
            : 'Your application is now in maintenance mode',
        variant: isMaintenanceMode ? 'success' : 'destructive',
    })
    }
  }

  const [actviate,{isLoading}] = useMutate({callback:sucessCallback});

  const toggleMaintenanceMode = async () => {
      await actviate("/application-configs", {user_side_is_maintenance_mode: !isMaintenanceMode}); 
  }

  return (
    <Card className="w-full col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl">Application Status</CardTitle>
        <CardDescription>
            Toggle maintenance mode for your application to prevent users from accessing user-side.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-medium">Maintenance Mode</h3>
            <p className="text-sm text-muted-foreground">
              {isMaintenanceMode
                ? 'Your application is currently in maintenance mode'
                : 'Your application is currently active'}
            </p>
          </div>
          <Switch
            disabled={isLoading}
            checked={isMaintenanceMode}
            onCheckedChange={toggleMaintenanceMode}
            aria-label="Toggle maintenance mode"
          />
        </div>
        <div className="mt-6 flex items-center gap-2">
          {isMaintenanceMode ? (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          <span className="text-sm font-medium">
            {isMaintenanceMode ? 'Maintenance Mode Active' : 'Application Running Normally'}
          </span>
        </div>
        <Button
          disabled={isLoading}
          onClick={toggleMaintenanceMode}
          variant={isMaintenanceMode ? 'destructive' : 'default'}
          className="mt-4 w-full"
        >
          {isMaintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
        </Button>
      </CardContent>
    </Card>
  )
}