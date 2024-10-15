import {
    Carousel,
    CarouselContent
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import HeroCarouselCard from "../HeroCarouselCard"

const CardCarouselSlider = ({isLoading,collection}) => {
  return (
    <Carousel
    plugins={[
      Autoplay({
        delay: 1800,
      }),
    ]}
    className="min-w-full ">

      <CarouselContent className="-ml-1 gap-4">
        {!isLoading && collection.map((mogou) => (
            (mogou?.is_visible !== false) && <HeroCarouselCard key={mogou.id} mogou={mogou} />
        ))}
      </CarouselContent>

    </Carousel>
  )
}

export default CardCarouselSlider