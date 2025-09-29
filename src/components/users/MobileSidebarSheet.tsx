import { SheetContent, SheetFooter } from '../ui/sheet'
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
import { useSelector } from 'react-redux'
import { selectApplicationConfig } from '@/redux/slices/application-config-slice'
import SocialLinkItem from '../ui/social-link-item'


const MobileSidebarSheet = () => {

    const categories = useAppSelector((state) => state.categories.categories)!;
    const applicationConfig = useSelector(selectApplicationConfig);

    const authUser = useUserAppSelector(selectAuthUser);

    const logout = useLogout();

    return (
        <SheetContent side="left">
            <nav className="grid gap-4 text-lg font-medium text-muted-foreground pt-12 min-h-[85vh]">

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

                    <div className="mt-3">
                        {
                            !authUser && <Link
                                to="/login"
                                className="text-xl flex items-center justify-between">
                                Login
                            </Link>
                        }
                        {
                            authUser && (
                                <div className="flex  ">
                                    <AlertBox alertTitle="Logout" alertDescription="Are you sure you want to logout?" alertActionConfirmText="Logout" alertConfirmAction={logout}
                                        btnText={<>Logout</>} />
                                </div>
                            )
                        }
                    </div>

                </Accordion>

            </nav>

            <SheetFooter className='flex flex-col gap-2 border-t-2 pt-4'>
                <div className="flex flex-row gap-5 items-center justify-center">
                    {
                        applicationConfig?.socials?.map((social, index) => (
                            <SocialLinkItem
                                key={index}
                                socialLink={social}
                                onEdit={() => { }}
                                iconOnly={true}
                            />
                        ))
                    }
                </div>
                <div className="flex flex-row gap-5 items-center justify-center">
                    <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} {applicationConfig?.title}.</span>
                </div>
            </SheetFooter>
        </SheetContent>
    )
}

export default MobileSidebarSheet