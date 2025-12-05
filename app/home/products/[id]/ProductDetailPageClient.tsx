"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/lib/definitions';

interface Props {
  product: Product | null;
}

export default function ProductDetailPageClient({ product }: Props) {
  if (!product) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
        <p className="text-gray-500 mt-2">
          The requested handcrafted treasure could not be located.
        </p>
        <a href="/home/products" className="text-blue-600 underline mt-4 inline-block">
          ← Back to All Products
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden border">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          <p className="text-2xl text-green-700 mt-2">${product.price.toFixed(2)}</p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <button className="mt-6 px-6 py-3 bg-[#7E9F8E] text-white rounded-lg hover:bg-[#6B8D7D]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
