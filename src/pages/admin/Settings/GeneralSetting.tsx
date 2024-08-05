import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const GeneralSetting = () => {
    return (
        <div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Name</CardTitle>
                            <CardDescription>
                                Used to identify your store in the marketplace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>

                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        defaultValue="Gamer Gear Pro Controller"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                        className="min-h-32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Application Logo</CardTitle>
                            <CardDescription>
                                Your logo will be displayed in the header of your application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">

                                <div className="grid grid-cols-3 gap-2">
                                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Upload</span>
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>

            <div className="flex items-center justify-center gap-2 md:hidden mt-4">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Apply</Button>
            </div>
        </div>
    )
}

export default GeneralSetting