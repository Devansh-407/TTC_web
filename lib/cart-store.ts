import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category?: string
}

interface CartState {
  items: CartItem[]
  itemCount: number
  total: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (newItem) => {
        const { items } = get()
        const existingItem = items.find(item => item.id === newItem.id)

        let updatedItems
        if (existingItem) {
          updatedItems = items.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          updatedItems = [...items, { ...newItem, quantity: 1 }]
        }

        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        set({ items: updatedItems, itemCount, total })
      },

      removeItem: (id) => {
        const { items } = get()
        const updatedItems = items.filter(item => item.id !== id)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        set({ items: updatedItems, itemCount, total })
      },

      updateQuantity: (id, quantity) => {
        const { items } = get()
        let updatedItems
        
        if (quantity === 0) {
          updatedItems = items.filter(item => item.id !== id)
        } else {
          updatedItems = items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }
        
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        set({ items: updatedItems, itemCount, total })
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, total: 0 })
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)
