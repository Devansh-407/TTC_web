import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const featuredProject = {
  title: "Wedding Memory Box",
  description:
    "We wanted something special to preserve our wedding memories. The team created this beautiful custom memory box with our initials and wedding date. It's absolutely perfect!",
  client: "Sarah & Michael Thompson",
  location: "Mumbai, Maharashtra",
  beforeImage: "/placeholder.svg",
  afterImage: "/vintage-wooden-jewelry-box-with-rose-patterns.jpg",
}

export function FeaturedProjects() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Featured Custom Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how we bring your unique visions to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Before</p>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={featuredProject.beforeImage || "/placeholder.svg"}
                  alt="Before"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">After</p>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={featuredProject.afterImage || "/placeholder.svg"}
                  alt="After"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
            "{featuredProject.description}"
          </blockquote>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/placeholder-user.jpg"
                alt={featuredProject.client}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900">{featuredProject.client}</p>
              <p className="text-sm text-gray-600">{featuredProject.location}</p>
            </div>
          </div>

          <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
