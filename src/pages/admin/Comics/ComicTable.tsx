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
import { PlusCircle } from "lucide-react";

import ComicCard from "./ComicCard";
import ComicFilter from "./ComicFilter";
import { Button } from "@/components/ui/button";
import NoDataFound from "@/components/ui/no-data-found";
import useFilterState from "@/hooks/useFilterState";
import { PublishDialog } from "./PublishDialog";
import { useState } from "react";

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
  mogou_slug: string | null;
  sub_mogou_slug: string | null;
}

const ComicTable = () => {
  
  const navigate = useNavigate();
  const [publishData, setPublishData] = useState({
    open: false,
    setOpen: (open: boolean) => setPublishData((prev) => ({ ...prev, open })),
    mogou_slug: null,
    sub_mogou_slug: null,

  })

  const { bunUrl, handleChange : handleFilter,getByKey } = useFilterState(initlalFilterState,['page']);

  const { data, isLoading, isFetching } = useQuery(
    `admin/mogous?${bunUrl}&mogou_total_count=true`
  );

  return (
    <Card className="min-h-full shadow-none">
      <CardHeader className="flex flex-col-reverse lg:flex-row  items-start justify-between gap-4 min-h-[10vh]">
        <ComicFilter
          handleFilter={handleFilter}
          getByKey={getByKey}
          data={data}
        />

        <div className="flex gap-4 items-center">
          <div className="flex ">{data && data.mogous.data.length > 0 && (
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
                <ComicCard key={mogou.id} mogous={mogou} publishData={publishData} setPublishData={setPublishData} />
              ))}
            </div>
          )}
        </div>

        <PublishDialog publishData={publishData} />
      </CardContent>
    </Card>
  );
};

export default ComicTable;
