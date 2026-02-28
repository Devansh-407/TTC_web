'use client'

import { useCart } from '@/lib/cart-store'
import { getWhatsAppUrl } from '@/config/whatsapp'

export default function ProceedButton({ productName }: { productName: string }) {
  const { addItem } = useCart()

  const handleProceed = () => {
    // Add to cart like cart button
    addItem({
      id: productName, // Using product name as ID for now
      name: productName,
      price: 1000, // Default price - you can update this
      image: '', // Default image - you can update this
      category: 'Gift Hamper' // Default category - you can update this
    })

    // Then redirect to WhatsApp with product name using config
    const message = `Hi! I'm interested in the "${productName}" product. Can you provide more details?`;
    const whatsappUrl = getWhatsAppUrl(message)
    window.open(whatsappUrl, '_blank');
  }

  return (
    <button 
      onClick={handleProceed}
      style={{
        backgroundColor: '#7c3aed',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        marginBottom: '16px'
      }}>
      Proceed
    </button>
  )
}
