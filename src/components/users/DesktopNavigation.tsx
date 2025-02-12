import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/utilities/util";
import { forwardRef } from "react";
import { ComicType } from "@/data/data";

export function DesktopNavigation() {

    const categories = useAppSelector((state) => state.categories.categories)!;


    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                    >Types</NavigationMenuTrigger>
                    <NavigationMenuContent >
                        <ul className="grid gap-3 p-4 w-[160px] grid-cols-1">
                            {
                                ComicType?.map((type) => (
                                    <ListItem key={type.id} title={type.title} 
                                    onClick={() => window.location.href = `/filter?type=${type.title}`}>
                                        {type?.title}
                                    </ListItem>
                                ))
                            }

                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Genres</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
                            {
                                categories?.map((category) => (
                                    <ListItem key={category.id} title={category.title} href={`/categories/${category.id}`}>
                                        {category?.title}
                                    </ListItem>
                                ))
                            }
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        href="/new-releases"
                        className={navigationMenuTriggerStyle()}
                    >
                        New Releases
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
    return (
        <li>
            <Link
                title={title}
                to="/#"
                ref={ref}
                className={cn(
                    "select-none rounded-md  no-underline outline-none transition-colors hover:text-secondary focus:bg-accent focus:text-accent-foreground text-sm font-medium",
                    className
                )}
                {...props}
            >
                {title}

            </Link>
        </li>
    )
})
ListItem.displayName = "ListItem"
