import { cn } from "@/utilities/util"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted opacity-10", className)}
      {...props}
    />
  )
}

export { Skeleton }
