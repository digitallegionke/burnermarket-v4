'use client';

import React from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity }: CartDrawerProps) {
  const total = items.reduce((sum, item) => {
    return sum + (parseFloat(item.price.amount) * item.quantity);
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#354439]/10">
          <h2 className="text-xl font-semibold text-[#354439]">Your Box</h2>
          <button 
            onClick={onClose}
            className="text-[#354439] hover:text-[#354439]/70 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#354439]/70">Your box is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white border border-[#e7e7e7] flex items-center justify-center">
                    {item.image && (
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-base text-[#354439] font-semibold">{item.title}</h3>
                    <p className="text-base text-[#c06654] font-medium mt-1">
                      KSH {parseFloat(item.price.amount).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center border border-[#354439]/20 rounded hover:bg-[#354439]/5 transition-colors text-base"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-base">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-[#354439]/20 rounded hover:bg-[#354439]/5 transition-colors text-base"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#354439]/10 p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base text-[#354439] font-medium">Total</span>
            <span className="text-base text-[#354439] font-semibold">
              KSH {total.toFixed(2)}
            </span>
          </div>
          <button 
            className="w-full bg-[#354439] text-white py-2.5 rounded text-base font-medium hover:bg-[#2a3632] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
} 