"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Star } from "lucide-react"

export function PlacesFilter({ type }) {
  const [distance, setDistance] = useState([10])
  const [rating, setRating] = useState([0])
  const [location, setLocation] = useState("")
  const [filters, setFilters] = useState({
    music: false,
    food: false,
    outdoor: false,
    parking: false,
  })

  const handleFilterChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleLocationDetect = () => {
    // Aquí iría la lógica para detectar la ubicación con la API de geolocalización
    setLocation("Tu ubicación actual")
  }

  const handleApplyFilters = () => {
    console.log("Applying filters:", {
      type,
      distance: distance[0],
      rating: rating[0],
      location,
      filters,
    })
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Ubicación</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tu ubicación"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" onClick={handleLocationDetect}>
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Distancia</Label>
            <span className="text-sm text-muted-foreground">{distance[0]} km</span>
          </div>
          <Slider defaultValue={[10]} max={50} step={1} value={distance} onValueChange={setDistance} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>Calificación mínima</span>
            </Label>
            <span className="text-sm text-muted-foreground">{rating[0]}/5</span>
          </div>
          <Slider defaultValue={[0]} max={5} step={0.5} value={rating} onValueChange={setRating} />
        </div>

        <div className="space-y-2">
          <Label>Características</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="music" checked={filters.music} onCheckedChange={() => handleFilterChange("music")} />
              <Label htmlFor="music" className="text-sm">
                Música en vivo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="food" checked={filters.food} onCheckedChange={() => handleFilterChange("food")} />
              <Label htmlFor="food" className="text-sm">
                Comida
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="outdoor" checked={filters.outdoor} onCheckedChange={() => handleFilterChange("outdoor")} />
              <Label htmlFor="outdoor" className="text-sm">
                Espacio al aire libre
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="parking" checked={filters.parking} onCheckedChange={() => handleFilterChange("parking")} />
              <Label htmlFor="parking" className="text-sm">
                Estacionamiento
              </Label>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={handleApplyFilters}>
          <Search className="mr-2 h-4 w-4" /> Aplicar filtros
        </Button>
      </CardContent>
    </Card>
  )
}

