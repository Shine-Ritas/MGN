import { Button } from "@/components/ui/button";
import { memo, useCallback, useState } from "react";
import { iconMap } from "./drawer-icons";
import { SettingActionKey } from "@/redux/slices/userReadSetting/constants";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectSettingByKey, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";

type SettingButtonProps = {
    settingActionKey : SettingActionKey;
};

const SettingButton = ({ settingActionKey }: SettingButtonProps) => {
        const [isDisabled, setIsDisabled] = useState(false);

        const setting = useUserAppSelector((state) =>selectSettingByKey(state, settingActionKey) );

        const IconComponent = iconMap[setting.iconName];
        const dispatch = useUserAppDispatch();

        const handleClick = useCallback(() => {
            setIsDisabled(true);
            dispatch(toggleValue(settingActionKey));
            setTimeout(() => setIsDisabled(false), 300);
          }, [dispatch, settingActionKey]);

        return (
            <Button
                onClick={handleClick}
                disabled={isDisabled}
                variant="outline"
                size="sm"
                className="w-full flex justify-between items-center py-6 px-4 text-sm bg-secondary"
            >
                <span>{setting.label}</span>
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
const MemoizedSettingButton = memo(SettingButton, SameSettingButton);


export default MemoizedSettingButton;