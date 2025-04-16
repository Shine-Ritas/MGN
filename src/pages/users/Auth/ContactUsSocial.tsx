import { Button } from "@/components/ui/button"
import { getIcon } from "./SocialIcon"
import { useCallback, useState } from "react"
import { SocialLink } from "@/pages/admin/Settings/General/social-action"


const colorMap: Record<string, string> = {
  twitter: "border-l-sky-500",
  instagram: "border-l-pink-500",
  facebook: "border-l-blue-600",
  youtube: "border-l-red-600",
  default: "border-l-gray-400",
}

type ContactUsSocialType = {
  socialLink : SocialLink
 
}

const ContactUsSocial = ({socialLink} : ContactUsSocialType) => {
  const [isRedirecting, setIsRedirecting] = useState(false)
  
  const borderColor = colorMap[socialLink.icon] || colorMap.default

  const handleClick = useCallback(()=>{
    setIsRedirecting(true);

    setInterval(()=>{
      setIsRedirecting(false)
      window.location.href = socialLink.redirect_url;
    },1000)
  },[setIsRedirecting, socialLink.redirect_url]);

  return (
    <Button 
    onClick={handleClick}
    className={`bg-transparent w-2/3 h-16 flex items-center p-4 border rounded-md border-l-4 ${borderColor} cursor-pointer hover:bg-secondary transition-colors`}
    disabled={isRedirecting}
  >
    <div className="mr-3">{getIcon(socialLink?.icon?.toLowerCase())}</div>
      <div className="flex-1">
        <h3 className="font-medium">{isRedirecting ? "Redirecting" : socialLink.name}</h3>
      </div>
      <div className="flex items-center">
        <span className={`h-2.5 w-2.5 rounded-full mr-2 bg-green-500`}></span>
      </div>
  </Button>
  )
}

export default ContactUsSocial