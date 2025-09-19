import { MogouChapter } from "@/pages/admin/Comics/type";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/slices/user-global";
import { handleRead } from "@/utilities/read-helper";
import { isSubscriptionValid } from "@/utilities/util";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const useReadChapter = () => {
    const dispatch = useUserAppDispatch();
    const authUser = useUserAppSelector(selectAuthUser);
    const navigate = useNavigate();
    const [userCanReadAll, setUserCanReadAll] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.subscription_end_date && isSubscriptionValid(authUser?.subscription_end_date)) {
            setUserCanReadAll(true);
        }
        else {
            setUserCanReadAll(false);
        }
    }
        , [authUser])
    
    const readTheChapter = (chapter : MogouChapter,mogous : any)=>{
        handleRead(dispatch,userCanReadAll,navigate,chapter,mogous.mogou.slug)
    }


    return { readTheChapter, userCanReadAll }
}

export default useReadChapter;