import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Goback from '@/components/goback-btn'

const AddUser = () => {
    return (
        <main className=" flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto  flex-1 auto-rows-max gap-4 ">
                <div className="flex items-center gap-4 mb-10">
                    <Goback to="/users" />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Add User
                    </h1>
                    {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                        Published
                    </Badge> */}
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Goback to="/users" label="Discard"/>

                        <Button size="sm">Register</Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Customization</CardTitle>
                                <CardDescription>
                                    Editing the Comic details
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
                                            defaultValue="Vinland Saga"
                                            name='name'
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            className="w-full"
                                            defaultValue="Vinland Saga"
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            className="w-full"
                                            defaultValue="Vinland Saga"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Subscription</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        {/* <Label htmlFor="tier">Tier</Label> */}
                                        <Select>
                                            <SelectTrigger id="tier" aria-label="Select">
                                                <SelectValue placeholder="Free" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="gold">Free</SelectItem>
                                                <SelectItem value="silver">Silver</SelectItem>
                                                <SelectItem value="free">Gold</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>


                <div className="flex items-center justify-center gap-2 md:hidden  mt-5">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Register</Button>
                </div>
            </div>

        </main>
    )
}

export default AddUser