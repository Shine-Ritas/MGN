import { useState } from "react"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { cn } from "@/utilities/util"
import { Comment } from "./types"
import { User } from "@/types/store/user-store-type"
import { CommentInput } from "./CommentInput"
import { CommentItem } from "./CommentItem"

interface UserCommentProps {
  comments: Comment[]
  authUser?: User | null
  onSubmitComment: (content: string, image?: File, parentId?: number) => Promise<void>
  className?: string
}

export function UserComment({
  comments,
  authUser,
  onSubmitComment,
  className,
}: UserCommentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (content: string, image?: File, parentId?: number) => {
    setIsSubmitting(true)
    try {
      await onSubmitComment(content, image, parentId)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("w-full mx-auto space-y-6", className)}>
      {/* Comment Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Comments</h3>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </div>

      {/* Comment Input */}
      <CommentInput
        authUser={authUser}
        onSubmitComment={handleSubmit}
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
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              authUser={authUser}
              onSubmitReply={handleSubmit}
              isSubmitting={isSubmitting}
            />
          ))
        )}
      </div>
    </div>
  )
}