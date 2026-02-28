"use client"

import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart, Play, Image as ImageIcon } from "lucide-react"
import { getProducts } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-store"
import { useFavourites } from "@/lib/favourites-store"
import { useState, useEffect } from "react"

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
  return categoryMap[category] || "Gifts"
}

// Get occasion display name
function getOccasionName(occasion: string) {
  const occasionMap: { [key: string]: string } = {
    "anniversary": "Anniversary",
    "birthday": "Birthday",
    "proposal": "Proposal", 
    "wedding": "Wedding",
    "graduation": "Graduation",
    "custom": "Custom"
  }
  return occasionMap[occasion] || "Special"
}

export function ProductsGrid() {
  const { addItem } = useCart()
  const { addItem: addToFavourites, isFavourite, removeItem } = useFavourites()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: getCategoryName(product.category)
    })
  }

  const handleToggleFavourite = (e: React.MouseEvent, product: any) => {
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Products Available</h3>
          <p className="text-gray-600 mb-6">
            We're currently updating our product collection. Please check back soon for amazing handcrafted gifts!
          </p>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">In the meantime, you can:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Contact Us
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-square overflow-hidden group">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Media indicators */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.gallery && product.gallery.length > 0 && (
                <div className="p-1 bg-white rounded-full shadow-md">
                  <ImageIcon className="h-3 w-3 text-gray-600" />
                </div>
              )}
              {product.video && (
                <div className="p-1 bg-white rounded-full shadow-md">
                  <Play className="h-3 w-3 text-gray-600" />
                </div>
              )}
              {product.gif && (
                <div className="p-1 bg-white rounded-full shadow-md">
                  <span className="text-xs text-gray-600 font-bold">GIF</span>
                </div>
              )}
            </div>
            
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
              <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                  {getCategoryName(product.category)}
                </span>
                <span className="inline-block px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded">
                  {getOccasionName(product.occasion)}
                </span>
              </div>
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
                <Link href={`/product/${product.id}`}>View</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
