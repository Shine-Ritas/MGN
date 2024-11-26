import useQuery from "@/hooks/useQuery"
import { BotCard } from "./bot-card"
import { useParams } from "react-router-dom"

export default function BotList() {

  const { app:type } = useParams<{ app: string }>();
  

  const { data,isLoading } = useQuery(`admin/bot-publisher/${type}/list`);



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        isLoading && <div>Loading...</div>
      }
      {
      !isLoading && data?.bots?.map((bot) => (
        <BotCard key={bot.id} {...bot} />
      ))}
    </div>
  )
}

