// app/home/products/page.tsx
"use client";

export const dynamic = 'force-dynamic'; // ⚡ forces client-side rendering

import React from 'react';
import allProducts from '@/app/lib/products';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/app/ui/products/product-card';

const categories = ['All', 'Home Decor', 'Apparel', 'Jewelry', 'Gifts', 'Kitchen'];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const filteredProducts = selectedCategory && selectedCategory !== 'All'
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Page Title */}
      <h1 className="text-4xl font-serif text-[#2C3E50] mb-8 border-b-2 border-gray-100 pb-2">
        {selectedCategory && selectedCategory !== 'All'
          ? `${selectedCategory} Products`
          : 'All Handcrafted Treasures'}
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/home/products${cat !== 'All' ? `?category=${encodeURIComponent(cat)}` : ''}`}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === cat
                ? 'bg-[#7E9F8E] text-white border-[#7E9F8E]'
                : 'bg-white text-[#2C3E50] border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* No products message */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mb-6">
          No products found in this category.
        </p>
      )}

      {/* Product Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
