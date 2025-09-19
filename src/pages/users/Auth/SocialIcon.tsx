import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa6"

export const getIcon = (icon,size = "h-5 w-5") => {
    switch (icon) {
      case "twitter":
        return <FaTwitter className={`${size} text-sky-500`} />
      case "instagram":
        return <FaInstagram className={`${size} text-pink-500`} />
      case "facebook":
        return <FaFacebook className={`${size} text-blue-600`} />
      case "youtube":
        return <FaYoutube className={`${size} text-red-600`} />
        case "telegram":
        return <FaTelegram className={`${size} text-blue-500`} />
      default:
        return <FaTelegram className={`${size} text-gray-500`} />
    }
  }