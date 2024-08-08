import ComicTable from "./ComicTable"

import { Button } from "@/components/ui/button"

import {
    Tabs,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { adminRouteCollection } from "@/constants/constants"
import {  PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"


const Index = () => {
    const navigate = useNavigate();

    return (
        <main className=" flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto flex-1 auto-rows-max gap-4 grid-cols-1">

        <Tabs defaultValue="all" className="w-full justify-between bg-sc">
        <div className="flex items-center w-full justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
           
            <Button size="sm" className="h-8 gap-1"  onClick={()=> navigate(adminRouteCollection.comicsActions)} >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add
              </span>
            </Button>
          </div>
        </div>

        </Tabs>
        <div className="mt-8">
            <ComicTable/>
        </div>
        </div>
    </main>
    )
}

export default Index