import React from "react"


const contentVariants = {
    default: {
        color: 'bg-primary',
        text: 'text-white'
    },
    destructive: {
        color: 'bg-red-500',
        text: 'text-white'
    },
}

interface MuatureContentTagProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    isMatureContent: boolean;
    variant?: keyof typeof contentVariants;
    content?: string;
}

export const MatureContentTag = (
    { isMatureContent = false, className = '', variant = "destructive",content="18+" }: MuatureContentTagProps
) => {

    if (isMatureContent == false) return null;

    return (
        <div className={`${className} ${contentVariants[variant].color} ${contentVariants[variant].text} ${className} rounded-full px-2 py-1 text-xs`}>
            {content}
        </div>
    )


}
