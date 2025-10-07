import React, { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ImageIcon, Send, X, LogIn } from "lucide-react"
import { Link } from "react-router-dom"
import { User } from "@/types/store/user-store-type"
import { Comment } from "./types"
import useMutate from "@/hooks/useMutate"

interface CommentInputProps {
  authUser?: User | null
  refetch: any
  placeholder?: string
  isSubmitting?: boolean
  setComments: (value: React.SetStateAction<Comment[]>) => void
}

export function CommentInput({ 
  authUser, 
  refetch, 
  placeholder = "Share your thoughts about this chapter...",
  setComments,
  isSubmitting = false 
}: CommentInputProps) {
  const [newComment, setNewComment] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [postComment, { isLoading }] = useMutate({ callback: undefined, navigateBack: false });

  const isAuthenticated = !!authUser
  const currentUserName = authUser?.name

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
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async () => {
    if (!newComment.trim() && !selectedImage) return

    try {
      await postComment("users/mogous/comments", { 
        text: newComment,
        image_path: selectedImage || undefined,
        mogou_id: 1,
      })
      setNewComment("")
        refetch();
      clearImage()
    } catch (error) {
      console.error("Failed to submit comment:", error)
    }
  }

  if (!isAuthenticated) {
    return (
      <Card className="p-6 border-2 border-dashed border-muted-foreground/30 bg-muted/20">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Join the Discussion</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              Sign in to share your thoughts and connect with other readers. Your comments help build a vibrant community!
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="default" size="sm">
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/register">
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 border-2 border-border/50 hover:border-border transition-colors">
      <div className="flex gap-3">
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
            placeholder={placeholder}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none text-sm border-0  bg-input transition-colors"
            disabled={isSubmitting}
          />
          {imagePreview && (
            <div className="relative inline-block">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="h-24 w-24 rounded-lg object-cover border"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                onClick={clearImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()} 
              disabled={isLoading}
              className="h-8"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Image</span>
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={(!newComment.trim() && !selectedImage) || isSubmitting}
              size="sm"
              className="h-8 px-4"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
