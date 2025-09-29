import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff  } from 'lucide-react'
import {  useState } from "react"

const BotInfoCard = ({ bot }) => {
  const [showToken, setShowToken] = useState(false)
  const toggleTokenVisibility = () => setShowToken(!showToken)


  if (!bot) return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-full">
          Invalid Bot Delete or Update
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{bot.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${bot.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className={`text-sm font-medium ${bot.is_active ? 'text-green-500' : 'text-gray-500'}`}>
            {bot.is_active ? 'Active' : 'Inactive'}
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
                value={showToken ? bot.token_key : '••••' + bot.token_key}
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
                value={bot.name}
                onChange={(e) => {/* Update bot name */ }}
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="botType">Bot Type:</label>
              <Input
                id="botType"
                value={bot.bot_type}
                onChange={(e) => {/* Update bot type */ }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BotInfoCard