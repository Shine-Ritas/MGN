import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Reply, ChevronDown, ChevronUp } from "lucide-react"
import { Comment } from "./types"
import { User } from "@/types/store/user-store-type"
import { ReplyInput } from "./ReplyInput"

interface CommentItemProps {
  comment: Comment
  authUser?: User | null
  onSubmitReply: (content: string, image?: File, parentId: number) => Promise<void>
  isSubmitting?: boolean
}

export function CommentItem({ 
  comment, 
  authUser, 
  onSubmitReply, 
  isSubmitting = false 
}: CommentItemProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set())

  const isAuthenticated = !!authUser

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  const getUserInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const toggleReplies = (commentId: number) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  const handleReplySubmit = async (content: string, image?: File, parentId: number) => {
    await onSubmitReply(content, image, parentId)
    setExpandedReplies((prev) => new Set(prev).add(comment.id))
  }

  return (
    <div>
      {/* Parent Comment */}
      <Card className="p-4 border border-border/50 hover:border-border transition-colors">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={comment.user_profile_url || "/placeholder.svg"} alt={comment.user_name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {getUserInitials(comment.user_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{comment.user_name || "Anonymous"}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
            </div>
            {comment.content && (
              <p className="text-sm text-foreground mb-3 break-words leading-relaxed">
                {comment.content}
              </p>
            )}
            {comment.image_path && (
              <div className="mb-3">
                <img
                  src={comment.image_path || "/placeholder.svg"}
                  alt="Comment attachment"
                  className="rounded-lg max-w-full h-auto max-h-48 md:max-h-64 border"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(comment.id)}
                  className="text-xs h-8 px-3 hover:bg-muted"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}
              {comment.child_comments && comment.child_comments.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReplies(comment.id)}
                  className="text-xs h-8 px-3 text-muted-foreground hover:text-foreground"
                >
                  {expandedReplies.has(comment.id) ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Hide replies
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      See replies ({comment.child_comments.length})
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reply Input */}
        {replyingTo === comment.id && (
          <ReplyInput
            authUser={authUser}
            parentCommentUserName={comment.user_name || "Anonymous"}
            onSubmitReply={(content, image) => handleReplySubmit(content, image, comment.id)}
            onCancel={() => setReplyingTo(null)}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Child Comments */}
        {comment.child_comments && comment.child_comments.length > 0 && expandedReplies.has(comment.id) && (
          <div className="mt-4 ml-13 space-y-3">
            {comment.child_comments.map((reply) => (
              <div key={reply.id} className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={reply.user_profile_url || "/placeholder.svg"} alt={reply.user_name} />
                    <AvatarFallback className="bg-primary border-neon-primary border-2 text-foreground font-medium text-xs">
                      {getUserInitials(reply.user_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">{reply.user_name || "Anonymous"}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{formatDate(reply.created_at)}</span>
                    </div>
                    {reply.content && (
                      <p className="text-sm text-foreground mb-2 break-words leading-relaxed">
                        {reply.content}
                      </p>
                    )}
                    {reply.image_path && (
                      <div className="mb-2">
                        <img
                          src={reply.image_path || "/placeholder.svg"}
                          alt="Reply attachment"
                          className="rounded-lg max-w-full h-auto max-h-40 md:max-h-48 border"
                        />
                      </div>
                    )}
                    {isAuthenticated && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-xs h-8 px-3 hover:bg-muted"
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
