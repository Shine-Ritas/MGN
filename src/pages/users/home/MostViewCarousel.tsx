import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import useQuery from '@/hooks/useQuery';
import React from 'react';
import { MostViewed } from './types';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MatureContentTag } from '@/components/ui/maturecontenttag';
import { Skeleton } from '@/components/ui/skeleton';

const ViewCarousel = ({ title, url }: { title: string; url: string }) => {
    const { data, isLoading } = useQuery(`users/carousel/${url}`);
  

    const MemorizedData = React.useMemo(() => {
        return data;
    }, [data]) as MostViewed;

    return (
        <section aria-label={title} className="view-carousel">
            <Card className="border-none bg-background">
                <CardContent className='md:px-0'>
                    <Carousel className="min-w-full">
                        <div className="flex justify-between">
                            <h2 className="text-xl md:text-xl font-bold">{title}</h2>
                            <div className="relative">
                                <CarouselPrevious
                                    aria-label="Previous"
                                    className="relative -left-4" />
                                <CarouselNext
                                    aria-label="Next"
                                    className="relative left-0" />
                            </div>
                        </div>
                        <CarouselContent className="-ml-1 gap-2 sm:gap-3 md:gap-4 mt-8" role="list">
                            {!isLoading ? (
                                MemorizedData?.mogous?.map((mogou) => (
                                    <CarouselItem
                                        key={mogou.id}
                                        className="pl-1 basis-1/2 xs:basis-2/5 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.28%] overflow-hidden cursor-pointer"
                                        role="listitem"
                                    >
                                        <div className="flex flex-col group hover:scale-105 transition-transform duration-200 ease-in-out">
                                            <Link
                                                aria-label={mogou?.title}
                                                to={`/show/${mogou?.slug}`} 
                                                className="relative block"
                                            >
                                                <div className="aspect-[3/4] w-full overflow-hidden rounded-t-md bg-muted">
                                                    <LazyLoadImage 
                                                        src={mogou.cover || "/placeholder.svg"}
                                                        alt={mogou.title} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </div>
                                                <MatureContentTag 
                                                    isMatureContent={mogou.legal_age!} 
                                                    className='absolute top-2 right-2 z-10' 
                                                />
                                            </Link>
                                            <div className="mogou-footer bg-primary min-h-[2rem] sm:min-h-[2.5rem] flex justify-center items-center rounded-b-md px-2 py-1">
                                                <span className="text-xs sm:text-sm text-center font-medium text-white truncate leading-tight">
                                                    {mogou?.title || 'Untitled'}
                                                </span>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <div className="loading-placeholder flex gap-3" role="status">
                                         <Skeleton className="h-[260px] w-[180px] rounded-xl" />
                                         <Skeleton className="h-[260px] w-[180px] rounded-xl" />
                                </div>
                            )}
                        </CarouselContent>
                    </Carousel>
                </CardContent>
            </Card>
        </section>
    );
};

export default ViewCarousel;
