"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-store'
import { useFavourites } from '@/lib/favourites-store'
import { useAuth } from '@/lib/auth-store'
import { ShoppingCart, Heart, User, CheckCircle, XCircle } from 'lucide-react'

export default function TestPage() {
  const { addItem: addToCart, items: cartItems, total, clearCart } = useCart()
  const { addItem: addToFavourites, items: favouriteItems, isFavourite, removeItem } = useFavourites()
  const { user, isAuthenticated, login, logout } = useAuth()
  const [testResults, setTestResults] = useState<any[]>([])

  const addTestResult = (test: string, passed: boolean, details?: string) => {
    setTestResults(prev => [...prev, { test, passed, details, timestamp: new Date() }])
  }

  const runAllTests = async () => {
    // Test 1: Cart Functionality
    try {
      addToCart({
        id: 'test-1',
        name: 'Test Product',
        price: 999,
        image: '/test.jpg',
        category: 'Test Category'
      })
      addTestResult('Cart - Add Item', cartItems.length > 0, `Cart has ${cartItems.length} items`)
    } catch (error) {
      addTestResult('Cart - Add Item', false, `Error: ${error}`)
    }

    // Test 2: Favourites Functionality
    try {
      addToFavourites({
        id: 'test-fav-1',
        name: 'Test Favourite',
        price: 1499,
        image: '/test-fav.jpg',
        category: 'Test Category'
      })
      addTestResult('Favourites - Add Item', favouriteItems.length > 0, `Favourites has ${favouriteItems.length} items`)
    } catch (error) {
      addTestResult('Favourites - Add Item', false, `Error: ${error}`)
    }

    // Test 3: Authentication
    try {
      const loginResult = await login('test@example.com', 'password')
      addTestResult('Auth - Login', loginResult, `Login successful: ${isAuthenticated}`)
    } catch (error) {
      addTestResult('Auth - Login', false, `Error: ${error}`)
    }

    // Test 4: Check isFavourite function
    try {
      const isFavResult = isFavourite('test-fav-1')
      addTestResult('Favourites - Check Status', isFavResult, `Item is favourite: ${isFavResult}`)
    } catch (error) {
      addTestResult('Favourites - Check Status', false, `Error: ${error}`)
    }

    // Test 5: Remove from favourites
    try {
      removeItem('test-fav-1')
      const afterRemove = isFavourite('test-fav-1')
      addTestResult('Favourites - Remove Item', !afterRemove, `Item removed from favourites`)
    } catch (error) {
      addTestResult('Favourites - Remove Item', false, `Error: ${error}`)
    }

    // Test 6: Clear cart
    try {
      clearCart()
      addTestResult('Cart - Clear', cartItems.length === 0, `Cart cleared successfully`)
    } catch (error) {
      addTestResult('Cart - Clear', false, `Error: ${error}`)
    }
  }

  const clearTests = () => {
    setTestResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Functionality Test Suite</h1>
          <p className="mt-2 text-gray-600">Test all e-commerce functionality</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test Controls */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Test Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={runAllTests} className="w-full">
                  Run All Tests
                </Button>
                <Button onClick={clearTests} variant="outline" className="w-full">
                  Clear Results
                </Button>
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Current State:</h3>
                  <div className="space-y-1 text-sm">
                    <p>Cart Items: {cartItems.length}</p>
                    <p>Favourite Items: {favouriteItems.length}</p>
                    <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
                    <p>User: {user?.name || 'None'}</p>
                    <p>Cart Total: ₹{total}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Quick Links:</h3>
                  <div className="space-y-2">
                    <Link href="/gifts">
                      <Button variant="outline" className="w-full">Gifts Page</Button>
                    </Link>
                    <Link href="/cart">
                      <Button variant="outline" className="w-full">Cart Page</Button>
                    </Link>
                    <Link href="/favourites">
                      <Button variant="outline" className="w-full">Favourites Page</Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full">Profile Page</Button>
                    </Link>
                    <Link href="/signin">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No tests run yet. Click "Run All Tests" to start.</p>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className="mt-1">
                          {result.passed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{result.test}</h4>
                            <Badge variant={result.passed ? "default" : "destructive"}>
                              {result.passed ? "PASSED" : "FAILED"}
                            </Badge>
                          </div>
                          {result.details && (
                            <p className="text-sm text-gray-600 mt-1">{result.details}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {result.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
