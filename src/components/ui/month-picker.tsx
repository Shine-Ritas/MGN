import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/utilities/util"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function MonthPicker({date,setDate}) {
  const [year, setYear] = useState(new Date().getFullYear())
  const [open, setOpen] = useState(false)

  const handleMonthSelect = (monthIndex: number) => {
    // new dat should be end of the month
    const newDate = new Date(year, monthIndex + 1, 0)

    setDate(newDate)
    setOpen(false)
  }

  const changeYear = (increment: number) => {
    setYear(year + increment)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMMM yyyy") : <span>Select month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeYear(-1)}>
              <span className="sr-only">Previous year</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{year}</div>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeYear(1)}>
              <span className="sr-only">Next year</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, i) => {
              const isSelected = date && date.getMonth() === i && date.getFullYear() === year

              return (
                <Button
                  key={month}
                  variant={isSelected ? "default" : "outline"}
                  className={cn("h-9", isSelected && "bg-primary text-primary-foreground")}
                  onClick={() => handleMonthSelect(i)}
                >
                  {month.substring(0, 3)}
                </Button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Missing ChevronLeft and ChevronRight components
function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

