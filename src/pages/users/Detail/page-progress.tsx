import { cn } from '@/utilities/util'
import { memo, useCallback } from 'react'

interface PageProgressBarProps {
  totalPages: number
  currentPage: number
  currentPageColor?: string
  previousPagesColor?: string
  width?: string
  height?: string
  className?: string
  type?: string
  onClick: (index: number) => void
}

export function PageProgressBar({
  totalPages,
  currentPage,
  width = 'w-full',
  className,
  onClick
}: PageProgressBarProps) {

  const handleOnClick = useCallback((index: number) => {
    onClick(index)
  }, [onClick])
  return (
    <div
      className={cn("flex rounded-full overflow-hidden  transition-all divide-x-2 h-2 hover:h-3", width, className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalPages}
      aria-valuenow={currentPage}
      aria-label={`Reading progress: page ${currentPage} of ${totalPages}`}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <ProgressStep
          key={index}
          index={index + 1}
          isCurrentActive={currentPage === index + 1}
          isActived={currentPage >= index + 1}
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
}: {
  index: number;
  isCurrentActive: boolean;
  isActived: boolean;
  onClick: (index: number) => void;
}) {
  return (
      <div
        onClick={() => onClick(index)}
        className={cn(
          "flex-1 transition-all duration-300 hover:bg-phover",
          (isActived ? (isCurrentActive ? "bg-phover" : "bg-neon-primary") : "bg-slate-500"),
        )}
      ></div>

  );
});


