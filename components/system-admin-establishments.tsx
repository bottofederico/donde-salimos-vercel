"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { getBusinesses, type Business } from "@/lib/db"

export function SystemAdminEstablishments() {
  const [businesses, setBusinesses] = useState<Business[]>(getBusinesses())
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar establecimientos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Establecimiento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Establecimientos</CardTitle>
          <CardDescription>Gestiona los bares y boliches registrados en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>
                    <Badge variant={business.type === "bar" ? "default" : "secondary"}>
                      {business.type === "bar" ? "Bar" : "Boliche"}
                    </Badge>
                  </TableCell>
                  <TableCell>{business.location}</TableCell>
                  <TableCell>{business.rating}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Aprobar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Rechazar</span>
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

