// app/home/checkout/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, totalPrice, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  if (cartCount === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif text-red-600 mb-4">Your cart is empty!</h1>
        <p className="text-gray-600 mb-8">
          Please add items before proceeding to checkout.
        </p>
        <Link href="/home/products" className="bg-[#7E9F8E] text-white py-3 px-8 rounded-lg font-bold hover:bg-[#6B8D7D] transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }
  
  // --- Form Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validation (Basic check)
    if (!formData.name || !formData.address || !formData.email || !formData.city || !formData.zip) {
      alert("Please fill in all required shipping details.");
      return;
    }

    // 2. Create the final order object
    const finalOrder = {
        id: `HH${Date.now()}`, // Generate a unique, time-based ID
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        total: totalPrice,
        shippingAddress: formData,
        // Map cart items to ensure we save only the necessary product data
        items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            // Include seller info if needed later
            sellerName: item.sellerName, 
        })),
    };
    
    // 3. Save the final order object to sessionStorage
    sessionStorage.setItem('lastOrder', JSON.stringify(finalOrder));

    // 4. Clear Cart
    clearCart(); 

    // 5. Redirect to Confirmation Page
    router.push('/home/checkout/confirmation'); 
  };
  // ----------------------

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-4xl font-serif text-[#2C3E50] mb-8 border-b-2 border-gray-100 pb-4">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* === SHIPPING FORM (Col 1 & 2) === */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-serif text-[#2C3E50] mb-6">Shipping Information</h2>

            {/* Input Fields */}
            <div className="space-y-4">
              <input 
                type="text" name="name" placeholder="Full Name *" required
                value={formData.name} onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
              />
              <input 
                type="email" name="email" placeholder="Email Address *" required
                value={formData.email} onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
              />
              <input 
                type="text" name="address" placeholder="Street Address *" required
                value={formData.address} onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" name="city" placeholder="City *" required
                  value={formData.city} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
                />
                <input 
                  type="text" name="zip" placeholder="Zip/Postal Code *" required
                  value={formData.zip} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
                />
              </div>
            </div>

            <h2 className="text-2xl font-serif text-[#2C3E50] mt-8 mb-4 border-t pt-6">Payment Method</h2>
            
            {/* Payment Placeholder */}
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-md text-sm text-yellow-800">
              Payment Integration Placeholder: Only Cash on Delivery is currently supported.
            </div>

            <button 
              type="submit"
              className="w-full bg-[#7E9F8E] text-white text-lg font-bold py-3 rounded-lg mt-6 hover:bg-[#6B8D7D] transition-colors focus:ring-4 focus:ring-[#7E9F8E] focus:ring-offset-2"
            >
              Place Order (${totalPrice.toFixed(2)})
            </button>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              By placing this order, you agree to our Terms and Conditions.
            </p>
          </form>
        </div>

        {/* === ORDER SUMMARY (Col 3) === */}
        <div className="lg:col-span-1 h-fit">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-10 shadow-md">
            <h2 className="text-2xl font-serif text-[#2C3E50] mb-4 border-b pb-3">Order Summary ({cartCount} Items)</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-sm text-gray-700 truncate">{item.name} (x{item.quantity})</span>
                <span className="text-sm font-medium text-[#2C3E50]">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="space-y-2 text-gray-700 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t font-bold text-lg text-[#2C3E50]">
                <span>Total Due</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}