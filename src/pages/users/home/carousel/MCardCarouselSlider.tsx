import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

const MCardCarouselSlider = ({ isLoading, collection }) => {
    return (
        <Card className='border-none  '>
            <CardDescription>
                <Carousel className="min-w-full">
                    <CardTitle className='w-full flex justify-between'>
                        <div className=""></div>
                        <span className="relative">
                            <CarouselPrevious className='relative -left-4 ' />
                            <CarouselNext className='relative left-0' />
                        </span>
                    </CardTitle>
                    <CarouselContent className="-ml-1 gap-4 mt-8">
                        {
                            !isLoading && collection?.map((mogou) =>
                                (mogou?.is_visible !== false) && (
                                    <CarouselItem key={mogou.id} className='pl-1 basis-1/3 md:basis-1/4 lg:basis-[14.666667%] overflow-hidden cursor-pointer '>
                                        <div className='flex flex-col'>
                                            <div className="img">
                                                <img src={mogou?.cover} alt="hero" className="w-full h-40 md:h-64 object-cover" />
                                            </div>
                                            <div className="mogou-footer bg-primary h-8 flex justify-center  items-center rounded-b-sm">
                                                <h1 className="ps-2 md:ps-0 text-xs md:text-xs text-center font-semibold text-white truncate">{mogou?.title}</h1>
                                            </div>
                                        </div>

                                    </CarouselItem>
                                ))
                        }
                    </CarouselContent>
                </Carousel>
            </CardDescription>

        </Card>
    )
}

export default MCardCarouselSlider