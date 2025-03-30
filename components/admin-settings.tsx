"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Building, Mail, Phone, Globe, MapPin, Clock, Save, RefreshCw } from "lucide-react"

export function AdminSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Estados para los formularios
  const [generalSettings, setGeneralSettings] = useState({
    name: "Bar La Esquina",
    description:
      "Un bar acogedor con excelente música y ambiente. Disfruta de nuestras noches de música en vivo y una amplia selección de bebidas y tapas.",
    email: "info@barlaesquina.com",
    phone: "+54 11 1234-5678",
    website: "www.barlaesquina.com",
    address: "Av. Santa Fe 1234, CABA",
    type: "bar",
  })

  const [openingHours, setOpeningHours] = useState({
    monday: { open: true, from: "18:00", to: "02:00" },
    tuesday: { open: true, from: "18:00", to: "02:00" },
    wednesday: { open: true, from: "18:00", to: "02:00" },
    thursday: { open: true, from: "18:00", to: "03:00" },
    friday: { open: true, from: "18:00", to: "04:00" },
    saturday: { open: true, from: "18:00", to: "04:00" },
    sunday: { open: true, from: "18:00", to: "00:00" },
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    reservationConfirmations: true,
    reservationReminders: true,
    reviewNotifications: true,
    marketingEmails: false,
  })

  const [reservationSettings, setReservationSettings] = useState({
    allowReservations: true,
    minAdvanceTime: "2",
    maxPartySize: "10",
    autoConfirm: true,
    timeSlotDuration: "30",
  })

  const handleSaveGeneral = () => {
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configuración guardada",
        description: "La información general ha sido actualizada correctamente.",
      })
    }, 1000)
  }

  const handleSaveHours = () => {
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Horarios actualizados",
        description: "Los horarios de apertura han sido actualizados correctamente.",
      })
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notificaciones actualizadas",
        description: "La configuración de notificaciones ha sido actualizada correctamente.",
      })
    }, 1000)
  }

  const handleSaveReservations = () => {
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configuración de reservas actualizada",
        description: "La configuración de reservas ha sido actualizada correctamente.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hours">Horarios</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Actualiza la información básica de tu establecimiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del establecimiento</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={generalSettings.name}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de establecimiento</Label>
                <Select
                  value={generalSettings.type}
                  onValueChange={(value) => setGeneralSettings({ ...generalSettings, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="boliche">Boliche</SelectItem>
                    <SelectItem value="restaurante">Restaurante</SelectItem>
                    <SelectItem value="pub">Pub</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={generalSettings.description}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={generalSettings.email}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Sitio web</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={generalSettings.website}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar cambios
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Horarios de Apertura</CardTitle>
              <CardDescription>Configura los horarios de apertura de tu establecimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(openingHours).map(([day, hours]) => {
                  const dayNames = {
                    monday: "Lunes",
                    tuesday: "Martes",
                    wednesday: "Miércoles",
                    thursday: "Jueves",
                    friday: "Viernes",
                    saturday: "Sábado",
                    sunday: "Domingo",
                  }

                  return (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-24">
                        <Label>{dayNames[day]}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={hours.open}
                          onCheckedChange={(checked) =>
                            setOpeningHours({
                              ...openingHours,
                              [day]: { ...hours, open: checked },
                            })
                          }
                        />
                        <Label>Abierto</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={hours.from}
                          onChange={(e) =>
                            setOpeningHours({
                              ...openingHours,
                              [day]: { ...hours, from: e.target.value },
                            })
                          }
                          disabled={!hours.open}
                          className="w-24"
                        />
                        <span>a</span>
                        <Input
                          type="time"
                          value={hours.to}
                          onChange={(e) =>
                            setOpeningHours({
                              ...openingHours,
                              [day]: { ...hours, to: e.target.value },
                            })
                          }
                          disabled={!hours.open}
                          className="w-24"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveHours} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar horarios
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones generales por correo electrónico
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Confirmaciones de reservas</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones cuando se realiza una nueva reserva
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.reservationConfirmations}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        reservationConfirmations: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Recordatorios de reservas</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe recordatorios de las reservas programadas para hoy
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.reservationReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        reservationReminders: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones de reseñas</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones cuando alguien deja una reseña
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.reviewNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        reviewNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emails de marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe información sobre nuevas funcionalidades y promociones
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        marketingEmails: checked,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar configuración
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reservations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Reservas</CardTitle>
              <CardDescription>Configura cómo funcionan las reservas en tu establecimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Permitir reservas</Label>
                    <p className="text-sm text-muted-foreground">
                      Habilita o deshabilita las reservas en tu establecimiento
                    </p>
                  </div>
                  <Switch
                    checked={reservationSettings.allowReservations}
                    onCheckedChange={(checked) =>
                      setReservationSettings({
                        ...reservationSettings,
                        allowReservations: checked,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAdvanceTime">Tiempo mínimo de anticipación (horas)</Label>
                    <Input
                      id="minAdvanceTime"
                      type="number"
                      value={reservationSettings.minAdvanceTime}
                      onChange={(e) =>
                        setReservationSettings({
                          ...reservationSettings,
                          minAdvanceTime: e.target.value,
                        })
                      }
                      disabled={!reservationSettings.allowReservations}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxPartySize">Tamaño máximo de grupo</Label>
                    <Input
                      id="maxPartySize"
                      type="number"
                      value={reservationSettings.maxPartySize}
                      onChange={(e) =>
                        setReservationSettings({
                          ...reservationSettings,
                          maxPartySize: e.target.value,
                        })
                      }
                      disabled={!reservationSettings.allowReservations}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeSlotDuration">Duración de los intervalos de tiempo (minutos)</Label>
                  <Select
                    value={reservationSettings.timeSlotDuration}
                    onValueChange={(value) =>
                      setReservationSettings({
                        ...reservationSettings,
                        timeSlotDuration: value,
                      })
                    }
                    disabled={!reservationSettings.allowReservations}
                  >
                    <SelectTrigger id="timeSlotDuration">
                      <SelectValue placeholder="Selecciona la duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Confirmación automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Confirma automáticamente las reservas sin revisión manual
                    </p>
                  </div>
                  <Switch
                    checked={reservationSettings.autoConfirm}
                    onCheckedChange={(checked) =>
                      setReservationSettings({
                        ...reservationSettings,
                        autoConfirm: checked,
                      })
                    }
                    disabled={!reservationSettings.allowReservations}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveReservations} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar configuración
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

