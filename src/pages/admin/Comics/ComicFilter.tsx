import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";
import { ComicProgress, ComicType } from "@/data/data";

type ComicFilterProps = {
  setSearch: (search: string) => void;
  selectedTypes: string;
  selectedProgress: string;
  onTypeChange: (types: string) => void;
  onProgressChange: (progress: string) => void;
  data : any;
};

export default function ComicFilter({
  setSearch,
  onTypeChange,
  onProgressChange,
  data,
}: ComicFilterProps) {
  const [comicType, setComicType] = useState<ComicType[]>([]);
  const [comicProgress, setComicProgress] = useState<ComicProgress[]>([]);
  const searchInput = useRef<HTMLInputElement>(null);


  // Handle Search with debounce
  const handleSearch = () => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.current?.value ?? "");
    }, 500);
    return () => clearTimeout(timeout);
  };

  const handleComicTypeChange = (type: ComicType) => {
    const updatedTypes = comicType.includes(type)
      ? comicType.filter((t) => t !== type)
      : [...comicType, type];
    setComicType(updatedTypes);
    const typesString = updatedTypes.map((t) => t.title).join(',');

    onTypeChange(typesString);

  };

  const handleComicProgressChange = (progress: ComicProgress) => {
    const updatedProgress = comicProgress.includes(progress)
      ? comicProgress.filter((p) => p !== progress)
      : [...comicProgress, progress];
    setComicProgress(updatedProgress);

    const progressString = updatedProgress.map((p) => p.title).join(',');
    onProgressChange(progressString); // Update parent state
  };

  return (
    <div className="grid lg:grid-cols-4 gap-4 items-center lg:justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[130px] max-w-[400px] justify-between">
            {comicType.length === 0 ? "Type" : comicType.map((type) => type.title).join(" , ")}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          {ComicType.map((type) => (
            <DropdownMenuCheckboxItem
              key={type.id}
              checked={comicType.includes(type)}
              onCheckedChange={() => handleComicTypeChange(type)}
            >
              {type.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[130px] max-w-[400px] justify-between">
            {comicProgress.length === 0
              ? "Progress"
              : comicProgress.map((progress) => progress.title).join(" , ")}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          {ComicProgress.map((progress) => (
            <DropdownMenuCheckboxItem
              key={progress.id}
              checked={comicProgress.includes(progress)}
              onCheckedChange={() => handleComicProgressChange(progress)}
            >
              {progress.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={searchInput}
          onKeyDownCapture={handleSearch}
          type="text"
          placeholder="Search..."
          className="pl-8 lg:w-[200px]"
        />
      </div>

      <Button  variant="outline" className="bg-background font-semibold">
        Total : {data?.mogous?.total ?? 0} results
      </Button>
    </div>
  );
}
