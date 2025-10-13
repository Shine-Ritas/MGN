import { Banner } from '@/pages/admin/Settings/Banner/type'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const AdsBanner = ({ banner }: { banner: Banner }) => {
  const isVideoFile = (url: string | null | undefined): boolean => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }

  const mediaUrl = banner.text_url ?? banner?.cover_photo_url;


  return (
    <div className="w-full lg:p-4  flex justify-center md:max-h-60 overflow-hidden ">
      <a
        href={banner?.redirect_url}
        target="_blank"
        rel="noreferrer"
        aria-label={banner?.name}
        className="">
        {isVideoFile(mediaUrl) ? (
          <video
            src={mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <LazyLoadImage
            src={mediaUrl}
            alt={banner?.name}
            className="w-full object-cover"
          />
        )}
      </a>
    </div>
  )
}

export default AdsBanner