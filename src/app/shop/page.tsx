import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts, getAllCollections, getProductsByCollection } from '@/lib/shopify';
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

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
}

interface Props {
  searchParams: { collection?: string };
}

async function ShopPage({ searchParams }: Props) {
  let products: ShopifyProduct[] = [];
  let collections: ShopifyCollection[] = [];
  let error: string | null = null;

  try {
    // Fetch collections first
    collections = await getAllCollections();

    // Fetch products based on selected collection or all products
    if (searchParams.collection) {
      products = await getProductsByCollection(searchParams.collection);
    } else {
      products = await getAllProducts();
    }
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

      {/* Collection Filters */}
      <div className="container">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          <Link
            href="/shop"
            className={`px-8 py-2 rounded-[40px] whitespace-nowrap transition-colors ${
              !searchParams.collection
                ? 'bg-[#354439] text-white'
                : 'bg-[#354439]/[0.08] text-[#354439] hover:bg-[#354439]/[0.12]'
            }`}
          >
            All Products
          </Link>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop?collection=${collection.id}`}
              className={`px-8 py-2 rounded-[40px] whitespace-nowrap transition-colors ${
                searchParams.collection === collection.id
                  ? 'bg-[#354439] text-white'
                  : 'bg-[#354439]/[0.08] text-[#354439] hover:bg-[#354439]/[0.12]'
              }`}
            >
              {collection.title}
            </Link>
          ))}
        </div>
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
          <div className="flex flex-wrap gap-4">
            {products.map((product: ShopifyProduct) => (
              <div
                key={product.id}
                className="flex flex-col justify-start items-start w-[282px] gap-5"
              >
                {/* Product Image Container */}
                <div className="self-stretch h-60 bg-white border border-[#e7e7e7]">
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    {product.images && product.images[0] ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt || product.title}
                          fill
                          className="object-contain"
                          sizes="282px"
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
                <div className="flex flex-col justify-between items-start self-stretch h-[130px]">
                  <div className="flex flex-col justify-start items-start self-stretch">
                    <p className="self-stretch w-[282px] text-[22px] font-semibold text-left text-[#354439]">
                      {product.title}
                    </p>
                    <p className="self-stretch w-[282px] opacity-70 text-sm font-semibold text-left uppercase text-[#354439]">
                      BY Mavuno Farm
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start self-stretch">
                    <p className="self-stretch w-[282px] opacity-80 text-sm font-medium text-left text-[#c06654]">
                      from
                    </p>
                    {product.variants && product.variants[0] && (
                      <>
                        <p className="self-stretch w-[282px] text-[22px] font-bold text-left text-[#c06654]">
                          KSH {parseFloat(product.variants[0].price.amount).toFixed(2)}
                        </p>
                        <p className="self-stretch w-[282px] text-xs font-bold text-left text-[#c06654]">
                          Per Kg
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Add to Box Button */}
                <button className="flex justify-end items-center gap-1.5 px-[21px] py-2.5 rounded-[40px] bg-[#354439] hover:bg-[#2a3632] transition-colors">
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
                  <span className="text-base font-bold text-left text-white">Add to Box</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;