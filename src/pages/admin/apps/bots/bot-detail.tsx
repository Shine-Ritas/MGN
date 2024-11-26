import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff, Edit, Trash2, ArrowRight, RefreshCcw } from 'lucide-react'

const pulseAnimation = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

// Mock data
const botInfo = {
  name: "ChatBot 3000",
  tokenKey: "abcd1234efgh5678",
  type: "Messenger Bot",
  totalUsers: 10000,
  commandsProcessed: 50000,
  rating: 4.5,
  status: "active"
}

const channels = [
  { name: "General Chat", subscribers: 5000, lastActivity: "2 hours ago", type: "Public" },
  { name: "Support Group", subscribers: 2000, lastActivity: "5 minutes ago", type: "Group" },
  { name: "Announcements", subscribers: 8000, lastActivity: "1 day ago", type: "Public" },
]

const posts = [
  { content: "Welcome to our new bot!", publishedOn: "2023-05-01 09:00", channel: "General Chat", status: "Published" },
  { content: "Maintenance scheduled for tomorrow", publishedOn: "2023-05-02 14:30", channel: "Announcements", status: "Published" },
  { content: "New feature release!", publishedOn: "2023-05-03 10:15", channel: "General Chat", status: "Failed" },
]

const BotDetail = ()=>{
  const [showToken, setShowToken] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const toggleTokenVisibility = () => setShowToken(!showToken)

  const BotInfoCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{botInfo.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${botInfo.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} style={{ animation: botInfo.status === 'active' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none' }} />
          <span className={`text-sm font-medium ${botInfo.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
            {botInfo.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Token Key:</label>
            <div className="flex items-center space-x-2">
              <Input
                type={showToken ? 'text' : 'password'}
                value={showToken ? botInfo.tokenKey : '••••' + botInfo.tokenKey.slice(-4)}
                readOnly
              />
              <Button variant="outline" size="icon" onClick={toggleTokenVisibility}>
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="botName">Bot Name:</label>
              <Input
                id="botName"
                value={botInfo.name}
                onChange={(e) => {/* Update bot name */}}
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="botType">Bot Type:</label>
              <Input
                id="botType"
                value={botInfo.type}
                onChange={(e) => {/* Update bot type */}}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{botInfo.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{botInfo.commandsProcessed.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Commands Processed</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{botInfo.rating}/5</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button><Edit className="mr-2 h-4 w-4" /> Edit Bot</Button>
            <Button variant="outline"><Trash2 className="mr-2 h-4 w-4" /> Delete Bot</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ChannelList = () => (
    <Card>
      <CardHeader>
        <CardTitle>Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {channels.map((channel, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{channel.name}</h3>
                <Badge>{channel.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Subscribers: {channel.subscribers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Last Activity: {channel.lastActivity}</p>
              <Button variant="link" className="p-0">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )

  const PostHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle>Post History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              {channels.map((channel, index) => (
                <SelectItem key={index} value={channel.name}>{channel.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Published On</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={index}>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.publishedOn}</TableCell>
                <TableCell>{post.channel}</TableCell>
                <TableCell>
                  <Badge variant={post.status === 'Published' ? 'default' : 'destructive'}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  {post.status === 'Failed' && (
                    <Button variant="ghost" size="sm">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage}</span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage * postsPerPage >= posts.length}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <style>{pulseAnimation}</style>
      <div className="py-4 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <BotInfoCard />
          <ChannelList />
        </div>
        <PostHistory />
      </div>
    </>
  )
}

export default BotDetail