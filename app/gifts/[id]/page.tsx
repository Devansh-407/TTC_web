import { getProducts } from "@/lib/data"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Share2, ShoppingCart, Package, Award, Shield } from "lucide-react"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const products = await getProducts()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return {
      title: "Product Not Found - The Tohfa Creations",
    }
  }

  return {
    title: `${product.name} - The Tohfa Creations`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const products = await getProducts()
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">Home</a>
            <span className="mx-2">/</span>
            <a href="/gifts" className="hover:text-gray-700">Gifts</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-white shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 hover:border-purple-500 transition-colors cursor-pointer">
                  <img
                    src={product.image}
                    alt={`${product.name} - View ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">{product.rating || 0}</span>
              <span className="text-gray-600">({product.reviewCount || 0} reviews)</span>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-purple-600">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <Badge className="bg-red-500 text-white">
                      {discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-green-600 font-medium">✓ In Stock - Ready to Ship</p>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-gray-700">Quality Assured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-gray-700">Handcrafted</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium capitalize">{(product.category || 'general').replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Customization</span>
                  <span className="font-medium capitalize">{product.customizationLevel || 'basic'}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Availability</span>
                  <span className={`font-medium ${(product.inStock ?? true) ? 'text-green-600' : 'text-red-600'}`}>
                    {(product.inStock ?? true) ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">3-5 Business Days</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-semibold">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-purple-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">100% Authentic Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Secure Packaging</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
