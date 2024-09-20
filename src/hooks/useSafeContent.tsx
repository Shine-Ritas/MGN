import { useUserAppDispatch, useUserAppSelector } from '@/redux/hooks'
import { selectSafeContent, setSafeContent } from '@/redux/slices/user-global';
import React from 'react'


const useSafeContent = () => {

    const dispatch = useUserAppDispatch();
    const safeContent = useUserAppSelector(selectSafeContent);

    React.useEffect(() => {
        const content = localStorage.getItem('safeContent') == 'false' ? false : true
        setSafeContent(content)
    }, [])


    const toggleSafeContent = () => {
        if (safeContent) {
            localStorage.setItem('safeContent', 'false')
            dispatch(setSafeContent(false))
        } else {
            localStorage.setItem('safeContent', 'true')
            dispatch(setSafeContent(true))
        }
        
    }

    return { safeContent, toggleSafeContent }
}

export default useSafeContent