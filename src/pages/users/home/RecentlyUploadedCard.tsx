import { Button } from '@/components/ui/button'
import { RecentlyUploadedMogou } from './types'
import { MatureContentTag } from '@/components/ui/maturecontenttag'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

type RecentlyUploadedCardProps = {
    mogou: RecentlyUploadedMogou,
    userCanReadAll: boolean
}

const RecentlyUploadedCard = ({ mogou,userCanReadAll }: RecentlyUploadedCardProps) => {


    return (
        <div 
            className='pl-1 overflow-hidden  rounded-lg bg-secondary'>
            <div className='flex h-full' >
                <Link to={`/show/${mogou?.slug}`} className="img w-32 md:w-40 cursor-pointer relative">
                    <LazyLoadImage src={mogou?.cover}
                        className="w-full h-52 md:h-60 object-cover"
                        alt="Image Alt"
                    />
                    <MatureContentTag isMatureContent={mogou.legal_age!} className='absolute top-1 right-0' />
                </Link>
                <div className="bg-secondary/50 h-full flex pt-5 items-start rounded-b-sm w-2/3 flex-col ps-4">
                    <span className="text-xs md:text-sm font-semibold text-neon-primary truncate">{mogou?.mogou_type_name}</span>
                    <span className=" text-xs md:text-sm font-semibold text-white text-wrap">{mogou?.title}</span>

                    <div className="flex flex-col w-full gap-3 mt-4">

                        {
                            mogou?.sub_mogous?.map((sub_mogou, index) => {

                                return (
                                    <div className="relative lg:w-[90%] overflow-hidden  " key={index}>
                                        {isNewChapter(sub_mogou.created_at)}
                                        <Button 
                                        disabled={sub_mogou.subscription_only && !userCanReadAll}
                                        className={`flex gap-2 justify-start items-center w-full me-4 disabled:cursor-not-allowed`}>
                                            {
                                                isSubscriptionNeedChapter(sub_mogou.subscription_only, userCanReadAll)
                                            }
                                            <p className="text-xs xl:text-sm text-white">{sub_mogou.title}</p>
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
        <span className="absolute top-0 right-0 transform translate-x-[20%] translate-y-[40%] rotate-[45deg] bg-red-500 text-white px-4 py-0 text-xs">
          New
        </span>
      );
    }
    return null;
}


export default RecentlyUploadedCard