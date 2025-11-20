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
import { TablePagination } from "@/components/TablePagination"

interface PostHistoryProps {
    posts: any;
    currentPage: number;
    lastPage: number;
    setCurrentPage: (page: number) => void;
    isFetching?: boolean;
    url?: string;
}

const PostHistory = ({posts, currentPage, lastPage, setCurrentPage, isFetching = false, url = ""}: PostHistoryProps) => {
    const postsData = posts?.data || []

    const formatDate = (dateString: string) => {
        if (!dateString) return '-'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getContent = (post: any) => {
        if (typeof post.data === 'string' && post.data.trim()) {
            return post.data
        }
        if (post.mogou?.title) {
            return post.mogou.title
        }
        return '-'
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Post History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="whitespace-nowrap overflow-scroll max-h-[40vh]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Content</TableHead>
                            <TableHead>Published On</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {postsData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    No posts found
                                </TableCell>
                            </TableRow>
                        ) : (
                            postsData.map((post: any) => (
                                <TableRow key={post.id}>
                                    <TableCell className="max-w-md truncate">
                                        {getContent(post)}
                                    </TableCell>
                                    <TableCell>{formatDate(post.created_at)}</TableCell>
                                    <TableCell>{post.social_channel?.name || '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant={post.mogou?.status_name === 'Published' ? 'default' : 'destructive'}>
                                            {post.mogou?.status_name || 'Published'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {postsData.length > 0 && (
                    <div className="mt-4">
                        <TablePagination
                            url={url}
                            lastPage={lastPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            isFetching={isFetching}
                            paging={false}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default PostHistory