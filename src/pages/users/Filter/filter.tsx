import { Button } from '@/components/ui/button'
import { ChevronDown, Search } from 'lucide-react'

const FilterComponent = () => {

    
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 text-xs">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    />
                    <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
                </div>

                {["Type", "Status","Recently Updated"].map((filter) => (
                    <button
                        key={filter}
                        className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    >
                        <span>{filter}</span>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    </button>
                ))}
                
                <Button
                    size={'sm'}
                    className=" text-white px-6 py-2 rounded-sm">FILTER</Button>
            </div>

         
        </>
    )
}

export default FilterComponent
