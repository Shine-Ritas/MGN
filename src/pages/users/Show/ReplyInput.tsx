import React, { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Send, X } from "lucide-react"
import { User } from "@/types/store/user-store-type"

interface ReplyInputProps {
  authUser?: User | null
  parentCommentUserName: string
  onSubmitReply: (content: string, image?: File, parentId?: number) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

export function ReplyInput({ 
  authUser, 
  parentCommentUserName,
  onSubmitReply, 
  onCancel,
  isSubmitting = false 
}: ReplyInputProps) {
  const [replyContent, setReplyContent] = useState("")
  const [replyImage, setReplyImage] = useState<File | null>(null)
  const [replyImagePreview, setReplyImagePreview] = useState<string | null>(null)
  const replyFileInputRef = useRef<HTMLInputElement>(null)

  const currentUserName = authUser?.name || "Guest"

  const getUserInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setReplyImage(file)
      setReplyImagePreview(URL.createObjectURL(file))
    }
  }

  const clearImage = () => {
    setReplyImage(null)
    setReplyImagePreview(null)
    if (replyFileInputRef.current) replyFileInputRef.current.value = ""
  }

  const handleSubmit = async (parentId: number) => {
    if (!replyContent.trim() && !replyImage) return

    try {
      await onSubmitReply(replyContent, replyImage || undefined, parentId)
      setReplyContent("")
      clearImage()
      onCancel()
    } catch (error) {
      console.error("Failed to submit reply:", error)
    }
  }

  const handleCancel = () => {
    setReplyContent("")
    clearImage()
    onCancel()
  }

  return (
    <div className="mt-4 ml-13 flex gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={authUser?.avatar?.avatar_url_path || "/placeholder.svg"} alt={currentUserName} />
          <AvatarFallback
          style={{ backgroundColor: authUser?.background_color }}
          className=" text-black font-medium border border-primary">
            {getUserInitials(authUser?.name)}
          </AvatarFallback>
        </Avatar>
      <div className="flex-1 space-y-3">
        <Textarea
          placeholder={`Reply to ${parentCommentUserName}...`}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="min-h-[60px] text-sm resize-none border-0 bg-input focus:bg-input transition-colors"
          disabled={isSubmitting}
          autoFocus
        />
        {replyImagePreview && (
          <div className="relative inline-block">
            <img
              src={replyImagePreview || "/placeholder.svg"}
              alt="Preview"
              className="h-20 w-20 rounded-lg object-cover border"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full"
              onClick={clearImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={replyFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => replyFileInputRef.current?.click()}
            disabled={isSubmitting}
            className="h-8 px-3"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Image</span>
          </Button>
          <Button
            onClick={() => handleSubmit(0)} // parentId will be passed from parent
            disabled={(!replyContent.trim() && !replyImage) || isSubmitting}
            size="sm"
            className="h-8 px-4"
          >
            <Send className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-8 px-3"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
