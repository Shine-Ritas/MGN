import { Button } from "@/components/ui/button"
import { ElementType, memo, useCallback } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom"
import { IconType } from "react-icons/lib"

type SidebarIconProps = {
    Icon: ElementType | IconType,
    to: string,
    tooltip: string,
    onClick?: () => void
}

const SidebarIconRaw = ({ Icon, to = "home", tooltip = "Default", onClick }: SidebarIconProps) => {

    const navigate = useNavigate();

    const handleNavigation = useCallback(() => {

        if (onClick) {
            onClick();
        }
        else {
            navigate(to);
        }

    }, [navigate, onClick, to]);

    return (
        <div className="flex items-center justify-center cursor-pointer">
            <TooltipProvider delayDuration={300}   >
                <Tooltip >
                    <TooltipTrigger  asChild >
                        <Button asChild size="icon" onClick={handleNavigation} className="bg-phover" >
                            <div>
                                <Icon className="h-5 w-5" />
                            </div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-phover" >
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

const SidebarIcon = memo(SidebarIconRaw)

export default SidebarIcon