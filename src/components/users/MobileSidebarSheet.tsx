import { SheetContent } from '../ui/sheet'
import { Link } from 'react-router-dom'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import SidebarCategory from './SidebarCategory'
import SidebarAccordions from './SidebarCategory'
import { useAppSelector } from '@/redux/hooks'
import { Badge } from '../ui/badge'
import { ComicType } from '@/data/data'


const MobileSidebarSheet = () => {

    const categories = useAppSelector((state) => state.categories.categories) !;

    return (
        <SheetContent side="left">
            <nav className="grid gap-4 text-lg font-medium text-muted-foreground pt-12">

                <Accordion type="multiple">
                    <AccordionItem value="item-1"  className='border-none '>
                        <AccordionTrigger
                            className="hover:no-underline text-xl b">
                               Types
                            </AccordionTrigger>
                        <AccordionContent className='max-h-96 overflow-y-scroll '>
                            <SidebarAccordions collection={ComicType} type="type" />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2"
                    className='border-none '
                    >
                    <AccordionTrigger
                            className="hover:no-underline text-xl">
                               Categories
                            </AccordionTrigger>
                        <AccordionContent className=' h-96 overflow-y-scroll'>
                        <SidebarCategory collection={categories} type="genres" />

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Link
                    to="#"
                    className="text-xl flex items-center justify-between">
                    Saved
                    <Badge className="text-sm ml-2">3</Badge>
                </Link> 

                
           
            </nav>
        </SheetContent>
    )
}

export default MobileSidebarSheet