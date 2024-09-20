import { Button } from "@/components/ui/button";
import {
     Sheet,
     SheetDescription,
     SheetHeader,
     SheetTitle,
} from "@/components/ui/sheet"
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import {

     selectUserReadSetting,
     toggleHeaderVisible,
     toggleReadingDirection,
     toggleReadPageStyle,
   } from "@/redux/slices/user-read-setting";
import { Layers2, PanelLeftOpen, PanelRightOpen, SendToBack } from "lucide-react";
import {memo, useCallback} from "react";

const iconMap  : Record<string, any>= {
     Layers2: Layers2,
     PanelLeftOpen: PanelLeftOpen,
     PanelRightOpen: PanelRightOpen,
     SendToBack: SendToBack,
};


// Memoized button component
const MemoizedSettingButton = memo(
     ({ onClick, label, iconName }: { onClick: () => void; label: string; iconName: string }) => {
          const IconComponent = iconMap[iconName] 
          return (
               <Button onClick={onClick} variant="outline" size="sm" className="w-full flex justify-between items-center py-6 px-4 text-sm bg-secondary">
                    <span>{label}</span>
                    <span>{IconComponent ? <IconComponent size={16} /> : null}</span>
               </Button>
          );
     }
);

const DetailDrawer = () => {
     const dispatch = useUserAppDispatch();

    
     const readSetting = useUserAppSelector(selectUserReadSetting);


     const containerWidth = readSetting.showPanel ? "w-1/4" : "w-0";
     const containerStyle = `${containerWidth} bg-background h-screen fixed top-0 right-0 z-50`;

     // Memoize event handlers
     const handleToggleHeaderVisible = useCallback(() => dispatch(toggleHeaderVisible()), [dispatch]);
     const handleToggleReadPageStyle = useCallback(() => dispatch(toggleReadPageStyle()), [dispatch]);
     const handleToggleReadingDirection = useCallback(() => dispatch(toggleReadingDirection()), [dispatch]);

     return (
          <div className={containerStyle}>
               <Sheet>
                    <SheetHeader className="px-4 py-6">
                         <SheetTitle>
                              <div className="h3 flex justify-between px-4">
                                   <h3>Title</h3>
                                   <div>Go back</div>
                              </div>
                         </SheetTitle>
                         <SheetDescription>
                              <div className="flex flex-col gap-4 px-4 text-white">
                                   <MemoizedSettingButton
                                        onClick={handleToggleHeaderVisible}
                                        label={readSetting.headerVisible.label}
                                        iconName={readSetting.headerVisible.iconName || ""}
                                   />
                                   <MemoizedSettingButton
                                        onClick={handleToggleReadPageStyle}
                                        label={readSetting.readingStyle.label}
                                        iconName={readSetting.readingStyle.iconName || ""}
                                   />
                                   <MemoizedSettingButton
                                        onClick={handleToggleReadingDirection}
                                        label={readSetting.readingDirection.label}
                                        iconName={readSetting.readingDirection.iconName || ""}
                                   />
                              </div>
                         </SheetDescription>
                    </SheetHeader>
               </Sheet>
          </div>
     );
};

export default DetailDrawer