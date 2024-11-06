
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar } from './UserAvatar'

interface AvatarManagementModalProps {
  onSubmit: (url: string, data: FormData) => Promise<void>
  isOpen: boolean
  onClose: () => void
  avatar?: Avatar ,
  droppedFile: File | null
  type: 'edit' | 'create',
  isMutating: boolean
}

export default function AvatarManagementModal({
  onSubmit,
  isOpen,
  onClose,
  avatar,
  type = 'edit',
  droppedFile,
  isMutating
}: AvatarManagementModalProps) {
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(droppedFile);


  useEffect(() => {
    if (avatar) {
      setName(avatar.avatar_name)
      setPhotoUrl(avatar.avatar_url_path)
    } else {
      setName('')
      setPhotoUrl('')
    }
  }, [avatar])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setError(null)

      if (file.type !== 'image/png') {
        setError('Please upload a PNG image.')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB.')
        return
      }

      const img = new Image()
      img.onload = () => {
        setPhotoUrl(URL.createObjectURL(file))
      }
      img.onerror = () => {
        setError('Failed to load image. Please try again.')
      }
      img.src = URL.createObjectURL(file)
      setFile(file)
    }
  }

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Please enter a name for the avatar.')
      return
    }
    if (!photoUrl) {
      setError('Please upload a photo for the avatar.')
      return
    }

    const data = new FormData()
    data.append('avatar_name', name)
    data.append('avatar', type === 'edit' ? file !: droppedFile!)
    if (type === 'edit') {
      data.append('id', avatar!.id.toString())
    }
    const url = type === 'edit' ? '/admin/user-avatars/update' : '/admin/user-avatars/create'

    await onSubmit(url, data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type == "edit" ? 'Edit Avatar' : 'Create New Avatar'}</DialogTitle>
          <DialogDescription>
            {avatar ? 'Make changes to your avatar here.' : 'Add a new avatar to your collection.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <Label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
              >
                <Upload className="h-4 w-4" />
              </Label>
            </div>
            <Input
              id="photo-upload"
              type="file"
              accept="image/png"
              onChange={handlePhotoChange}
              className="hidden"
              disabled={isMutating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter avatar name"
            />
          </div>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={isMutating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}