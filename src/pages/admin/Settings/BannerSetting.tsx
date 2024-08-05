import { Card  } from '@/components/ui/card'
import BannerOne from '@/assets/imgs/bannerSlot.gif'
import BannerTwo from '@/assets/imgs/sexy-game.gif'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'

const BannerSetting = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h3>HomePage Top Banner</h3>
          <Button className="btn btn-primary">
            <PencilIcon size={12} />
          </Button>
        </div>

        <div className="">
          <Card className="flex h-fit w-full items-center justify-center rounded-md border border-dashed text-sm">
            <img src={BannerOne} alt="banner one" className="w-full h-full object-cover" />
          </Card>
        </div>

        <Card className="flex  bg-primary flex-row items-center space-x-3 h-12 rounded-md border px-4">
            <Checkbox
            className='mb-0 pb-0 bg-stone-600'
            id='top-banner'
            />
            <Label htmlFor='top-banner' className='mt-0'>
              Show HomePage Top Banner To Non-VIP Users
            </Label>
            
        </Card>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h3>HomePage Bottom Banner</h3>
          <button className="btn btn-primary">Save</button>
        </div>

        <div className="">
          <Card className="flex h-fit w-full items-center justify-center rounded-md border border-dashed text-sm">
            <img src={BannerTwo} alt="banner one" className="w-full h-full object-cover" />

          </Card>
        </div>
      </div>

    </div>
  )
}

export default BannerSetting