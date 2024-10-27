
import * as React from "react"

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
import { ComicType } from "@/route/data/admin_route";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/routes/helper";

export function DesktopNavigation() {

    const categories = useAppSelector((state) => state.categories.categories) !;


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
                                    <ListItem key={type.id} title={type.title} href={`/types/${type.id}`}>
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
                                    <ListItem  key={category.id} title={category.title} href={`/categories/${category.id}`}>
                                        {category?.title}
                                    </ListItem>
                                ))
                            }
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/docs"  >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            New Releases
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}   

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
    return (
        <li>
                <Link
                    to="?"
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
