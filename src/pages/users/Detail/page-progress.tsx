import { useUserAppSelector } from '@/redux/hooks'
import { ProgressBarData } from '@/redux/slices/userReadSetting/constants'
import { selectUserReadSetting } from '@/redux/slices/userReadSetting/selectors'
import { cn } from '@/utilities/util'
import { memo, useCallback } from 'react'

interface PageProgressBarProps {
  totalPages: number
  currentPageColor?: string
  previousPagesColor?: string
  width?: string
  height?: string
  className?: string,
  type?: string
  onClick: (index: number) => void
}

export function PageProgressBar({
  totalPages,
  width = 'w-full',
  className,
  onClick,
  type
}: PageProgressBarProps) {

  const handleOnClick = useCallback((index: number) => {
    onClick(index)
  }, [onClick])
  
  const readSetting = useUserAppSelector(selectUserReadSetting);


  return (
    <div
      className={cn("flex rounded-full overflow-visible opacity-50 hover:opacity-80  transition-all divide-x-2 h-1 hover:h-2", width, className)}
      role="progressbar"
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <ProgressStep
          type={type}
          key={index}
          index={index + 1}
          isCurrentActive={readSetting.currentPage === index + 1}
          isActived={readSetting.currentPage >= index + 1}
          onClick={handleOnClick} />
      ))}
    </div>
  )
}

const ProgressStep = memo(function ProgressStep({
  index,
  isCurrentActive,
  isActived,
  onClick,
  type
}: {
  index: number;
  isCurrentActive: boolean;
  isActived: boolean;
  type?: string;
  onClick: (index: number) => void;
}) {

  const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onClick(index)
  }, [onClick, index])
    

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "flex-1 transition-all duration-300 hover:bg-phover relative",
        (isActived ? (isCurrentActive ? "bg-phover" : "bg-neon-primary") : "bg-slate-500"),
      )}
    >
      {
        type == ProgressBarData["LighterEffect"].value && (<>
        <div
          className={cn(
            "absolute -top-8 left-0 w-full h-8 pointer-events-none",
            isCurrentActive && "bg-gradient-to-t from-[#edececb1] to-transparent opacity-60"
          )}
        ></div>
        <span className='absolute -top-5 text-[12px]  text-white transform -translate-x-1/2 left-1/2'>
          {isCurrentActive ? index : ""}  
      </span></>)
      }
      
    </div>

  );
});


