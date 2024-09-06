
import { Separator } from '@/components/ui/separator'
import useQuery from '@/hooks/useQuery'
import ProgressiveBanner from './Banner/ProgressiveBanner'
import { Banner,BannerApiType} from './Banner/type'
import { useDialog } from '@/hooks/useDialog'
import BannerUploadModal from './Banner/bannerUploadModal'

const BannerSetting = () => {
  const {data : banners ,isLoading} = useQuery('admin/social-info/banners');

  const { isOpen, onOpen, onClose, data } = useDialog<Banner>();

  return (
    !isLoading && <div className='flex flex-col gap-8'>
     {
        banners as BannerApiType && (
          banners?.social_info.map((banner : Banner) => (
              <div key={banner.id}>
               <ProgressiveBanner  banner={banner} onOpen={onOpen}/>
               <Separator />
               
              </div>
          ))
        )
     }

    <BannerUploadModal isOpen={isOpen} onClose={onClose} data={data}/>
    </div>
  )
}

export default BannerSetting