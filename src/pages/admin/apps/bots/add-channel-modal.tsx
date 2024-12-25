import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { PlusCircle } from "lucide-react"
import useMutate from "@/hooks/useMutate"
import { eventEmitter } from "@/utilities/event-emitter"


export default function AddChannelModal({channel_type,bot_id}) {
  const [isOpen, setIsOpen] = useState(false)
  const [channelInput, setChannelInput] = useState("")
  const [mutate,{isLoading}] = useMutate({callback:undefined})
  const [syncStatus, setSyncStatus] = useState<"success" | "error" | null>(null)

  const handleSync = async () => {
    const data = {
        token_key : channelInput,
        bot_type : channel_type,
        bot_id : bot_id,
    }

    const response = await mutate("/admin/social-channel",data)

    if(response && response.error){
      setSyncStatus("error")
    }
    else{
      setSyncStatus("success")
      eventEmitter.emit("channelListUpdated",response)
    }

  }

  const resetModal = () => {
    setChannelInput("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetModal()
    }}>
      <DialogTrigger asChild>
      <Button
          size={"sm"}
          className="inline-flex">
            <PlusCircle className="w-4 h-4" />  
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link New Channel</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="channel-input">
              Enter Channel Name or Channel ID (for private channels)
            </Label>
            <Input
              id="channel-input"
              value={channelInput}
              onChange={(e) => setChannelInput(e.target.value)}
              placeholder="e.g., @channelname or -100123456789"
            />
          </div>
          {syncStatus === "success" && (
            <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-green-100 text-green-800">
              <CheckCircle2 className="h-5 w-5" />
              <span>Channel successfully synced!</span>
            </div>
          )}
          {syncStatus === "error" && (
            <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-red-100 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <span>Failed to bind channel. Please check and try again.</span>
            </div>
          )}
          <Button onClick={handleSync} disabled={isLoading || !channelInput.trim()}>
            {isLoading ? "Syncing..." : "Sync"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

