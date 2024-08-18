import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCallback, useEffect, useState } from 'react'

type PublishTabProps = {
    // status will be useRef type
    status : any,
    setStatus : any
}

type StatusContent = {
    label : string,
    value : number,
    color : string
}

const statusContent:StatusContent[] = [
    {
        label : "Draft",
        value : 0,
        color : "outline"
    },
    {
        label : "Published",
        value : 1,
        color : "success",
    },
    {
        label : "ARCHIVED",
        value : 2,
        color : "destructive"
    }
]


const PublishTab = ({
  status,setStatus
}:PublishTabProps) => {

    let [currentStatus,setCurrentStatus] = useState<StatusContent>(statusContent[0])

    useEffect(() => {
      setCurrentStatus(statusContent.find((item) => item.value == status) !)
    }, [status]) 

    const handleSwitchStatus = useCallback(()=>{
        // loop through the statusContent and find the next status
        const valueCollection  = statusContent.map((item) => item.value)

        const currentIndex = valueCollection.indexOf(currentStatus!.value)
        let nextStatus = statusContent[currentIndex + 1]
        if(currentIndex == valueCollection.length - 1){
          nextStatus = statusContent[0]
        }


        setCurrentStatus(nextStatus)
        // object 
        setStatus((obj: any) =>{
          return {
            ...obj,
            status : nextStatus.value
          }
        })
    },[currentStatus])

    

  return (
    <Card x-chunk="">
    <CardHeader>
      <CardTitle>
          Publish
      </CardTitle>
      <CardDescription>
        If you publish this comic, it will be available to the public.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div></div>
      <Button variant={currentStatus!.color as any }
      onClick={handleSwitchStatus}
      type='button'
      className="w-full">
        {
          currentStatus?.label
        }
      </Button>
    </CardContent>
  </Card>
  )
}

export default PublishTab