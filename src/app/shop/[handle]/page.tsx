import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle } from '@/lib/shopify';

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

interface ShopifyOption {
  id: string;
  name: string;
  values: string[];
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: ShopifyOption[];
}

interface Props {
  params: {
    handle: string;
  };
}

async function ProductPage({ params }: Props) {
  let product: ShopifyProduct | null = null;
  let error: string | null = null;

  try {
    product = await getProductByHandle(params.handle);
    if (!product) {
      error = 'Product not found';
    }
  } catch (e) {
    console.error('Error fetching product:', e);
    error = e instanceof Error ? e.message : 'Failed to load product';
  }

  if (error || !product) {
    return (
      <div className="pt-[120px]">
        <div className="container py-16">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-[#354439] mb-4">
              {error || 'Product Not Found'}
            </h2>
            <p className="text-[#354439]/70 mb-8">
              The product you're looking for could not be found.
            </p>
            <Link 
              href="/shop" 
              className="inline-block bg-[#354439] text-white py-2 px-6 rounded-lg hover:bg-[#2a3632] transition-colors"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const defaultVariant = product.variants[0];

  return (
    <div className="pt-[120px]">
      {/* Breadcrumb */}
      <div className="container py-8 flex items-center gap-2">
        <Link 
          href="/" 
          className="text-base font-semibold text-[#595959] hover:text-[#354439] transition-colors"
        >
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
        <Link 
          href="/shop" 
          className="text-base font-semibold text-[#595959] hover:text-[#354439] transition-colors"
        >
          Shop
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
          {product.title}
        </span>
      </div>

      {/* Product Details */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="aspect-square relative bg-white border border-[#e7e7e7] flex items-center justify-center">
            <div className="relative w-4/5 h-4/5">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.title}
                  width={product.images[0].width}
                  height={product.images[0].height}
                  className="object-contain w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-sm">Product Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-[38px] font-semibold text-[#354439] mb-4">
                {product.title}
              </h1>
              {defaultVariant && (
                <p className="text-2xl font-bold text-[#354439]">
                  KSH {parseFloat(defaultVariant.price.amount).toFixed(2)}
                </p>
              )}
            </div>

            <div className="prose prose-lg text-[#354439]/80">
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            </div>

            {/* Add to Cart Button */}
            <button className="bg-[#354439] text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-[#2a3632] transition-colors">
              Add to Cart
            </button>

            {/* Additional Details */}
            {product.options && product.options.length > 0 && (
              <div className="border-t border-[#354439]/20 pt-8">
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <ul className="space-y-2">
                  {product.options.map((option) => (
                    <li key={option.id} className="flex items-center gap-2">
                      <span className="font-semibold">{option.name}:</span>
                      <span className="text-[#354439]/70">{option.values.join(', ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage; 