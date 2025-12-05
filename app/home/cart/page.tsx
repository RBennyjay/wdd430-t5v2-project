// app/home/cart/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cartItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif text-[#2C3E50] mb-4">Your Cart is Empty 🛍️</h1>
        <p className="text-gray-600 mb-8">
          Time to fill it with handcrafted treasures!
        </p>
        <Link href="/home/products" className="bg-[#7E9F8E] text-white py-3 px-8 rounded-lg font-bold hover:bg-[#6B8D7D] transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-4xl font-serif text-[#2C3E50] mb-10 border-b-2 border-gray-100 pb-4">
        Your Cart ({cartItems.length} Items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* === CART ITEMS LIST (Col 1 & 2) === */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex border rounded-lg p-4 shadow-sm bg-white">
              
              <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>

              <div className="flex-grow">
                <Link href={`/home/products/${item.id}`} className="text-lg font-semibold text-[#2C3E50] hover:text-[#7E9F8E]">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">Sold by: {item.sellerName}</p>
                <p className="text-xl font-bold text-[#7E9F8E] mt-1">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
                
                <div className="flex items-center space-x-2 mt-4">
                  <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-[#7E9F8E]"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {/* === CONTINUE SHOPPING LINK ADDED HERE === */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <Link 
              href="/home/products" 
              className="text-[#7E9F8E] font-medium hover:underline flex items-center transition-colors"
            >
              <svg className="w-4 h-4 mr-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-red-600 hover:underline text-sm"
            >
              Clear Entire Cart
            </button>
          </div>
          {/* === END LINK === */}

        </div>

        {/* === ORDER SUMMARY (Col 3) === */}
        <div className="lg:col-span-1 h-fit">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-10 shadow-md">
            <h2 className="text-2xl font-serif text-[#2C3E50] mb-4 border-b pb-3">Order Summary</h2>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t font-bold text-lg text-[#2C3E50]">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

          
                      
           
<Link 
  href="/home/checkout" // <-- TARGETS NEW CHECKOUT PAGE
  className="block text-center w-full bg-[#E7BB41] text-[#2C3E50] text-lg font-bold py-3 rounded-lg mt-6 hover:bg-opacity-90 transition-colors focus:ring-4 focus:ring-[#E7BB41] focus:ring-offset-2"
>
  Proceed to Checkout
</Link>
          </div>
        </div>

      </div>
    </div>
  );
}