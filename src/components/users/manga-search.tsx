"use client"

import { useCallback, useState, useRef, useEffect } from "react"
import { Search, X, Star, Eye, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import useLazyQuery from "@/hooks/useLazyQuery"
import { MogouWithTotalCount } from "@/pages/admin/Comics/type"


export function MangaSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<MogouWithTotalCount[]>([])
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)

  const { executeQuery,isLoading,isFetching } = useLazyQuery({
    callback:(data,meta)=>{
      console.log(data.mogous)
        setResults(data.mogous.data)
    }
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)
    setIsOpen(true)
  }, [executeQuery])

  const handleClear = useCallback(() => {
    setSearchQuery("")
    setIsOpen(false)
    setResults([])
  }, [])

  const handleResultClick = useCallback((manga: MogouWithTotalCount) => {
    navigate(`/show/${manga.slug}`)
    handleClear()
  }, [navigate, handleClear])

  // Handle click outside to close the search panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Debounce search input by 500ms
  useEffect(() => {
    const trimmed = searchQuery.trim()
    const timer = setTimeout(() => {
      if (trimmed.length > 0) {
        executeQuery(`/users/filter?search=${encodeURIComponent(trimmed)}&mogou_total_count=true`)
      } else {
        setResults([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, executeQuery])

  return (
    <div ref={searchRef} className="relative w-full max-w-[200px] lg:max-w-xs focus-within:lg:max-w-sm transition-all group focus-within:!z-[100]">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 pr-8"
        />
        {searchQuery && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full hover:bg-accent"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-popover rounded-lg shadow border border-border overflow-hidden z-50">
          {/* Loading State */}
          {(isLoading || isFetching) && (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
            </div>
          )}

          {/* Results List */}
          {!isLoading && !isFetching && results.length > 0 && (
            <div className="max-h-[400px] overflow-y-auto">
              {results.map((manga) => (
                <div
                  key={manga.id}
                  onClick={() => handleResultClick(manga)}
                  className="flex gap-3 p-3 hover:bg-accent transition-colors cursor-pointer border-b border-border last:border-b-0"
                >
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <img
                      src={manga.cover || "/placeholder.svg"}
                      alt={manga.title} 
                      className="w-[50px] h-[70px] object-cover rounded-md"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-foreground font-medium text-sm mb-1.5 line-clamp-1">{manga.title}</h4>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1.5 flex-wrap">
                      <div className="flex items-center gap-1 text-neon-primary">
                        <Star className="h-3 w-3 text-neon-primary fill-neon-primary" />
                        <span className="font-medium">{manga.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{manga.total_view_count}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span className="text-xs text-muted-foreground">{manga.total_chapters} chapters</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results State */}
          {!isLoading && !isFetching && results.length === 0 && searchQuery.trim().length > 0 && (
            <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
