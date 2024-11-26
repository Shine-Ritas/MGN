import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import { MogousElement } from './types'
import { Rating } from '@/components/ui/rating'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const HeroCarouselCard = ({ mogou }: { mogou: MogousElement }) => {
  return (
    <CarouselItem key={mogou.id} 
    role="listitem"
    aria-label={mogou.title}
    aria-describedby={mogou.description}
    className="pl-1 md:basis-1/2  overflow-hidden cursor-pointer ">
        <Card className="h-52 md:h-64 border-x-neon-primary border-x-2 z-80 pb-4  hover:bg-phover overflow-hidden group transition-all">
          <CardContent className="flex w-full p-0">
            <div className="side-a w-3/4 ps-4">
              <div className="flex flex-col py-10 gap-6">

                <div className="">
                  <p className="text-xs text-gray-300">{mogou?.finish_status_name}</p>
                  <h1 className="text-lg md:text-2xl font-semibold text-white">{mogou?.title}</h1>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="hidden md:flex  font-semibold h-12 overflow-hidden text-gray-300">
                    {mogou?.description}
                  </span>
                  <Rating rating={mogou?.rating } totalStars={5} size={24} variant="yellow" disabled={true} />

                  <div className="flex gap-2 flex-wrap">

                    {
                      mogou?.categories && mogou?.categories?.slice(0, 2).map((category,index) => (
                        <span key={index} className="text-sm md:text-md font-semibold text-neon-primary">{category?.title}</span>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-1/4 side-b h-full w-1/4">
              <div className="max-sw-fit overflow-hidden">
                <LazyLoadImage src={mogou?.cover} alt={mogou?.title || 'Image'} className="scale-[1.1]
                  w-full h-full
                  object-cover z-40 transform rotate-[10deg]  group-hover:h-full group-hover:rotate-0 group-hover:scale-[1] transition-all" />
               
              </div>
            </div>

          </CardContent>
        </Card>
    </CarouselItem>
  )
}

export default HeroCarouselCard