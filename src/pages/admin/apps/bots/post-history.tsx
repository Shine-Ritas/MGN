import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RefreshCcw } from 'lucide-react'
import { useState } from "react"

const PostHistory = ({posts}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5

    return (
        <Card>
            <CardHeader>
                <CardTitle>Post History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by channel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Channels</SelectItem>
                            {/* {channels.map((channel, index) => (
              <SelectItem key={index} value={channel.name}>{channel.name}</SelectItem>
            ))} */}
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Content</TableHead>
                            <TableHead>Published On</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post, index) => (
                            <TableRow key={index}>
                                <TableCell>{post.content}</TableCell>
                                <TableCell>{post.publishedOn}</TableCell>
                                <TableCell>{post.channel}</TableCell>
                                <TableCell>
                                    <Badge variant={post.status === 'Published' ? 'default' : 'destructive'}>
                                        {post.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">
                                        View
                                    </Button>
                                    {post.status === 'Failed' && (
                                        <Button variant="ghost" size="sm">
                                            <RefreshCcw className="mr-2 h-4 w-4" />
                                            Retry
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage}</span>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage * postsPerPage >= posts.length}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default PostHistory