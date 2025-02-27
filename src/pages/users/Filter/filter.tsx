import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react'
import { useRef } from 'react';
import { ComicProgress, ComicType } from "@/data/data";

import MultiSelectHandler from '@/components/ui/multi-select-handler';
import { whereIn } from '@/utilities/util';
import { useAppSelector } from '@/redux/hooks';


type FilterComponentProps = {
    handleFilter: (key: string, value: any) => void;
    getByKey: (key: string) => any;
}

const FilterComponent = ({ handleFilter, getByKey }: FilterComponentProps) => {
    const searchInput = useRef<HTMLInputElement>(null);

    const categories = useAppSelector((state) => state.categories.categories)!;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 text-xs">
                <div className="relative">
                    <Input
                        ref={searchInput}
                        onKeyUp={(e) => e.key === "Enter" && handleFilter("search", e.currentTarget.value)}
                        type="text"
                        placeholder="Search User ..."
                        className="pl-8 lg:w-[200px]"
                    />
                    <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
                </div>

                <MultiSelectHandler
                    selectedOptions={whereIn(ComicType, getByKey('type').split(","), 'title')}
                    options={ComicType}
                    placeHolder="Select Type"
                    onChange={
                        (value) => handleFilter("type", value)
                    }
                    labelExtractor={(option) => option.title}
                />

                <MultiSelectHandler
                    selectedOptions={whereIn(ComicProgress, getByKey('finish_status').split(","), 'title')}
                    options={ComicProgress}
                    placeHolder="Select Progress"
                    onChange={
                        (value) => handleFilter("finish_status", value)
                    }
                    labelExtractor={(option) => option.title} />

                <MultiSelectHandler
                    selectedOptions={whereIn(categories, getByKey('genres').split(","), 'title')}
                    options={categories}
                    placeHolder="Select Progress"
                    size='lg'
                    onChange={
                        (value) => handleFilter("genres", value)
                    }
                    labelExtractor={(option) => option.title} />



                <Button
                    size={'sm'}
                    className=" text-white px-4 py-2 rounded-sm !w-fit">
                    Filter
                </Button>
            </div>


        </>
    )
}

export default FilterComponent
