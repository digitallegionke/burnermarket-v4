'use client';

import React from 'react';

interface AddToCartButtonProps {
  isOutOfStock?: boolean;
}

export default function AddToCartButton({ isOutOfStock }: AddToCartButtonProps) {
  if (isOutOfStock) {
    return (
      <button 
        disabled
        className="w-full py-2 text-center border border-[#E5E0DC] text-[#E5E0DC] rounded hover:bg-[#E5E0DC]/5 transition-colors"
      >
        Restocking soon
      </button>
    );
  }

  return (
    <button 
      onClick={() => {
        // Add to cart logic here
      }}
      className="w-full py-2 text-center border border-[#c06654] text-[#c06654] rounded hover:bg-[#c06654]/5 transition-colors"
    >
      Add to cart to pre-order
    </button>
  );
}
