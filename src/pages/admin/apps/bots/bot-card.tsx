import { Bot } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export interface SocialChannel {
  id:         number;
  name:       string;
  type:       number;
  token_key:  string;
  is_active:  number;
  created_at: Date;
  updated_at: Date;
  bot_type:   string;
  pivot:      Pivot;
}

export interface Pivot {
  bot_publisher_id:  number;
  social_channel_id: number;
}

interface BotCardProps {
  name: string
  social_channels: SocialChannel[]
  is_active: "active" | "inactive"
  lastActivity: string
  created_at: string
}

export function BotCard({ name, social_channels, is_active, lastActivity, created_at }: BotCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-blue-500" />
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {is_active ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Binded Channels: {social_channels.length}</p>
          <p>Last Activity: {lastActivity}</p>
          <p>Created At: {created_at}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  )
}

