"use client"

import { useState } from "react"
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type DeleteConfirmationDialogProps = {
    chapterTitle: string
    handleDelete: () => Promise<boolean>
    onLoading : boolean
}

export default function DeleteConfirmationDialog({ chapterTitle,handleDelete,onLoading }: DeleteConfirmationDialogProps) {
  const [open, setOpen] = useState(false)


  const handleOnDelete = async () => {
    const res = await handleDelete()
    if (res) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Delete Chapter</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{chapterTitle}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button"
          disabled={onLoading}
          variant="destructive" onClick={handleOnDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}