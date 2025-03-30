"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ThumbsUp, Flag } from "lucide-react"

// Datos de ejemplo para las reseñas
const mockReviews = {
  1: [
    {
      id: 101,
      user: {
        name: "Carlos Rodríguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "15/03/2024",
      content:
        "Excelente lugar para tomar algo después del trabajo. La música en vivo los jueves es increíble. Recomendado!",
      likes: 12,
    },
    {
      id: 102,
      user: {
        name: "Laura Gómez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "02/03/2024",
      content:
        "Muy buen ambiente y buena selección de cervezas artesanales. El servicio podría mejorar un poco en horas pico.",
      likes: 5,
    },
    {
      id: 103,
      user: {
        name: "Martín Pérez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "25/02/2024",
      content:
        "La comida es excelente, especialmente las tablas para compartir. Precios razonables para la calidad que ofrecen.",
      likes: 8,
    },
  ],
  2: [
    {
      id: 201,
      user: {
        name: "Sofía Martínez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "10/03/2024",
      content: "Muy buena música y ambiente. La zona VIP vale la pena si vas en grupo.",
      likes: 15,
    },
    {
      id: 202,
      user: {
        name: "Diego López",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 3,
      date: "05/03/2024",
      content: "El lugar está bien, pero los precios de las bebidas son bastante altos. La música es buena.",
      likes: 7,
    },
    {
      id: 203,
      user: {
        name: "Valentina Torres",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "28/02/2024",
      content: "¡El mejor boliche de la zona! DJ increíble y muy buen ambiente. Volveré seguro.",
      likes: 20,
    },
  ],
}

export function PlaceReviews({ placeId }) {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [likedReviews, setLikedReviews] = useState({})

  useEffect(() => {
    // Simulamos la carga de reseñas desde una API
    setReviews(mockReviews[placeId] || [])

    // Simulamos verificar si el usuario está logueado
    setIsLoggedIn(false)
  }, [placeId])

  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!rating || !newReview.trim()) return

    // Simulamos el envío de la reseña a una API
    const newReviewObj = {
      id: Date.now(),
      user: {
        name: "Usuario Actual",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating,
      date: new Date().toLocaleDateString(),
      content: newReview,
      likes: 0,
    }

    setReviews([newReviewObj, ...reviews])
    setNewReview("")
    setRating(0)
  }

  const handleLikeReview = (reviewId) => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para dar like a una reseña")
      return
    }

    setLikedReviews((prev) => {
      const newState = { ...prev }
      newState[reviewId] = !newState[reviewId]
      return newState
    })

    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            likes: likedReviews[reviewId] ? review.likes - 1 : review.likes + 1,
          }
        }
        return review
      }),
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Reseñas y Opiniones</h2>

      {isLoggedIn ? (
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <p className="mr-2">Tu calificación:</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (hoveredStar || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea
                placeholder="Comparte tu experiencia en este lugar..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="mb-4"
                rows={4}
                required
              />
              <Button type="submit" disabled={!rating || !newReview.trim()}>
                Publicar reseña
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <p className="mb-4">Inicia sesión para dejar tu reseña</p>
            <Button asChild>
              <a href="/login">Iniciar sesión</a>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={review.user.avatar} alt={review.user.name} />
                      <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.user.name}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
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
                </div>
                <p className="mb-4">{review.content}</p>
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center ${likedReviews[review.id] ? "text-primary" : ""}`}
                    onClick={() => handleLikeReview(review.id)}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${likedReviews[review.id] ? "fill-primary" : ""}`} />
                    <span>{review.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Flag className="h-4 w-4 mr-1" />
                    <span>Reportar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No hay reseñas todavía. ¡Sé el primero en opinar!</p>
          </div>
        )}
      </div>
    </div>
  )
}

