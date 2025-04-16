import { SocialLink } from "@/pages/admin/Settings/General/social-action"
import { getIcon } from "@/pages/users/Auth/SocialIcon"
interface SocialLinkItemProps {
  socialLink: SocialLink
  onEdit: () => void
}

const colorMap: Record<string, string> = {
  twitter: "border-l-sky-500",
  instagram: "border-l-pink-500",
  facebook: "border-l-blue-600",
  youtube: "border-l-red-600",
  default: "border-l-gray-400",
}


export default function SocialLinkItem({ socialLink, onEdit }: SocialLinkItemProps) {
  // Map of social media types to colors
  const borderColor = colorMap[socialLink.icon] || colorMap.default

  // Map of social media types to icons
  
  return (
    <div
      className={`flex items-center p-4 border rounded-md border-l-4 ${borderColor} cursor-pointer hover:bg-secondary transition-colors`}
      onClick={onEdit}
    >
      <div className="mr-3">{getIcon(socialLink?.icon?.toLowerCase())}</div>
      <div className="flex-1">
        <h3 className="font-medium">{socialLink.name}</h3>
      </div>
      <div className="flex items-center">
        <span className={`h-2.5 w-2.5 rounded-full mr-2 bg-green-500`}></span>
      </div>
    </div>
  )
}
