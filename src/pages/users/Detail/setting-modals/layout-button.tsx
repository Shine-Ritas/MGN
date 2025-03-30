import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { SettingActionKey } from "@/redux/slices/userReadSetting/constants";
import { selectSettingByKey, setRotation } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { memo, useCallback } from "react";
import { IconComponent } from "@/components/ui/icon-component";
import { cn } from "@/utilities/util";
import { iconMap } from "../drawer-icons";

type LayoutButtonProps = {
    actionKey : SettingActionKey;
    collection : Record<string, any>;
    largeBtn? : boolean;
    showIcon? : boolean;
    styleClass? : string;
}

const LayoutButton = ({actionKey,collection,largeBtn = true,showIcon=true,styleClass=""} : LayoutButtonProps) => {

    const dispatch = useUserAppDispatch();

    const setting = useUserAppSelector((state) =>selectSettingByKey(state, actionKey) );

    const handleClick = useCallback((value)=>{
        dispatch(setRotation({key:actionKey,value}));
    },[dispatch,actionKey]);

    const style = largeBtn ? "flex-col" : "justify-center";

    return Object.entries(collection).map(([key,rs])=>{

        return (
          <div
            key={rs.value}
            onClick={()=>handleClick(key)}
            className={cn(`flex ${style}  items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors text-sm
              ${setting.value === rs.value ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`,styleClass)}
          >
            {(rs.iconName && showIcon) && <IconComponent iconName={rs.iconName as keyof typeof iconMap} />}
            <span>{rs.label}</span>
          </div>
        )
      })
}

export const MemorizedLayoutButton = memo(LayoutButton);