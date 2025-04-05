import FilterComponent from "./filter"
import useFilterState from "@/hooks/useFilterState";
import useQuery from "@/hooks/useQuery";
import { isSubscriptionValid } from "@/utilities/util";
import MogouCard from "../home/RecentlyUploadedCard";
import { useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser, selectSafeContent } from "@/redux/slices/user-global";
import { useEffect, useState } from "react";
import { TablePagination } from "@/components/TablePagination";
import { useScreenDetector } from "@/hooks/useScreenDetector";


const initlalFilterState = {
    search: "",
    page: 1,
    limit: 12,
    type: "",
    finish_status: "",
    chapters_count_order: "",
    genres: "",
    order_by: "",
    legal_only: false
}


export default function Page() {
    const [showFilter, setShowFilter] = useState(false); // 👈 NEW
    const isSafeMode = useUserAppSelector(selectSafeContent);
    const { bunUrl, handleChange: handleFilter, getByKey } = useFilterState(initlalFilterState, ['page']);
    const authUser = useUserAppSelector(selectAuthUser);
    const { isMobile } = useScreenDetector();
  
    useEffect(() => {
      isSafeMode ? handleFilter('legal_only', true) : handleFilter('legal_only', false);
    }, [isSafeMode]);
  
    const { data, isLoading, isFetching } = useQuery(`/users/filter?${bunUrl}`);
  
    if (isLoading) return <div></div>;
  
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="container mx-auto px-4 py-6">
  
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Filter</h1>
            {isMobile && (
              <button
                className=""
                onClick={() => isMobile && setShowFilter(prev => !prev)} 
              >
                {showFilter ? "Hide Filters" : "Show Filters"} <span className="text-gray-400">{showFilter ? "▲" : "▼"}</span>
              </button>
            )}
            <span
              className="text-gray-400 cursor-pointer md:cursor-default"
            // 👈 TOGGLE ON MOBILE
            >
              {data?.mogous?.total} Results
            </span>
          </div>
  
          <div className="grid grid-cols-12">
            {/* Filter Section (toggle on mobile) */}
            {(!isMobile || showFilter) && ( // 👈 CONDITIONALLY RENDER
              <div className="col-span-12 w-full">
                <FilterComponent
                  handleFilter={handleFilter}
                  getByKey={getByKey}
                  isMobile={isMobile}
                />
              </div>
            )}
  
            {/* Pagination (desktop only) */}
    
          </div>
  
          {/* Manga Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.mogous?.data.map((mogou) => (
              <MogouCard
                key={mogou.id}
                mogou={mogou}
                userCanReadAll={isSubscriptionValid(authUser?.subscription_end_date)}
              />
            ))}
          </div>
          {!isMobile && (
              <div className="col-span-1 mt-8">
                <div className="flex">
                  {data?.mogous?.data.length > 0 && (
                    <TablePagination
                      url={data?.mogous.path}
                      lastPage={data?.mogous.last_page}
                      currentPage={getByKey("page")}
                      setCurrentPage={(page) => handleFilter("page", page)}
                      isFetching={isFetching}
                      paging={false}
                      hideLabel={true}
                    />
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }