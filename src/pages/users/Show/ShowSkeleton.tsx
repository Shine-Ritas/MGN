import { Skeleton } from "@/components/ui/skeleton"


const ShowSkeleton = () => {
  return (
    <div className=" px-6 md:px-24 flex flex-col">

    <div className="">
        <Skeleton className="h-16 w-1/2 mb-4" />

    </div>

    <div className="flex mt-12 ">
        <div className="w-4/5 pe-10">
            <Skeleton className="h-[40vh] w-full mb-4" />
        </div>
        <div className="w-1/5">

        </div>
    </div>

</div>
  )
}

export default ShowSkeleton