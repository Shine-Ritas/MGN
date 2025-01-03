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
                            <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
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
                                        className="pl-1 basis-1/3 md:basis-1/4 lg:basis-[12.666667%] overflow-hidden cursor-pointer"
                                        role="listitem"
                                    >
                                        <div className="flex flex-col">
                                            <div className="img">
                                                <img
                                                    src={mogou?.cover}
                                                    alt={mogou?.title || 'Image'}
                                                    className="w-full h-40 md:h-72 object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="mogou-footer bg-primary h-12 flex justify-center items-center rounded-b-sm">
                                                <span className="ps-2 md:ps-0 text-xs md:text-sm text-center font-semibold text-white truncate">
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
