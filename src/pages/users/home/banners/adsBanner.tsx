import { Banner } from '@/pages/admin/Settings/Banner/type'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const AdsBanner = ({ banner }: { banner: Banner }) => {
  return (
    <div className="w-full lg:p-4 border-2 ">
      <a
        href={banner?.redirect_url}
        target="_blank"
        rel="noreferrer"
        aria-label={banner?.name}
        className="max-h-80 md:max-h-40 relative">
        <LazyLoadImage
          src={banner.text_url ?? banner?.cover_photo_url}
          alt={banner?.name}
          className="w-full min-h-32 md:min-h-40 object-cover"
        />
      </a>
    </div>
  )
}

export default AdsBanner