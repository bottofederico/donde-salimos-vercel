import type { User } from "./db"
import { getUserByEmail } from "./db"

// Simulación de un servicio de autenticación
let currentUser: User | null = null

export function getCurrentUser(): User | null {
  return currentUser
}

export function login(email: string, password: string): { success: boolean; user?: User; message?: string } {
  // Usamos la importación directa en lugar de require
  const user = getUserByEmail(email)

  if (!user) {
    return { success: false, message: "Usuario no encontrado" }
  }

  if (user.password !== password) {
    return { success: false, message: "Contraseña incorrecta" }
  }

  // En una aplicación real, aquí generaríamos un token JWT
  currentUser = user

  // Guardar en localStorage para persistencia entre recargas
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  return { success: true, user }
}

export function logout(): void {
  currentUser = null

  // Limpiar localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

// Función para inicializar el estado de autenticación desde localStorage
export function initAuth(): void {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("currentUser")
      }
    }
  }
}

// Función para verificar si un usuario tiene acceso a un recurso
export function checkAccess(requiredRole: "user" | "business" | "admin"): boolean {
  if (!currentUser) return false

  if (requiredRole === "admin") {
    return currentUser.role === "admin"
  }

  if (requiredRole === "business") {
    return currentUser.role === "business" || currentUser.role === "admin"
  }

  return true // Todos los usuarios autenticados tienen acceso a recursos de 'user'
}

