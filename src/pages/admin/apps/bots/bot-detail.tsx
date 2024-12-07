
import { useParams } from 'react-router-dom'
import useQuery from '@/hooks/useQuery'
import BotInfoCard from './bot-info-card'
import ChannelList from './channel-list'
import PostHistory from './post-history'

const pulseAnimation = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;


const posts = [
  { content: "Welcome to our new bot!", publishedOn: "2023-05-01 09:00", channel: "General Chat", status: "Published" },
  { content: "Maintenance scheduled for tomorrow", publishedOn: "2023-05-02 14:30", channel: "Announcements", status: "Published" },
  { content: "New feature release!", publishedOn: "2023-05-03 10:15", channel: "General Chat", status: "Failed" },
]

const BotDetail = ()=>{
  const { id } = useParams<{ id: string }>();
  const { data,isLoading} = useQuery(`admin/bot-publisher/${id}/detail`);

  if(isLoading){
    return <div>Loading...</div>
  }


  return (
    <>
      <style>{pulseAnimation}</style>
      <div className="py-4 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <BotInfoCard bot={data?.bots} />
          <ChannelList bot={data?.bots}/>
        </div>
        <PostHistory posts={posts}/>
      </div>
    </>
  )
}

export default BotDetail