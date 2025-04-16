import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon } from "lucide-react"

const UserAuthImage = () => {
    return (
        <Card className="w-full col-span-1">
            <CardHeader>
                <CardTitle>
                    General Cover Image
                </CardTitle>
                <CardDescription>
                    <span className="text-sm text-muted-foreground block">
                        Recommended: 1000×800px | JPG, PNG, or WEBP | 4:3 aspect ratio
                    </span>

                </CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    className="border-2 border-dashed
                    h-80
                    border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                    <div className="flex flex-col items-center justify-center py-4">
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload logo</p>
                    </div>
                </div>

            </CardContent>

        </Card>
    )
}

export default UserAuthImage