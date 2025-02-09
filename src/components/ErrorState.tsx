'use client';

import React from 'react';

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-semibold text-[#354439] mb-4">Error Loading Products</h2>
      <p className="text-[#354439]/70 mb-8">{error}</p>
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={() => window.location.reload()} 
          className="bg-[#354439] text-white py-2 px-6 rounded-lg hover:bg-[#2a3632] transition-colors"
        >
          Try Again
        </button>
        <p className="text-sm text-[#354439]/60">
          If the problem persists, please verify your Shopify store settings and try again later.
        </p>
      </div>
    </div>
  );
} 