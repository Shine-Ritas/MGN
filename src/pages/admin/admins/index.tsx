import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
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

import AlertBox from "@/components/ui/AlertBox"
import React, { useState } from "react"
import useMutate from "@/hooks/useMutate"
import useQuery from "@/hooks/useQuery"
import InputSearch from "@/components/ui/custom/InputSearch"
import { useSearchParams } from "react-router-dom"
import ContentTableRow from "@/components/ui/custom/ContentTableRow"
import { AdminType } from "./types/type"
import { AdminActionModal } from "./admin-action-modal"
import { toast } from "@/components/ui/use-toast"

const AdminsTable = () => {
    const [admin, setAdmin] = useState<AdminType | undefined>(undefined);
    const [modalOpen, setModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParameters] = useSearchParams();
    const [search, setSearch] = useState<string>(queryParameters.get('search') ?? "");

    const searchRef = React.useRef<HTMLInputElement>(null);
    const { data : roles , isLoading : isRoleLoading } = useQuery(`admin/roles`);

    const { data, refetch, isLoading, isFetching } = useQuery(`admin/admins?page=${currentPage}&search=${search}`);
    
    const submitSearch = () => {
        setSearch(searchRef.current?.value as string)
    }

    return (
        <Card className="">
            <CardHeader className="flex flex-row  items-center justify-between">
                <div className="hidden md:inline">
                    <CardTitle>Admins Table</CardTitle>
                    <CardDescription>
                        List of all admins
                    </CardDescription>
                </div>
                <div className="flex items-center w-full md:w-fit gap-4">

                    <InputSearch placeholder="Search" value={search} onAction={submitSearch} ref={searchRef} />
                    {
                        !isRoleLoading && <AdminActionModal roles={roles?.roles} open={modalOpen} setOpen={setModalOpen} setInitAdmin={setAdmin} admin={admin} refetch={refetch} />
                    }
                   
                </div>
            </CardHeader>
            <CardContent className="pb-0">
                <Table >
                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="w-20">
                                <span className=""></span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Last Accessed At</TableHead>
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
                                    data?.admins?.data.length === 0 ? <ContentTableRow content="No data Found" /> :
                                        data?.admins?.data.map((admin: AdminType, index: keyof AdminType) => {
                                            return <AdminTableRow key={index} 
                                            setAdmin={setAdmin}
                                            setOpen={setModalOpen}
                                            admin={admin} index={admin.id} refetch={refetch} />
                                        })
                                )
                        }

                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="mt-4">

                {
                    (data && data?.admins?.data.length > 0) && <TablePagination url={data?.admins.path} lastPage={data?.admins?.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} isFetching={isFetching} />
                }

            </CardFooter>
        </Card>
    )
}


const AdminTableRow = ({ admin, index, setAdmin, setOpen, refetch }: {
    admin: AdminType,
    index: number | undefined,
    setAdmin: any,
    setOpen: any,
    refetch?: any
}) => {

    const onSuccessCallback = () => {
        setOpen(false);
        toast({
            title: "Removal",
            description: `Admin was updated successfully`,
            variant: "success"
          })
        refetch();
    }

    const [postAdmins] = useMutate({ callback: onSuccessCallback });

    const deleteAdmins = async (id: number) => {
        await postAdmins(`admin/admins/delete/${id}`,{
            admin_id : id
        }) as any;
    }


    return <TableRow key={index}>

        <TableCell className="font-medium text-center">
            {index}
        </TableCell>
        <TableCell className="font-medium">
            {admin?.name}
        </TableCell>
        <TableCell>
            {admin.email}
        </TableCell>
        <TableCell className="">
            {admin.role_name}
        </TableCell>
        <TableCell className="">
            {admin.last_accessed_at}
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
                            setAdmin({
                                id: admin?.id,
                                name: admin?.name,
                                email: admin?.email,
                                role_id: admin?.role_id,
                            })
                            setOpen(true)
                        }}
                    >Edit</DropdownMenuItem>


                    {/* <DropdownMenuItem slot=""> */}
                    <AlertBox alertTitle="Delete" alertDescription="Are you sure you want to remove ?" alertActionConfirmText="Delete" alertConfirmAction={() => deleteAdmins(admin.id as number)}
                        className="relative flex cursor-default select-none w-full hover:bg-accent text-red-500 items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        btnText="Delete" />
                    {/* </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
}

export default AdminsTable