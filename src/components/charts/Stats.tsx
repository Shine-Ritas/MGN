import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { primaryColor } from "../global-vars"
import {  LibraryBig, Network, Podcast, Users } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import useQuery from "@/hooks/useQuery"
import numeral from "numeral"

export function CardsStats() {

  const { data } = useQuery(`admin/dashboard/stats`);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-4">


        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Subscriptions</CardTitle>
            <Podcast className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numeral(data?.subscriptions?.current).format("0a") ?? 0}</div>
            <p className={`text-xs text-${data?.subscriptions?.status ?? 0}`}>{data?.subscriptions?.percentage ?? 0}% from last month</p>
          </CardContent>
        </Card>


        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.users?.current}</div>
            <p className={`text-xs text-${data?.users?.status ?? 0}`}>{data?.users?.percentage ?? 0}% registered from last month</p>

          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Traffics</CardTitle>
            <Network  className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numeral(data?.traffics?.current).format("0.00 a")}</div>
            <p className={`text-xs text-${data?.traffics?.status ?? 0}`}>{data?.traffics?.percentage ?? 0}% get traffics from yestarday</p>
          </CardContent>
        </Card>

        
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Contents</CardTitle>
            <LibraryBig  className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numeral(data?.contents?.current).format("0 a")}</div>
            <p className={`text-xs text-${data?.contents?.status ?? 0}`}>{data?.contents?.percentage ?? 0}% get traffics from yestarday</p>
          </CardContent>
        </Card>


      </div>

      <div className="grid gap-4  md:grid-cols-2  mt-8 md:mt-4 mb-12">

        <div className="grid gap-4 grid-cols-0 sm:grid-cols-1">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-normal">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
              <div className="h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <Line
                      type="monotone"
                      strokeWidth={2}
                      dataKey="revenue"
                      activeDot={{
                        r: 6,
                        // 250, 36%, 54% set this value
                        style: { fill: primaryColor }, opacity: 1
                      }}
                      style={
                        {
                          stroke: primaryColor,
                        } as React.CSSProperties
                      }
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-normal">Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
              <div className="mt-4 h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar
                      dataKey="subscription"
                      style={
                        {
                          fill: primaryColor,
                          opacity: 1,
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>


        </div>

        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Chapters Popularity Today </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                <p className="text-sm text-muted-foreground">
                  isabella.nguyen@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$299.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">William Kim</p>
                <p className="text-sm text-muted-foreground">will@email.com</p>
              </div>
              <div className="ml-auto font-medium">+$99.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">
                  sofia.davis@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
          </CardContent>
        </Card>
      </div>

    </>
  )
}