import type { Product, Testimonial } from "./types"

// Fetch products from API
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://ttc-main.vercel.app/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

// Fetch categories from API
export async function getCategories() {
  try {
    const response = await fetch('https://ttc-main.vercel.app/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

// Fetch occasions from API
export async function getOccasions() {
  try {
    const response = await fetch('https://ttc-main.vercel.app/api/occasions');
    if (!response.ok) {
      throw new Error('Failed to fetch occasions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading occasions:', error);
    return [];
  }
}

// For backward compatibility, keep the static data as fallback
export const products: Product[] = []

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai, Anniversary Gift",
    rating: 5,
    comment:
      "The memory album they created for our 10th anniversary was absolutely breathtaking. Every page told our story beautifully, and my husband was moved to tears. It's now our most treasured possession.",
    image: "/woman-smiling-testimonial-photo.jpg",
  },
  {
    id: "2",
    name: "Rahul Verma",
    location: "Delhi, Proposal Package",
    rating: 5,
    comment:
      "They helped me plan the perfect proposal with a custom music box and romantic setup. Sarah said yes! The attention to detail and personal touch made this moment absolutely magical and unforgettable.",
    image: "/man-smiling-testimonial-photo.jpg",
  },
  {
    id: "3",
    name: "Anita Desai",
    location: "Bangalore, Birthday Surprise",
    rating: 5,
    comment:
      "My daughter's 16th birthday gift was a custom scrapbook filled with memories from her childhood. She cried happy tears and said it was the most meaningful gift she'd ever received. Absolutely worth every penny.",
    image: "/asian-woman-smiling-testimonial-photo.jpg",
  },
]

export const categories = [] // Use getCategories() instead
