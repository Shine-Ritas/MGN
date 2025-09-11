import { useCallback, useState } from "react"
import { Check, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/utilities/util"
import useQuery from "@/hooks/useQuery"
import useMutate from "@/hooks/useMutate"
import { toast } from "@/components/ui/use-toast"
import { usePublishContent } from "@/contexts/PublishContentContext"


export function PublishDialog() {
  const [activeTab, setActiveTab] = useState("select")
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [buttonText, setButtonText] = useState("Publish")

  const  publishData  = usePublishContent();
  
  const { data, isLoading } = useQuery(`admin/social-channels?type=telegram`,undefined,false,false,false)

  const afterPublish = () => {
    toast({
      title: "Publish Successful",
      description: "Your content has been published successfully",
      variant: "success",
    })
    setButtonText("Published")
    setTimeout(() => {
      publishData.setOpen(false)
      setSelectedChannels([])
      setActiveTab("select")
      setButtonText("Publish")
    }, 2000)
  }

  const [severPublish, { isLoading: isPosting }] = useMutate({
    callback: afterPublish,
    navigateBack: false,
  })

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    )
  }

  const handlePublish = useCallback(async () => {
    setButtonText("Publishing...")
    const response = await severPublish("admin/publish-content", {
      mogou_slug: publishData.mogou_slug,
      sub_mogou_slug: publishData.sub_mogou_slug,
      social_channel_ids: activeTab === "select" ? selectedChannels : "all",
      type: publishData.sub_mogou_slug == null ? "mogou" : "sub_mogou",
    })

    if (response?.error) {
      publishData.setOpen(false)
      setButtonText("Publish")
    }
  }, [publishData, selectedChannels, severPublish])

  const renderChannelList = () => (
    <div className="max-h-[280px] sm:max-h-[320px] overflow-y-auto space-y-2 sm:space-y-3 pr-2">
      {data?.channels?.map((channel) => {
        const isSelected = selectedChannels.includes(channel.id)
        return (
          <div
            key={channel.id}
            className={cn(
              "flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer",
              isSelected
                ? "bg-primary/10 border border-primary/20"
                : "hover:bg-primary border border-transparent"
            )}
            onClick={() => handleSelectChannel(channel.id)}
          >
            <Checkbox
              id={`channel-${channel.id}`}
              checked={isSelected}
              onCheckedChange={() => handleSelectChannel(channel.id)}
              className="h-4 w-4 sm:h-5 sm:w-5 rounded-md border-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-xs sm:text-sm truncate">
                {channel.providers?.title} {channel.bot_type}
              </div>
              <div className="text-xs text-muted-foreground">
                {channel.providers?.total_members?.toLocaleString()} subscribers
              </div>
            </div>
            {isSelected && (
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  const renderAllSelectedMessage = () => (
    <div className="text-center py-8 sm:py-12 px-3 sm:px-4 bg-muted/30 rounded-xl border">
      <div className="text-base sm:text-lg font-medium mb-2">All Channels Selected</div>
      <p className="text-sm sm:text-base text-muted-foreground">
        Your content will be published to all {data?.channels?.length ?? 0} channels
      </p>
    </div>
  )

  return (
    <Dialog open={publishData.open} onOpenChange={publishData.setOpen}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg rounded-xl border-0 shadow-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-lg sm:text-xl font-semibold">Publish to Channels</DialogTitle>
          <DialogDescription className="text-sm sm:text-base opacity-80">
            Choose where to publish your content
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="select"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-1 rounded-lg border">
            <TabsTrigger
              value="select"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 text-sm"
            >
              Select
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 text-sm"
            >
              All Channels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="mt-6">
            {!isLoading && renderChannelList()}
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            {renderAllSelectedMessage()}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 sm:mt-6 pt-4 border-t">
          <Button
            onClick={handlePublish}
            disabled={isPosting || (selectedChannels.length === 0 && activeTab === "select")}
            variant={buttonText === "Published" ? "success" : "default"}
            type="button"
            className="w-full rounded-lg text-sm transition-all"
          >
            <Send className="mr-2 h-3 w-3" />
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
