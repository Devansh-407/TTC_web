"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getCategories, getOccasions } from "@/lib/data"

export function ProductFilters() {
  const [occasion, setOccasion] = useState("all")
  const [category, setCategory] = useState("all")
  const [categories, setCategories] = useState<any[]>([])
  const [occasions, setOccasions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilters() {
      try {
        const [categoriesData, occasionsData] = await Promise.all([
          getCategories(),
          getOccasions()
        ])
        setCategories(categoriesData)
        setOccasions(occasionsData)
      } catch (error) {
        console.error('Error loading filters:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFilters()
  }, [])

  const clearFilters = () => {
    setOccasion("all")
    setCategory("all")
  }

  if (loading) {
    return (
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="animate-pulse bg-gray-200 h-10 w-48 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-10 w-48 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <label htmlFor="occasion" className="text-gray-700 font-medium">Occasion:</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white min-w-[180px]"
        >
          <option value="all">All Occasions</option>
          {occasions.length > 0 ? (
            occasions
              .filter(occ => occ.active)
              .sort((a, b) => a.order - b.order)
              .map((occ) => (
                <option key={occ.name} value={occ.name}>
                  {occ.displayName}
                </option>
              ))
          ) : (
            <option value="" disabled>No occasions available</option>
          )}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="category" className="text-gray-700 font-medium">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white min-w-[180px]"
        >
          <option value="all">All Categories</option>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.displayName}
              </option>
            ))
          ) : (
            <option value="" disabled>No categories available</option>
          )}
        </select>
      </div>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Clear Filters
      </Button>
    </div>
  )
}
