import { Bookmark, BookmarkCheck } from 'lucide-react';
import React from 'react'
import { Button } from './button';


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

interface BookMarkProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    isBookMarked: boolean;
    variant?: keyof typeof contentVariants;
    isDisabled?: boolean;
}



const BookMark = ({
    isBookMarked = false, className = '', variant = "default", isDisabled = false
}: BookMarkProps) => {

    const [isMarked, setIsMarked] = React.useState(isBookMarked);
    
    const icon = isMarked ? <BookmarkCheck /> : <Bookmark />
    const context = isMarked ? "Bookmarked" : "Bookmark" ;
    const handleClick = () => {
        setIsMarked(!isMarked);
    }

    const markedColor = isMarked ? 'bg-primary' : contentVariants[variant].color;

    return (
        <Button 
        onClick={handleClick}
        disabled={isDisabled}
        className={`${className} ${markedColor} ${contentVariants[variant].text} ${className} flex items-center gap-1 transition-all`}>
            {icon} 
            <span className='hidden md:inline'>
            {context}
            </span>
        </Button>
    )
}

export default BookMark