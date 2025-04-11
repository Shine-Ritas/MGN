
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SocialLinkItem from "@/components/ui/social-link-item"
import SocialLinkModal from "@/components/ui/social-link-modal"
import useQuery from "@/hooks/useQuery"
import useMutate from "@/hooks/useMutate"
import { toast } from "@/components/ui/use-toast"

// Define the social link type
export type SocialLink = {
    id: number
    name: string
    type: string
    icon: string
    redirect_url: string
    text_url?: string
    meta?: string
}
export default function SocialAction() {
    const { data: socialLinks, isLoading,refetch} = useQuery('admin/social-info/refer_social');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentSocialLink, setCurrentSocialLink] = useState<SocialLink | null>(null)
    const [upload, { isLoading:isMutating },] = useMutate({ callback: undefined });

    const handleAddSocialLink = () => {
        setCurrentSocialLink(null) // Reset current social link for adding new
        setIsModalOpen(true)
    }

    const handleEditSocialLink = (socialLink: SocialLink) => {
        setCurrentSocialLink(socialLink)
        setIsModalOpen(true)
    }

    const handleSaveSocialLink = async (socialLink: SocialLink) => {
        const url = currentSocialLink ? `admin/social-info/update/${socialLink.id}` : "admin/social-info"
        const response = await upload(url, socialLink)
       if(response?.success == true){
            setIsModalOpen(false)
            refetch!()
            toast({
                title: 'Social Links Updated',
                description: 'Social Link has been updated successfully',
                variant: 'success'
            });
       }
    }

    const handleOnDelete = async (socialLink: SocialLink) => {
        const response = await upload(`admin/social-info/${socialLink.id}`, socialLink)
        if(response?.success == true){
            refetch!()
            toast({
                title: 'Social Links Deleted',
                description: 'Social Link has been deleted successfully',
                variant: 'success'
            });
            setIsModalOpen(false)
        }
    }

    return (
        <div className="w-full col-span-1">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Social Links</CardTitle>
                    <Button onClick={handleAddSocialLink}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add
                    </Button>
                </CardHeader>
                <CardContent>
                    {
                        !isLoading && <div className="space-y-4">
                            {socialLinks?.data.length === 0 ? (
                                <p className="text-center text-muted-foreground">
                                    No social links added yet. Click the button above to add your first social link.
                                </p>
                            ) : (
                                socialLinks?.data?.map((socialLink) => (
                                    <SocialLinkItem
                                        key={socialLink.id}
                                        socialLink={socialLink}
                                        onEdit={() => handleEditSocialLink(socialLink)}
                                    />
                                ))
                            )}
                        </div>
                    }
                </CardContent>
            </Card>

            <SocialLinkModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSocialLink}
                socialLink={currentSocialLink}
                isSaving={isMutating}
                onDelete={handleOnDelete}
            />
        </div>
    )
}
