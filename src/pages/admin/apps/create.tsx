import BotChannels from './botcreated'
import CreateBot from './create-bot'

const CreateBotComponent = () => {
  return (
    <div className='flex gap-8 pt-6'>
        <CreateBot />
        <BotChannels />
    </div>
  )
}

export default CreateBotComponent