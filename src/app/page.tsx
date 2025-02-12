import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddToBoxButton from '@/components/AddToBoxButton';

const recipes = [
  {
    title: 'Sirloin & Sherry Shallot Sauce',
    date: 'August 8, 2024',
    image: '/recipes/sirloin.png'
  },
  {
    title: 'Shrimp & Honey Miso Broccoli Donburi',
    date: 'August 8, 2024',
    image: '/recipes/shrimp.png'
  },
  {
    title: 'Raspberry-Ricotta Cake',
    date: 'August 8, 2024',
    image: '/recipes/cake.png'
  },
  {
    title: 'One-Pot Chicken and Rice',
    date: 'August 8, 2024',
    image: '/recipes/chicken.png'
  }
];

export default function Home() {
  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-[44px] md:text-[56px] font-semibold leading-[1.2] mb-8">
            Bring Loved Ones Closer with Every Delightful and Wholesome Creation.
          </h1>
          <Link 
            href="/shop"
            className="inline-block bg-[rgb(53,68,57)] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[rgb(53,68,57)]/90 transition-colors"
          >
            Shop all
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-16 bg-[rgb(248,248,248)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[32px] font-semibold mb-6">Our mission</h2>
          <p className="text-xl text-[rgb(53,68,57)]/80">
            We handpick the finest, wholesome, and flavorful food and beverage items, 
            empowering you to effortlessly create irresistible meals that bring joy to 
            you and your loved ones.
          </p>
        </div>
      </section>

      {/* Build your Produce box Section */}
      <section className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[32px] font-semibold">Build your Produce box</h2>
          <Link 
            href="/shop"
            className="flex items-center gap-2 font-bold hover:text-[rgb(53,68,57)]/70 transition-colors"
          >
            View all
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Example Product Card */}
          <div className="flex flex-col gap-5">
            <div className="aspect-square relative bg-white border border-[#e7e7e7] p-6">
              <div className="relative w-full h-full">
                <Image
                  src="/images/products/tomatoes.jpg"
                  alt="Organic Tomatoes"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] font-semibold">Organic Tomatoes - Per Kg</h3>
              <div className="flex flex-col">
                <span className="text-sm text-[#c06654] font-medium">from</span>
                <span className="text-xl font-bold text-[#c06654]">KSH 180.00</span>
                <span className="text-xs font-bold text-[#c06654]">Per Kg</span>
              </div>
              <AddToBoxButton 
                product={{
                  id: '1',
                  title: 'Organic Tomatoes - Per Kg',
                  price: { amount: '180.00', currencyCode: 'KES' }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* BurnerDrops Section */}
      <section className="container py-16 bg-[rgb(248,248,248)]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[32px] font-semibold">BurnerDrops</h2>
          <Link 
            href="/shop"
            className="flex items-center gap-2 font-bold hover:text-[rgb(53,68,57)]/70 transition-colors"
          >
            View all
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Example Product Card */}
          <div className="flex flex-col gap-5">
            <div className="aspect-square relative bg-white border border-[#e7e7e7] p-6">
              <div className="relative w-full h-full">
                <Image
                  src="/images/products/curry-paste.jpg"
                  alt="Indian Style Curry Paste"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] font-semibold">Indian Style Curry Paste</h3>
              <div className="flex flex-col">
                <span className="text-sm text-[#c06654] font-medium">from</span>
                <span className="text-xl font-bold text-[#c06654]">KSH 350.00</span>
              </div>
              <AddToBoxButton 
                product={{
                  id: '2',
                  title: 'Indian Style Curry Paste',
                  price: { amount: '350.00', currencyCode: 'KES' }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Healthy Beverages Section */}
      <section className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[32px] font-semibold">Healthy Beverages</h2>
          <Link 
            href="/shop"
            className="flex items-center gap-2 font-bold hover:text-[rgb(53,68,57)]/70 transition-colors"
          >
            View all
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Example Product Card */}
          <div className="flex flex-col gap-5">
            <div className="aspect-square relative bg-white border border-[#e7e7e7] p-6">
              <div className="relative w-full h-full">
                <Image
                  src="/images/products/kombucha.jpg"
                  alt="Kombucha - Apple and Ginger"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold uppercase text-[rgb(53,68,57)]/70">Teaberg</span>
              <h3 className="text-[22px] font-semibold">Kombucha - Apple and Ginger - 1 Litre</h3>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#c06654]">KSH 1,200.00</span>
              </div>
              <AddToBoxButton 
                product={{
                  id: '3',
                  title: 'Kombucha - Apple and Ginger - 1 Litre',
                  price: { amount: '1200.00', currencyCode: 'KES' }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container py-16 bg-[rgb(248,248,248)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[32px] font-semibold mb-8">
            Subscribe to our emails
          </h2>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[rgb(53,68,57)]/40 py-4">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent w-full text-[20px] placeholder:text-[rgb(53,68,57)]/40 focus:outline-none"
              />
              <button className="flex items-center gap-2 font-bold">
                Sign up
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <p className="text-[18px] font-semibold">
              Be the first to know what new products and recipes we will be having on BurnerMarket.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}