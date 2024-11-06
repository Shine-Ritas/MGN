import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';


const MogouFavoriteCard = ({
    mogou
}) => {
    return (
        <Link 
        to={`/show/${mogou?.slug}`}
        key={mogou.id} className='pl-1 basis-1/3 md:basis-1/4 lg:basis-[5.666667%] overflow-hidden cursor-pointer '>
        <div className='flex flex-col'> 
            <div className="img">
                <LazyLoadImage src={mogou?.cover} alt="hero" className="w-full h-40 md:h-60 object-cover" />
            </div>
            <div className="mogou-footer bg-primary h-8 flex justify-center  items-center rounded-b-sm">
                <h1 className="ps-2 md:ps-0 text-xs md:text-sm text-center font-semibold text-white truncate">{mogou?.title}</h1>
            </div>
        </div>

        </Link>
    )
}

export default MogouFavoriteCard