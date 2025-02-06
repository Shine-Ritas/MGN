import { iconMap } from "@/pages/users/Detail/detail-drawer";
import { memo } from "react";


export const IconComponent = memo(({ iconName }: { iconName: keyof typeof iconMap }) => {
    const IconComponent = iconMap[iconName];
    return <IconComponent size={16} />;
});