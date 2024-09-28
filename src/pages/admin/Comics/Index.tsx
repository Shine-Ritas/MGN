import ComicTable from "./ComicTable"


import {
    Tabs,
  
  } from "@/components/ui/tabs"


const Index = () => {

    return (
        <main className=" flex-1  gap-4 md:gap-8">
        <div className="mx-auto flex-1 auto-rows-max gap-4 grid-cols-1">

        <Tabs defaultValue="all" className="w-full justify-between bg-sc">
        </Tabs>
        <div className="mt-1">
            <ComicTable/>
        </div>
        </div>
    </main>
    )
}

export default Index