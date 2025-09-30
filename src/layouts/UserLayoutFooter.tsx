import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectApplicationConfig } from '@/redux/slices/application-config-slice';
import { getIcon } from '@/pages/users/Auth/SocialIcon';

const UserLayoutFooter = () => {

  const applicationConfig = useSelector(selectApplicationConfig);

  return (
    <footer className=''>
      <div className="dark py-4 mt-4">
        <div className="px-5 md:px-24 flex flex-col md:flex-row mditems-center justify-between">
          <div className="flex items-center justify-between space-x-4">

            <Link to="#" className=" hover:text-gray-300 flex items-center justify-between">
              <img src={applicationConfig?.logo} alt="logo" className="w-8 hover:motion-safe:animate-spin-slow cursor-pointer " />
              <h4 className="text-logo-text font-bold text-lg">{applicationConfig?.title}</h4>
            </Link>

            <div className="flex items-center gap-2">

              {
                applicationConfig?.socials?.map((social, index) => (
                  <Link to={social.redirect_url} className=" hover:text-gray-300">
                    {getIcon(social.icon?.toLowerCase(), "h-5 w-5")}
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))
              }
            </div>


          </div>
          <p className="mt-4 md:mt-0 text-xs text-gray-300 hidden md:flex">&copy; 2024 NorthSide Wizards Team. All rights reserved.</p>
        </div>
      </div>
      <div className="w-full bg-primary md:h-12 px-4 md:px-24 py-4 flex justify-center items-center text-xs md:text-xs text-center">
        All the comics on this website are only previews of the original comics, there may be many language errors, character names, and story lines. For the original version, please buy the comic if it's available in your city.
      </div>

    </footer>
  )
}

export default UserLayoutFooter