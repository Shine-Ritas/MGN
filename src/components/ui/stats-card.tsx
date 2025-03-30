import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  color: "violet" | "cyan" | "purple" | "green" | "amber" | "red" | "blue"
  formatter?: (value: number) => string
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color,
  formatter = (val) => val.toString()
}: StatsCardProps) {
  // Color mappings
  const colorMap = {
    violet: {
      iconColor: "text-violet-400",
      gradientFrom: "from-primary-muted",
      gradientTo: "to-phover",
      borderColor: "border-violet-500/30",
      textGradient: "from-violet-400 to-purple-400",
      trendColor: "text-violet",
      neonClass: "neon-text-violet"
    },
    cyan: {
      iconColor: "text-cyan-400",
      gradientFrom: "from-cyan-500/10",
      gradientTo: "to-blue-500/10",
      borderColor: "border-cyan-500/30",
      textGradient: "from-cyan-400 to-blue-400",
      trendColor: "text-cyan-400",
      neonClass: "neon-text-cyan"
    },
    purple: {
      iconColor: "text-purple-400",
      gradientFrom: "from-purple-500/10",
      gradientTo: "to-pink-500/10",
      borderColor: "border-purple-500/30",
      textGradient: "from-purple-400 to-pink-400",
      trendColor: "text-purple-400",
      neonClass: "neon-text-purple"
    },
    green: {
      iconColor: "text-green-400",
      gradientFrom: "from-green-500/10",
      gradientTo: "to-emerald-500/10",
      borderColor: "border-green-500/30",
      textGradient: "from-green-400 to-emerald-400",
      trendColor: "text-green-400",
      neonClass: "neon-text-green"
    },
    amber: {
      iconColor: "text-amber-400",
      gradientFrom: "from-amber-500/10",
      gradientTo: "to-yellow-500/10",
      borderColor: "border-amber-500/30",
      textGradient: "from-amber-400 to-yellow-400",
      trendColor: "text-amber-400",
      neonClass: "neon-text-amber"
    },
    red: {
      iconColor: "text-red-400",
      gradientFrom: "from-red-500/10",
      gradientTo: "to-rose-500/10",
      borderColor: "border-red-500/30",
      textGradient: "from-red-400 to-rose-400",
      trendColor: "text-red-400",
      neonClass: "neon-text-red"
    },
    blue: {
      iconColor: "text-blue-400",
      gradientFrom: "from-blue-500/10",
      gradientTo: "to-indigo-500/10",
      borderColor: "border-blue-500/30",
      textGradient: "from-blue-400 to-indigo-400",
      trendColor: "text-blue-400",
      neonClass: "neon-text-blue"
    }
  }

  const colors = colorMap[color]

  return (
    <Card className="  overflow-hidden relative group transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/20">
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`absolute inset-0 border ${colors.borderColor} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}></div>
      <CardHeader className="relative z-10 pb-2">
        <CardDescription className="text-gray-400 flex items-center justify-between">
          {title}
          {trend && (
            <span className={`${trend.isPositive ? colors.trendColor : 'text-red-400'} flex items-center text-sm font-medium`}>
              {trend.value}%
              <span className="ml-1">
                {trend.isPositive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 7-7 7 7"></path>
                    <path d="M12 19V5"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"></path>
                    <path d="m19 12-7 7-7-7"></path>
                  </svg>
                )}
              </span>
            </span>
          )}
        </CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight text-white flex items-center mt-1">
          <Icon className={`mr-3 h-6 w-6 ${colors.iconColor}`} />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${colors.textGradient} ${colors.neonClass}`}>
            {typeof value === 'number' ? formatter(value) : value} 
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pt-0">
        <div className="text-gray-400 text-sm">{description}</div>
      </CardContent>
    </Card>
  )
}
