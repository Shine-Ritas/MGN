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
import { PublishDataType } from "./ComicTable"
import useQuery from "@/hooks/useQuery"
import useMutate from "@/hooks/useMutate"
import { toast } from "@/components/ui/use-toast"

interface PublishDialogProps {
  publishData: PublishDataType
}

export function PublishDialog({ publishData }: PublishDialogProps) {
  const [activeTab, setActiveTab] = useState("select")
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [buttonText, setButtonText] = useState("Publish")

  const { data, isLoading } = useQuery(`admin/social-channels?type=telegram`)

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
      social_channel_ids: activeTab === "select" ? selectedChannels : "all",
      type: publishData.sub_mogou_slug == null ? "mogou" : "sub_mogou",
    })

    if (response?.error) publishData.setOpen(false)
  }, [publishData, selectedChannels, severPublish])

  const renderChannelList = () => (
    <div className="max-h-[320px] overflow-y-auto space-y-3 pr-2">
      {data?.channels?.map((channel) => {
        const isSelected = selectedChannels.includes(channel.id)
        return (
          <div
            key={channel.id}
            className={cn(
              "flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 cursor-pointer",
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
              className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">
                {channel.providers?.title} {channel.bot_type}
              </div>
              <div className="text-xs text-muted-foreground">
                {channel.providers?.total_members?.toLocaleString()} subscribers
              </div>
            </div>
            {isSelected && (
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  const renderAllSelectedMessage = () => (
    <div className="text-center py-12 px-4 bg-muted/30 rounded-xl border">
      <div className="text-lg font-medium mb-2">All Channels Selected</div>
      <p className="text-muted-foreground">
        Your content will be published to all {data?.channels?.length ?? 0} channels
      </p>
    </div>
  )

  return (
    <Dialog open={publishData.open} onOpenChange={publishData.setOpen}>
      <DialogContent className="sm:max-w-md rounded-xl border-0 shadow-lg">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Publish to Channels</DialogTitle>
          <DialogDescription className="text-base opacity-80">
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
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Select
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
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

        <DialogFooter className="mt-6 pt-4 border-t">
          <Button
            onClick={handlePublish}
            disabled={isPosting || (selectedChannels.length === 0 && activeTab === "select")}
            variant={buttonText === "Published" ? "success" : "default"}
            type="button"
            className="w-full sm:w-auto rounded-lg text-base text-sm transition-all"
          >
            <Send className="mr-2 h-3 w-3" />
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
