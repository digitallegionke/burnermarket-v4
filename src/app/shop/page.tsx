import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '@/lib/shopify';
import ErrorState from '@/components/ErrorState';

export const revalidate = 60; // Revalidate this page every 60 seconds

interface ShopifyImage {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  image: ShopifyImage | null;
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

async function ShopPage() {
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    products = await getAllProducts();
  } catch (e) {
    console.error('Error in shop page:', e);
    error = e instanceof Error ? e.message : 'Failed to load products. Please try again later.';
  }

  return (
    <div className="pt-[120px]">
      {/* Breadcrumb */}
      <div className="container py-8 flex items-center gap-2">
        <Link href="/" className="text-base font-semibold text-[#595959]">
          Home
        </Link>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          className="opacity-60"
        >
          <path
            d="M8.62986 8.50033L5.91436 5.785C5.82214 5.69267 5.77492 5.57661 5.7727 5.43683C5.77059 5.29717 5.81781 5.179 5.91436 5.08233C6.01103 4.98578 6.12814 4.9375 6.2657 4.9375C6.40325 4.9375 6.52036 4.98578 6.61703 5.08233L9.6132 8.0785C9.67553 8.14094 9.71953 8.20678 9.7452 8.276C9.77086 8.34522 9.7837 8.42 9.7837 8.50033C9.7837 8.58067 9.77086 8.65544 9.7452 8.72467C9.71953 8.79389 9.67553 8.85972 9.6132 8.92217L6.61703 11.9183C6.5247 12.0106 6.40864 12.0578 6.26886 12.06C6.1292 12.0621 6.01103 12.0149 5.91436 11.9183C5.81781 11.8217 5.76953 11.7046 5.76953 11.567C5.76953 11.4294 5.81781 11.3123 5.91436 11.2157L8.62986 8.50033Z"
            fill="#354439"
          />
        </svg>
        <span className="text-base font-semibold text-[#354439]">
          Shop
        </span>
      </div>

      {/* Products Grid */}
      <div className="container py-16">
        {error ? (
          <ErrorState error={error} />
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-[#354439] mb-4">No Products Found</h2>
            <p className="text-[#354439]/70">
              Please check back later for our latest products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: ShopifyProduct) => (
              <Link
                key={product.id}
                href={`/shop/${product.handle}`}
                className="flex flex-col gap-5 group"
              >
                {/* Product Image Container */}
                <div className="aspect-square w-full bg-white border border-[#e7e7e7] rounded-lg overflow-hidden">
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    {product.images && product.images[0] ? (
                      <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt || product.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <span className="text-gray-400 text-sm">No Image Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-[#354439] group-hover:text-[#2a3632] transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  {product.variants && product.variants[0] && (
                    <p className="text-base font-bold text-[#354439]/70">
                      ${parseFloat(product.variants[0].price.amount).toFixed(2)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;