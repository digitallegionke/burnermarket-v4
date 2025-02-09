'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const collection = searchParams.get('collection');
  const query = searchParams.get('q') || '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('q')?.toString() || '';
    
    startTransition(() => {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (collection) params.set('collection', collection);
      
      router.push(`/shop${params.toString() ? `?${params.toString()}` : ''}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[643px]">
      <div className="flex items-center gap-3 px-[30px] h-[77px] rounded-[60px] bg-[#354439]/[0.06] border border-[#354439]/20">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          className="opacity-50"
        >
          <path
            d="M24 23.1137L19.3689 18.4826C20.1137 17.5935 20.6982 16.6134 21.1152 15.5817C21.6497 14.2614 21.917 12.8608 21.917 11.4585C21.917 10.0579 21.6497 8.65562 21.1152 7.33525C20.5806 6.01489 19.7752 4.77827 18.7078 3.70915C17.6405 2.64181 16.4021 1.8364 15.0817 1.30184C13.7614 0.76728 12.359 0.5 10.9585 0.5C9.55795 0.5 8.15562 0.76728 6.83525 1.30184C5.51489 1.8364 4.27827 2.64181 3.20915 3.70915C2.14181 4.77649 1.3364 6.01489 0.801841 7.33525C0.26728 8.65562 0 10.0579 0 11.4585C0 12.859 0.26728 14.2614 0.801841 15.5817C1.3364 16.9021 2.14181 18.1387 3.20915 19.2078C4.27649 20.2752 5.51489 21.0806 6.83525 21.6152C8.15562 22.1497 9.55617 22.417 10.9585 22.417C12.359 22.417 13.7614 22.1497 15.0817 21.6152C16.1134 21.1964 17.0935 20.612 17.9826 19.8689L22.6137 24.5L24 23.1137Z"
            fill="#354439"
          />
        </svg>
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search products..."
          className="bg-transparent w-full text-lg font-medium text-[#354439] placeholder-[#354439]/50 focus:outline-none"
          onChange={(e) => {
            // Auto-submit after typing
            const form = e.target.form;
            if (form) {
              const timer = setTimeout(() => {
                form.requestSubmit();
              }, 300);
              return () => clearTimeout(timer);
            }
          }}
        />
        {query && (
          <Link
            href={{
              pathname: '/shop',
              query: collection ? { collection } : {}
            }}
            className="text-[#354439]/50 hover:text-[#354439] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        )}
      </div>
    </form>
  );
} 