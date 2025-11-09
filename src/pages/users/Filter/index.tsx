import FilterComponent from "./filter"
import useFilterState from "@/hooks/useFilterState";
import useQuery from "@/hooks/useQuery";
import { isSubscriptionValid } from "@/utilities/util";
import MogouCard from "../home/MogouCard";
import { useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser, selectSafeContent } from "@/redux/slices/user-global";
import { useEffect, useState } from "react";
import { TablePagination } from "@/components/TablePagination";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import AdsBanner from "../home/banners/adsBanner";
import useBanners from "@/hooks/useBanners";


const INITIAL_FILTER_STATE = {
    search: "",
    page: 1,
    limit: 9,
    type: "",
    finish_status: "",
    chapters_count_order: "",
    genres: "",
    order_by: "",
    legal_only: false
};

// Manga Card Loading Skeleton Component
const MogouCardSkeleton = () => (
    <div className="bg-slate-800/50 rounded-lg flex border border-slate-700 md:min-h-52">
        <div className="flex h-full w-full">
            <div className="relative w-7/12 lg:w-5/12">
                <Skeleton className="w-full min-h-52 lg:min-h-48 rounded-l-lg" />
            </div>
            <div className="pb-4 pt-3 px-4 w-full space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
        </div>
    </div>
);

// Filter Toggle Button Component
const FilterToggleButton = ({ showFilter, onClick, isMobile }) => {
    if (!isMobile) return null;
    
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            className="flex items-center gap-2"
        >
            <Filter className="w-4 h-4" />
            {showFilter ? "Hide Filters" : "Show Filters"}
            {showFilter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
    );
};

// Results Count Component
const ResultsCount = ({ total, isLoading }) => (
    <span className="text-muted-foreground text-sm">
        {isLoading ? (
            <Skeleton className="h-4 w-20 inline-block" />
        ) : (
            `${total || 0} Results`
        )}
    </span>
);


const mogouLayouClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6";

// Main Loading Skeleton for entire page
const PageLoadingSkeleton = () => (
    <div className="min-h-screen container px-4 md:px-0 md:contain-none">
        <div className="mx-auto py-6">
            <div className="flex items-center justify-between mb-8">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-20" />
            </div>
            
            <div className="grid grid-cols-12 mb-6">
                <div className="col-span-12 w-full">
                    <Skeleton className="h-32 w-full rounded-lg" />
                </div>
            </div>
            
            <div className={mogouLayouClass}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <MogouCardSkeleton key={index} />
                ))}
            </div>
        </div>
    </div>
);


export default function FilterPage() {
    const [showFilter, setShowFilter] = useState(false);
    
    // Redux selectors
    const isSafeMode = useUserAppSelector(selectSafeContent);
    const authUser = useUserAppSelector(selectAuthUser);
    
    // Custom hooks
    const { bunUrl, handleChange: handleFilter, getByKey } = useFilterState(INITIAL_FILTER_STATE, ['page']);
    const { isMobile } = useScreenDetector();
    const { data, isLoading, isFetching } = useQuery(`/users/filter?${bunUrl}`);
    const adverties = useBanners();

    // Sync safe mode with legal_only filter
    useEffect(() => {
        if (getByKey('legal_only') !== isSafeMode) {
            handleFilter('legal_only', isSafeMode);
        }
    }, [isSafeMode, handleFilter, getByKey]);

    // Derived values
    const userCanReadAll = isSubscriptionValid(authUser?.subscription_end_date);
    const mangaList = data?.mogous?.data || [];
    const hasResults = mangaList.length > 0;

    // Event handlers
    const toggleFilter = () => setShowFilter(prev => !prev);

    // Show loading skeleton for initial load
    if (isLoading) {
        return <PageLoadingSkeleton />;
    }

    return (
        <div className="min-h-screen container px-4 md:px-0 md:mx-0 md:max-w-full">

            <div className="md:mx-auto py-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        {!isMobile && <h1 className="text-3xl font-bold">Browse Manga</h1>}
                        <FilterToggleButton 
                            showFilter={showFilter} 
                            onClick={toggleFilter} 
                            isMobile={isMobile} 
                        />
                    </div>
                    <ResultsCount total={data?.mogous?.total} isLoading={isFetching} />
                </div>

                {/* Filter Section */}
                <div className="grid grid-cols-12 ">
                    {(!isMobile || showFilter) && (
                        <div className="col-span-12 w-full">
                            <FilterComponent
                                handleFilter={handleFilter}
                                getByKey={getByKey}
                                isMobile={isMobile}
                            />
                        </div>
                    )}
                </div>

                {
                        (adverties?.length > 0 && adverties[1].active == true) && <AdsBanner banner={adverties[1]} />
                    }

                {/* Loading State for Manga Grid */}
                {isFetching && !isLoading ? (
                    <div className={mogouLayouClass}>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <MogouCardSkeleton key={`loading-${index}`} />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Manga Grid */}
                        <div className={mogouLayouClass}>
                            {mangaList.map((mogou) => (
                                <MogouCard
                                    key={mogou.id}
                                    mogou={mogou}
                                    userCanReadAll={userCanReadAll}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {!hasResults && !isFetching && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No manga found</h3>
                                <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
                            </div>
                        )}

                        {/* Desktop Pagination */}
                        {!isMobile && hasResults && (
                            <div className="mt-8">
                                <div className="flex justify-center">
                                    <TablePagination
                                        url={data?.mogous?.path}
                                        lastPage={data?.mogous?.last_page}
                                        currentPage={getByKey("page")}
                                        setCurrentPage={(page) => handleFilter("page", page)}
                                        isFetching={isFetching}
                                        paging={false}
                                        hideLabel={true}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="w-full mt-6 md:mt-0">
                    {
                        (adverties?.length > 0 && adverties[2].active == true) && <AdsBanner banner={adverties[2]} />
                    }
                </div>
        </div>
    );
}