import type React from "react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SocialLink } from "@/pages/admin/Settings/General/social-action"
import { FaTrash } from "react-icons/fa6"



interface SocialLinkModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (socialLink: SocialLink) => void
  onDelete: (socialLink: SocialLink) => void
  isSaving?: boolean
  socialLink: SocialLink | null
}

export default function SocialLinkModal({ isOpen, onClose, onSave,onDelete,isSaving,socialLink }: SocialLinkModalProps) {
  const [formData, setFormData] = useState<Partial<SocialLink>>({
    name: "",
    type: "default",
    icon: "",
    redirect_url: "",
  })

  // Reset form when modal opens or socialLink changes
  useEffect(() => {
    if (socialLink) {
      setFormData(socialLink)
    } else {
      setFormData({
        name: "",
        type: "default",
        icon: "",
        redirect_url: "",
      })
    }
  }, [socialLink, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value, icon: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure all required fields are filled
    if (!formData.name || !formData.redirect_url) {
      return
    }

    // If editing, use the existing ID, otherwise it will be assigned when saving
    onSave({
      id: socialLink?.id || 0,
      name: formData.name || "",
      type: "refer_social",
      icon: formData.icon || formData.type || "",
      redirect_url: formData.redirect_url || "",
      text_url: formData.text_url,
      meta: formData.meta,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{socialLink ? "Edit Social Link" : "Add Social Link"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-left">
                Type
              </Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="redirect_url" className="text-left">
                URL
              </Label>
              <Input
                id="redirect_url"
                name="redirect_url"
                value={formData.redirect_url || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            {
                socialLink && (
                    <Button
                    type="button"
                    variant="destructive"
                    disabled={isSaving}
                    onClick={
                        () => {
                            if (socialLink) {
                                onDelete(socialLink)
                            }
                        }
                    }
                    >
                        <FaTrash className="h-4 w-4" />
                    </Button>
                )
            }
            <Button disabled={isSaving} type="submit">
                {socialLink ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
