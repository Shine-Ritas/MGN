import {
  Carousel,
  CarouselContent
} from "@/components/ui/carousel"
import useQuery from "@/hooks/useQuery";
import { useMemo } from "react";
import { Mogous } from "./types";
import HeroCarouselCard from "./HeroCarouselCard";
import Autoplay from "embla-carousel-autoplay"

const HeroCarousel = () => {

  const { data, isLoading }  = useQuery(`users/carousel`);
  
  // memoize the data 
  const memoData = useMemo(() => {
    console.log("memorized the carousel data")
    return data;
  }, [data]) as Mogous;

  return (
    <Carousel
    plugins={[
      Autoplay({
        delay: 1800,
      }),
    ]}
    className="min-w-full ">

      <CarouselContent className="-ml-1 gap-4">
        {!isLoading && memoData?.mogous.map((mogou) => (
          <HeroCarouselCard key={mogou.id} mogou={mogou} />
        ))}
      </CarouselContent>

    </Carousel>
  )
}

export default HeroCarousel