import { iconMap } from "@/pages/users/Detail/drawer-icons";
import { memo } from "react";


export const IconComponent = memo(({ iconName }: { iconName: keyof typeof iconMap }) => {
    const IconComponent = iconMap[iconName];
    return <IconComponent size={16} />;
});