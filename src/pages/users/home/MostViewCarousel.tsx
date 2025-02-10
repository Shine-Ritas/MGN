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
                        <CarouselContent className="-ml-1 gap-4 mt-8" role="list">
                            {!isLoading ? (
                                MemorizedData?.mogous?.map((mogou) => (
                                    <CarouselItem
                                        key={mogou.id}
                                        className="pl-1 basis-1/3 md:basis-1/4 lg:basis-[12.666667%] overflow-hidden cursor-pointer "
                                        role="listitem relative"
                                    >
                                        <div className="flex flex-col ">
                                            <Link
                                                aria-label={mogou?.title}
                                                to={`/show/${mogou?.slug}`} className="relative aspect-[2/3] h-56">
                                                <LazyLoadImage src={mogou.cover || "/placeholder.svg"}
                                                    style={{ width: '100%', height: '100%' }}
                                                    alt={mogou.title} className="object-cover" />
                                                <MatureContentTag isMatureContent={mogou.legal_age!} className='absolute top-1 right-0' />
                                            </Link>
                                            <div className="mogou-footer bg-primary h-10 flex  justify-center items-center rounded-b-sm ps-2">
                                                <span className=" text-xxs text-center font-semibold text-white truncate">
                                                    {mogou?.title || 'Untitled'}
                                                </span>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <div className="loading-placeholder" role="status">
                                    <p>Loading content...</p>
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
