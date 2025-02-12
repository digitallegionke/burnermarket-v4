'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './CartProvider';

const Navbar = () => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-[#f6f6f4] z-50 border-b border-[#354439]/20">
      <div className="flex justify-between items-center w-[1440px] h-[120px] px-[120px] mx-auto">
        {/* Logo Section */}
        <div className="flex justify-start items-center gap-[54px]">
          <Link href="/" className="flex items-start relative overflow-hidden">
            <Image
              src="/images/BM logo.svg"
              alt="Burner Market"
              width={181}
              height={58}
              priority
            />
            <Image
              src="/images/tm.svg"
              alt="TM"
              width={17}
              height={6}
              className="ml-1"
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between items-center w-[841px] h-[77px]">
          <Link href="/" className="text-lg font-medium text-[#c06654]">
            Home
          </Link>
          <Link href="/shop" className="text-lg font-medium text-[#354439]">
            Shop
          </Link>
          <Link href="/build-box" className="text-lg font-medium text-[#354439]">
            Build a box
          </Link>
          
          {/* Brands Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-1"
              onClick={() => setIsBrandsOpen(!isBrandsOpen)}
            >
              <span className="text-lg font-medium text-[#354439]">Brands</span>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M12.1832 14.475L8.5582 10.85C8.5082 10.8 8.4707 10.7458 8.4457 10.6875C8.4207 10.6292 8.4082 10.5667 8.4082 10.5C8.4082 10.3667 8.45404 10.25 8.5457 10.15C8.63737 10.05 8.7582 10 8.9082 10H16.5082C16.6582 10 16.779 10.05 16.8707 10.15C16.9624 10.25 17.0082 10.3667 17.0082 10.5C17.0082 10.5333 16.9582 10.65 16.8582 10.85L13.2332 14.475C13.1499 14.5583 13.0665 14.6167 12.9832 14.65C12.8999 14.6833 12.8082 14.7 12.7082 14.7C12.6082 14.7 12.5165 14.6833 12.4332 14.65C12.3499 14.6167 12.2665 14.5583 12.1832 14.475Z" fill="#354439"/>
              </svg>
            </button>
            
            {isBrandsOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border border-[#354439]/10">
                <Link href="/brands/local" className="block px-4 py-2 text-[#354439] hover:bg-[#354439]/[0.08] transition-colors">
                  Local Brands
                </Link>
                <Link href="/brands/international" className="block px-4 py-2 text-[#354439] hover:bg-[#354439]/[0.08] transition-colors">
                  International Brands
                </Link>
              </div>
            )}
          </div>

          {/* Directory Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-1"
              onClick={() => setIsDirectoryOpen(!isDirectoryOpen)}
            >
              <span className="text-lg font-medium text-[#354439]">Directory</span>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M11.8502 14.475L8.2252 10.85C8.1752 10.8 8.1377 10.7458 8.1127 10.6875C8.0877 10.6292 8.0752 10.5667 8.0752 10.5C8.0752 10.3667 8.12103 10.25 8.2127 10.15C8.30436 10.05 8.4252 10 8.5752 10H16.1752C16.3252 10 16.446 10.05 16.5377 10.15C16.6294 10.25 16.6752 10.3667 16.6752 10.5C16.6752 10.5333 16.6252 10.65 16.5252 10.85L12.9002 14.475C12.8169 14.5583 12.7335 14.6167 12.6502 14.65C12.5669 14.6833 12.4752 14.7 12.3752 14.7C12.2752 14.7 12.1835 14.6833 12.1002 14.65C12.0169 14.6167 11.9335 14.5583 11.8502 14.475Z" fill="#354439"/>
              </svg>
            </button>
            
            {isDirectoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border border-[#354439]/10">
                <Link href="/directory/ingredients" className="block px-4 py-2 text-[#354439] hover:bg-[#354439]/[0.08] transition-colors">
                  Ingredients
                </Link>
                <Link href="/directory/farmers" className="block px-4 py-2 text-[#354439] hover:bg-[#354439]/[0.08] transition-colors">
                  Farmers
                </Link>
              </div>
            )}
          </div>

          <Link href="/our-story" className="text-lg font-medium text-[#354439]">
            Our Story
          </Link>
          <Link href="/contact" className="text-lg font-medium text-[#354439]">
            Contact Us
          </Link>
        </div>

        {/* Cart Section */}
        <div className="flex items-center h-[77px] gap-7">
          <div className="flex items-center gap-[21px]">
            <div className="relative py-[3px]">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                <g clipPath="url(#clip0_1587_4785)">
                  <path d="M17.8009 17.0178C17.627 17.0178 17.4562 17.0319 17.29 17.0569V17.0022H3.49745C3.44102 17.0022 3.39069 16.9897 3.33578 16.9631C3.25495 16.9225 3.16343 16.8413 3.09175 16.7178C3.02159 16.5943 2.97431 16.4334 2.97431 16.2506C2.97431 16.0068 3.05972 15.8021 3.16801 15.6739C3.22292 15.6098 3.28087 15.5661 3.33426 15.538C3.38916 15.5114 3.4395 15.4989 3.49593 15.4989H19.0135L21.9983 4.73655L3.86808 4.79437L3.50356 0H0.181641V1.71897H1.95241L2.88127 13.8799C2.78366 13.9112 2.68909 13.9471 2.5991 13.9924C2.19187 14.1972 1.867 14.5238 1.64432 14.9144C1.42164 15.3051 1.29657 15.7646 1.29657 16.249C1.29657 16.896 1.5162 17.496 1.90056 17.9508C2.09273 18.1789 2.32762 18.3696 2.5991 18.5055C2.87059 18.6415 3.17869 18.7196 3.49745 18.7196H3.60575C3.29155 19.2463 3.11005 19.8682 3.11005 20.5277C3.11005 21.484 3.48983 22.356 4.10296 22.9827C4.71305 23.6093 5.56564 24 6.49907 24C7.43251 24 8.28358 23.6109 8.89519 22.9827C9.5068 22.3576 9.8881 21.484 9.8881 20.5277C9.8881 19.8666 9.7066 19.2463 9.39241 18.7196H14.8893C14.5903 19.2384 14.4165 19.8432 14.4165 20.487C14.4165 21.4434 14.7962 22.3154 15.4094 22.942C16.0195 23.5687 16.8721 23.9594 17.8055 23.9594C18.7389 23.9594 19.59 23.5703 20.2016 22.942C20.8132 22.317 21.1945 21.4434 21.1945 20.487C21.1945 19.5307 20.8147 18.6587 20.2016 18.032C19.5915 17.4054 18.7389 17.0147 17.8055 17.0147L17.8009 17.0178ZM19.7776 6.46178L17.7475 13.7784H4.55595L4.00078 6.51178L19.7776 6.46178ZM7.70704 21.7685C7.39438 22.0872 6.97342 22.281 6.49755 22.281C6.02321 22.281 5.60072 22.0857 5.28806 21.7685C4.97691 21.4481 4.78779 21.0168 4.78779 20.5292C4.78779 20.0432 4.97844 19.6104 5.28806 19.29C5.60072 18.9712 6.02168 18.7774 6.49755 18.7774C6.97189 18.7774 7.39438 18.9728 7.70704 19.29C8.01819 19.6104 8.20731 20.0417 8.20731 20.5292C8.20731 21.0152 8.01666 21.4481 7.70704 21.7685ZM19.0104 21.7263C18.6977 22.0451 18.2768 22.2388 17.8009 22.2388C17.3266 22.2388 16.9041 22.0435 16.5914 21.7263C16.2803 21.4059 16.0911 20.9746 16.0911 20.487C16.0911 20.001 16.2818 19.5682 16.5914 19.2478C16.9041 18.929 17.325 18.7353 17.8009 18.7353C18.2752 18.7353 18.6977 18.9306 19.0104 19.2478C19.3215 19.5682 19.5107 19.9995 19.5107 20.487C19.5107 20.973 19.32 21.4059 19.0104 21.7263Z" fill="#354439"/>
                </g>
                <defs>
                  <clipPath id="clip0_1587_4785">
                    <rect width="21.8182" height="24" fill="white" transform="translate(0.181641)"/>
                  </clipPath>
                </defs>
              </svg>
              {totalItems > 0 && (
                <div className="flex justify-center items-center h-[22px] w-[22px] absolute left-[10.82px] top-[-11px] rounded-[50px] bg-[#354439]">
                  <span className="text-[10px] font-bold text-center text-white">{totalItems}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;