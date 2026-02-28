"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Play, ChevronLeft, ChevronRight, X, Star, Truck, Shield, RefreshCw, Minus, Plus, Check, Share2, Facebook, Twitter, Instagram } from "lucide-react"
import { getProducts } from "@/lib/data"
import { notFound } from "next/navigation"
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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState('description')
  const { addItem } = useCart()
  const { addItem: addToFavourites, isFavourite, removeItem } = useFavourites()

  // Load product data
  useEffect(() => {
    async function loadProduct() {
      try {
        const resolvedParams = await params
        const products = await getProducts()
        const foundProduct = products.find((p) => p.id === resolvedParams.id)
        
        if (!foundProduct) {
          notFound()
          return
        }
        
        setProduct(foundProduct)
      } catch (error) {
        console.error('Error loading product:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    
    loadProduct()
  }, [])

  const handleProceed = () => {
    if (!product) return
    
    // Add to cart first
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: getCategoryName(product.category)
      })
    }
    
    // Then proceed to WhatsApp checkout (same format as cart proceed button)
    setTimeout(() => {
      const message = `Hello! I want to order these products:\n\n• ${product.name} x${quantity}`
      const whatsappUrl = `https://wa.me/6396202262?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }, 500)
  }

  const handleToggleFavourite = () => {
    if (!product) return
    
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

  const getAllImages = () => {
    if (!product) return []
    return [product.image, ...(product.gallery || [])].filter(Boolean)
  }

  const nextImage = () => {
    const images = getAllImages()
    if (images.length === 0) return
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    const images = getAllImages()
    if (images.length === 0) return
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  // Ensure selectedImage is always valid
  useEffect(() => {
    const images = getAllImages()
    if (images.length > 0 && selectedImage >= images.length) {
      setSelectedImage(0)
    }
  }, [selectedImage, product])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const allImages = getAllImages()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/gifts" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Continue Shopping</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={handleToggleFavourite}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className={`h-5 w-5 ${isFavourite(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square">
                {allImages[selectedImage] ? (
                  selectedImage === 0 && product.gif ? (
                    <img 
                      src={product.gif} 
                      alt={`${product.name} GIF`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={allImages[selectedImage]}
                      alt={product.name}
                      fill
                      className="w-full h-full object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 bg-gray-200 rounded-xl"></div>
                      <p className="text-gray-500">No image available</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navigation arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full">
                  <span className="text-white text-sm font-medium">
                    {selectedImage + 1} / {allImages.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (image && index < allImages.length) {
                        setSelectedImage(index)
                      }
                    }}
                    onMouseEnter={() => {
                      if (image && index < allImages.length) {
                        setSelectedImage(index)
                      }
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 hover:border-purple-400 ${
                      selectedImage === index 
                        ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' 
                        : 'border-gray-200'
                    }`}
                  >
                    {image ? (
                      <>
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="w-full h-full object-cover"
                          sizes="80px"
                        />
                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-purple-500/10 pointer-events-none"></div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Media Actions */}
            <div className="flex gap-3">
              {product.video && (
                <Button
                  onClick={() => setShowVideoModal(true)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Video
                </Button>
              )}
              {product.gif && (
                <Button
                  onClick={() => setSelectedImage(0)}
                  variant="outline"
                  className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <span className="text-xs font-bold mr-2">GIF</span>
                  View Animation
                </Button>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-3xl font-bold text-purple-600">{formatPrice(product.price)}</p>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="flex items-center gap-3">
                        <p className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviewCount || 0} reviews)</span>
                </div>
              )}
              
              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 font-medium rounded-lg">
                  {getCategoryName(product.category)}
                </span>
                <span className="inline-block px-3 py-1 text-sm bg-pink-100 text-pink-800 font-medium rounded-lg">
                  {getOccasionName(product.occasion)}
                </span>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.inStock ? (
                  <>
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">In Stock - Ships within 24 hours</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center gap-3 w-40">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-12 text-center border border-gray-300 rounded-lg font-semibold text-lg"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleProceed}
                  disabled={!product.inStock}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  {product.inStock ? 'Proceed' : 'Out of Stock'}
                </Button>
                <Button
                  onClick={handleToggleFavourite}
                  variant="outline"
                  className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold py-4 rounded-xl transition-colors"
                >
                  <Heart className={`h-5 w-5 mr-3 ${isFavourite(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  {isFavourite(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders above ₹999</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% secure</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">7 days return</p>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setSelectedTab('description')}
                  className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
                    selectedTab === 'description' 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setSelectedTab('details')}
                  className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
                    selectedTab === 'details' 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setSelectedTab('shipping')}
                  className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
                    selectedTab === 'shipping' 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Shipping
                </button>
              </div>
              
              <div className="p-6">
                {selectedTab === 'description' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                )}
                {selectedTab === 'details' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Product ID</span>
                        <span className="text-sm font-medium text-gray-900">{product.id}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className="text-sm font-medium text-gray-900">{getCategoryName(product.category)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Occasion</span>
                        <span className="text-sm font-medium text-gray-900">{getOccasionName(product.occasion)}</span>
                      </div>
                      {product.rating && (
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Rating</span>
                          <span className="text-sm font-medium text-gray-900">⭐ {product.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {selectedTab === 'shipping' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping & Returns</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Delivery</h4>
                        <p className="text-sm text-gray-600">Standard delivery: 5-7 business days</p>
                        <p className="text-sm text-gray-600">Express delivery: 2-3 business days</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Returns</h4>
                        <p className="text-sm text-gray-600">7-day return policy</p>
                        <p className="text-sm text-gray-600">Items must be unused and in original packaging</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && product.video && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Product Video</h3>
              <Button
                onClick={() => setShowVideoModal(false)}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-video bg-black">
              <video
                src={product.video}
                controls
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
