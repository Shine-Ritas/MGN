import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, EyeIcon, HeartIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"
import UserDetailAction from "./UserDetailAction"

export default function UserDetail() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    userCode: "JD123456",
    subscription: "Premium",
    subscriptionEndDate: "2023-12-31",
    favoritedComics: [
      { title: "Spider-Man", description: "The amazing web-slinger", views: 1000000, image: "/placeholder.svg?height=200&width=150" },
      { title: "Batman", description: "The Dark Knight", views: 950000, image: "/placeholder.svg?height=200&width=150" },
      { title: "Wonder Woman", description: "Amazonian princess", views: 900000, image: "/placeholder.svg?height=200&width=150" },
      { title: "X-Men", description: "Mutant superheroes", views: 850000, image: "/placeholder.svg?height=200&width=150" },
      { title: "Nani web", description: "Mutant superheroes", views: 123212, image: "/placeholder.svg?height=200&width=150" },
      { title: "Acelase", description: "Mutant superheroes", views: 2132, image: "/placeholder.svg?height=200&width=150" },
    ],
  }

  const loginHistory = [
    { date: "2023-05-01", time: "09:30 AM", device: "iPhone 12", location: "New York, USA" },
    { date: "2023-04-28", time: "02:15 PM", device: "MacBook Pro", location: "New York, USA" },
    { date: "2023-04-25", time: "11:45 AM", device: "Windows PC", location: "Boston, USA" },
  ]

  return (
    <div className="pt-3 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>Manage your profile information and account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="flex">
                <UserIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <Input id="name" value={user.name} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex">
                <MailIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <Input id="email" type="email" value={user.email} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex">
                <LockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <Input id="password" type="password" value="********" readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-code">User Code</Label>
              <Input id="user-code" value={user.userCode} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subscription">Current Subscription</Label>
              <Input id="subscription" value={user.subscription} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subscription-end">Subscription End Date</Label>
              <div className="flex">
                <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <Input id="subscription-end" value={user.subscriptionEndDate} readOnly />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
        <UserDetailAction />


        <Card className="col-span-2 md:col-span-1 h-full">
          <CardHeader>
            <CardTitle>Login History</CardTitle>
            <CardDescription>Recent account access information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.map((login, index) => (
                  <TableRow key={index}>
                    <TableCell>{login.date}</TableCell>
                    <TableCell>{login.time}</TableCell>
                    <TableCell>{login.device}</TableCell>
                    <TableCell>{login.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>

       

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Favorite Comics</CardTitle>
            <CardDescription>Your most loved comic books</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {user.favoritedComics.map((comic, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] relative mb-4">
                      <img
                        src={comic.image}
                        alt={comic.title}
                        className="object-cover rounded-md"
                        style={{ width: '100%', height: '100%' }}
                      />
                      <HeartIcon className="absolute top-2 right-2 w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="font-bold mb-2">{comic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{comic.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {comic.views.toLocaleString()} views
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}