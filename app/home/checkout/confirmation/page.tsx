// app/home/checkout/confirmation/page.tsx

import React from 'react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="p-10 bg-white border border-[#7E9F8E] rounded-xl shadow-2xl">
        <h1 className="text-5xl font-serif text-[#7E9F8E] mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-xl text-[#2C3E50] mb-6">
          Thank you for supporting our handcrafted artists.
        </p>

        <div className="text-left inline-block p-4 bg-gray-50 rounded-lg mb-8">
            <p className="font-semibold text-sm">Your order number is: <span className="text-gray-800">#HH123456</span></p>
            <p className="text-sm text-gray-600">You will receive a confirmation email shortly.</p>
        </div>

        <div className="flex justify-center space-x-4">
            <Link 
              href="/home/products" 
              className="bg-[#E7BB41] text-[#2C3E50] py-3 px-8 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              Continue Shopping
            </Link>
            {/* <Link 
              href="/home/account" 
              className="border border-[#7E9F8E] text-[#7E9F8E] py-3 px-8 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              View Order Details
            </Link> */}
            <Link 
              href="/home/checkout/confirmation/order-details" // <-- UPDATED PATH
              className="border border-[#7E9F8E] text-[#7E9F8E] py-3 px-8 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              View Order Details
            </Link>
        </div>
      </div>
    </div>
  );
}