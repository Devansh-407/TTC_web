export interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  imageUrl: string
  image?: string // Alternative field name
  featured?: boolean
  createdAt: string
  rating?: number
  reviewCount?: number
  originalPrice?: number
  category?: string
  inStock?: boolean
  customizationLevel?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  customization?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  image?: string
}

export interface CustomOrderRequest {
  name: string
  email: string
  phone: string
  giftType: string
  customInstructions: string
  budget: string
  timeline: string
  referenceImages?: File[]
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
