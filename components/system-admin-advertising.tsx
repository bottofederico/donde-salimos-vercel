"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, Calendar } from "lucide-react"

// Datos de ejemplo para publicidad
const mockAds = [
  {
    id: 1,
    title: "Happy Hour 2x1",
    business: "Bar La Esquina",
    startDate: "01/04/2024",
    endDate: "30/04/2024",
    status: "active",
  },
  {
    id: 2,
    title: "Noche de música en vivo",
    business: "Bar La Esquina",
    startDate: "15/04/2024",
    endDate: "15/05/2024",
    status: "active",
  },
  {
    id: 3,
    title: "Descuento para estudiantes",
    business: "Boliche Noche",
    startDate: "01/03/2024",
    endDate: "01/04/2024",
    status: "expired",
  },
]

export function SystemAdminAdvertising() {
  const [ads, setAds] = useState(mockAds)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAds = ads.filter(
    (ad) =>
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.business.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar publicidad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Publicidad
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publicidad</CardTitle>
          <CardDescription>Gestiona la publicidad de la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Establecimiento</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAds.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.title}</TableCell>
                  <TableCell>{ad.business}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {ad.startDate} - {ad.endDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={ad.status === "active" ? "default" : ad.status === "scheduled" ? "secondary" : "outline"}
                    >
                      {ad.status === "active" ? "Activo" : ad.status === "scheduled" ? "Programado" : "Expirado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

