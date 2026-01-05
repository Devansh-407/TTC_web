"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-16 bg-purple-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Stay Connected With Us</h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new product launches, and special gift ideas
          </p>

          {isSubscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <p className="text-white font-semibold">Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white border-0 text-gray-900 placeholder:text-gray-500 rounded-md px-4 py-3"
              />
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-md border border-purple-600">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
