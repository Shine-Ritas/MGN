import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ChevronRight } from "lucide-react"

// This would typically come from your API or state management
const mockChannels = [
  { id: '1', name: 'Tech News', members: 1500 },
  { id: '2', name: 'Daily Blog Updates', members: 750 },
  { id: '3', name: 'Coding Tips', members: 2200 },
  { id: '4', name: 'Web Dev Discussions', members: 980 },
]

export default function BotChannels() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)

  return (
    <Card className="w-full max-w-2xl  pt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-6 h-6" />
          Bot Created Successfully
        </CardTitle>
        <CardDescription>
          Your bot is now an admin in the following Telegram channels. Select a channel to start publishing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockChannels.map((channel) => (
            <li key={channel.id}>
              <Button
                variant={selectedChannel === channel.id ? "default" : "outline"}
                className="w-full justify-between text-left"
                onClick={() => setSelectedChannel(channel.id)}
              >
                <div>
                  <span className="font-medium">{channel.name}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {channel.members.toLocaleString()} members
                  </span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full mt-4" 
          disabled={!selectedChannel}
        >
          Publish to Selected Channel
        </Button>
      </CardContent>
    </Card>
  )
}