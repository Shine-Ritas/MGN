import { useRef, useState } from "react";
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
import { MultiSelectDropdown } from "@/components/ui/multi-select";

type ComicFilterProps = {
  handler: any
  selectedTypes: string;
  selectedProgress: string;
  onTypeChange: (types: string) => void;
  onProgressChange: (progress: string) => void;
  data: any;
};

export default function ComicFilter({
  handler,
  onTypeChange,
  onProgressChange,
  data,
}: ComicFilterProps) {
  const [selectedComicType, setSelectedComicType] = useState<ComicType[]>([]);
  const [selectedComicProgress, setSelectedComicProgress] =
    useState<ComicProgress[]>([]);
  const searchInput = useRef<HTMLInputElement>(null);


  // Handle Search with debounce
  const handleSearch = () => {
    const timeout = setTimeout(() => {
      handler("search", searchInput.current?.value ?? "");
    }, 500);
    return () => clearTimeout(timeout);
  };

  const handleComicTypeChange = (type: ComicType) => {
    const updatedTypes = selectedComicType.includes(type)
      ? selectedComicType.filter((t) => t !== type)
      : [...selectedComicType, type];
      setSelectedComicType(updatedTypes);
    const typesString = updatedTypes.map((t) => t.title).join(',');

    onTypeChange(typesString);

  };

  const handleComicProgressChange = (progress: ComicProgress) => {
    const updatedProgress = selectedComicProgress.includes(progress)
      ? selectedComicProgress.filter((p) => p !== progress)
      : [...selectedComicProgress, progress];
      setSelectedComicProgress(updatedProgress);

    const progressString = updatedProgress.map((p) => p.title).join(',');
    onProgressChange(progressString); // Update parent state
  };

  return (
    <div className="grid lg:grid-cols-6 gap-4 items-center lg:justify-end">
      
      <MultiSelectDropdown
      options={ComicType}
      selectedOptions={selectedComicType}
      onChange={handleComicTypeChange}
      labelExtractor={(option) => option.title}
      placeholder="Type"
      />
     
      <MultiSelectDropdown
      options={ComicProgress}
      selectedOptions={selectedComicProgress}
      onChange={handleComicProgressChange}
      labelExtractor={(option) => option.title}
      placeholder="Progress"
      />

      <Select onValueChange={(value) => handler("chapters_count_order", value)}
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
