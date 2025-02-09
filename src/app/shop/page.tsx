import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts, getAllCollections, getProductsByCollection } from '@/lib/shopify';
import ErrorState from '@/components/ErrorState';
import AddToBoxButton from '@/components/AddToBoxButton';
import SearchBar from '@/components/SearchBar';

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
  searchParams: { 
    collection?: string;
    q?: string;
  };
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

    // Filter products by search query if present
    if (searchParams.q) {
      const searchQuery = searchParams.q.toLowerCase();
      products = products.filter(product => 
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      );
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

      {/* Search Bar */}
      <div className="container mb-8">
        <SearchBar />
      </div>

      {/* Collection Filters */}
      <div className="container">
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={{
              pathname: '/shop',
              query: searchParams.q ? { q: searchParams.q } : {}
            }}
            className={`px-8 py-2.5 rounded-[40px] whitespace-nowrap transition-colors font-medium ${
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
              href={{
                pathname: '/shop',
                query: {
                  collection: collection.id,
                  ...(searchParams.q ? { q: searchParams.q } : {})
                }
              }}
              className={`px-8 py-2.5 rounded-[40px] whitespace-nowrap transition-colors font-medium ${
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
                className="flex flex-col justify-start items-start w-[282px] gap-5 group"
              >
                {/* Product Image Container - Clickable */}
                <Link 
                  href={`/shop/${product.handle}`}
                  className="self-stretch h-60 bg-white border border-[#e7e7e7] overflow-hidden group-hover:border-[#354439]/20 transition-colors"
                >
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    {product.images && product.images[0] ? (
                      <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
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
                </Link>

                {/* Product Info - Clickable */}
                <Link 
                  href={`/shop/${product.handle}`}
                  className="flex flex-col justify-between items-start self-stretch h-[130px] group-hover:opacity-90 transition-opacity"
                >
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
                </Link>

                {/* Add to Box Button */}
                <AddToBoxButton
                  product={{
                    id: product.id,
                    title: product.title,
                    price: product.variants[0].price,
                    image: product.images[0]
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;