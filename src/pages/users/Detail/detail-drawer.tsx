import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { memo, useCallback } from "react";
import { ArrowRightIcon,StickyNote, Layers2,Palette , BookOpen,PanelLeftOpen, PanelRightOpen, SendToBack, ImageMinus, RotateCwSquare, GalleryThumbnails, Rainbow, EyeOff,Scroll, Minus, LucideSettings } from "lucide-react";

import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";

import { MemorizedIndexerButton } from "./drawer-button";
import { setCurrentPage, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import MemoizedSettingButton from "./setting-button";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import { SettingActionKey, toggleActionCollectionKeys } from "@/redux/slices/userReadSetting/constants";
import MemoizedSettingOgButton from "./setting-og-button";

export const iconMap = {
    Layers2,
    PanelLeftOpen,
    PanelRightOpen,
    SendToBack,
    ImageMinus,
    RotateCwSquare,
    GalleryThumbnails,
    Rainbow,
    EyeOff,
    Minus,
    LucideSettings,
    Scroll,
    StickyNote,
    BookOpen ,
    Palette
};


const MemoizedTitleSection = memo(({ onTogglePanel }: { onTogglePanel: () => void }) => {
    return (
        <SheetTitle>
            <div className="h3 flex justify-between px-4">
                <h3>Title</h3>
                <Button
                    variant="default"
                    size="sm"
                    onClick={onTogglePanel}
                >
                    <ArrowRightIcon size={16} />
                </Button>
            </div>
        </SheetTitle>
    );
});

const SheetContentBody = ({type, children}) => {

    return (
        <>
            {type === "content" ? <SheetContent
            className="z-[150]"
            >{children}</SheetContent> : <SheetDescription
            className="z-[150]"
            >{children}</SheetDescription>}
        </>
    );
}


const DetailDrawer = () => {
    const dispatch = useUserAppDispatch();
    const readSetting = useUserAppSelector(selectUserReadSetting);
    const { isMobile } = useScreenDetector();
    const content = isMobile ? "content" : "description";

    isMobile ? localStorage.setItem("currentDevice","mobile") : localStorage.setItem("currentDevice","desktop");

    const handleSetPage = useCallback(
        (action: "prefer" | "increase" | "decrease", value?: number) => {
            dispatch(setCurrentPage({ action, index: value }));
        },
        [dispatch]
    );

    const handleTogglePanel = useCallback(() => {
        dispatch(toggleValue("showPanel"));
    }, [dispatch]);

    const handlePreferPage = useCallback((value) => {
        handleSetPage("prefer", value);
    }, [handleSetPage]);

    const handleNextPage = useCallback(() => {
        handleSetPage("increase");
    }, [handleSetPage]);

    const handlePrevPage = useCallback(() => {
        handleSetPage("decrease");
    }, [handleSetPage]);

    const handleSettingModal = useCallback(() => {
        dispatch(toggleValue("modalBox"));
    }, [dispatch]);


    const containerStyle = `${readSetting.showPanel ? "w-1/5" : "w-0"} bg-background h-screen fixed top-0 right-0 md:z-[90]`;

    return (
        <div className={containerStyle}>
            <Sheet
                onOpenChange={handleTogglePanel}
                open={readSetting.showPanel}>

                <SheetContentBody type={content}>
                    <SheetHeader className="px-4 py-6">
                        <MemoizedTitleSection onTogglePanel={handleTogglePanel} />
                    </SheetHeader>
                    <SheetDescription>
                        {/* Page Indexer */}
                        <div className="flex flex-col gap-4 px-4 text-white pt-4">
                            <MemorizedIndexerButton
                                label="Pages"
                                current={readSetting.currentPage}
                                total={readSetting.totalPages}
                                setSelectState={handlePreferPage}
                                setPrevState={handlePrevPage}
                                setNextState={handleNextPage}
                            />
                        </div>
                        <Separator className="w-full h-1 bg-primary mt-8" />

                        <div className="flex flex-col gap-4 px-4 text-white pt-4">
                            <MemoizedSettingButton
                                settingActionKey={toggleActionCollectionKeys.headerVisible as SettingActionKey}
                            />
                            <MemoizedSettingButton
                                settingActionKey={toggleActionCollectionKeys.readingStyle as SettingActionKey}
                            />
                            <MemoizedSettingButton
                                settingActionKey={toggleActionCollectionKeys.readingDirection as SettingActionKey}
                            />
                            <MemoizedSettingButton
                                settingActionKey={toggleActionCollectionKeys.imageFit as SettingActionKey}
                            />
                            <MemoizedSettingButton
                                settingActionKey={toggleActionCollectionKeys.progressBar as SettingActionKey}
                            />
                            <MemoizedSettingOgButton
                                onClick={handleSettingModal}
                                label={"Advanced Setting"}
                                iconName={"LucideSettings"}

                            />
                        </div>
                    </SheetDescription>
                </SheetContentBody>
            </Sheet>
        </div>
    );
};


export default DetailDrawer;
