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

const PostHistory = ({posts}) => {
    const postsData = posts?.data || []
    const currentPage = posts?.current_page || 1
    const lastPage = posts?.last_page || 1
    const total = posts?.total || 0

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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Content</TableHead>
                            <TableHead>Published On</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
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
                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            // Handle pagination - would need to call API with page parameter
                        }}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage} of {lastPage} ({total} total)</span>
                    <Button
                        variant="outline"
                        onClick={() => {
                            // Handle pagination - would need to call API with page parameter
                        }}
                        disabled={currentPage >= lastPage}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default PostHistory