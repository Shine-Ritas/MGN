
import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FindMogouItemType } from './carousel-editor'
import { LazyLoadImage } from 'react-lazy-load-image-component'


interface SlidableCarouselPreviewProps {
  products: FindMogouItemType[]
}

export default function SlidableCarouselPreview({ products = [] }: SlidableCarouselPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleProducts = products.filter(product => product.is_visible)

  useEffect(() => {
    if (currentIndex >= visibleProducts.length) {
      setCurrentIndex(Math.max(0, visibleProducts.length - 1))
    }
  }, [visibleProducts, currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : visibleProducts.length - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < visibleProducts.length - 1 ? prevIndex + 1 : 0
    )
  }

  if (visibleProducts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No visible products in the carousel.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
              aria-label="Previous product"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center">
              <LazyLoadImage src={visibleProducts[currentIndex].cover} alt={visibleProducts[currentIndex].title} className="w-full h-60 object-contain rounded-md" />
              <h3 className="text-lg font-semibold mb-2">{visibleProducts[currentIndex].title}</h3>
              <p className="text-sm px-40 text-muted-foreground">{visibleProducts[currentIndex].description}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
              aria-label="Next product"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-4 space-x-2">
        {visibleProducts.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-2 h-2 rounded-full p-0 ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}