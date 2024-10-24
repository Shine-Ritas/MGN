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

const GeneralSetting = () => {
    const { data, isLoading } = useQuery(`/application-configs`);
    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                <div className="grid auto-rows-max items-start gap-4 grid-cols-3 lg:col-span-3 lg:gap-8">

                    <MaintenanceAction isActive={data?.user_side_is_maintenance_mode}/>
                 
                     <Card className="overflow-hidden col-span-1 h-full">
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