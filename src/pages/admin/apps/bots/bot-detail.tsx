
import { useParams } from 'react-router-dom'
import useQuery from '@/hooks/useQuery'
import BotInfoCard from './bot-info-card'
import ChannelList from './channel-list'
import PostHistory from './post-history'
import { eventEmitter } from '@/utilities/event-emitter'
import Goback from '@/components/goback-btn'

const pulseAnimation = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;


const BotDetail = ()=>{
  const { id } = useParams<{ id: string }>();
  const { data,isLoading,refetch} = useQuery(`admin/bot-publisher/${id}/detail`);
  const { data: posts,isLoading: postsLoading} = useQuery(`admin/bot-publisher/${id}/posts`);

  if(isLoading){
    return <div>Loading...</div>
  }

  eventEmitter.on("channelListUpdated", () => {
    refetch?.()
  })

  console.log(posts);


  return (
    <>
      <div className="flex items-center gap-4 mt-4 mb-3">
                <Goback to={-1} />
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Bot Detail
                </h1>
            </div>

      <style>{pulseAnimation}</style>
      <div className="py-4 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {!isLoading && <BotInfoCard bot={data?.bots}/>}
          {!isLoading && <ChannelList bot={data?.bots}/>}
        </div>
        {
          !postsLoading && <PostHistory posts={posts?.posts}/>
        }
      </div>
    </>
  )
}

export default BotDetail