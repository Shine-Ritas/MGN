import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ChapterTable = () => {
    return (
        <>
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>Chapters</CardTitle>
                    <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Order</TableHead>
                                <TableHead>name</TableHead>
                                <TableHead>image</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    1
                                </TableCell>
                                <TableCell>
                                    <Label htmlFor="stock-1" className="sr-only">
                                        Stock
                                    </Label>
                                    <Input
                                        id="stock-1"
                                        type="text"
                                        defaultValue="image-1"
                                        disabled
                                    />
                                </TableCell>
                                <TableCell>
                                    <Label htmlFor="price-1" className="sr-only">
                                        Price
                                    </Label>
                                    <Input
                                        id="price-1"
                                        type="number"
                                        defaultValue="99.99"
                                    />
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Add Variant
                    </Button>
                </CardFooter>
            </Card></>
    )
}
