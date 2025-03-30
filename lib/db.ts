// Simulación de base de datos en memoria

// Tipos
export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "user" | "business" | "admin"
  businessId?: number
}

export interface Business {
  id: number
  name: string
  type: "bar" | "boliche"
  ownerId: number
  location: string
  address: string
  coordinates: { lat: number; lng: number }
  description: string
  features: string[]
  rating: number
  image: string
}

export interface Reservation {
  id: number
  businessId: number
  userId: number
  name: string
  email: string
  phone: string
  date: string // ISO string
  time: string
  people: number
  notes: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string // ISO string
}

export interface Review {
  id: number
  businessId: number
  userId: number
  userName: string
  userAvatar: string
  rating: number
  content: string
  date: string // ISO string
  likes: number
}

// Datos iniciales
const users: User[] = [
  {
    id: 1,
    name: "Usuario Demo",
    email: "usuario@ejemplo.com",
    password: "password123",
    role: "user",
  },
  {
    id: 2,
    name: "Bar La Esquina",
    email: "bar@ejemplo.com",
    password: "password123",
    role: "business",
    businessId: 1,
  },
  {
    id: 3,
    name: "Administrador",
    email: "admin@ejemplo.com",
    password: "admin123",
    role: "admin",
  },
]

const businesses: Business[] = [
  {
    id: 1,
    name: "Bar La Esquina",
    type: "bar",
    ownerId: 2,
    location: "Palermo, Buenos Aires",
    address: "Av. Santa Fe 1234, CABA",
    coordinates: { lat: -34.5956, lng: -58.4233 },
    description:
      "Un bar acogedor con excelente música y ambiente. Disfruta de nuestras noches de música en vivo y una amplia selección de bebidas y tapas.",
    features: ["Música en vivo", "Comida", "Espacio al aire libre"],
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 2,
    name: "Boliche Noche",
    type: "boliche",
    ownerId: 2,
    location: "Recoleta, Buenos Aires",
    address: "Av. Callao 567, CABA",
    coordinates: { lat: -34.5887, lng: -58.3974 },
    description:
      "El mejor lugar para bailar toda la noche. Contamos con varios ambientes musicales, barras premium y zona VIP.",
    features: ["DJ internacional", "Varios ambientes", "VIP"],
    rating: 4.2,
    image: "/placeholder.svg?height=400&width=800",
  },
]

const reservations: Reservation[] = [
  {
    id: 1,
    businessId: 1,
    userId: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "+54 9 11 1234-5678",
    date: new Date(2024, 3, 15).toISOString(),
    time: "20:30",
    people: 4,
    notes: "Mesa cerca de la ventana si es posible",
    status: "confirmed",
    createdAt: new Date(2024, 3, 10).toISOString(),
  },
  {
    id: 2,
    businessId: 1,
    userId: 1,
    name: "María García",
    email: "maria@example.com",
    phone: "+54 9 11 8765-4321",
    date: new Date(2024, 3, 15).toISOString(),
    time: "21:00",
    people: 2,
    notes: "",
    status: "confirmed",
    createdAt: new Date(2024, 3, 11).toISOString(),
  },
  {
    id: 3,
    businessId: 1,
    userId: 1,
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    phone: "+54 9 11 2468-1357",
    date: new Date(2024, 3, 16).toISOString(),
    time: "19:30",
    people: 6,
    notes: "Celebración de cumpleaños",
    status: "pending",
    createdAt: new Date(2024, 3, 12).toISOString(),
  },
  {
    id: 4,
    businessId: 1,
    userId: 1,
    name: "Laura Martínez",
    email: "laura@example.com",
    phone: "+54 9 11 1357-2468",
    date: new Date(2024, 3, 16).toISOString(),
    time: "20:00",
    people: 3,
    notes: "",
    status: "confirmed",
    createdAt: new Date(2024, 3, 13).toISOString(),
  },
  {
    id: 5,
    businessId: 2,
    userId: 1,
    name: "Roberto Sánchez",
    email: "roberto@example.com",
    phone: "+54 9 11 9876-5432",
    date: new Date(2024, 3, 17).toISOString(),
    time: "21:30",
    people: 2,
    notes: "",
    status: "confirmed",
    createdAt: new Date(2024, 3, 14).toISOString(),
  },
  {
    id: 6,
    businessId: 2,
    userId: 1,
    name: "Ana López",
    email: "ana@example.com",
    phone: "+54 9 11 5432-1098",
    date: new Date(2024, 3, 17).toISOString(),
    time: "20:30",
    people: 4,
    notes: "Alergias: maní y mariscos",
    status: "pending",
    createdAt: new Date(2024, 3, 15).toISOString(),
  },
]

