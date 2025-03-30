"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Search, Filter, MessageSquare, Star, Flag } from "lucide-react"
import { getReviewsByBusinessId, type Review } from "@/lib/db"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export function AdminReviews() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [ratingFilter, setRatingFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Cargar reseñas
  useEffect(() => {
    if (user?.businessId) {
      const businessReviews = getReviewsByBusinessId(user.businessId)
      setReviews(businessReviews)
    }
  }, [user])

  // Filtrar reseñas según los criterios seleccionados
  const filteredReviews = reviews.filter((review) => {
    // Filtro por calificación
    if (ratingFilter !== "all" && review.rating.toString() !== ratingFilter) {
      return false
    }

    // Filtro por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return review.userName.toLowerCase().includes(query) || review.content.toLowerCase().includes(query)
    }

    return true
  })

  const handleReplyToReview = (reviewId: number, reply: string) => {
    setIsLoading(true)

    try {
      // En una implementación real, aquí se enviaría la respuesta a la API
      toast({
        title: "Respuesta enviada",
        description: "Tu respuesta ha sido publicada correctamente.",
      })
    } catch (error) {
      console.error("Error al responder a la reseña:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar la respuesta.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReportReview = (reviewId: number) => {
    setIsLoading(true)

    try {
      // En una implementación real, aquí se enviaría el reporte a la API
      toast({
        title: "Reseña reportada",
        description: "La reseña ha sido reportada para revisión.",
      })
    } catch (error) {
      console.error("Error al reportar la reseña:", error)
      toast({
        title: "Error",
        description: "No se pudo reportar la reseña.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearFilters = () => {
    setRatingFilter("all")
    setSearchQuery("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por calificación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las calificaciones</SelectItem>
                  <SelectItem value="5">5 estrellas</SelectItem>
                  <SelectItem value="4">4 estrellas</SelectItem>
                  <SelectItem value="3">3 estrellas</SelectItem>
                  <SelectItem value="2">2 estrellas</SelectItem>
                  <SelectItem value="1">1 estrella</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o contenido"
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Reseña</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <TableRow key={review.id} onClick={() => setSelectedReview(review)} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{review.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>{format(parseISO(review.date), "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <p className="truncate max-w-[200px]">{review.content}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedReview(review)
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Responder</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReportReview(review.id)
                          }}
                        >
                          <Flag className="h-4 w-4" />
                          <span className="sr-only">Reportar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No se encontraron reseñas con los filtros seleccionados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedReview && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Reseña</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedReview.userAvatar} alt={selectedReview.userName} />
                    <AvatarFallback>{selectedReview.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedReview.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(selectedReview.date), "PPP", { locale: es })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= selectedReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <p>{selectedReview.content}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Responder a esta reseña</h3>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[100px]"
                  placeholder="Escribe tu respuesta aquí..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleReportReview(selectedReview.id)} disabled={isLoading}>
                  <Flag className="mr-2 h-4 w-4" />
                  Reportar reseña
                </Button>
                <Button onClick={() => handleReplyToReview(selectedReview.id, "")} disabled={isLoading}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Responder
                </Button>
                <Button variant="outline" onClick={() => setSelectedReview(null)}>
                  Cerrar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

