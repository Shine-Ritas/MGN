import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa6"

export const getIcon = (icon) => {
    switch (icon) {
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