
import CategoryTable from "./CategoryTable"
import { Card } from "@/components/ui/card";

const CategoryIndex = () => {
  return (
    <Card className=" flex-1 items-start gap-4 py-4  ">
      <div className="mx-auto flex-1 auto-rows-max  grid-cols-1">
       

        <div className=" text-lg font-semibold">
          <CategoryTable />
        </div>
      </div>
    </Card>
  )
}

export default CategoryIndex