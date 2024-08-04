import { SheetContent } from '../ui/sheet'
import { Link } from 'react-router-dom'
import { Package2 } from 'lucide-react'

const MobileSidebarSheet = () => {

  return (
    <SheetContent side="left">
    <nav className="grid gap-6 text-lg font-medium">
        <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold"
        >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
            to="#"
            className="text-muted-foreground hover:text-foreground"
        >
            Dashboarddd 
        </Link>
        <Link
            to="#"
            className="text-muted-foreground hover:text-foreground"
        >
            Orders
        </Link>
        <Link
            to="#"
            className="text-muted-foreground hover:text-foreground"
        >
            Products
        </Link>
        <Link
            to="#"
            className="text-muted-foreground hover:text-foreground"
        >
            Customers
        </Link>
        <Link to="#" className="hover:text-foreground">
            Settings
        </Link>
    </nav>
</SheetContent>
  )
}

export default MobileSidebarSheet