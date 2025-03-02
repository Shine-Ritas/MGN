import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ComicProgress, ComicType } from "@/data/data";
import { total_chapter_filters } from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MultiSelectHandler from "@/components/ui/multi-select-handler";
import { whereIn } from "@/utilities/util";

type ComicFilterProps = {
  handleFilter: any
  getByKey: any
  data: any;
};

export default function ComicFilter({
  handleFilter,
  getByKey,
  data,
}: ComicFilterProps) {

  const searchInput = useRef<HTMLInputElement>(null);
  // Handle Search with debounce
  const handleSearch = () => {
    const timeout = setTimeout(() => {
      handleFilter("search", searchInput.current?.value ?? "");
    }, 500);
    return () => clearTimeout(timeout);
  };

  return (
    <div className="grid lg:grid-cols-6 gap-4 items-center lg:justify-end">


      <MultiSelectHandler
        selectedOptions={whereIn(ComicType, getByKey('mogou_type').split(","), 'title')}
        options={ComicType}
        placeHolder="Select Type"
        onChange={
          (value) => handleFilter("mogou_type", value)
        }
        labelExtractor={(option) => option.title} />

      <MultiSelectHandler
        selectedOptions={whereIn(ComicProgress, getByKey('finish_status').split(","), 'title')}
        options={ComicProgress}
        placeHolder="Select Finish Status"
        onChange={
          (value) => handleFilter("finish_status", value)
        }
        labelExtractor={(option) => option.title} />

      <Select onValueChange={(value) => handleFilter("chapters_count_order", value)}
        defaultValue={""}
      >
        <SelectTrigger aria-label="Order by chapters" defaultValue={""}>
          <SelectValue placeholder="Order by chapters" />
        </SelectTrigger>
        <SelectContent>
          {
            total_chapter_filters.map((item) => (
              <SelectItem key={item.value} value={`${item.value}`}>
                {item.label}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={searchInput}
          onKeyDownCapture={handleSearch}
          type="text"
          placeholder="Search..."
          className="pl-8 "
        />
      </div>

      <Button variant="outline" className="bg-background font-semibold">
        Total : {data?.mogous?.total ?? 0} results
      </Button>
    </div>
  );
}
