import useQuery from "@/hooks/useQuery";
import { useMemo } from "react";
import { Mogous } from "./types";

import CardCarouselSlider from "./carousel/CardCarouselSlider";
import { useUserAppSelector } from "@/redux/hooks";
import { selectSafeContent } from "@/redux/slices/user-global";

const HeroCarousel = () => {

  const isSafeMode = useUserAppSelector(selectSafeContent);
  
  const { data, isLoading }  = useQuery(`users/carousel?legal_only=${isSafeMode}`);
  
  // memoize the data 
  const memoData = useMemo(() => {
    return data;
  }, [data]) as Mogous;

  return (
    <CardCarouselSlider isLoading={isLoading} collection={memoData?.mogous} />
  )
}

export default HeroCarousel