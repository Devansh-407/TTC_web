"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ProductFilters() {
  const [occasion, setOccasion] = useState("all")
  const [category, setCategory] = useState("all")

  const clearFilters = () => {
    setOccasion("all")
    setCategory("all")
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
          <option value="anniversary">Anniversary</option>
          <option value="birthday">Birthday</option>
          <option value="proposal">Proposal</option>
          <option value="wedding">Wedding</option>
          <option value="graduation">Graduation</option>
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
          <option value="gift-hamper">Gift Hamper</option>
          <option value="gift-box">Gift Box</option>
          <option value="bouquet">Bouquet</option>
          <option value="miniature">Miniature</option>
          <option value="frame">Frame</option>
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
