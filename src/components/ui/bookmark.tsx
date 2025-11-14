import { Bookmark, BookmarkCheck } from 'lucide-react';
import React from 'react'
import { Button } from './button';
import useMutate from '@/hooks/useMutate';

const contentVariants = {
    default: {
        color: 'bg-secondary',
        text: 'text-white'
    },
    destructive: {
        color: 'bg-red-500',
        text: 'text-white'
    },
}

interface BookMarkProps extends React.ComponentPropsWithoutRef<typeof Button> {
    mogou_id: number;
    user_id?: string;
    isBookMarked: boolean;
    variant?: keyof typeof contentVariants;
    isDisabled?: boolean;
}

const BookMark = React.forwardRef<HTMLButtonElement, BookMarkProps>(({
    isBookMarked = false, className = '', variant = "default", isDisabled = false, mogou_id, user_id = undefined, ...props
}, ref) => {

    const [isMarked, setIsMarked] = React.useState(isBookMarked);

    const onSuccessCallback = () => {
        setIsMarked(!isMarked);
    }

    const [mutate, { isLoading }] = useMutate({ callback: onSuccessCallback, navigateBack: false });

    const icon = isMarked ? <BookmarkCheck /> : <Bookmark />
    const context = isMarked ? "Favorited" : "Favorite";
    const handleClick = async () => {

        const url = isMarked ? 'users/user-favorites/remove' : 'users/user-favorites/add';
        await mutate(url, {
            mogou_id,
            user_id
        });
    }

    const markedColor = isMarked ? 'bg-primary' : contentVariants[variant].color;

    return (
        <Button
            ref={ref}
            onClick={handleClick}
            disabled={isLoading || isDisabled}
            className={`${className} ${markedColor} ${contentVariants[variant].text} ${className} flex items-center gap-1 transition-all`}
            {...props}>
            {icon}
            <span className='hidden md:inline'>
                {context}
            </span>
        </Button>
    )
})

BookMark.displayName = "BookMark"

export default BookMark