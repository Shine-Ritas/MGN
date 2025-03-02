import { FaTwitter, FaYoutube } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Logo from "@/assets/imgs/logo-icon.png";
import LogoTitle from "@/assets/imgs/logo-title.png";

const UserLayoutFooter = () => {
  return (
    <footer className=''>
      <div className="dark py-8 ">
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
      <div className="w-full bg-primary h-20 px-4 md:px-24 py-4 flex justify-center items-center text-xs md:text-sm text-center">
        All the comics on this website are only previews of the original comics, there may be many language errors, character names, and story lines. For the original version, please buy the comic if it's available in your city.
      </div>

    </footer>
  )
}

export default UserLayoutFooter