"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Building, MessageSquare, TrendingUp, ArrowRight, CheckCircle, XCircle } from "lucide-react"

// Datos de ejemplo para el dashboard
const mockData = {
  stats: {
    users: 2547,
    establishments: 156,
    reviews: 8932,
    visits: 45678,
  },
  pendingEstablishments: [
    {
      id: 1,
      name: "Nuevo Bar & Grill",
      type: "Bar",
      location: "Palermo, Buenos Aires",
      date: "14/04/2024",
    },
    {
      id: 2,
      name: "Club Nocturno Elite",
      type: "Boliche",
      location: "Recoleta, Buenos Aires",
      date: "13/04/2024",
    },
    {
      id: 3,
      name: "Cervecería Artesanal",
      type: "Bar",
      location: "San Telmo, Buenos Aires",
      date: "12/04/2024",
    },
  ],
  recentReviews: [
    {
      id: 1,
      user: {
        name: "Ana López",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      establishment: "Bar La Esquina",
      rating: 2,
      date: "14/04/2024",
      content: "Muy mal servicio, no lo recomiendo.",
      status: "pending",
    },
    {
      id: 2,
      user: {
        name: "Diego Sánchez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      establishment: "Boliche Noche",
      rating: 1,
      date: "13/04/2024",
      content: "Precios excesivos y mala atención. No volvería.",
      status: "pending",
    },
    {
      id: 3,
      user: {
        name: "Sofía Ramírez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      establishment: "Pub Irlandés",
      rating: 1,
      date: "12/04/2024",
      content: "Música demasiado alta y bebidas de mala calidad.",
      status: "pending",
    },
  ],
}

export function SystemAdminDashboard() {
  const [period, setPeriod] = useState("week")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.users}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+8%</span>
              <span className="ml-1">vs. periodo anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Establecimientos</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.establishments}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+3%</span>
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
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+12%</span>
              <span className="ml-1">vs. periodo anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.visits}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+15%</span>
              <span className="ml-1">vs. periodo anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="establishments">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="establishments">Establecimientos pendientes</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas por moderar</TabsTrigger>
        </TabsList>
        <TabsContent value="establishments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Establecimientos pendientes de aprobación</CardTitle>
              <CardDescription>Revisa y aprueba los nuevos establecimientos registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.pendingEstablishments.map((establishment) => (
                  <div
                    key={establishment.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{establishment.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Badge variant="outline" className="mr-2">
                          {establishment.type}
                        </Badge>
                        <span>{establishment.location}</span>
                        <span className="mx-1">•</span>
                        <span>Solicitud: {establishment.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Aprobar</span>
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Rechazar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/system-admin/establecimientos">
                  Ver todos los establecimientos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reseñas por moderar</CardTitle>
              <CardDescription>Revisa y modera las reseñas reportadas o con baja calificación</CardDescription>
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
                        <div>
                          <span className="font-medium">{review.user.name}</span>
                          <p className="text-xs text-muted-foreground">
                            {review.establishment} • {review.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant="destructive">{review.rating}/5 ★</Badge>
                    </div>
                    <p className="text-sm mb-2">{review.content}</p>
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" className="h-8">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Aprobar
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/system-admin/resenas">
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

