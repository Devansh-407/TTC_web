import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutHero() {
  return (
    <section className="relative min-h-87.5 flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/about.bg.png')"
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
            Our Story of<br />
            <span className="text-purple-300">Love & Craftsmanship</span>
          </h1>
          <p className="text-base md:text-lg text-gray-100 leading-relaxed mb-8 max-w-2xl drop-shadow-lg">
            Founded in 2016, The Tohfa Creations began as a small dream to create meaningful connections through handcrafted artistry. Every piece we create carries the passion and dedication of our skilled artisan team.
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md shadow-xl">
            <Link href="/about#journey">Learn Our Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
