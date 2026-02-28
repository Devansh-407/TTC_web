'use client'

import { useState } from 'react'

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
        Quantity:
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={handleDecrease}
          style={{
            width: '36px',
            height: '36px',
            border: '2px solid #e5e7eb',
            backgroundColor: 'white',
            borderRadius: '6px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          -
        </button>
        <span style={{
          padding: '8px 16px',
          border: '2px solid #e5e7eb',
          borderRadius: '6px',
          fontSize: '16px',
          minWidth: '60px',
          textAlign: 'center',
          backgroundColor: 'white'
        }}>
          {quantity}
        </span>
        <button 
          onClick={handleIncrease}
          style={{
            width: '36px',
            height: '36px',
            border: '2px solid #e5e7eb',
            backgroundColor: 'white',
            borderRadius: '6px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}
