"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ImageIcon, Plus, Edit, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para anuncios
const mockAds = [
  {
    id: 1,
    title: "Happy Hour 2x1",
    description: "Todos los días de 18:00 a 20:00",
    image: "/placeholder.svg?height=200&width=400",
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 4, 30),
    status: "active",
    type: "banner",
  },
  {
    id: 2,
    title: "Noche de música en vivo",
    description: "Todos los jueves a partir de las 21:00",
    image: "/placeholder.svg?height=200&width=400",
    startDate: new Date(2024, 3, 15),
    endDate: new Date(2024, 5, 15),
    status: "scheduled",
    type: "featured",
  },
  {
    id: 3,
    title: "Descuento para estudiantes",
    description: "20% de descuento presentando credencial",
    image: "/placeholder.svg?height=200&width=400",
    startDate: new Date(2024, 2, 1),
    endDate: new Date(2024, 3, 1),
    status: "expired",
    type: "popup",
  },
]

export function AdminAdvertising() {
  const { toast } = useToast()
  const [ads, setAds] = useState(mockAds)
  const [activeTab, setActiveTab] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    type: "banner",
  })

  // Filtrar anuncios según la pestaña activa
  const filteredAds = ads.filter((ad) => {
    if (activeTab === "all") return true
    return ad.status === activeTab
  })

  const handleCreateAd = () => {
    if (!startDate || !endDate || !formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      })
      return
    }

    const newAd = {
      id: Math.max(...ads.map((ad) => ad.id)) + 1,
      ...formData,
      startDate,
      endDate,
      status: new Date() > startDate ? "active" : "scheduled",
    }

    setAds([newAd, ...ads])
    resetForm()
    setIsCreating(false)

    toast({
      title: "Anuncio creado",
      description: "El anuncio ha sido creado exitosamente.",
    })
  }

  const handleUpdateAd = () => {
    if (!isEditing) return

    if (!startDate || !endDate || !formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      })
      return
    }

    const updatedAds = ads.map((ad) => {
      if (ad.id === isEditing) {
        return {
          ...ad,
          ...formData,
          startDate,
          endDate,
          status: new Date() > startDate ? (new Date() < endDate ? "active" : "expired") : "scheduled",
        }
      }
      return ad
    })

    setAds(updatedAds)
    resetForm()
    setIsEditing(null)

    toast({
      title: "Anuncio actualizado",
      description: "El anuncio ha sido actualizado exitosamente.",
    })
  }

  const handleDeleteAd = (id: number) => {
    setAds(ads.filter((ad) => ad.id !== id))

    toast({
      title: "Anuncio eliminado",
      description: "El anuncio ha sido eliminado exitosamente.",
    })
  }

  const handleEditAd = (id: number) => {
    const adToEdit = ads.find((ad) => ad.id === id)
    if (!adToEdit) return

    setFormData({
      title: adToEdit.title,
      description: adToEdit.description,
      image: adToEdit.image,
      type: adToEdit.type,
    })
    setStartDate(adToEdit.startDate)
    setEndDate(adToEdit.endDate)
    setIsEditing(id)
    setIsCreating(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      type: "banner",
    })
    setStartDate(undefined)
    setEndDate(undefined)
  }

  const cancelForm = () => {
    resetForm()
    setIsCreating(false)
    setIsEditing(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Activo</span>
      case "scheduled":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Programado</span>
      case "expired":
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Expirado</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="scheduled">Programados</TabsTrigger>
            <TabsTrigger value="expired">Expirados</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button className="ml-4" onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo anuncio
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Editar anuncio" : "Crear nuevo anuncio"}</CardTitle>
            <CardDescription>
              {isEditing
                ? "Modifica los detalles del anuncio existente"
                : "Completa el formulario para crear un nuevo anuncio"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Título
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ej: Happy Hour 2x1"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipo de anuncio
                  </label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="featured">Destacado</SelectItem>
                      <SelectItem value="popup">Popup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe tu anuncio"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha de inicio</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha de fin</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Imagen</label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Arrastra y suelta una imagen o haz clic para seleccionar
                  </p>
                  <Button variant="outline" className="mt-4">
                    Seleccionar imagen
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={cancelForm}>
              Cancelar
            </Button>
            <Button onClick={isEditing ? handleUpdateAd : handleCreateAd}>
              {isEditing ? "Actualizar" : "Crear"} anuncio
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAds.map((ad) => (
          <Card key={ad.id}>
            <div className="relative h-40 w-full">
              <img
                src={ad.image || "/placeholder.svg"}
                alt={ad.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">{getStatusBadge(ad.status)}</div>
            </div>
            <CardHeader>
              <CardTitle>{ad.title}</CardTitle>
              <CardDescription>
                {format(ad.startDate, "dd/MM/yyyy")} - {format(ad.endDate, "dd/MM/yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{ad.description}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Tipo: {ad.type === "banner" ? "Banner" : ad.type === "featured" ? "Destacado" : "Popup"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
                <span className="sr-only">Ver</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditAd(ad.id)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteAd(ad.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAds.length === 0 && (
        <div className="text-center py-12 bg-muted rounded-md">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No hay anuncios</h3>
          <p className="text-muted-foreground mt-2">
            {activeTab === "all"
              ? "No has creado ningún anuncio todavía."
              : activeTab === "active"
                ? "No tienes anuncios activos en este momento."
                : activeTab === "scheduled"
                  ? "No tienes anuncios programados para el futuro."
                  : "No tienes anuncios expirados."}
          </p>
          <Button className="mt-4" onClick={() => setIsCreating(true)} disabled={isCreating}>
            <Plus className="mr-2 h-4 w-4" />
            Crear anuncio
          </Button>
        </div>
      )}
    </div>
  )
}

