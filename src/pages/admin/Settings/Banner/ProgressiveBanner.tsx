import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Banner } from './type'
import { useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

type ProgressiveBannerProps = {
  banner: Banner,
  onOpen : (modalData?: any) => void
}

const ProgressiveBanner = ({ banner,onOpen }: ProgressiveBannerProps) => {

  const handleModalOpen = ()=>{
      onOpen(banner)
  }

  return (
    <div className="flex flex-col gap-4">

      <div className="flex justify-between">
        <h3>
          {banner.name}
        </h3>
        <Button
        onClick={handleModalOpen}
        
        className="btn btn-primary">
          <PencilIcon size={12} />
        </Button>
      </div>

      <div className="">
        <Card className="flex h-fit w-full items-center justify-center rounded-md border border-dashed border-muted text-sm min-h-24">
          {
            (banner.cover_photo_url)? (
              <LazyLoadImage 
              src={banner.meta || banner.cover_photo_url}
              alt="banner one"
              className="w-full h-full max-h-60 "
              />
            ) :
            (
              <></>
            )
          }
        </Card>
      </div>

      <Card className="flex  bg-background flex-row items-center space-x-3 h-12 rounded-md border px-4">
        <Checkbox
          className='mb-0 pb-0 !text-white data-[state=checked]:bg-neon-primary'
          id={banner.id.toString()}
        />
        <Label htmlFor={banner.id.toString()} className='mt-0'>
          Show {banner.name} To Non-Subscribers
        </Label>

      </Card>

      <hr className="border border-muted mt-4" />
    </div>
  )
}

export default ProgressiveBanner