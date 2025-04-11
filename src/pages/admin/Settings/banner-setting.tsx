
import { Separator } from '@/components/ui/separator'
import useQuery from '@/hooks/useQuery'
import ProgressiveBanner from './Banner/progressive-banner'
import { Banner,BannerApiType} from './Banner/type'
import { useDialog } from '@/hooks/useDialog'
import BannerUploadModal from './Banner/banner-upload-modal'
import { ScrollArea } from '@radix-ui/react-scroll-area'

const BannerSetting = () => {
  const {data : banners ,isLoading} = useQuery('admin/social-info/banner');

  const { isOpen, onOpen, onClose, data } = useDialog<Banner>();

  return (
    !isLoading && 
    <ScrollArea className='flex flex-col gap-8'>
     {
        banners as BannerApiType && (
          banners?.data?.map((banner : Banner) => (
              <div key={banner.id}>
               <ProgressiveBanner  banner={banner} onOpen={onOpen}/>
               <Separator />
               
              </div>
          ))
        )
     }

    <BannerUploadModal isOpen={isOpen} onClose={onClose} data={data}/>
    </ScrollArea>
  )
}

export default BannerSetting