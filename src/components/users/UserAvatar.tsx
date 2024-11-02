import React from 'react';
import { SubscribedUser } from '@/pages/admin/Users/types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

type UserAvatarProps = {
    shape?: "circle" | "rounded" | "square";
    size?: "sm" | "md" | "lg";
    user?: SubscribedUser;
};

// Utility function for classes based on shape and size
const getAvatarClasses = (shape = "circle", size = "md") => {
    const shapes = { circle: "rounded-full", rounded: "rounded-lg", square: "rounded-none" };
    const sizes = { sm: "w-16 h-16", md: "w-24 h-24", lg: "w-32 h-32" };
    return `${shapes[shape]} ${sizes[size]}`;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ shape = "circle", size = "md", user }) => (
    <div 
        className={`flex items-center justify-center cursor-pointer ${getAvatarClasses(shape, size)} hover:outline hover:outline-4 hover:outline-neon-primary`}
        style={{ backgroundColor: user?.background_color }}
    >
        <Avatar className="flex items-center justify-center w-full h-full">
            {user?.avatar_url ? (
                <AvatarImage 
                    src={user.avatar_url} 
                    alt={user?.name || "User avatar"}
                    className="object-contain w-full h-full"
                />
            ) : (
                <AvatarFallback className="text-xl font-semibold">
                    {user?.name?.charAt(0) || "?"}
                </AvatarFallback>
            )}
        </Avatar>
    </div>
);

export default UserAvatar;
