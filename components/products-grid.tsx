"use client"

import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { products } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-store"
import { useFavourites } from "@/lib/favourites-store"

// Format price in INR
function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`
}

// Get category display name
function getCategoryName(category: string) {
  const categoryMap: { [key: string]: string } = {
    "gift-hamper": "Gift Hamper",
    "gift-box": "Gift Box", 
    "bouquet": "Bouquet",
    "miniature": "Miniature",
    "frame": "Frame"
  }
  return categoryMap[category] || "Gift Box"
}

export function ProductsGrid() {
  const { addItem } = useCart()
  const { addItem: addToFavourites, isFavourite, removeItem } = useFavourites()

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: getCategoryName(product.category)
    })
  }

  const handleToggleFavourite = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Add immediate visual feedback
    const button = e.currentTarget as HTMLButtonElement
    button.style.transform = 'scale(0.9)'
    setTimeout(() => {
      button.style.transform = ''
    }, 100)
    
    try {
      if (isFavourite(product.id)) {
        removeItem(product.id)
      } else {
        addToFavourites({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: getCategoryName(product.category)
        })
      }
    } catch (error) {
      console.error('Error toggling favourite:', error)
    }
  }

  // Show first 9 products
  const displayProducts = products.slice(0, 9)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => handleToggleFavourite(e, product)}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 ease-out group"
            >
              <Heart 
                className={`h-4 w-4 transition-all duration-200 ${
                  isFavourite(product.id) 
                    ? 'text-red-500 fill-current scale-110' 
                    : 'text-gray-400 hover:text-red-400 group-hover:scale-110'
                }`} 
              />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{product.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
              <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                {getCategoryName(product.category)}
              </span>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button 
                onClick={() => handleAddToCart(product)}
                className="bg-purple-500 hover:bg-purple-600 text-white flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href={`/gifts/${product.id}`}>View</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
