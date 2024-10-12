import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useMutate from "@/hooks/useMutate";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FindMogouItemType } from "./carousel-editor";



const FindMogouSection = ({ isOpen, isOpenChange, section_type,addToCarousel }) => {
    const [filteredResults, setFilteredResults] = useState<FindMogouItemType[]>([]);
    const searchTermInput = useRef<HTMLInputElement>(null);

    const onSuccessCallback = (response: any) => {
        setFilteredResults(response.mogous);
    }
    const [searchServer, { isLoading: isSearching }] = useMutate({ callback: onSuccessCallback });

    const searchOnDebounce = useCallback(
        async () => {
                searchServer("admin/search_section_items", {
                    search: searchTermInput.current?.value || " ",
                    type: section_type,
                });
        },
        [searchServer, section_type]
    );

    const debouncedResults = useMemo(() => {
        return debounce(searchOnDebounce, 500);
    }, [searchOnDebounce]);

    useEffect(() => {
        if (isOpen) {
            searchOnDebounce();
        }

        return () => {
            setFilteredResults([]);
        }
    },[isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={isOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="">
                    <Plus className="w-4 h-4" />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Mogous to Carousel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 opacity-50" />
                        <Input
                            placeholder="Search products..."
                            ref={searchTermInput}
                            onChange={debouncedResults}
                        />
                    </div>
                    <ScrollArea className="h-[300px]">
                        {isSearching ? (
                            <div>Searching...</div>
                        ) : (
                            filteredResults.map((item: FindMogouItemType) => (
                                <div key={item.id} className="flex justify-between items-start z p-2">
                                    <div className="flex gap-3">
                                        <LazyLoadImage src={item?.cover} className="min-w-16 h-20 object-cover rounded-md" />
                                        <div className="flex flex-col gap-1">
                                           <div className="flex">
                                           <h3 className="font-medium text-sm">{
                                                item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title
                                            }</h3>
                                            <div className={"pl-3 text-left flex items-center text-xs font-normal text-muted-foreground" } >
                                                <CalendarIcon
                                                 className="mr-2 h-4 w-4 opacity-50" />
                                                {item.created_at}
                                            </div>
                                           </div>
                                           <p className="text-xs text-muted-foreground pe-3">
                                            {
                                                item.description.length > 120 ? item.description.slice(0, 120) + "..." : item.description
                                            }
                                           </p>


                                        </div>
                                    </div>
                                    <Button
                                    disabled={item.is_selected}
                                    onClick={() => addToCarousel(item)}>
                                        {
                                            item.is_selected ? "Added" : "Add"
                                        }
                                    </Button>
                                </div>
                            ))
                        )}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FindMogouSection;
