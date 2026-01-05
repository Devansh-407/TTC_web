import { ProductsGrid } from "@/components/products-grid"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Hand, Settings, Clock } from "lucide-react"

export const metadata = {
  title: "Discover Our Gift Collection - The Tohfa Creations",
  description:
    "Handcrafted with love, personalized with care. Find the perfect gift to celebrate life's most precious moments.",
}

export default function GiftsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Discover Our <span className="text-purple-500">Gift Collection</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handcrafted with love, personalized with care. Find the perfect gift to celebrate life's most precious moments.
            </p>
          </div>

          {/* Filters */}
          <ProductFilters />
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsGrid />
          
          {/* Contact Section */}
          <div className="text-center mt-12 mb-16">
            <p className="text-gray-600 mb-4">Can't find exactly what you're looking for?</p>
            <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-md">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Our Handcrafted Gifts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every gift is carefully crafted with premium materials and personalized attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hand className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Handcrafted Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Each piece is meticulously crafted by skilled artisans using traditional techniques and premium materials.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Personalization</h3>
              <p className="text-gray-600 leading-relaxed">
                Customize every detail from colors and materials to messages and engravings to make it uniquely yours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Timely Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                We ensure your handcrafted gift arrives beautifully packaged and on time for your special occasion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
