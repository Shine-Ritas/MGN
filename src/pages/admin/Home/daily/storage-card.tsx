"use client"

import { HardDrive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StorageCard({total,used,percentage}) {
 
  return (
      <Card className="w-full col-span-2 overflow-hidden relative">

        <CardHeader className="relative z-10 border-b ">
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="h-5 w-5 " />
            <span className=" text-muted-foreground font-bold">
              Storage Overview
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 pt-3">
          <div className="space-y-4">
            {/* Storage usage percentage */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Current Usage</span>
              <span className="text-white font-mono text-lg font-bold">{percentage}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 w-full bg-gray-900  rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-neon-primary transition-all duration-700 ease-in-out"
                style={{ width: `${percentage}%` }}
              />
              <div
                className="absolute top-0 h-full rounded-full bg-gradient-to-r from-primary to-neon-primary opacity-50 blur-sm transition-all duration-700 ease-in-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Storage details */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                <span className="text-violet font-mono font-bold text-shadow-neon">{used} GB</span> used
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-violet font-mono font-bold text-shadow-neon">{total} GB</span>{" "}
                total
              </div>
            </div>
          </div>
        </CardContent>

      </Card>
  )
}

