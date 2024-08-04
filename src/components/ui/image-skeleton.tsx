import { Skeleton } from './skeleton'

interface ImageSkeletonProps {
    className?: string
}

const ImageSkeleton = ({className} : ImageSkeletonProps) => {
  return (
    <Skeleton className={`w-full h-full ${className}`} />
  )
}

export default ImageSkeleton