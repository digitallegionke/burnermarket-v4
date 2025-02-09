import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    name: 'Premium Cast Iron Skillet',
    price: '$45.00',
    image: '/products/skillet.jpg',
    category: 'Cookware'
  },
  {
    name: 'Wooden Cutting Board',
    price: '$35.00',
    image: '/products/cutting-board.jpg',
    category: 'Kitchen Tools'
  },
  {
    name: 'Chef\'s Knife',
    price: '$89.00',
    image: '/products/knife.jpg',
    category: 'Kitchen Tools'
  },
  {
    name: 'Stainless Steel Pot Set',
    price: '$199.00',
    image: '/products/pot-set.jpg',
    category: 'Cookware'
  },
  {
    name: 'Digital Kitchen Scale',
    price: '$29.00',
    image: '/products/scale.jpg',
    category: 'Kitchen Tools'
  },
  {
    name: 'Bamboo Utensil Set',
    price: '$25.00',
    image: '/products/utensils.jpg',
    category: 'Kitchen Tools'
  }
];

const categories = ['All', 'Cookware', 'Kitchen Tools', 'Appliances', 'Storage'];

export default function ShopPage() {
  return (
    <div className="pt-[120px]">
      <section className="container py-10">
        <h1 className="text-center mb-16">Shop</h1>

        {/* Filters and Sort */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-[16px] ${
                  category === 'All'
                    ? 'bg-[rgb(53,68,57)] text-white'
                    : 'bg-[rgb(53,68,57)]/[0.08]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[16px] text-[rgb(53,68,57)]/70">Sort by:</span>
            <select className="border-none bg-transparent text-[16px] font-semibold">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link 
              key={index}
              href={`/shop/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className="aspect-square relative bg-[rgb(248,248,248)] mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[rgb(53,68,57)]/70">{product.category}</span>
                <h3 className="text-[20px] font-semibold">{product.name}</h3>
                <span className="text-[18px]">{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[rgb(248,248,248)] py-10 mt-16">
        <div className="container">
          <h2 className="text-[32px] font-semibold mb-8">
            Get updates on new products and exclusive offers.
          </h2>
          
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex justify-between items-center border-b border-[rgb(53,68,57)]/40 py-4">
              <span className="text-[20px] opacity-40">Your Email</span>
              <button className="flex items-center gap-2 font-bold">
                Sign up
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <p className="text-[18px] font-semibold">
              Check our <Link href="/privacy" className="underline">privacy policy</Link> on how we collect and process your information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}