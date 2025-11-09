import { useCallback, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Reply, ChevronDown, ChevronUp } from "lucide-react"
import { Comment } from "./types"
import { User } from "@/types/store/user-store-type"
import { ReplyInput } from "./ReplyInput"
import useMutate from "@/hooks/useMutate"
import useQuery from "@/hooks/useQuery"

interface CommentItemProps {
  comment: Comment
  authUser?: User | null
  isSubmitting?: boolean,
  commentPayload : any
  onUpdateCommentCount?: (commentId: number) => void
}

export function CommentItem({ 
  comment, 
  authUser, 
  isSubmitting = false ,
  commentPayload,
  onUpdateCommentCount
}: CommentItemProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [expandedReplies, setExpandedReplies] = useState<Comment[]>([])
  const [disableLoadComment,setDisableLoadComment] = useState(true)
  const [showReplies, setShowReplies] = useState(false)
  const [expandedContents, setExpandedContents] = useState<Set<number>>(new Set())

  const [postComment] = useMutate({ callback: undefined, navigateBack: false });

  const { data, refetch } = useQuery(`users/comments/getReplies?comment_id=${comment.id}`,undefined,false,disableLoadComment);

  useEffect(() => {
    if (data?.childComments) {
      setExpandedReplies(data.childComments)
    }
  }, [data])


  const isAuthenticated = !!authUser


  const getUserInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const CONTENT_LIMIT = 200

  const toggleContentExpansion = (id: number) => {
    setExpandedContents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const getTruncatedContent = (content: string, id: number) => {
    const isExpanded = expandedContents.has(id)
    if (content.length <= CONTENT_LIMIT) {
      return { text: content, shouldShowButton: false }
    }
    return {
      text: isExpanded ? content : content.slice(0, CONTENT_LIMIT),
      shouldShowButton: true,
      isExpanded
    }
  }

  const toggleReplies = useCallback((commentId:number)=>{
      if(!showReplies) {
        // Show replies - load data if not already loaded
        if(disableLoadComment) {
          setDisableLoadComment(false)
        } else {
          refetch?.()
        }
        setShowReplies(true)
      } else {
        // Hide replies
        setShowReplies(false)
      }
  },[showReplies, disableLoadComment, refetch])


  const handleReplySubmit = async (content: string, image?: File, parentId?: number) => {
     await postComment("users/mogous/comments", { 
      text: content,
      image_path: image || undefined,
      mogou_id: commentPayload.mogou_id,
      parent_comment_id: comment.id,
    })
    
    // Only refetch if replies are currently shown and query has been started
    if (showReplies && !disableLoadComment) {
      refetch?.()
    } else {
      // If replies aren't shown, enable the query for when they expand it next time
      setDisableLoadComment(false)
    }

    // Update comment count in parent component instead of direct mutation
    onUpdateCommentCount?.(comment.id)

    
    // Close the reply input after successful submission
    setReplyingTo(null)
  }

  return (
    <div>
      {/* Parent Comment */}
      <Card className="p-4 border border-border/50 hover:border-border transition-colors">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={comment.user.avatar?.avatar_url_path || "/placeholder.svg"} alt={comment.user.name} />
            <AvatarFallback
            style={{ backgroundColor: comment.user.background_color }}
            className={`  border border-primary text-black font-medium`}>
              {getUserInitials(comment.user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{comment.user.name || "Anonymous"}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{comment.created_at}</span>
            </div>
            {comment.content && (() => {
              const { text, shouldShowButton, isExpanded } = getTruncatedContent(comment.content, comment.id)
              return (
                <div className="mb-3">
                  <p className="text-sm text-foreground break-words leading-relaxed">
                    {text}
                    {!isExpanded && shouldShowButton && (
                      <span className="text-muted-foreground">...</span>
                    )}
                  </p>
                  {shouldShowButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleContentExpansion(comment.id)}
                      className="text-xs h-7 px-2 mt-1 text-muted-foreground hover:text-foreground"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </Button>
                  )}
                </div>
              )
            })()}
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
              {comment.child_comments_count > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReplies(comment.id)}
                  className="text-xs h-8 px-3 text-muted-foreground hover:text-foreground"
                >
                  {showReplies ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Hide replies
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      See replies 
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
            parentCommentUserName={comment.user.name || "Anonymous"}
            onSubmitReply={(content, image) => handleReplySubmit(content, image, comment.id)}
            onCancel={() => setReplyingTo(null)}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Child Comments */}
        {showReplies && expandedReplies && expandedReplies.length > 0 && (
          <div className="mt-4 ml-13 space-y-3">
            {expandedReplies.map((reply: Comment) => (
              <div key={reply.id} className="p-4 rounded-lg bg-popover border border-border/30 lg:ml-20 ml-10 ">
                <div className="flex gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={reply.user.avatar?.avatar_url_path || "/placeholder.svg"} alt={reply.user.name} />
                  <AvatarFallback
                  style={{ backgroundColor: reply.user.background_color }}
                  className={`  border border-primary text-black font-medium`}>
                    {getUserInitials(reply.user.name)}
                  </AvatarFallback>
                </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">{reply.user.name || "Anonymous"}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{reply.created_at}</span>
                    </div>
                    {reply.content && (() => {
                      const { text, shouldShowButton, isExpanded } = getTruncatedContent(reply.content, reply.id)
                      return (
                        <div className="mb-2">
                          <p className="text-sm text-foreground break-words leading-relaxed">
                            {text}
                            {!isExpanded && shouldShowButton && (
                              <span className="text-muted-foreground">...</span>
                            )}
                          </p>
                          {shouldShowButton && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleContentExpansion(reply.id)}
                              className="text-xs h-7 px-2 mt-1 text-muted-foreground hover:text-foreground"
                            >
                              {isExpanded ? "See less" : "See more"}
                            </Button>
                          )}
                        </div>
                      )
                    })()}
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
                    {
                      reply.child_comments_count > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-8 px-3 text-muted-foreground hover:text-foreground"
                        >
                          <Reply className="h-3 w-3 mr-1" />
                          replies
                        </Button>
                      )
                    }
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
