import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, UploadIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import useMutate from "@/hooks/useMutate"
import useSecureStorage from "@/hooks/useSecureStorage"
import { toast } from "@/components/ui/use-toast"

const UserAuthImage = ({ applicationConfig }) => {
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(applicationConfig?.cover_photo)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { remove } = useSecureStorage();

    const onSuccessCallback = () => {
        remove("application-config");

        toast({
            title: "Successful",
            description: "Cover image was updated successfully",
            variant: "success",
        });

        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    const [mutate, { isLoading }] = useMutate({ callback: onSuccessCallback });

    const { handleSubmit, setValue } = useForm<any>();

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setValue("cover_photo", file)

            const reader = new FileReader()
            reader.onload = (event) => {
                setCoverImagePreview(event.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = useCallback(async (data: Record<string, any>) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })

        return await mutate("/admin/application-configs", formData);
    }, [mutate]);

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleUploadClick = () => {
        if (coverImagePreview) {
            // If there's an image, submit the form
            handleSubmit(onSubmit)();
        } else {
            // If no image, trigger file input
            triggerFileInput();
        }
    }

    return (
        <Card className="w-full col-span-1">
            <CardHeader>
                <CardTitle className=" flex justify-between items-center">
                    <span>General Cover Image</span>

                    <Button 
                        size={'sm'} 
                        onClick={handleUploadClick}
                        disabled={isLoading}
                    >
                        {coverImagePreview ? (isLoading ? 'Saving...' : 'Save') : 'Upload'}
                    </Button>
                </CardTitle>
                <CardDescription>
                    <span className="text-sm text-muted-foreground block">
                        Recommended: 1000×800px | JPG, PNG, or WEBP | 4:3 aspect ratio
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                        className="border-2 border-dashed
                        h-80
                        border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                        onClick={triggerFileInput}
                    >
                        {coverImagePreview ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={coverImagePreview || "/placeholder.svg"}
                                    alt="Cover image preview"
                                    className="max-h-full max-w-full object-contain rounded"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-4">
                                <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Click to upload cover image</p>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="cover_photo"
                            name="cover_photo"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleCoverImageChange}
                            className="hidden"
                        />
                    </div>
                    {coverImagePreview && (
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={triggerFileInput}
                            className="mt-4 w-full"
                        >
                            <UploadIcon className="h-4 w-4 mr-2" />
                            Change Cover Image
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}

export default UserAuthImage