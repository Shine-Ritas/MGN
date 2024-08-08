import { Card  } from '@/components/ui/card'

import BannerTwo from '@/assets/imgs/sexy-game.gif'
import { Separator } from '@/components/ui/separator'
import useQuery from '@/hooks/useQuery'
import ProgressiveBanner from './Banner/ProgressiveBanner'
import { Banner, BannerApiType } from './Banner/type'


const BannerSetting = () => {

  const {data : banners ,isLoading} = useQuery('admin/social-info/banners');


  return (
    !isLoading && <div className='flex flex-col gap-8'>
     {
        banners as BannerApiType && (
          banners?.social_info.map((banner : Banner) => (
              <>
               <ProgressiveBanner key={banner.id} banner={banner} position="top" />
               <Separator />
               
              </>
          ))
        )
     }
    </div>
  )
}

export default BannerSetting