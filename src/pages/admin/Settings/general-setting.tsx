import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Upload } from "lucide-react"
import MaintenanceAction from "./General/maintenance-action"
import useQuery from "@/hooks/useQuery"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"

const GeneralSetting = () => {
    const { data, isLoading } = useQuery(`/application-configs`);
    const coverImageInput = useRef<HTMLInputElement>(null);
    const [currentCover, setCurrentCover] = useState<any>(null);


    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                <div className="grid auto-rows-max items-start gap-4 grid-cols-3 lg:col-span-3 lg:gap-8">

                    <MaintenanceAction isActive={data?.user_side_is_maintenance_mode} />

                    <Card className="overflow-hidden col-span-1 h-full">
                        <CardHeader>
                            <CardTitle>Application Logo</CardTitle>
                            <CardDescription>
                                Your logo will be displayed in the header of your application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <Input type="file"
                                    ref={coverImageInput}
                                    onChange={(e) => {
                                        setCurrentCover(URL.createObjectURL(e.target.files?.[0]!));
                                    }}
                                    className="hidden" />

                                <div className="grid grid-cols-3 gap-2">
                                    {
                                        currentCover ? <img src={currentCover}
                                            onClick={() => {
                                                coverImageInput.current?.click();
                                            }}
                                            alt="cover" className="flex aspect-auto w-full items-center justify-center rounded-md border min-w-28 object-contain " /> :
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    coverImageInput.current?.click();
                                                }}
                                                className="flex aspect-auto w-full bg-background items-center justify-center border-2 rounded-md  border-dashed min-h-32 min-w-28">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                            </button>
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">



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