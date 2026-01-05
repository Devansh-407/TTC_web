import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          // Mock authentication - in production, this would call your API
          if (email && password) {
            const mockUser: User = {
              id: '1',
              name: email.split('@')[0],
              email: email
            }
            set({ user: mockUser, isAuthenticated: true })
            return true
          }
          return false
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },

      signup: async (name: string, email: string, password: string) => {
        try {
          // Mock signup - in production, this would call your API
          if (name && email && password) {
            const mockUser: User = {
              id: Date.now().toString(),
              name: name,
              email: email
            }
            set({ user: mockUser, isAuthenticated: true })
            return true
          }
          return false
        } catch (error) {
          console.error('Signup error:', error)
          return false
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
