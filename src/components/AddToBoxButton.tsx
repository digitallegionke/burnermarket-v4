'use client';

import React from 'react';
import { useCart } from './CartProvider';

interface AddToBoxButtonProps {
  product: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}

export default function AddToBoxButton({ product }: AddToBoxButtonProps) {
  const { addItem } = useCart();

  return (
    <button 
      onClick={() => addItem(product)}
      className="flex justify-end items-center gap-1.5 px-[21px] py-2.5 rounded-[40px] bg-[#354439] hover:bg-[#2a3632] transition-colors"
    >
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.14286 7.35714H0.857143C0.614286 7.35714 0.410714 7.275 0.246429 7.11071C0.0821429 6.94643 0 6.74286 0 6.5C0 6.25714 0.0821429 6.05357 0.246429 5.88929C0.410714 5.725 0.614286 5.64286 0.857143 5.64286H5.14286V1.35714C5.14286 1.11429 5.225 0.910714 5.38929 0.746429C5.55357 0.582143 5.75714 0.5 6 0.5C6.24286 0.5 6.44643 0.582143 6.61071 0.746429C6.775 0.910714 6.85714 1.11429 6.85714 1.35714V5.64286H11.1429C11.3857 5.64286 11.5893 5.725 11.7536 5.88929C11.9179 6.05357 12 6.25714 12 6.5C12 6.74286 11.9179 6.94643 11.7536 7.11071C11.5893 7.275 11.3857 7.35714 11.1429 7.35714H6.85714V11.6429C6.85714 11.8857 6.775 12.0893 6.61071 12.2536C6.44643 12.4179 6.24286 12.5 6 12.5C5.75714 12.5 5.55357 12.4179 5.38929 12.2536C5.225 12.0893 5.14286 11.8857 5.14286 11.6429V7.35714Z"
          fill="white"
        />
      </svg>
      <span className="text-base font-medium text-left text-white">Add to Box</span>
    </button>
  );
} 