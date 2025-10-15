import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { TablePagination } from "@/components/TablePagination";
import { useNavigate } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import ContentTableRow from "@/components/ui/custom/ContentTableRow";
import { MogousType } from "./type";
import { adminRouteCollection } from "@/routes/data/admin_route";
import ComicCard from "./ComicCard";
import ComicFilter from "./ComicFilter";
import { Button } from "@/components/ui/button";
import NoDataFound from "@/components/ui/no-data-found";
import useFilterState from "@/hooks/useFilterState";
import { PublishDialog } from "./PublishDialog";

const initlalFilterState = {
  search: "",
  page: 1,
  limit: 10,
  mogou_type: "",
  finish_status: "",
  chapters_count_order: "",
}

export type PublishDataType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  mogou_slug: string | null | undefined;
  sub_mogou_slug: string | null;
}

const ComicTable = () => {
  
  const navigate = useNavigate();

  const { bunUrl, handleChange : handleFilter,getByKey } = useFilterState(initlalFilterState,['page']);

  const { data, isLoading, isFetching } = useQuery(
    `admin/mogous?${bunUrl}&mogou_total_count=true`
  );

  return (
    <Card className="min-h-full shadow-none">
      <CardHeader className="flex flex-col items-start justify-between gap-4 min-h-[10vh] px-4 xl:px-6">
        <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <ComicFilter
            handleFilter={handleFilter}
            getByKey={getByKey}
            data={data}
          />
          
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 items-stretch xl:items-center">
            <div className="order-2 xl:order-1">{data && data.mogous.data.length > 0 && (
              <TablePagination
                url={data.mogous.path}
                lastPage={data.mogous.last_page}
                currentPage={getByKey("page")}
                setCurrentPage={(page: number) => handleFilter("page", page)}
                isFetching={isFetching}
                paging={false}
              />
            )}</div>
            <Button
              size="sm"
              className="h-10 xl:h-8 w-full xl:w-24 gap-1 order-1 xl:order-2"
              onClick={() => navigate(adminRouteCollection.mogouAction)}
            >
              <span className="whitespace-nowrap">Add Comic</span>
            </Button>
          </div>
        </div>

      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-scroll pt-4 px-4 xl:px-6">
        <div>
          {isLoading ? (
            <ContentTableRow />
          ) : data?.mogous?.data?.length === 0 ? (
            <NoDataFound />
          ) : (
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 2xl:gap-x-8 2xl:gap-y-12">
            { data.mogous.data.map((mogou: MogousType) => (
                <ComicCard key={mogou.id} mogous={mogou}  />
              ))}
            </div>
          )}
        </div>

        <PublishDialog  />
      </CardContent>
    </Card>
  );
};

export default ComicTable;
