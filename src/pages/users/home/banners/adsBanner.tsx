import { Banner } from '@/pages/admin/Settings/Banner/type'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const AdsBanner = ({ banner }: { banner: Banner }) => {
  return (
    <div className="w-full p-4 border border-2">
      <a
        href={banner?.url}
        target="_blank"
        rel="noreferrer"
        className="w-full h-48 md:h-72 lg:h-96 relative">
        <LazyLoadImage

          src={banner.meta ?? banner?.cover_photo_url}
          alt={banner?.name}
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  )
}

export default AdsBanner