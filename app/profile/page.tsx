"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-store'
import { useCart } from '@/lib/cart-store'
import { useFavourites } from '@/lib/favourites-store'
import { ShoppingCart, Heart, Package, User, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const cart = useCart()
  const favourites = useFavourites()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <ShoppingCart className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{cart.itemCount}</p>
                      <p className="text-gray-600">Cart Items</p>
                    </div>
                  </div>
                  <Link href="/cart">
                    <Button variant="outline" className="w-full mt-4">
                      View Cart
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{favourites.itemCount}</p>
                      <p className="text-gray-600">Favourites</p>
                    </div>
                  </div>
                  <Link href="/favourites">
                    <Button variant="outline" className="w-full mt-4">
                      View Favourites
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                      <p className="text-gray-600">Orders</p>
                    </div>
                  </div>
                  <Link href="/orders">
                    <Button variant="outline" className="w-full mt-4">
                      View Orders
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions with Tohfa Creations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.items.length > 0 && (
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Cart Items</h4>
                      <div className="space-y-2">
                        {cart.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="text-gray-900">₹{item.price} × {item.quantity}</span>
                          </div>
                        ))}
                        {cart.items.length > 3 && (
                          <p className="text-sm text-gray-500">+{cart.items.length - 3} more items</p>
                        )}
                      </div>
                    </div>
                  )}

                  {favourites.items.length > 0 && (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-2">Favourite Items</h4>
                      <div className="space-y-2">
                        {favourites.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="text-gray-900">₹{item.price}</span>
                          </div>
                        ))}
                        {favourites.items.length > 3 && (
                          <p className="text-sm text-gray-500">+{favourites.items.length - 3} more items</p>
                        )}
                      </div>
                    </div>
                  )}

                  {cart.items.length === 0 && favourites.items.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No recent activity</p>
                      <Link href="/gifts" className="text-purple-600 hover:text-purple-500">
                        Start shopping →
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
