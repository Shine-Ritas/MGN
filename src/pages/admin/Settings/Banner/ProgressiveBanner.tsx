import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import BannerOne from '@/assets/imgs/bannerSlot.gif'
import { Card } from '@/components/ui/card'
import { Banner } from './type'

type ProgressiveBannerProps = {
   banner : Banner,
   position: "top" | "bottom" | "middle"
   label?: string
   type?: "image" | "video" | "gif"
}

const ProgressiveBanner = ({banner} : ProgressiveBannerProps) => {
  return (
    <div className="flex flex-col gap-4">
    <div className="flex justify-between">
      <h3>
        {banner.name}
      </h3>
      <Button className="btn btn-primary">
        <PencilIcon size={12} />
      </Button>
    </div>

    <div className="">
      <Card className="flex h-fit w-full items-center justify-center rounded-md border border-dashed border-muted text-sm min-h-24">
        {
           banner.cover_photo && (
                <img src={banner.cover_photo} alt="banner one" className="w-full h-full object-cover" />
            )
        }
      </Card>
    </div>

    <Card className="flex  bg-primary flex-row items-center space-x-3 h-12 rounded-md border px-4 !text-white">
        <Checkbox
        className='mb-0 pb-0 !text-white'
        id={banner.id.toString()}
        />
        <Label htmlFor={banner.id.toString()} className='mt-0'>
          Show {banner.name} To Non-Subscribers
        </Label>
        
    </Card>
  </div>
  )
}

export default ProgressiveBanner