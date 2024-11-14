import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import useQuery from '@/hooks/useQuery';
import React from 'react'
import { MostViewed } from './types';

const ViewCarousel = ({title,url} : {title:string,url:string}) => {

    const { data, isLoading } = useQuery(`users/carousel/${url}`);

    const MemorizedData = React.useMemo(() => {
        return data;
    }, [data]) as MostViewed;

    return (
        <Card className='border-none bg-background'>
            <CardDescription>
                <Carousel className="min-w-full ">
                    <CardTitle className='flex justify-between '>
                        <span className='text-2xl'>{title}</span>
                        <span className="relative">
                            <CarouselPrevious className='relative -left-4' />
                            <CarouselNext className='relative left-0  ' />
                        </span>
                    </CardTitle>
                    <CarouselContent className="-ml-1 gap-4 mt-8">
                        {
                            !isLoading && MemorizedData?.mogous?.map((mogou) => (
                                <CarouselItem key={mogou.id} className='pl-1 basis-1/3 md:basis-1/4 lg:basis-[12.666667%] overflow-hidden cursor-pointer '>
                                    <div className='flex flex-col'>
                                        <div className="img">
                                            <img src={mogou?.cover} alt="hero" className="w-full h-40 md:h-72 object-cover" />
                                        </div>
                                        <div className="mogou-footer bg-primary h-12 flex justify-center  items-center rounded-b-sm">
                                            <h1 className="ps-2 md:ps-0 text-xs md:text-sm text-center font-semibold text-white truncate">{mogou?.title}</h1>
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

export default ViewCarousel