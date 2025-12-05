// app/home/products/[id]/ProductDetailPageClient.tsx
"use client";

import React, { useState } from 'react'; 
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/lib/definitions';
import StarRating from '@/app/ui/products/star-rating'; 
import { useCart } from '@/app/context/CartContext'; 

//  Ensure  'Product' type in definitions.ts is up to date
interface RichProduct extends Product {
  rating: number;
  reviewCount: number;
  sellerName: string;
  sellerId: number;
}

interface Props {
  product: RichProduct | null;
}

export default function ProductDetailPageClient({ product }: Props) {
  const { addItem } = useCart(); 
  const [quantity, setQuantity] = useState(1); 
  const [isAdding, setIsAdding] = useState(false); 

  if (!product) {
    return (
        <div className="max-w-7xl mx-auto py-20 text-center">
            <h1 className="text-3xl font-serif text-red-600">Product Not Found</h1>
            <p className="text-gray-600 mt-4">The requested handcrafted treasure could not be located.</p>
            <Link href="/home/products" className="text-[#7E9F8E] font-bold mt-6 inline-block hover:underline">
                &larr; Back to All Products
            </Link>
        </div>
    );
  }

  // --- Add to Cart Handler ---
  const handleAddToCart = () => {
    if (quantity < 1) return; 

    setIsAdding(true);

    // Call the context function
    addItem(product, quantity);

    // Simulate delay for feedback (e.g., green flash or notification)
    setTimeout(() => {
      setIsAdding(false);
      // Optional: Show a toast/notification here
      console.log(`${quantity} x ${product.name} added to cart!`);
    }, 500);
  };
  // ---------------------------

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="mb-6">
        <Link 
          href="/home/products" 
          className="text-gray-600 hover:text-[#7E9F8E] transition-colors flex items-center text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to All Handcrafted Treasures
        </Link>
      </div>

      <h1 className="sr-only">{product.name}</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* === IMAGE === */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="w-full aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-lg">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={800} 
              height={800} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 mt-4 overflow-x-auto">
             <div className="w-16 h-16 bg-gray-200 rounded-md border-2 border-[#7E9F8E]"></div>
             <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
             <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* === DETAILS/PURCHASE === */}
        <div>
          <h2 className="text-4xl font-serif text-[#2C3E50] mb-2">{product.name}</h2>

          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <p className="text-3xl font-bold text-[#7E9F8E]">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <h3 className="text-xl font-serif text-[#2C3E50] mb-2">Description</h3>
          <p className="text-base text-gray-700 leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <p className="text-sm text-[#2C3E50] font-bold">
              Sold by:
              <Link href={`/home/sellers/${product.sellerId}`} className="text-[#7E9F8E] hover:underline ml-1">
                {product.sellerName} &rarr;
              </Link>
            </p>
            <p className="text-xs text-gray-500 mt-1">Authentic, handmade goods since 2018.</p>
          </div>

          {/* Purchase Box */}
          <div className="bg-white p-6 rounded-lg shadow-xl border border-[#7E9F8E]">
            <h3 className="text-lg font-serif text-[#2C3E50] mb-4">Customize & Purchase</h3>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input 
                id="quantity" 
                type="number" 
                value={quantity} 
                min={1}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} 
                className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
              />
            </div>

            <button 
                onClick={handleAddToCart} 
                disabled={isAdding || quantity < 1} 
                className={`w-full text-[#2C3E50] text-lg font-body py-3 rounded-md font-bold transition-colors focus:ring-4 focus:ring-offset-2 
                    ${isAdding 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#E7BB41] hover:bg-opacity-90 focus:ring-[#E7BB41]'
                    }`}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </section>
      
      {/* === REVIEWS SECTION === */}
      <section className="mt-16 pt-10 border-t border-gray-100">
        <h2 className="text-3xl font-serif text-[#2C3E50] mb-8">Customer Reviews</h2>
        {/* Placeholder review content */}
        <div className="flex items-center mb-6">
          <StarRating rating={product.rating} />
          <span className="text-xl text-[#2C3E50] ml-3 font-bold">{product.rating.toFixed(1)} out of 5</span>
          <span className="text-gray-500 ml-4">({product.reviewCount} total ratings)</span>
        </div>

        <button className="bg-[#7E9F8E] text-white py-2 px-6 rounded-md hover:bg-opacity-90 focus:ring-4 focus:ring-[#7E9F8E]">
            Write a Review
        </button>

        <div className="mt-8 space-y-8">
            <div className="border-b border-gray-100 pb-6">
                <StarRating rating={5} />
                <p className="text-md font-bold mt-2">Absolutely stunning quality!</p>
                <p className="text-sm text-gray-600 mt-1">This product exceeded my expectations. Beautifully made.</p>
            </div>
            <div className="pb-6">
                <StarRating rating={4} />
                <p className="text-md font-bold mt-2">Great value</p>
                <p className="text-sm text-gray-600 mt-1">A little smaller than I pictured, but excellent craftsmanship.</p>
            </div>
        </div>
      </section>
    </div>
  );
}