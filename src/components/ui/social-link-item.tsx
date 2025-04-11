import { SocialLink } from "@/pages/admin/Settings/General/social-action"
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa6"


interface SocialLinkItemProps {
  socialLink: SocialLink
  onEdit: () => void
}

export default function SocialLinkItem({ socialLink, onEdit }: SocialLinkItemProps) {
  // Map of social media types to colors
  const colorMap: Record<string, string> = {
    twitter: "border-l-sky-500",
    instagram: "border-l-pink-500",
    facebook: "border-l-blue-600",
    youtube: "border-l-red-600",
    default: "border-l-gray-400",
  }

  // Get the border color based on the social link type
  const borderColor = colorMap[socialLink.icon] || colorMap.default

  // Map of social media types to icons
  const getIcon = () => {
    switch (socialLink?.icon?.toLowerCase()) {
      case "twitter":
        return <FaTwitter className="h-5 w-5 text-sky-500" />
      case "instagram":
        return <FaInstagram className="h-5 w-5 text-pink-500" />
      case "facebook":
        return <FaFacebook className="h-5 w-5 text-blue-600" />
      case "youtube":
        return <FaYoutube className="h-5 w-5 text-red-600" />
        case "telegram":
        return <FaTelegram className="h-5 w-5 text-blue-500" />
      default:
        return <FaTelegram className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div
      className={`flex items-center p-4 border rounded-md border-l-4 ${borderColor} cursor-pointer hover:bg-secondary transition-colors`}
      onClick={onEdit}
    >
      <div className="mr-3">{getIcon()}</div>
      <div className="flex-1">
        <h3 className="font-medium">{socialLink.name}</h3>
      </div>
      <div className="flex items-center">
        <span className={`h-2.5 w-2.5 rounded-full mr-2 bg-green-500`}></span>
      </div>
    </div>
  )
}
