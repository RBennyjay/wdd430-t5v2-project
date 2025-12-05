// app/home/checkout/confirmation/order-details/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the type for the data we expect to load
interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    sellerName: string;
}

interface ShippingAddress {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
}

interface Order {
    id: string;
    date: string;
    total: number;
    shippingAddress: ShippingAddress;
    items: OrderItem[];
}


export default function OrderDetailsPage() {
    const [order, setOrder] = useState<Order | null>(null);

    // Load order data from session storage on mount
    useEffect(() => {
        const savedOrder = sessionStorage.getItem('lastOrder');
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);
    
    // Fallback if no order is found (e.g., user refreshed the page)
    if (!order) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-serif text-red-600 mb-4">No Recent Order Found</h1>
                <p className="text-gray-600 mb-8">
                    Please complete a checkout to view order details.
                </p>
                <Link href="/home/products" className="bg-[#7E9F8E] text-white py-3 px-8 rounded-lg font-bold hover:bg-[#6B8D7D] transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    const { items, shippingAddress, total, id, date } = order;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <Link 
                href="/home" 
                className="text-gray-600 hover:text-[#7E9F8E] transition-colors flex items-center text-sm font-medium mb-6"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Account Dashboard
            </Link>

            <h1 className="text-4xl font-serif text-[#2C3E50] mb-2">Order Details</h1>
            <p className="text-gray-500 mb-8">Order <span className="font-bold text-[#2C3E50]">#{id}</span> placed on {date}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* === Order Items List (Col 1 & 2) === */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-serif text-[#2C3E50] border-b pb-3">Items Ordered ({items.length})</h2>
                    {items.map((item) => (
                        <div key={item.id} className="flex border rounded-lg p-4 bg-white shadow-sm items-center">
                            
                            {/* Product Image */}
                            <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                            </div>

                            <div className="flex-grow">
                                <p className="text-lg font-semibold text-[#2C3E50]">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity} | Sold by: {item.sellerName}</p>
                            </div>

                            <div className="text-right">
                                <p className="text-xl font-bold text-[#7E9F8E]">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-gray-500">(${item.price.toFixed(2)} each)</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* === Order Summary and Shipping (Col 3) === */}
                <div className="lg:col-span-1 h-fit">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-10 shadow-md">
                        <h2 className="text-2xl font-serif text-[#2C3E50] mb-4 border-b pb-3">Summary</h2>

                        <div className="space-y-3 text-gray-700">
                            {/* Dynamic Shipping Address */}
                            <h3 className="text-lg font-semibold text-[#2C3E50]">Shipping Address</h3>
                            <p className="text-sm">
                                **{shippingAddress.name}**<br />
                                {shippingAddress.address}<br />
                                {shippingAddress.city}, {shippingAddress.zip}<br />
                                *{shippingAddress.email}*
                            </p>
                            
                            <h3 className="text-lg font-semibold text-[#2C3E50] pt-4 border-t">Payment</h3>
                            <p className="text-sm">Method: Cash on Delivery</p>
                            <p className="text-sm text-gray-500">Status: Pending</p>
                        </div>
                        
                        <div className="flex justify-between pt-6 mt-6 border-t font-bold text-xl text-[#2C3E50]">
                            <span>Order Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}