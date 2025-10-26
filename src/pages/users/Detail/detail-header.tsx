import { useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import { Separator } from "@radix-ui/react-separator";

const DetailHeader = () => {

    const readSetting = useUserAppSelector(selectUserReadSetting);
    const chapter = readSetting?.serverResponse;
    
    
  return (
    <div>
        {chapter?.current_chapter?.title}
        {chapter?.mogou.title}
        <Separator className="w-full h-[2px] bg-primary mt-8" />
    </div>
  )
}

export default DetailHeader