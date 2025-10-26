import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { memo, useCallback, useEffect, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { MemorizedIndexerButton } from "./drawer-button";
import { handleChapterSwitch, setCurrentPage, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import MemoizedSettingButton from "./setting-button";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import { SettingActionKey, toggleActionCollectionKeys } from "@/redux/slices/userReadSetting/constants";
import MemoizedSettingOgButton from "./setting-og-button";
import { Link, useNavigate } from "react-router-dom";
import { ReportIssueModal } from "./report-issue-modal";
import { rTitle } from "@/utilities/util";
import { selectAuthUser } from "@/redux/slices/user-global";

const MemoizedTitleSection = memo(({ title, slug }: { title: string, slug: string }) => {
    const navigate = useNavigate();
    return (
        <SheetTitle>
            <div className=" flex items-center gap-4 lg:px-4">
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate(`/show/${slug}`)}
                >
                    <ArrowLeftIcon size={16} />
                </Button>
                <Link
                    to={`/show/${slug}`}
                    className="hover:underline cursor-pointe text-sm lg:text-md">{rTitle(title,30)}</Link>

            </div>
        </SheetTitle>
    );
});

const SheetContentBody = ({ type, children }) => {

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
    const { underDesktop } = useScreenDetector();
    const content = underDesktop ? "content" : "description";

    const navigate = useNavigate();
    const [reportModalOpen, setReportModalOpen] = useState(false);

    const authUser = useUserAppSelector(selectAuthUser);

    useEffect(() => {
        localStorage.setItem("currentDevice", underDesktop ? "mobile" : "desktop");
    }, [underDesktop]);

    const sr = readSetting.serverResponse;

    const allChapters = sr?.all_chapters?.map((chapter) => ({
        label: `Chapter ${chapter.chapter_number}`, // Using template literals
        value: chapter.chapter_number
    })) || [];


    const handleSetPage = useCallback(
        (action: "prefer" | "increase" | "decrease", value?: number) => {
            dispatch(setCurrentPage({ action, index: value, navigate }));
        },
        [dispatch, navigate]
    );

    const handleTogglePanel = useCallback(() => {
        dispatch(toggleValue("showPanel"));
    }, [dispatch]);

    const handlePreferPage = useCallback((value) => {
        handleSetPage("prefer", value);
    }, [handleSetPage]);

    const handleSettingModal = useCallback(() => {
        dispatch(toggleValue("modalBox"));
    }, [dispatch]);

    const handleReportModal = useCallback(() => {
        setReportModalOpen(true);
    }, []);

    const handleNextChapter = useCallback(() => {
        handleChapterSwitch("next", navigate);
    }
        , [navigate]);

    const handlePrevChapter = useCallback(() => {
        handleChapterSwitch("prev", navigate);
    }, [navigate]);

    const handlePrefersChapter = useCallback((chapter_number: number) => {
        // find the chapter with the chapter_number
        const chapter = sr?.all_chapters?.find(chapter => chapter.chapter_number === chapter_number);
        const url = `/read/mogou/${sr?.mogou?.slug}/chapters/${chapter.slug}`;
        navigate(url);
    }
        , [sr?.all_chapters, sr?.mogou?.slug, navigate]);


    const handleNextPage = useCallback(() => {
        handleSetPage("increase");

    }, [handleSetPage]);

    const handlePrevPage = useCallback(() => {
        console.log(readSetting)
        handleSetPage("decrease");
    }, [handleSetPage, readSetting]);


    const containerStyle = `${readSetting.showPanel ? "w-1/5 md:w-2/6 xl:w-1/5 px-2" : "w-0 "} bg-sec-background h-screen fixed top-0 right-0 md:z-[90]`;



    return (
        <div className={containerStyle}>
            <Sheet
                onOpenChange={handleTogglePanel}
                open={readSetting.showPanel}>

                <SheetContentBody type={content}>
                    <SheetHeader className=" pt-8">
                        <MemoizedTitleSection title={sr?.mogou?.title} slug={sr?.mogou?.slug}  />
                    </SheetHeader>
                    <SheetDescription>
                        {/* Page Indexer */}
                        <div className="flex flex-col gap-4 lg:px-4 text-white pt-6">
                            <MemorizedIndexerButton
                                label="Chapters"
                                selectOptions={allChapters}
                                current={
                                    sr?.current_chapter?.chapter_number
                                }
                                total={sr?.all_chapters?.length || 0}
                                setSelectState={handlePrefersChapter}
                                setPrevState={handlePrevChapter}
                                setNextState={handleNextChapter}
                            />

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

                        <div className="flex flex-col gap-4 lg:px-4 text-white pt-4">
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
                             <MemoizedSettingOgButton
                                onClick={handleReportModal}
                                label={"Report Issue"}
                                iconName={"ShieldAlert"}
                                forceDisabled={!authUser}
                            />
                        </div>
                    </SheetDescription>
                </SheetContentBody>
            </Sheet>

            <ReportIssueModal
                open={reportModalOpen}
                onOpenChange={setReportModalOpen}
                currentUrl={window.location.href}
            />
        </div>
    );
};


export default DetailDrawer;
