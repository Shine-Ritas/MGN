import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ReportFilterProps = {
  getByKey: (key: string) => any;
  handleFilter: (key: string, value: any) => void;
  total?: number;
};


type ReportStatus = {
  id: number;
  value: string;
};

const reportStatus: ReportStatus[] = [
  { id: 0, value: "All" },
  { id: 1, value: "Open" },
  { id: 2, value: "Resolved" },
  { id: 3, value: "In Progress" },
];


export default function ReportFilter({ getByKey, handleFilter, total }: ReportFilterProps) {
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (getByKey("search")) {
      searchInput.current!.value = getByKey("search");
    }
  }, [getByKey]);

  const handleReportFilter = (e) => {
    if (e.key === "Enter") {
      handleFilter("search", e.currentTarget.value)
      return;
    }
    debounce(handleFilter("search", e.currentTarget.value), 1000)
  }

  const onActiveFilterChange = (value: string) => {
    const fValue =  (value =="All") ? "" : value;
    handleFilter("status", fValue);
  };

  return (
    <div className="w-full justify-end flex gap-3">

      <div className="relative">
        <Select onValueChange={onActiveFilterChange} defaultValue={getByKey("status")}>
          <SelectTrigger className="gap-3">
            <SelectValue placeholder="Filter User Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select </SelectLabel>
              {reportStatus.map((type) => (
                <SelectItem value={String(type.value)} key={type.id}>
                  {type.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={searchInput}
          onKeyUp={(e) => handleReportFilter(e)}
          type="text"
          placeholder="Search User ..."
          className="pl-8 lg:w-[200px]"
        />
      </div>

      <Button variant="outline" className="bg-background font-semibold text-xs text-muted-foreground w-fit">
        Total : {total ?? 0} results
      </Button>
    </div>
  );
}
