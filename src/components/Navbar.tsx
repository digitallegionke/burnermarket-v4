'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-[rgb(53,68,57)]/20">
      <div className="container h-[120px] flex justify-between items-center">
        <div className="flex-1 flex items-center justify-center sm:justify-start">
          <Link href="/" className="text-[26px] font-semibold">
            Burner Market Co.
          </Link>
        </div>
        
        <div className="hidden sm:flex gap-[69px]">
          <Link href="/shop" className="nav-link">Shop</Link>
          <Link href="/recipes" className="nav-link">Recipes</Link>
          <div className="relative">
            <button 
              className="nav-link flex items-center gap-1"
              onClick={() => setIsDirectoryOpen(!isDirectoryOpen)}
            >
              Directory
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`transition-transform duration-200 ${isDirectoryOpen ? 'rotate-180' : ''}`}
              >
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {isDirectoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border border-[rgb(53,68,57)]/10">
                <Link 
                  href="/directory/ingredients" 
                  className="block px-4 py-2 text-[rgb(53,68,57)] hover:bg-[rgb(53,68,57)]/[0.08] transition-colors"
                >
                  Ingredients
                </Link>
                <Link 
                  href="/directory/farmers" 
                  className="block px-4 py-2 text-[rgb(53,68,57)] hover:bg-[rgb(53,68,57)]/[0.08] transition-colors"
                >
                  Farmers
                </Link>
              </div>
            )}
          </div>
          <Link href="/our-story" className="nav-link">Our Story</Link>
        </div>
        
        <div className="sm:hidden">
          <button className="p-2">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;