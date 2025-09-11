import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import useQuery from '@/hooks/useQuery'


const UserGuestLayout = () => {

  const {  data: applicationConfig } = useQuery(`application-configs`);


  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
        {
             <Suspense fallback={<div></div>}>
             <Outlet />
           </Suspense>
        }
    <div className="hidden bg-muted lg:block">
      <LazyLoadImage
        src={applicationConfig?.cover_photo}
        alt="Image"
        width="1920"
        height="1080"
        className="h-full w-full object-cover "
      />
    </div>
  </div>
  )
}

export default UserGuestLayout