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
import { useAppSelector, useUserAppSelector } from '@/redux/hooks'
import { ComicType } from '@/data/data'
import { selectAuthUser } from '@/redux/slices/user-global'
import useLogout from '@/hooks/useLogout'
import AlertBox from '../ui/AlertBox'


const MobileSidebarSheet = () => {

    const categories = useAppSelector((state) => state.categories.categories)!;

    const authUser = useUserAppSelector(selectAuthUser);

    const logout = useLogout();

    return (
        <SheetContent side="left">
            <nav className="grid gap-4 text-lg font-medium text-muted-foreground pt-12">

                <Accordion type="multiple">
                    <AccordionItem value="item-1" className='border-none '>
                        <AccordionTrigger
                            className="hover:no-underline text-lg b">
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
                            className="hover:no-underline text-lg">
                            Categories
                        </AccordionTrigger>
                        <AccordionContent className=' h-96 overflow-y-scroll'>
                            <SidebarCategory collection={categories} type="genres" />

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {
                    !authUser && <Link
                        to="/login"
                        className="text-xl flex items-center justify-between">
                        Login
                    </Link>
                }
                {
                    authUser && (
                        <div className="flex ">
                            <AlertBox alertTitle="Logout" alertDescription="Are you sure you want to logout?" alertActionConfirmText="Logout" alertConfirmAction={logout}
                        btnText={<>Logout</>} />
                        </div>
                    )
                }
            </nav>
        </SheetContent>
    )
}

export default MobileSidebarSheet