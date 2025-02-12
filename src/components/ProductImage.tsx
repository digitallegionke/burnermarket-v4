'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src?: string;
  alt: string;
  title: string;
}

export default function ProductImage({ src, alt, title }: ProductImageProps) {
  useEffect(() => {
    console.log('Product:', title, 'Image src:', src);
  }, [title, src]);

  return (
    <div className="relative w-full pb-[100%]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="absolute inset-0 object-contain transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
    </div>
  );
}
