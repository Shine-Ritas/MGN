import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react'
import { useMemo, useRef } from 'react';
import { ComicProgress, ComicType, OrderBy } from "@/data/data";

import MultiSelectHandler from '@/components/ui/multi-select-handler';
import { whereIn } from '@/utilities/util';
import { useAppSelector } from '@/redux/hooks';
import FormSelect from '@/components/ui/custom/FormSelect';


type FilterComponentProps = {
    handleFilter: (key: string, value: any) => void;
    getByKey: (key: string) => any;
    isMobile : boolean;
}

const FilterComponent = ({ handleFilter, getByKey,isMobile }: FilterComponentProps) => {
    const searchInput = useRef<HTMLInputElement>(null);

    const categories = useAppSelector((state) => state.categories.categories)!;

    const selectedType = useMemo(() => whereIn(ComicType, getByKey('type')?.split(",") || [], 'title'), [getByKey]);
    const selectedProgress = useMemo(() => whereIn(ComicProgress, getByKey('finish_status')?.split(",") || [], 'title'), [getByKey]);
    const selectedGenres = useMemo(() => whereIn(categories, getByKey('genres')?.split(",") || [], 'title'), [getByKey, categories]);


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 text-xs">
                <div className="relative">
                    <Input
                        ref={searchInput}
                        onKeyUp={(e) => e.key === "Enter" && handleFilter("search", e.currentTarget.value)}
                        type="text"
                        placeholder="Search ..."
                        className="pl-3"
                    />
                    <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
                </div>

                <MultiSelectHandler
                    selectedOptions={selectedType}
                    options={ComicType}
                    placeHolder="Select Type"
                    size={isMobile ? "md" : "sm"}
                    onChange={
                        (value) => handleFilter("type", value)
                    }
                    labelExtractor={(option) => option.title}
                />

                <MultiSelectHandler
                    selectedOptions={selectedProgress}
                    options={ComicProgress}
                    placeHolder="Select Progress"
                    size={isMobile ? "md" : "sm"}

                    onChange={
                        (value) => handleFilter("finish_status", value)
                    }
                    labelExtractor={(option) => option.title} />

                <MultiSelectHandler
                    selectedOptions={selectedGenres}
                    options={categories}
                    placeHolder="Select Genres"
                        onChange={
                        (value) => handleFilter("genres", value)
                    }
                    size={isMobile ? "md" : "lg"}
                    labelExtractor={(option) => option.title} />

                <FormSelect selectKey="order_by"
                    defaultValue={getByKey('order_by') ?? undefined}
                    collection={OrderBy}
                    placeholder='Order By'
                    setValue={(key,value)=>{
                        handleFilter(key,value)
                    }} />

                <Button
                    size={"sm"}
                    // onClick={
                    className={`${isMobile ? "!w-full" : "col-span-1"} bg-primary`}>
                    Filter
                </Button>
            </div>


        </>
    )
}

export default FilterComponent
