import { Sheet, SheetContent, SheetFooter, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from '../ui/sheet'
import { Link, useNavigate } from 'react-router-dom'
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
import useLazyQuery from '@/hooks/useLazyQuery'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { useScreenDetector } from '@/hooks/useScreenDetector'
import { useCallback, useState } from 'react'


const MobileSidebarSheet = () => {
    const categories = useAppSelector((state) => state.categories.categories)!;
    const applicationConfig = useSelector(selectApplicationConfig);
    const { isMobile } = useScreenDetector();
    const authUser = useUserAppSelector(selectAuthUser);
    const logout = useLogout();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const { executeQuery } = useLazyQuery({
        callback: (data, meta) => {
            const slug = data.mogou.slug;
            window.location.href = `/show/${slug}`;
        }
    });

    const handleRandomClick = useCallback(() => {
        executeQuery('users/random/mogous');
    }, [executeQuery, setOpen]);

    const handleNavigate = useCallback((path: string) => {
        navigate(path as string);
        setOpen(false);
    }, [navigate, setOpen]);

    const handleLogout =  useCallback(() => {
        logout();
        setOpen(false);
    }, [logout, setOpen]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            {
                isMobile && <SheetContent side="left" className='w-[60vw]'>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                    <nav className="flex flex-col  text-lg font-medium text-muted-foreground pt-12 min-h-[85vh]">

                            <div
                                onClick={() => handleNavigate('/')}
                                className="flex  py-3 z-40 items-center justify-between text-lg font-medium transition-colors hover:text-accent-foreground w-full cursor-pointer">
                                Home
                            </div>

                        <div className="pt-4 pb-3">
                                <div
                                    onClick={() => handleNavigate('/filter')}
                                    className="text-lg flex items-center justify-between cursor-pointer">
                                    Search
                                </div>
                        </div>

                        <Accordion type="multiple" data-state='open'>

                            <AccordionItem value="item-1" className='border-none '>
                                <AccordionTrigger
                                    className="hover:no-underline text-lg">
                                    Types
                                </AccordionTrigger>
                                <AccordionContent className='max-h-96 overflow-y-scroll '>
                                    <SidebarAccordions 
                                        collection={ComicType} 
                                        type="type" 
                                        linkWrapper={(link, category) => (
                                            <SheetClose asChild key={category.id}>
                                                {link}
                                            </SheetClose>
                                        )}
                                    />
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
                                    <SidebarCategory 
                                        collection={categories} 
                                        type="genres" 
                                        linkWrapper={(link, category) => (
                                            <SheetClose asChild key={category.id}>
                                                {link}
                                            </SheetClose>
                                        )}
                                    />

                                </AccordionContent>
                            </AccordionItem>
                            <div
                                onClick={handleRandomClick}
                                className="flex  py-4 z-40 items-center justify-between text-lg font-medium transition-colors hover:text-accent-foreground w-full cursor-pointer">
                                Random
                            </div>
                            <div className=" py-4">
                                {
                                    !authUser && (
                                        <SheetClose asChild>
                                            <Link
                                                to="/login"
                                                className="text-lg flex items-center justify-between">
                                                Login
                                            </Link>
                                        </SheetClose>
                                    )
                                }
                                {
                                    authUser && (
                                        <div className="flex  ">
                                            <AlertBox alertTitle="Logout" alertDescription="Are you sure you want to logout?" alertActionConfirmText="Logout" alertConfirmAction={handleLogout}
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
                                        size='w-6 h-6'
                                    />
                                ))
                            }
                        </div>
                        <div className="flex flex-row gap-5 items-center justify-center">
                            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} {applicationConfig?.title}.</span>
                        </div>
                    </SheetFooter>
                </SheetContent>
            }

        </Sheet>

    )
}

export default MobileSidebarSheet