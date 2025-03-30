"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Users, Clock } from "lucide-react"

export function PlaceReservation({ place }) {
  const router = useRouter()
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")
  const [people, setPeople] = useState("2")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Generar horarios disponibles basados en el horario de apertura del lugar
  const getAvailableTimes = () => {
    // Esto es simplificado, en una implementación real se verificaría la disponibilidad real
    const times = []
    const dayOfWeek = date ? new Date(date).toLocaleDateString("es-ES", { weekday: "long" }).toLowerCase() : ""

    const openHour = 18
    let closeHour = 23

    if (dayOfWeek === "viernes" || dayOfWeek === "sábado") {
      closeHour = 24
    }

    for (let hour = openHour; hour <= closeHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === closeHour && minute > 0) continue

        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        times.push(`${formattedHour}:${formattedMinute}`)
      }
    }

    return times
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (!date || !time || !name || !email || !phone) return

    setIsLoading(true)

    try {
      // Simulamos el envío de la reserva a una API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      alert(`Reserva realizada con éxito para ${format(date, "PPP", { locale: es })} a las ${time}`)

      // Redirigir a la página de confirmación
      // router.push(`/reserva-confirmada/${place.id}`);
    } catch (error) {
      console.error("Error al realizar la reserva:", error)
      alert("Hubo un error al realizar la reserva. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Reservar una mesa</h2>

      {!isLoggedIn ? (
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <p className="mb-4">Inicia sesión para realizar una reserva</p>
            <Button asChild>
              <a href="/login">Iniciar sesión</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Select value={time} onValueChange={setTime} disabled={!date}>
                    <SelectTrigger id="time" className="w-full">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableTimes().map((timeOption) => (
                        <SelectItem key={timeOption} value={timeOption}>
                          {timeOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="people">Número de personas</Label>
                  <Select value={people} onValueChange={setPeople}>
                    <SelectTrigger id="people" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Selecciona número de personas" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "persona" : "personas"}
                        </SelectItem>
                      ))}
                      <SelectItem value="more">Más de 10 personas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Solicitudes especiales, alergias, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !date || !time || !name || !email || !phone}
              >
                {isLoading ? "Procesando..." : "Confirmar reserva"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Política de reservas</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Las reservas deben realizarse con al menos 2 horas de anticipación.</li>
          <li>Se mantendrá la reserva por un máximo de 15 minutos después de la hora reservada.</li>
          <li>Para cancelar o modificar tu reserva, comunícate directamente con el establecimiento.</li>
          <li>Para grupos de más de 10 personas, por favor contacta directamente al establecimiento.</li>
        </ul>
      </div>
    </div>
  )
}

