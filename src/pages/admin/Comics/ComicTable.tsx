import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { TablePagination } from "@/components/TablePagination";
import { useState } from "react";
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

const ComicTable = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(10);
  const [types, setTypes] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const queryParams = useQueryParams({
    page: currentPage,
    search,
    limit,
    mogou_type: types,
    finish_status: status,
  });

  const { data, isLoading, isFetching } = useQuery(
    `admin/mogous?${queryParams}`
  );

  const handleComicTypeChange = (selectedTypes: string) => {
    setTypes(selectedTypes);
  };

  const handleComicProgressChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
  };

  return (
    <Card className="  shadow-none">
      <CardHeader className="flex flex-row justify-between">
        <ComicFilter
          setSearch={setSearch}
          selectedTypes={types}
          selectedProgress={status}
          onTypeChange={handleComicTypeChange}
          onProgressChange={handleComicProgressChange}
        />

        <Button
          size="sm"
          className="h-8 w-24 gap-1"
          onClick={() => navigate(adminRouteCollection.mogouAction)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add</span>
        </Button>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 max-h-[60vh] overflow-y-scroll">
          {isLoading ? (
            <ContentTableRow />
          ) : data?.mogous?.data?.length === 0 ? (
            <ContentTableRow content="No data Found" />
          ) : (
            data.mogous.data.map((mogou: MogousType) => (
              <ComicCard key={mogou.id} mogous={mogou} />
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className=" flex items-center justify-center">
        {data && data.mogous.data.length > 0 && (
          <TablePagination
            url={data.mogous.path}
            lastPage={data.mogous.last_page}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isFetching={isFetching}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default ComicTable;
