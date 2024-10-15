import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TablePagination } from "@/components/TablePagination"
import { Category } from "./type"
import AlertBox from "@/components/ui/AlertBox"
import React, { useState } from "react"
import useMutate from "@/hooks/useMutate"
import useQuery from "@/hooks/useQuery"
import InputSearch from "@/components/ui/custom/InputSearch"
import { useSearchParams } from "react-router-dom"
import ContentTableRow from "@/components/ui/custom/ContentTableRow"
import { useAppDispatch } from "@/redux/hooks"
import { removeCategories } from "@/redux/slices/category-slice"

type CategoryTableProps = {
    setCategory: (category: Category) => void;
    setOpen: (open: boolean) => void;

};

const CategoryTable = ({
    setCategory,
    setOpen,

}: CategoryTableProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParameters] = useSearchParams();
    const [search, setSearch] = useState<string>(queryParameters.get('search') ?? "");

    const searchRef = React.useRef<HTMLInputElement>(null);

    const { data: categories,refetch, isLoading, isFetching } = useQuery(`admin/categories?page=${currentPage}&search=${search}&order_by_mogous_count=asc`);

    const submitSearch = () => {
        setSearch(searchRef.current?.value as string)
    }

    return (
        <div className="">
            <CardHeader className="flex flex-row  items-center justify-between">
                <div className="hidden md:inline">
                    <CardTitle>Category Table</CardTitle>
                    <CardDescription>
                        List of all categories
                    </CardDescription>
                </div>
                <div className="flex items-center w-full md:w-fit">
                    <InputSearch placeholder="Search" value={search} onAction={submitSearch} ref={searchRef} />
                </div>
            </CardHeader>
            <CardContent className="pb-0">
                <Table >
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">
                                <span className="">Category Name</span>
                            </TableHead>
                            <TableHead>
                                Total Comics Count
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            isLoading ? (<ContentTableRow />)
                                :
                                (
                                    categories.categories.data.length === 0 ? <ContentTableRow content="No data Found" /> :
                                        categories.categories.data.map((cata: Category) => {
                                            return <CategoryTableRow key={cata.id} category={cata} index={cata.id} setCategory={setCategory} setOpen={setOpen} refetch={refetch} />
                                        })
                                )
                        }

                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>

                {
                    (categories && categories.categories.data.length > 0) && <TablePagination url={categories.categories.path} lastPage={categories.categories.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} isFetching={isFetching} />
                }

            </CardFooter>
        </div>
    )
}


const CategoryTableRow = ({ category, index, setCategory, setOpen,refetch }: {
    category: Category,
    index: number | undefined,
    setCategory: any,
    setOpen: any,
    refetch?: any
}) => {
    const dispatch = useAppDispatch();
    
    const onSuccessCallback = () => {
        setOpen(false);
        dispatch(removeCategories(category.id as number));
        refetch();
    }

    const [postCategory] = useMutate({ callback: onSuccessCallback });

    const deleteCategory = async (id: number) => {
        await postCategory(`admin/categories/${id}`) as any;
    }


    return <TableRow key={index}>

        <TableCell className="font-medium">
            {category?.title}
        </TableCell>
        <TableCell>
            <Badge variant="outline">
                {category?.mogous_count}
            </Badge>
        </TableCell>

        <TableCell className="hidden md:table-cell">
            2023-07-12 10:42 AM
        </TableCell>
        <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            setCategory({
                                id: category?.id,
                                title: category?.title,
                            })
                            setOpen(true)
                        }}
                    >Edit</DropdownMenuItem>


                    {/* <DropdownMenuItem slot=""> */}
                    <AlertBox alertTitle="Delete" alertDescription="Are you sure you want to Delete" alertActionConfirmText="Delete" alertConfirmAction={() => deleteCategory(category.id as number)}
                        className="relative flex cursor-default select-none w-full hover:bg-accent text-destructive items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        btnText="Delete" />
                    {/* </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
}

export default CategoryTable