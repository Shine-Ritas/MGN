import useQuery from "@/hooks/useQuery";
import { useMemo } from "react";
import { Mogous } from "./types";

import CardCarouselSlider from "./carousel/CardCarouselSlider";

const HeroCarousel = () => {

  const { data, isLoading }  = useQuery(`users/carousel`);
  
  // memoize the data 
  const memoData = useMemo(() => {
    return data;
  }, [data]) as Mogous;

  return (
    <CardCarouselSlider isLoading={isLoading} collection={memoData?.mogous} />
  )
}

export default HeroCarousel