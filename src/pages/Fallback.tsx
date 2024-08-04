import fallback from '@/assets/fallback.png';
import useLogout from '@/hooks/useLogout';
import { useEffect } from 'react';



const Fallback = ({
  unauthorized = false
}) => {

  const logout = useLogout();

  useEffect(() => {
    if (unauthorized) {
      setTimeout(() => {
        logout(false)
      }, 1000);
    }
  }, [])

  return (
    <div className='w-full h-screen flex justify-center items-center '>

      <div className="flex flex-col gap-2 items-center">
        <h3 className='text-4xl text-bold'>
          You have not access to this page or the page does not exist
        </h3>
        <img src={fallback} alt="fallback" className="w-1/2 mx-auto" />
      </div>
    </div>
  )
}

export default Fallback