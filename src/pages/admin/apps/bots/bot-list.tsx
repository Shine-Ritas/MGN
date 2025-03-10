import useQuery from "@/hooks/useQuery"
import { BotCard } from "./bot-card"
import { useNavigate, useParams } from "react-router-dom"
import Goback from "@/components/goback-btn";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import { adminRouteCollection } from "@/routes/data/admin_route";
import { useCallback, useEffect } from "react";
import { useDeleteAlert } from "@/contexts/DeleteAlertContext";
import { DeleteBot } from "./delete-bot";
import useMutate from "@/hooks/useMutate";
import { toast } from "@/components/ui/use-toast";

export default function BotList() {

  const { app: type } = useParams<{ app: string }>();
  const { setOnDelete, setIsLoading } = useDeleteAlert();

  const navigate = useNavigate();
  const { data, isLoading,refetch } = useQuery(`admin/bot-publisher/${type}/list`);

  const [mutate, { isLoading: isMutating }] = useMutate({ callback: undefined })

  const deleteFunction = useCallback(async (itemToDelete: { key: string }) => {
    const response = await mutate(`admin/bot-publisher/remove`, {
      id: itemToDelete.key
    }) as any;
    if (response && response.error) {
      console.log(response.error)
    }
    else {
      toast({
        title: "Success",
        description: "Bot Deleted",
        variant: "success",
      })

      refetch?.();

    }
  }, [refetch]);


  useEffect(() => {
    setOnDelete(() => deleteFunction);
    setIsLoading(isMutating);
  }, [deleteFunction, isMutating, setIsLoading, setOnDelete])


  return (
    <main className="grid items-start gap-8  sm:py-0">
      <div className="flex items-center gap-4 ">
        <Goback to={-1} />
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {type} Bots
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button
            onClick={() => navigate(adminRouteCollection.addBot)}
            variant='default'
            className='flex items-center gap-2'>
            <BotIcon />
          </Button>

        </div>
      </div>
      {
          !isLoading && data?.bots.length == 0 && 
          <div className="min-w-full flex justify-center ">
            <h4 className="">No bots yet</h4>
          </div>
        }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {
          isLoading && <div>Loading...</div>
        }
       
        {
          !isLoading && data?.bots?.map((bot) => (
            <BotCard key={bot.id} {...bot} />
          ))}
      </div>

      <DeleteBot />
    </main>
  )
}

