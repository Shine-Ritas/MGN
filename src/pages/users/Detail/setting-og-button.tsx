import { Button } from "@/components/ui/button";
import { memo, useCallback, useState } from "react";
import { iconMap } from "./detail-drawer";


type SettingButtonProps = {
    onClick: () => void;
    label: string;
    iconName: string;
};

const SettingButton = ({ onClick, label, iconName }: SettingButtonProps) => {
        const [isDisabled, setIsDisabled] = useState(false);
        const IconComponent = iconMap[iconName];

        const handleClick = useCallback(() => {
            setIsDisabled(true);
            onClick();
            setTimeout(() => setIsDisabled(false), 300);
        }, [onClick]);

        return (
            <Button
                onClick={handleClick}
                disabled={isDisabled}
                variant="outline"
                size="sm"
                className="w-full flex justify-between items-center py-6 px-4 text-sm bg-secondary"
            >
                <span>{label}</span>
                {IconComponent && <IconComponent size={16} />}
            </Button>
        );
};


const SameSettingButton = (
    prevProps: SettingButtonProps,
    nextProps: SettingButtonProps
) => {
    return Object.keys(prevProps).every((key) => {
        return (
            prevProps[key as keyof SettingButtonProps] ===
            nextProps[key as keyof SettingButtonProps]
        );
    });
};

// Memoized component
const MemoizedSettingOgButton = memo(SettingButton, SameSettingButton);

export default MemoizedSettingOgButton;