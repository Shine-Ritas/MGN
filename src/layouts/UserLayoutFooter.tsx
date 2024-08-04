import { FaTwitter, FaYoutube } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Logo from "@/assets/imgs/logo-icon.png";
import LogoTitle from "@/assets/imgs/logo-title.png";

const UserLayoutFooter = () => {
  return (
    <div className="dark py-8">
      <div className="px-5 md:px-24 flex flex-col md:flex-row mditems-center justify-between">
        <div className="flex items-center justify-between space-x-4">

        <Link to="#" className=" hover:text-gray-300 flex items-center justify-between">
            <img src={Logo} alt="logo" className="h-12" />
            <img src={LogoTitle} alt="logo" className="h-6" />
           
          </Link>

          <div className="flex items-center gap-4">
          <Link to="#" className=" hover:text-gray-300">
            <FaYoutube className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          
          <Link to="#" className=" hover:text-gray-300">
            <FaTwitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          </div>

         
        </div>
        <p className="mt-4 md:mt-0 text-sm text-gray-300 hidden md:flex">&copy; 2024 NorthSide Wizards Team. All rights reserved.</p>
      </div>
    </div>
  )
}

export default UserLayoutFooter