import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PartialDialogHookType } from "@/hooks/useDialog"
import { useRef, useState } from "react"
import useMutate from '@/hooks/useMutate'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const bannerSources = [
    {
        name: 'File Upload',
        field_name: 'cover_photo',
        value: 'file'
    },
    {
        name: 'Insert Source Url',
        field_name: 'source_url',
        value: 'text',
    }
]

const resetRef = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current!.value = ''
}

const BannerUploadModal = ({ isOpen, onClose, data }: PartialDialogHookType) => {

    const [sourceType, setSourceType] = useState(bannerSources[0]);
    const uploadRef = useRef<HTMLInputElement>(null);
    const redirectRef = useRef<HTMLInputElement>(null);

    const onSuccessCallback = () => {
        toast({
            title: 'Banner Updated',
            description: 'Banner has been updated successfully',
            variant: 'success'
        });

        onClose()
        resetRef(uploadRef)
        resetRef(redirectRef)
    }
    
      const [upload, { isLoading }] = useMutate({ callback: onSuccessCallback });
    
      const handleSubmit = async (e: any) => {
        const formData = new FormData()
        if (sourceType.value === 'file') {
            formData.append('cover_photo', uploadRef.current!.files![0])
        }
        else{
            formData.append('meta', uploadRef.current!.value)
        }
        formData.append('url', redirectRef.current!.value)
        await upload(`admin/social-info/update/${data!.id }`, formData)
    }

    return (
        <AlertDialog open={isOpen} >
            <AlertDialogContent
                onEscapeKeyDown={onClose}>
                <AlertDialogHeader>
                    <AlertDialogTitle className="w-full flex justify-between ">
                        <h3>{data?.name}</h3>

                        <div className="">
                            <Select value={sourceType.value} onValueChange={(value)=>setSourceType(
                                bannerSources.find(source=> source.value === value) || bannerSources[0]
                            )}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            bannerSources.map((source) => (
                                                <SelectItem key={source.value} value={source.value !}>{source.name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                    </AlertDialogTitle>
                    <AlertDialogDescription className="py-8">

                        <div className="flex flex-col text-lg gap-4">
                            <div className="grid w-full items-center gap-3 dark:text-white">
                                <Label htmlFor="picture">Your Banner</Label>

                                <Input id="picture" type={sourceType.value} 
                                ref={uploadRef}
                                placeholder={
                                    sourceType.value == 'file' ? 'Upload a file' : 'Enter a URL'
                                }
                                defaultValue={data?.meta}
                                className=" file:indent-0 file:px-0 cursor-pointer" />
                            </div>

                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="picture">Redirect Url</Label>
                                <Input id="picture" type="text"
                                ref={redirectRef}
                                placeholder="Enter a URL to redirect to"
                                defaultValue={data?.url}
                                className=" " required/>

                            </div>

                        </div>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onClose}
                    >Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    onClick={handleSubmit}
                    disabled={isLoading}
                    >Upload</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BannerUploadModal