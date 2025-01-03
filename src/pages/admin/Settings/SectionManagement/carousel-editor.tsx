
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import FindMogouSection from './find-mogou'
import { MogousType } from '../../Comics/type'
import useMutate from '@/hooks/useMutate'
import useQuery from '@/hooks/useQuery'
import { toast } from '@/components/ui/use-toast'
import CardCarouselSlider from '@/pages/users/home/carousel/CardCarouselSlider'
import MCardCarouselSlider from '@/pages/users/home/carousel/MCardCarouselSlider'
import AlertBox from '@/components/ui/AlertBox'
import { BiTrash } from 'react-icons/bi'


export interface FindMogouItemType extends MogousType {
  is_selected: boolean;
  is_visible: boolean;
}

const replaceUtr = (text : string)=>
{
  return text.replace(/_/g, " ");
}

type carouselType = "type1" | "type2";

type EnhancedCarouselManagerProps = {
  type: string;
  carousel_type: carouselType;
};

export default function EnhancedCarouselManager({type,carousel_type} : EnhancedCarouselManagerProps) {

  const [carouselProducts, setCarouselProducts] = useState<FindMogouItemType[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [addCarouselServer] = useMutate();
  const [toggleProductVisibilityServer] = useMutate();
  const [emptySection,{isLoading:isCleaning}] = useMutate();
  const [removeChild] = useMutate();


  const toggleProductVisibility = async (item: FindMogouItemType) => {

    const response= await toggleProductVisibilityServer(`/admin/section_items/visibility`,{
      section : type,
      child : item.id,
      visibility : !item.is_visible
    });

    if (response) {
      setCarouselProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === item.id ? { ...product, is_visible: !product.is_visible } : product
        )
      )
      toast({title: "Success",description: response?.message,variant: "success"})
    }

  }

  const emptySectionServer = async () => {
    const response = await emptySection(`/admin/sections/${type}/empty`) as any;
    if (!response.error) {
      setCarouselProducts([])
      toast({title: "Success",description: response?.message,variant: "success"})
    }
  }

  const {data,isLoading} = useQuery(`/admin/sections/${type}`);

  useEffect(()=>{
    if(!isLoading && data)
    {
    setCarouselProducts(data?.baseSection);
    }
  },[data,isLoading])

  const addToCarousel = async (item: FindMogouItemType) => {
    const response = await addCarouselServer(`admin/sections/${type}`, { child: item.id }) as any;
    if (response && response?.error) {
        return false
    }
    else{
      setCarouselProducts(prev => [
        ...prev,
        {
          ...item,
          is_visible: true,
        },
      ])

      return true
    }

  }

  const removeProductFromCarousel = async (id: number) => {
    const response = await removeChild(`admin/sections/${type}/delete`, { child: id }) as any;
    
    if(response)
    {
      toast({title: "Success",description: response?.message,variant: "success"})
      setCarouselProducts(prev => prev.filter(product => product.id !== id))
    }
  }

  return (
    <div className="py-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center capitalize">
            <span>{replaceUtr(type)}</span>
         
            <div className=" flex items-center gap-4">
              <AlertBox
              disabled={isCleaning}
              alertTitle="Clearing All Data"
              alertDescription="Are you sure to remove all ?"
              alertActionConfirmText="Sure"
              alertConfirmAction={emptySectionServer}
              btnText={
                <BiTrash className="w-5 h-5 text-red-600 hover:text-red-400 hover:scale-110 transition-all" />
             }
        />
            <FindMogouSection isOpen={isAddProductOpen} isOpenChange={setIsAddProductOpen} section_type={type} carouselProducts={carouselProducts}  addToCarousel={addToCarousel} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-80 overflow-y-scroll">
            {carouselProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={`toggle-${product.id}`} className="text-sm font-medium">
                    {product.title}
                  </Label>
                  <p className="text-sm text-muted-foreground pe-10">{
                      product.description.length > 170 ? product.description.slice(0,170) + "..." : product.description
                    }</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`toggle-${product.id}`}
                    checked={product.is_visible}
                    onCheckedChange={() => toggleProductVisibility(product)}
                  />
                  <Button variant="outline" size="sm" onClick={() => removeProductFromCarousel(product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Carousel Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {
            carousel_type == "type1" ? <CardCarouselSlider isLoading={isLoading} collection={carouselProducts} /> : <MCardCarouselSlider isLoading={isLoading} collection={carouselProducts} />
          }
        </CardContent>
      </Card>
    </div>
  )
}