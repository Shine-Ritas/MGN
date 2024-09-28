import { Separator } from "@radix-ui/react-select"
import HeroCarousel from "./HeroCarousel"
import MostViewCarousel from "./MostViewCarousel"
import RecentlyUploaded from "./RecentlyUploaded"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useUserAppSelector } from "@/redux/hooks"
import { selectBanners, selectIsSubscription } from "@/redux/slices/user-global"
import AdsBanner from "./banners/adsBanner"

const HomePage = () => {

  const isSubscribed = useUserAppSelector(selectIsSubscription);
  const banners = useUserAppSelector(selectBanners);

  console.log(banners);
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  },[]);

  return (
    <main className="w-full flex flex-col gap-12 px-4 md:px-24">
      <div className="w-full flex justify-center ">
        <HeroCarousel />
      </div>

      {/* <div className="w-full ">
        <ShareSection />
      </div> */}
      <div className="w-full">
          {
            (banners.length > 0 && banners[0].active == true) && <AdsBanner banner={banners[0]} />
          }
      </div>

      <div className="w-full">
        <MostViewCarousel />
      </div>

      <Separator className="w-full h-1 bg-primary" />

      <div className="w-full">
        <RecentlyUploaded />
      </div>

      <div className="w-full">
        <MostViewCarousel />
      </div>


      <div className="w-full">
          {
            (banners.length > 0 && banners[2].active == true) && <AdsBanner banner={banners[2]} />
          }
      </div>

       {/* go to top */}
        <div className="fixed bottom-4 right-4">
          <Button
          onClick={scrollToTop}
          className="bg-primary text-white rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </Button>
        </div>


    </main>
  )
}

export default HomePage