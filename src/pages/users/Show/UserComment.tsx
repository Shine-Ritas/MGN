import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Loader2 } from "lucide-react"
import { cn } from "@/utilities/util"
import { Comment } from "./types"
import { User } from "@/types/store/user-store-type"
import { CommentInput } from "./CommentInput"
import { CommentItem } from "./CommentItem"
import useQuery from "@/hooks/useQuery"
import { MogousElement, SubMogousType } from "../home/types"

interface UserCommentProps {
  mogou : MogousElement
  subMogou? : SubMogousType
  authUser?: User | null
  className?: string
}

export function UserComment({
  mogou,
  subMogou ,
  authUser,
  className,
}: UserCommentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const { data, refetch } = useQuery(`users/comments/get?mogou_id=${mogou.id}&sub_mogou_id=${subMogou?.id ?? ''}&page=${page}`);

  useEffect(() => {
    if (data?.comments) {
      if (page === 1) {
        // First page - replace comments
        setComments(data.comments.data || [])
      } else {
        // Subsequent pages - append to existing comments
        setComments(prev => [...prev, ...(data.comments.data || [])])
      }
      
      // Check if there are more pages
      setHasMore(data.comments.current_page < data.comments.last_page)
    }
  }, [data, page])

  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    
    setLoadingMore(true)
    try {
      setPage(prev => prev + 1)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleSubmit = async (content: string, image?: File, parentId?: number) => {
    setIsSubmitting(true)
    try {
      // Reset to first page and refetch when new comment is added
      setPage(1)
      if (refetch) {
        await refetch()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("w-full mx-auto space-y-6 max-h-[60vh] overflow-y-scroll", className)}>
      {/* Comment Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Comments</h3>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </div>

      {/* Comment Input */}
      <CommentInput
        authUser={authUser}
        refetch={refetch}
        setComments={setComments}
        isSubmitting={isSubmitting}

      />

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-1">
                <h4 className="font-medium text-muted-foreground">No comments yet</h4>
                <p className="text-sm text-muted-foreground">
                  {authUser ? "Be the first to share your thoughts!" : "Sign in to start the conversation."}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                authUser={authUser}
                onSubmitReply={handleSubmit}
                isSubmitting={isSubmitting}
              />
            ))}
            
            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  variant="outline"
                  size="sm"
                  className="px-6 py-2 text-sm"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Comments"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}