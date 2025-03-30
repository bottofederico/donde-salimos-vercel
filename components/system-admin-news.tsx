"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, Calendar } from "lucide-react"

// Datos de ejemplo para novedades
const mockNews = [
  {
    id: 1,
    title: "Festival de Música en vivo",
    date: "15 de Abril, 2024",
    status: "active",
  },
  {
    id: 2,
    title: "Noche de Cócteles 2x1",
    date: "20 de Abril, 2024",
    status: "scheduled",
  },
  {
    id: 3,
    title: "DJ Internacional en Club Nocturno",
    date: "28 de Abril, 2024",
    status: "scheduled",
  },
  {
    id: 4,
    title: "Semana Gastronómica en Bares de la Ciudad",
    date: "1-7 de Mayo, 2024",
    status: "scheduled",
  },
]

export function SystemAdminNews() {
  const [news, setNews] = useState(mockNews)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNews = news.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar novedades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Novedad
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novedades y Eventos</CardTitle>
          <CardDescription>Gestiona las novedades y eventos de la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {item.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "active" ? "default" : item.status === "scheduled" ? "secondary" : "outline"
                      }
                    >
                      {item.status === "active" ? "Activo" : item.status === "scheduled" ? "Programado" : "Archivado"}
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

