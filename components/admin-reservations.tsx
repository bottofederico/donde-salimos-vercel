"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Search, Filter, CheckCircle, XCircle, Clock, Phone, Mail, Users } from "lucide-react"
import { getReservationsByBusinessId, updateReservation, type Reservation } from "@/lib/db"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export function AdminReservations() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Cargar reservas
  useEffect(() => {
    if (user?.businessId) {
      const businessReservations = getReservationsByBusinessId(user.businessId)
      setReservations(businessReservations)
    }
  }, [user])

  // Filtrar reservas según los criterios seleccionados
  const filteredReservations = reservations.filter((reservation) => {
    // Filtro por fecha
    if (selectedDate) {
      const reservationDate = parseISO(reservation.date)
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
      const reservationDateStr = format(reservationDate, "yyyy-MM-dd")

      if (selectedDateStr !== reservationDateStr) {
        return false
      }
    }

    // Filtro por estado
    if (statusFilter !== "all" && reservation.status !== statusFilter) {
      return false
    }

    // Filtro por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        reservation.name.toLowerCase().includes(query) ||
        reservation.email.toLowerCase().includes(query) ||
        reservation.phone.includes(query)
      )
    }

    return true
  })

  const handleStatusChange = async (reservationId: number, newStatus: "pending" | "confirmed" | "cancelled") => {
    setIsLoading(true)

    try {
      const updatedReservation = updateReservation(reservationId, { status: newStatus })

      if (updatedReservation) {
        // Actualizar la lista de reservas
        setReservations((prev) => prev.map((res) => (res.id === reservationId ? updatedReservation : res)))

        // Actualizar la reserva seleccionada si es necesario
        if (selectedReservation && selectedReservation.id === reservationId) {
          setSelectedReservation(updatedReservation)
        }

        toast({
          title: "Reserva actualizada",
          description: `La reserva ha sido ${
            newStatus === "confirmed" ? "confirmada" : newStatus === "cancelled" ? "cancelada" : "actualizada"
          } correctamente.`,
        })
      }
    } catch (error) {
      console.error("Error al actualizar la reserva:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar la reserva.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearFilters = () => {
    setSelectedDate(null)
    setStatusFilter("all")
    setSearchQuery("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado de reserva" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o teléfono"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={clearFilters} className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Personas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <TableRow
                        key={reservation.id}
                        onClick={() => setSelectedReservation(reservation)}
                        className="cursor-pointer"
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{reservation.name}</p>
                            <p className="text-sm text-muted-foreground">{reservation.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{format(parseISO(reservation.date), "dd/MM/yyyy")}</p>
                            <p className="text-sm text-muted-foreground">{reservation.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{reservation.people}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reservation.status === "confirmed"
                                ? "default"
                                : reservation.status === "pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {reservation.status === "confirmed"
                              ? "Confirmada"
                              : reservation.status === "pending"
                                ? "Pendiente"
                                : "Cancelada"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {reservation.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(reservation.id, "confirmed")
                                }}
                                disabled={isLoading}
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="sr-only">Confirmar</span>
                              </Button>
                            )}
                            {reservation.status !== "cancelled" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(reservation.id, "cancelled")
                                }}
                                disabled={isLoading}
                              >
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="sr-only">Cancelar</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No se encontraron reservas con los filtros seleccionados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12 text-muted-foreground">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="mx-auto" />
                <p className="mt-4">Selecciona una fecha para ver las reservas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedReservation && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Información del Cliente</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="font-medium w-24">Nombre:</span>
                    <span>{selectedReservation.name}</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href={`mailto:${selectedReservation.email}`} className="hover:underline">
                      {selectedReservation.email}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href={`tel:${selectedReservation.phone}`} className="hover:underline">
                      {selectedReservation.phone}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Detalles de la Reserva</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{format(parseISO(selectedReservation.date), "PPP", { locale: es })}</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedReservation.time}</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedReservation.people} personas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Estado:</span>
                    <Badge
                      variant={
                        selectedReservation.status === "confirmed"
                          ? "default"
                          : selectedReservation.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {selectedReservation.status === "confirmed"
                        ? "Confirmada"
                        : selectedReservation.status === "pending"
                          ? "Pendiente"
                          : "Cancelada"}
                    </Badge>
                  </li>
                </ul>
              </div>
            </div>

            {selectedReservation.notes && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Notas</h3>
                <p className="p-3 bg-muted rounded-md">{selectedReservation.notes}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              {selectedReservation.status === "pending" && (
                <Button onClick={() => handleStatusChange(selectedReservation.id, "confirmed")} disabled={isLoading}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirmar Reserva
                </Button>
              )}
              {selectedReservation.status !== "cancelled" && (
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange(selectedReservation.id, "cancelled")}
                  disabled={isLoading}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancelar Reserva
                </Button>
              )}
              <Button variant="outline" onClick={() => setSelectedReservation(null)}>
                Cerrar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

