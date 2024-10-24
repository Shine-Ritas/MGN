import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { TablePagination } from "@/components/TablePagination";
import { useNavigate } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import ContentTableRow from "@/components/ui/custom/ContentTableRow";
import { MogousType } from "./type";
import { adminRouteCollection } from "@/constants/constants";
import { PlusCircle } from "lucide-react";

import ComicCard from "./ComicCard";
import ComicFilter from "./ComicFilter";
import { Button } from "@/components/ui/button";
import useQueryParams from "@/hooks/userQueryParams";
import NoDataFound from "@/components/ui/no-data-found";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

const ComicTable = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useSearchParamsState("page", 1);
  const [search, setSearch] = useSearchParamsState('search');
  const [limit] = useSearchParamsState('limit',10);
  const [types, setTypes] = useSearchParamsState<string>('mogou_type',"");
  const [status, setStatus] = useSearchParamsState<string>('finish_status',"");

  const queryParams = useQueryParams({
    page: currentPage,
    search,
    limit, 
    mogou_type: types,
    finish_status: status,
  });

  const { data, isLoading, isFetching } = useQuery(
    `admin/mogous?${queryParams}&mogou_total_count=true`
  );

  const handleComicTypeChange = (selectedTypes: string) => {
    setTypes(selectedTypes);
  };

  const handleComicProgressChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
  };

  return (
    <Card className="min-h-full shadow-none">
      <CardHeader className="flex flex-col-reverse lg:flex-row justify-between gap-4 h-[10vh]">
        <ComicFilter
          setSearch={setSearch}
          selectedTypes={types}
          selectedProgress={status}
          onTypeChange={handleComicTypeChange}
          onProgressChange={handleComicProgressChange}
          data={data}
        />

        <div className="flex gap-4 items-center">
          <div className="flex ">{data && data.mogous.data.length > 0 && (
            <TablePagination
              url={data.mogous.path}
              lastPage={data.mogous.last_page}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isFetching={isFetching}
              paging={false}
            />
          )}</div>
          <Button
            size="sm"
            className="h-8 lg:w-24 gap-1"
            onClick={() => navigate(adminRouteCollection.mogouAction)}
          >

            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add</span>
          </Button>
        </div>

      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-scroll pt-4">
        <div className=" 
         ">
          {isLoading ? (
            <ContentTableRow />
          ) : data?.mogous?.data?.length === 0 ? (
            <NoDataFound />
          ) : (
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 ">
            { data.mogous.data.map((mogou: MogousType) => (
                <ComicCard key={mogou.id} mogous={mogou} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className=" flex items-center justify-center">

      </CardFooter>
    </Card>
  );
};

export default ComicTable;
