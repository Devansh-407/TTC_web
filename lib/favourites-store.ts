import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavouriteItem {
  id: string
  name: string
  price: number
  image: string
  category?: string
}

interface FavouritesState {
  items: FavouriteItem[]
  itemCount: number
  addItem: (item: FavouriteItem) => void
  removeItem: (id: string) => void
  isFavourite: (id: string) => boolean
  clearFavourites: () => void
}

export const useFavourites = create<FavouritesState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,

      addItem: (newItem) => {
        const { items } = get()
        const existingItem = items.find(item => item.id === newItem.id)

        if (!existingItem) {
          const updatedItems = [...items, newItem]
          set({ items: updatedItems, itemCount: updatedItems.length })
        }
      },

      removeItem: (id) => {
        const { items } = get()
        const updatedItems = items.filter(item => item.id !== id)
        set({ items: updatedItems, itemCount: updatedItems.length })
      },

      isFavourite: (id) => {
        const { items } = get()
        return items.some(item => item.id === id)
      },

      clearFavourites: () => {
        set({ items: [], itemCount: 0 })
      }
    }),
    {
      name: 'favourites-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)
