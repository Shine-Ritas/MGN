import React, { useEffect, useRef } from 'react'
import { ComicCategory } from '../Category/type'
import {
    Card,
    CardContent,

    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/redux/hooks';
import { Input } from '@/components/ui/input';

interface CategorySelectProps {
    holderCategories: ComicCategory[],
    setHolderCategories?: React.Dispatch<React.SetStateAction<ComicCategory[]>>
}
const CategorySelect = ({ holderCategories, setHolderCategories }: CategorySelectProps) => {
    const data = useAppSelector((state) => state.categories.categories);
    const [categories, setCategories] = React.useState<ComicCategory[]>([]);

    useEffect(() => {
        setCategories(data!);
    }, [data])

    const search = useRef<HTMLInputElement>(null);


    const addCategory = (category: ComicCategory) => {
        setHolderCategories!(prev => [...prev, category]);
    }

    const removeCategory = (category: ComicCategory) => {
        setHolderCategories!(prev => prev.filter((item) => item.id !== category.id));
    }

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Added Categories</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid gap-6 sm:grid-cols-1">
                    <div className="flex gap-4 flex-wrap">
                        {
                            holderCategories?.map((category: ComicCategory) => {
                                return (
                                    <div key={category.id}>
                                        <Badge
                                            onClick={() => removeCategory(category)}
                                            className='cursor-pointer'
                                        >{category.title}</Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </CardContent>


            <CardHeader>
                <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-1 ">

                    <Input
                        ref={search}
                        onKeyUp={() => {
                            if (search.current) {
                                const value = search.current.value;
                                if (value) {
                                    setCategories(data!.filter((item) => item.title.toLowerCase().includes(value.toLowerCase())));
                                } else {
                                    setCategories(data!);
                                }
                            }
                        }
                        }
                        type="text"
                        placeholder="Search category"
                        className=" p-2  rounded-md" />

                    <div className="flex gap-4 flex-wrap max-h-40 overflow-y-scroll ">
                        {
                            categories?.map((category: ComicCategory) => {

                                const isExist = holderCategories!.find((item) => item.id === category.id);
                                if (isExist) {
                                    return null;
                                }
                                return (
                                    <div key={category.id}>
                                        <Badge
                                            className='cursor-pointer'
                                            onClick={() => addCategory(category)}
                                        >{category.title}</Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CategorySelect