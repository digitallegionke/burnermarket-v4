import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import ProductImage from '@/components/ProductImage';
import { getProductsByCollection, getAllCollections } from '@/lib/shopify';

interface ShopifyImage {
  src: string;
  alt: string;
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
  inventoryQuantity?: number;
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function Home() {
  let boxProducts: ShopifyProduct[] = [];
  let burnerDropProducts: ShopifyProduct[] = [];
  try {
    const collections = await getAllCollections();
    
    const boxCollection = collections.find(collection => 
      collection.handle.toLowerCase() === 'build-your-box' || 
      collection.title.toLowerCase() === 'build your box'
    );

    const burnerDropCollection = collections.find(collection =>
      collection.handle.toLowerCase() === 'burnerdrop'
    );

    if (boxCollection) {
      boxProducts = await getProductsByCollection(boxCollection.id);
    }

    if (burnerDropCollection) {
      burnerDropProducts = await getProductsByCollection(burnerDropCollection.id);
    }
  } catch (error) {
    console.error('Error fetching box products:', error);
  }

  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[rgb(53,68,57)]">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-lg">Hero image loading...</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative h-full container flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-[44px] md:text-[56px] font-semibold leading-[1.2] mb-8 text-white">
              Discover Fresh, Local Ingredients for Your Kitchen
            </h1>
            <Link 
              href="/shop"
              className="inline-block bg-white text-[rgb(53,68,57)] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/shop?collection=produce" className="group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <div className="w-full h-full bg-[rgb(53,68,57)]">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-lg">Loading...</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-3xl font-semibold text-white">Fresh Produce</h2>
              </div>
            </div>
          </Link>
          <Link href="/shop?collection=pantry" className="group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <div className="w-full h-full bg-[rgb(53,68,57)]">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-lg">Loading...</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-3xl font-semibold text-white">Pantry Essentials</h2>
              </div>
            </div>
          </Link>
          <Link href="/shop?collection=beverages" className="group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <div className="w-full h-full bg-[rgb(53,68,57)]">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-lg">Loading...</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-3xl font-semibold text-white">Healthy Beverages</h2>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Build your Produce box Section */}
      <section className="bg-[rgb(248,248,248)] py-20">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-[32px] font-semibold">Build your Produce box</h2>
            <Link 
              href="/shop?collection=build-your-box"
              className="flex items-center gap-2 font-bold hover:text-[rgb(53,68,57)]/70 transition-colors"
            >
              View all
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boxProducts.length > 0 ? (
              boxProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/shop/${product.handle}`} className="block">
                    <div className="relative bg-white overflow-hidden">
                      <ProductImage
                        src={product.images[0]?.src}
                        alt={product.images[0]?.alt || product.title}
                        title={product.title}
                      />
                      {product.variants[0]?.inventoryQuantity === 0 && (
                        <div className="absolute bottom-2 right-2 bg-[#E5E0DC] text-[rgb(53,68,57)] px-4 py-1 rounded-full text-sm">
                          Restocking soon
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-[18px] font-medium text-[rgb(53,68,57)]">
                        {product.title}
                      </h3>
                      {product.variants && product.variants[0] && (
                        <div className="mt-1">
                          <span className="text-[rgb(53,68,57)]">
                            KSh{parseFloat(product.variants[0].price.amount).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="mt-4">
                    <AddToCartButton 
                      isOutOfStock={product.variants[0]?.inventoryQuantity === 0}
                    />
                  </div>
                </div>
              ))
            ) : (
              // Fallback UI when no products are loaded
              <div className="col-span-full text-center py-8">
                <p className="text-[rgb(53,68,57)]/70">Loading products...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BurnerDrops */}
      <section className="container py-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-[32px] font-semibold">BurnerDrops</h2>
          <Link 
            href="/shop?collection=burnerdrop"
            className="flex items-center gap-2 font-bold hover:text-[rgb(53,68,57)]/70 transition-colors"
          >
            View all
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {burnerDropProducts.length > 0 ? burnerDropProducts.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/shop/${product.handle}`} className="block bg-white rounded-lg overflow-hidden">
              <div className="relative aspect-square bg-white overflow-hidden">
                <ProductImage
                  src={product.images[0]?.src}
                  alt={product.images[0]?.alt || product.title}
                  title={product.title}
                />
                {product.variants[0]?.inventoryQuantity === 0 && (
                  <div className="absolute bottom-2 right-2 bg-[#E5E0DC] text-[rgb(53,68,57)] px-4 py-1 rounded-full text-sm">
                    Restocking soon
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-[18px] font-medium text-[rgb(53,68,57)]">
                  {product.title}
                </h3>
                {product.variants && product.variants[0] && (
                  <div className="mt-1">
                    <span className="text-[rgb(53,68,57)]">
                      {product.variants[0].price.amount.startsWith('0') ? 'From ' : ''}
                      KSh{parseFloat(product.variants[0].price.amount).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          )) : (
            // Fallback UI when no products are loaded
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden">
                  <div className="relative aspect-square bg-[rgb(248,248,248)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[rgb(53,68,57)]/70">Loading...</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="h-4 bg-[rgb(248,248,248)] rounded w-3/4"></div>
                    <div className="mt-2 h-4 bg-[rgb(248,248,248)] rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[rgb(248,248,248)] py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[32px] font-semibold mb-6">
              Join Our Community
            </h2>
            <p className="text-lg text-[rgb(53,68,57)]/80 mb-8">
              Subscribe to receive updates about new products, recipes, and exclusive offers.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-6 py-3 rounded-full border border-[rgb(53,68,57)]/20 focus:outline-none focus:border-[rgb(53,68,57)]"
              />
              <button 
                type="submit"
                className="bg-[rgb(53,68,57)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[rgb(53,68,57)]/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
