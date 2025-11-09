import { useEffect } from "react";
import { useUserAppSelector, useUserAppDispatch } from "@/redux/hooks";
import { selectBanners, setBanners } from "@/redux/slices/user-global";
import useQuery from "./useQuery";

/**
 * Hook that ensures banners are available in Redux store.
 * If banners don't exist, it fetches them from the API and stores them.
 * 
 * @returns The banners array from Redux store
 */
const useBanners = () => {
  const dispatch = useUserAppDispatch();
  const banners = useUserAppSelector(selectBanners);
  
  // Only fetch if banners don't exist or are empty
  const shouldFetch = !banners || banners.length === 0;
  
  // Always call useQuery unconditionally to follow React hooks rules
  const { data: bannersData } = useQuery(
    `users/banners`,
    undefined,
    true,
    !shouldFetch // disable auto fetch if we already have banners
  );

  // Update Redux store when banners are fetched
  useEffect(() => {
    if (bannersData?.banners && shouldFetch) {
      dispatch(setBanners(bannersData.banners));
    }
  }, [bannersData, dispatch, shouldFetch]);

  return banners;
};

export default useBanners;

