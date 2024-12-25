import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HeroCarouselCard from "../HeroCarouselCard";
import { Skeleton } from "@/components/ui/skeleton";

const CardCarouselSlider = ({ isLoading, collection }) => {
  return (
      <Carousel
      aria-label="Featured Collection"
        plugins={[
          
          Autoplay({
            delay: 1800,
            active: !isLoading,
          }),
        ]}
        className="min-w-full overflow-hidden px-4 md:px-0"
      >
        <CarouselContent
          className="gap-4 -ml-1"
          role="list"
        >
          {!isLoading ? (
            collection?.map((mogou) =>
              mogou?.is_visible !== false ? (
                <HeroCarouselCard key={mogou.id} mogou={mogou} />
              ) : null
            )
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <CarouselItem role="listitem"  
              key={i} aria-label="Loading" aria-describedby="Loading"
              className="pl-1 md:basis-1/2  overflow-hidden cursor-pointer md:w-96">
                <Skeleton
                  key={i} className="h-52 md:h-64  pb-4 overflow-hidden transition-all" />
              </CarouselItem>

            ))
          )}
        </CarouselContent>
      </Carousel>
  );
};

export default CardCarouselSlider;
