import { Dialog, DialogContent, DialogTrigger } from './dialog'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

export default function ZoomableImage({
  src,
  alt,
  className,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) return null
  return (
    <Dialog >
      <DialogTrigger asChild>
        <img
          src={src}
          alt={alt || ''}
          className={className}
         
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-fit border-0 bg-transparent p-0  max-h-[calc(80vh)] overflow-scroll ">
        <div className="relative   rounded-md bg-transparent shadow-md  flex justify-center">
          <img src={src} alt={alt || ''} className="h-full w-[40vw] object-cover " />
        </div>
      </DialogContent>
    </Dialog>
  )
}
