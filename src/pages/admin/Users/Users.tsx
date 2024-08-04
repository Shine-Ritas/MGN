import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Tabs,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import {  PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"


const Users = () => {

    const navigate = useNavigate();

    const cards = Array.from({ length: 30 }, (_, index) => (
        <Card key={index} className="md:min-w-[200px] max-w-[400px] ">
            <CardHeader className="items-center">
                <Avatar className="w-16 h-16  md:h-24 md:w-24">
                    <AvatarImage src="https://github.com/shadcn1.png" />
                    <AvatarFallback>CN {index + 1}</AvatarFallback>
                </Avatar>
            </CardHeader>
            <CardContent className="grid gap-4  justify-items-center ">
                <div className="flex items-center">
                    <p className="text-sm font-medium leading-none">
                         name : {index + 1}
                    </p>
                </div>

                <div className="flex items-center flex-nowrap">
                    {
                        index % 2 ==0 ? (
                            <Badge variant="gold">Lifetime</Badge>
                        ) : (
                            <Badge variant="silver">Access</Badge>
                        )
                    }
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    View Profile
                </Button>
            </CardFooter>
        </Card>
    ));

    return (
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto  flex-1 auto-rows-max gap-4 ">

            <Tabs defaultValue="all" className="w-full justify-between">
            <div className="flex items-center w-full justify-between mb-10">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
               
                <Button size="sm" className="h-8 gap-1"  onClick={()=> navigate('/add/user')} >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add User
                  </span>
                </Button>
              </div>
            </div>

            </Tabs>
            <div className="mx-auto grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-10 md:gap-8 auto-rows-max  col-span-2 ">
                {cards}
            </div>
            </div>
        </main>

    )
};

export default Users