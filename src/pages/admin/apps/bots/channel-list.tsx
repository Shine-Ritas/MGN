import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Badge } from "@/components/ui/badge"

import AddChannelModal from "./add-channel-modal"

const ChannelList = ({ bot }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row !justify-between">
        <div className="">
          <CardTitle>Channels</CardTitle>
          <CardTitle className="text-sm text-muted-foreground">Total Channels: {bot?.channels.length}</CardTitle>
        </div>

        <AddChannelModal bot_id={bot?.id} channel_type={bot?.bot_type}  />  
        
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {bot?.channels.map((channel, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{channel.name} ( {channel?.providers.title} )</h3>
                <Badge>{channel.bot_type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Subscribers: {channel?.providers?.total_members}</p>
              <p className="text-sm text-muted-foreground">Invite Link: {channel?.providers?.invite_link}</p>
              <p className="text-sm text-muted-foreground">Last Activity: {channel.created_at}</p>

            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ChannelList