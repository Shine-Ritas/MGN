
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
    <main className=" flex-1 items-start gap-4 py-4  ">
      <div className="mx-auto flex-1 auto-rows-max  grid-cols-1">
          <div className="flex items-center w-full justify-between">
          
            <div className="ml-auto flex items-center gap-2 " >

              <CategoryModal open={modalOpen} setOpen={setModalOpen} setInitCategory={setCategory} initCategory={category} />
            </div>
          </div>

        <div className="mt-4 text-lg font-semibold">
          <CategoryTable setOpen={setModalOpen} setCategory={setCategory}/>
        </div>
      </div>
    </main>
  )
}

export default CategoryIndex