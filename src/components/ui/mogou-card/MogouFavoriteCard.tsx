import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';


const MogouFavoriteCard = ({
    mogou
}) => {
    return (
        <Link 
        to={`/show/${mogou?.slug}`}
        key={mogou.id} className=' overflow-hidden cursor-pointer '>
        <div className='flex flex-col'> 
            <div className="img">
                <LazyLoadImage src={mogou?.cover} alt="hero" className="w-full object-cover h-52 xl:min-h-56 " />
            </div>
            <div className="mogou-footer bg-primary h-8 flex justify-center  items-center rounded-b-sm">
                <h1 className="ps-2 md:ps-0 text-xs md:text-sm text-center font-semibold text-white truncate">{mogou?.title}</h1>
            </div>
        </div>

        </Link>
    )
}

export default MogouFavoriteCard