
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CategoryTable from "./CategoryTable"
import { CategoryModal } from "./CategoryModal"
import { useState } from "react";
import { Category } from "./type";


const CategoryIndex = () => {


  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className=" flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto flex-1 auto-rows-max gap-4 grid-cols-1">

        <Tabs defaultValue="all" className="w-full justify-between">
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

              <CategoryModal open={modalOpen} setOpen={setModalOpen} setInitCategory={setCategory} initCategory={category} />
            </div>
          </div>

        </Tabs>
        <div className="mt-8">
          <CategoryTable setOpen={setModalOpen} setCategory={setCategory}/>
        </div>
      </div>
    </main>
  )
}

export default CategoryIndex