const reviews: Review[] = [
  {
    id: 1,
    businessId: 1,
    userId: 1,
    userName: "Ana López",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    content:
      "Excelente lugar para tomar algo después del trabajo. La música en vivo los jueves es increíble. Recomendado!",
    date: new Date(2024, 3, 12).toISOString(),
    likes: 12,
  },
  {
    id: 2,
    businessId: 1,
    userId: 1,
    userName: "Laura Gómez",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    content:
      "Muy buen ambiente y buena selección de cervezas artesanales. El servicio podría mejorar un poco en horas pico.",
    date: new Date(2024, 3, 2).toISOString(),
    likes: 5,
  },
  {
    id: 3,
    businessId: 2,
    userId: 1,
    userName: "Sofía Martínez",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    content: "Muy buena música y ambiente. La zona VIP vale la pena si vas en grupo.",
    date: new Date(2024, 3, 10).toISOString(),
    likes: 15,
  },
  {
    id: 4,
    businessId: 2,
    userId: 1,
    userName: "Diego López",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    content: "El lugar está bien, pero los precios de las bebidas son bastante altos. La música es buena.",
    date: new Date(2024, 3, 5).toISOString(),
    likes: 7,
  },
]

// Funciones para manipular los datos
export function getUsers(): User[] {
  return [...users]
}

export function getUserById(id: number): User | undefined {
  return users.find((user) => user.id === id)
}

export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

export function getBusinesses(): Business[] {
  return [...businesses]
}

export function getBusinessById(id: number): Business | undefined {
  return businesses.find((business) => business.id === id)
}

export function getBusinessesByOwnerId(ownerId: number): Business[] {
  return businesses.filter((business) => business.ownerId === ownerId)
}

export function getReservations(): Reservation[] {
  return [...reservations]
}

export function getReservationById(id: number): Reservation | undefined {
  return reservations.find((reservation) => reservation.id === id)
}

export function getReservationsByBusinessId(businessId: number): Reservation[] {
  return reservations.filter((reservation) => reservation.businessId === businessId)
}

export function getReservationsByUserId(userId: number): Reservation[] {
  return reservations.filter((reservation) => reservation.userId === userId)
}

export function getReviews(): Review[] {
  return [...reviews]
}

export function getReviewsByBusinessId(businessId: number): Review[] {
  return reviews.filter((review) => review.businessId === businessId)
}

// Funciones para modificar los datos
export function addReservation(reservation: Omit<Reservation, "id" | "createdAt">): Reservation {
  const newReservation: Reservation = {
    ...reservation,
    id: reservations.length > 0 ? Math.max(...reservations.map((r) => r.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
  }

  reservations.push(newReservation)
  return newReservation
}

export function updateReservation(id: number, data: Partial<Reservation>): Reservation | null {
  const index = reservations.findIndex((reservation) => reservation.id === id)
  if (index === -1) return null

  reservations[index] = { ...reservations[index], ...data }
  return reservations[index]
}

export function addReview(review: Omit<Review, "id" | "date">): Review {
  const newReview: Review = {
    ...review,
    id: reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1,
    date: new Date().toISOString(),
  }

  reviews.push(newReview)
  return newReview
}

export function updateReview(id: number, data: Partial<Review>): Review | null {
  const index = reviews.findIndex((review) => review.id === id)
  if (index === -1) return null

  reviews[index] = { ...reviews[index], ...data }
  return reviews[index]
}

