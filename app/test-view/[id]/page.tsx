import fs from 'fs/promises'
import path from 'path'
import { notFound } from "next/navigation"
import Link from 'next/link'
import ProceedButton from '@/components/proceed-button'

interface Product {
  id: string
  name: string
  image: string
  description: string
  price: number
  rating: number
  reviewCount: number
  category: string
  customizationLevel: string
  inStock: boolean
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  console.log('=== ProductPage called with ID:', params.id)
  
  try {
    // Read products directly from file to avoid API issues
    const productsFile = path.join(process.cwd(), 'public', 'data', 'products.json')
    const data = await fs.readFile(productsFile, 'utf8')
    const products: Product[] = JSON.parse(data)
    
    console.log('=== Products loaded:', products.length, 'products')
    console.log('=== Product IDs:', products.map(p => p.id))
    
    const product = products.find((p) => p.id === params.id)
    console.log('=== Found product:', !!product, product?.name)

    if (!product) {
      console.log('=== Product not found, calling notFound()')
      notFound()
    }

    console.log('=== Rendering product page for:', product.name)
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '8px', marginBottom: '16px' }}
        />
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>{product.description}</p>
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#7c3aed', marginBottom: '16px' }}>
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <span style={{ color: '#FFD700', fontSize: '18px' }}>
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(product.rating) ? '⭐' : '☆'}</span>
            ))}
          </span>
          <span style={{ color: '#666' }}>({product.reviewCount} reviews)</span>
        </div>
        <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Customization:</strong> {product.customizationLevel}</p>
          <p><strong>Stock:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <ProceedButton productName={product.name} />
          <Link 
            href="/gifts"
            style={{
              backgroundColor: 'white',
              color: '#7c3aed',
              padding: '12px 24px',
              border: '2px solid #7c3aed',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '16px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  } catch (error) {
    console.error('=== Error in ProductPage:', error)
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Error Loading Product</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>Unable to load product details. Please try again later.</p>
        <div>
          <a href="/" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
            ← Back to Products
          </a>
        </div>
      </div>
    )
  }
}
