import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FaFacebook, FaTelegram } from 'react-icons/fa6'



const socialShareData = [
        {
            id: 33223,
            name: "Facebook",
            url: "https://www.facebook.com/sharer/sharer.php?u=https://www.mogous.com",
            icon: < FaFacebook className='text-xl' />,
            color: "bg-blue-600"
        },
        
        // telegram
        {
            id:34343,
            name: "Telegram",
            url: "https://t.me/share/url?url=https://www.mogous.com",
            icon: <FaTelegram className='text-2xl' />,
            color: "bg-blue-900"
        },

]

const ShareSection = () => {
    return (
        <Alert className="bg-primary md:h-32 text-center flex flex-col items-center justify-center text-xs md:text-sm">
            <AlertTitle className='mb-4 text-white font-bold'> If you enjoy the website, please consider sharing it with your friends. Thank you!</AlertTitle>
            <AlertDescription>
                <div className="flex gap-4 justify-center">
                    {socialShareData.map((social) => (
                        <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center  hover:opacity-80 transition-all justify-start px-4 gap-2 w-28 h-10 rounded-md ${social.color} text-white`}
                        >
                            {social.icon}
                            {social.name}
                        </a>
                    ))}
                </div>
            </AlertDescription>
        </Alert>
    )
}

export default ShareSection