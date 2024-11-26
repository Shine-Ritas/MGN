import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { NewChapterInfo } from "./new-chapter"


type ChapterVisualProps = {
    isCard1Submitted: boolean,
    chapterInfo : NewChapterInfo
}


const ChapterVisual = ({isCard1Submitted,chapterInfo} :ChapterVisualProps) => {
    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null)
    const [coverImage, setCoverImage] = useState<File | null>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (e.target.files && e.target.files[0]) {
          setter(e.target.files[0])
        }
    }

    return (
        <Card className="relative overflow-hidden">
        {!isCard1Submitted && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <Lock className="w-12 h-12 text-muted-foreground" />
            <h3>Create Chapter Information First</h3>
        </div>
        )}
        <CardHeader>
        <CardTitle>Chapter Visuals</CardTitle>
        <CardDescription>Upload thumbnail and cover photo for the chapter.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail (Square)</Label>
            <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setThumbnailImage)}
            disabled={!isCard1Submitted}
            />
            {thumbnailImage && (
            <div className="mt-2">
                <img
                src={URL.createObjectURL(thumbnailImage)}
                alt="Thumbnail preview"
                className="w-32 h-32 object-cover rounded"
                />
            </div>
            )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="coverPhoto">Cover Photo (Vertical)</Label>
            <Input
            id="coverPhoto"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setCoverImage)}
            disabled={!isCard1Submitted}
            />
            {coverImage && (
            <div className="mt-2">
                <img
                src={URL.createObjectURL(coverImage)}
                alt="Cover photo preview"
                className="w-32 h-48 object-cover rounded"
                />
            </div>
            )}
        </div>
        </CardContent>
    </Card>
    )
}

export default ChapterVisual