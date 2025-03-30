import { HomeHero } from "@/components/home-hero"
import { Navbar } from "@/components/navbar"
import { FeaturedPlaces } from "@/components/featured-places"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HomeHero />
        <FeaturedPlaces />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}

