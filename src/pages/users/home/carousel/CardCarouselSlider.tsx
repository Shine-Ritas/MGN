import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HeroCarouselCard from "../HeroCarouselCard";

const CardCarouselSlider = ({ isLoading, collection }) => {
  return (
    <section aria-label="Featured Collection" className="carousel-section">
      <Carousel
        plugins={[
          Autoplay({
            delay: 1800,
          }),
        ]}
        className="min-w-full"
      >
        <CarouselContent
          className="-ml-1 gap-4"
          role="list"
        >
          {!isLoading ? (
            collection?.map((mogou) =>
              mogou?.is_visible !== false ? (
                <HeroCarouselCard key={mogou.id} mogou={mogou} />
              ) : null
            )
          ) : (
            <div role="status" className="loading-placeholder">
              Loading content...
            </div>
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default CardCarouselSlider;
