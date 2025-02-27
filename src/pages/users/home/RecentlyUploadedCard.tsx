import { Button } from '@/components/ui/button'
import { RecentlyUploadedMogou } from './types'
import { MatureContentTag } from '@/components/ui/maturecontenttag'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { rTitle } from '@/utilities/util';

type RecentlyUploadedCardProps = {
    mogou: RecentlyUploadedMogou,
    userCanReadAll: boolean
}

const MogouCard = ({ mogou,userCanReadAll }: RecentlyUploadedCardProps) => {

    const navigate = useNavigate();

    const handleClick = (sub_mogou) => {
        navigate(`/read/mogou/${mogou.slug}/chapters/${sub_mogou.slug}`);
    }


    return (
        <div key={mogou.title} className="bg-slate-800/50 rounded-lg flex border border-slate-700 min-h-48">
            <div className='flex h-full' >
                <Link 
                aria-label={mogou?.title}
                to={`/show/${mogou?.slug}`} className="relative aspect-[2/3] w-1/3">
                    <LazyLoadImage src={mogou.cover || "/placeholder.svg"} 
                                style={{ width: '100%', height: '100%' }}
                                alt={mogou.title} className="object-cover" />
                    <MatureContentTag isMatureContent={mogou.legal_age!} className='absolute top-1 right-0' />
                </Link>
                <div className="pb-4 pt-3 px-4 w-full">
                <div className="text-neon-primary  text-sm w-full">{mogou.mogou_type_name}</div>
                    <h5 className="text-sm font-semibold text-white mb-1">{rTitle(mogou.title,25)}</h5>

                    <div className="flex flex-wrap ">
                        {
                            mogou?.categories?.slice(0, 3).map((category, index) => {
                                return (
                                    <span key={index} className="text-xxs text-white/70 
                                    font-normal
                                    uppercase pe-1 py-0.5">{category.title} </span>
                                );
                            })
                        }
                    </div>

                    <div className="flex flex-col w-full gap-2 mt-2 ">

                        {
                            mogou?.sub_mogous?.map((sub_mogou, index) => {

                                return (
                                    <div className="relative overflow-hidden min-w-full  " key={index}>
                                        {isNewChapter(sub_mogou.created_at)}
                                        <Button 
                                        onClick={() => handleClick(sub_mogou)}
                                        size={'sm'}
                                        disabled={sub_mogou.subscription_only && !userCanReadAll}
                                        className={`flex gap-2 justify-start items-center w-full xl:me-4 
                                        text-xxs
                                        disabled:cursor-not-allowed`}>
                                            {
                                                isSubscriptionNeedChapter(sub_mogou.subscription_only, userCanReadAll)
                                            }
                                            <p className=" text-white">{sub_mogou.title}</p>
                                          
                                        </Button>
                                    </div>
                                );
                            })
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

const isSubscriptionNeedChapter = (subscription_only: boolean, userCanReadAll: boolean) => {
    if (subscription_only && !userCanReadAll) {
        return (
            <Lock className="w-3 h-3 mr-1" />
        );
    }
    return null;
}



function isNewChapter(date: string | number | Date) {
    const isNew = new Date(date) >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  
    if (isNew) {
      return (
        <span className="absolute top-0 right-0 transform translate-x-[20%] translate-y-[40%] rotate-[45deg] bg-red-500 text-white px-4 py-0 text-xxs">
          New
        </span>
      );
    }
    return null;
}


export default MogouCard