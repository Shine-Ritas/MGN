import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import { MogousElement } from './types'
import { Rating } from '@/components/ui/rating'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { rTitle } from '@/utilities/util'



const HeroCarouselCard = ({ mogou }: { mogou: MogousElement }) => {
  return (
    <CarouselItem 
    key={mogou.id} className="pl-1 md:basis-1/2  overflow-hidden cursor-pointer ">
      <Link 
      to={`/show/${mogou.slug}`}
      className="">
        <Card className="h-52 border-x-neon-primary border-x-2 z-80 pb-4  hover:bg-phover overflow-hidden group transition-all">
          <CardContent className="flex w-full p-0">
            <div className="side-a w-3/4 ps-4">
              <div className="flex flex-col py-4 gap-3">

                <div className="">
                  <p className="text-xxs text-gray-300">{mogou?.finish_status_name}</p>
                  <h1 className="text-md font-semibold text-white">{rTitle(mogou?.title,30)}</h1>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <span className="hidden md:flex  font-semibold h-12 overflow-hidden text-gray-300">
                    {rTitle(mogou?.description, 100)}
                  </span>
                  <Rating rating={mogou?.rating} totalStars={5} size={20} variant="yellow" disabled={true} />

                  <div className="flex gap-2 flex-wrap">
                    {
                      mogou?.categories && mogou?.categories?.slice(0, 2).map((category, index) => (
                        <span key={index} className="text-xs md:text-md font-semibold text-neon-primary">{category?.title}</span>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="side-b w-1/4">
                <div
                  aria-label={mogou?.title}
                  className="relative aspect-[2/3] h-56">
                  <LazyLoadImage src={mogou.cover || "/placeholder.svg"}
                    style={{ width: '100%', height: '100%' }}
                    alt={mogou.title} 
                    className=" object-cover z-40 group-hover:h-full group-hover:rotate-0 transition-all" />
                </div>
            </div>

          </CardContent>
        </Card>
      </Link>
    </CarouselItem>
  )
}

export default HeroCarouselCard