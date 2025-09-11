'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
      await actviate("/admin/application-configs", {user_side_is_maintenance_mode: !isMaintenanceMode}); 
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl">Application Status</CardTitle>
        <CardDescription className="text-sm">
            Toggle maintenance mode for your application to prevent users from accessing user-side.
        </CardDescription>
      </CardHeader>
      <CardContent>
      
        <div className="flex items-center gap-2 mb-4">
          {isMaintenanceMode ? (
            <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 flex-shrink-0" />
          ) : (
            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
          )}
          <span className="text-xs md:text-sm font-medium">
            {isMaintenanceMode ? 'Maintenance Mode Active' : 'Application Running Normally'}
          </span>
        </div>
        <Button
          disabled={isLoading}
          onClick={toggleMaintenanceMode}
          variant={isMaintenanceMode ? 'destructive' : 'default'}
          className="w-full text-sm md:text-base"
        >
          {isMaintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
        </Button>
      </CardContent>
    </Card>
  )
}