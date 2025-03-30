"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  CalendarDays,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react"

// Datos de ejemplo para el dashboard
const mockData = {
  stats: {
    visits: 1245,
    reservations: 87,
    reviews: 32,
    rating: 4.5,
  },
  recentReservations: [
    {
      id: 1,
      name: "Juan Pérez",
      date: "15/04/2024",
      time: "20:30",
      people: 4,
      status: "confirmed",
    },
    {
      id: 2,
      name: "María García",
      date: "15/04/2024",
      time: "21:00",
      people: 2,
      status: "confirmed",
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      date: "16/04/2024",
      time: "19:30",
      people: 6,
      status: "pending",
    },
    {
      id: 4,
      name: "Laura Martínez",
      date: "16/04/2024",
      time: "20:00",
      people: 3,
      status: "confirmed",
    },
  ],
  recentReviews: [
    {
      id: 1,
      user: {
        name: "Ana López",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "12/04/2024",
      content: "Excelente servicio y ambiente. Volveré pronto.",
    },
    {
      id: 2,
      user: {
        name: "Diego Sánchez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "10/04/2024",
      content: "Buena comida y bebidas. El servicio podría mejorar un poco.",
    },
    {
      id: 3,
      user: {
        name: "Sofía Ramírez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "08/04/2024",
      content: "Me encantó la música en vivo. Ambiente muy agradable.",
    },
  ],
}

export function AdminDashboardOverview() {
  const [period, setPeriod] = useState("week")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.visits}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+12%</span>
              <span className="ml-1">vs. periodo anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservas</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.reservations}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+5%</span>
              <span className="ml-1">vs. periodo anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reseñas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.reviews}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">-3%</span>
              <span className="ml-1">vs. periodo anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calificación</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.rating}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+0.2</span>
              <span className="ml-1">vs. periodo anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reservations">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reservations">Reservas recientes</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas recientes</TabsTrigger>
        </TabsList>
        <TabsContent value="reservations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservas recientes</CardTitle>
              <CardDescription>Gestiona las reservas de tu establecimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{reservation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{reservation.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>{reservation.date}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{reservation.time}</span>
                          <span className="mx-1">•</span>
                          <Users className="h-3 w-3 mr-1" />
                          <span>{reservation.people} personas</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={reservation.status === "confirmed" ? "default" : "outline"}>
                      {reservation.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/reservas">
                  Ver todas las reservas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reseñas recientes</CardTitle>
              <CardDescription>Revisa y responde a las opiniones de tus clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{review.user.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/resenas">
                  Ver todas las reseñas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

