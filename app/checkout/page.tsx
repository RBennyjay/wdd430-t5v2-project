// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import clsx from 'clsx';

// // --- MOCK DATA STRUCTURES (Re-defined for self-containment) ---

// interface Product {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     category: 'Kitchen' | 'Leather Goods' | 'Textiles';
//     sellerId: string;
// }

// interface Seller {
//     id: string;
//     name: string;
// }

// interface CartItem extends Product {
//     quantity: number;
//     sellerName: string;
// }

// // MOCK DATA
// const mockProducts: Product[] = [
//     { id: '1', name: 'Ceramic Mug', description: 'Hand-thrown coffee mug.', price: 25.00, category: 'Kitchen', sellerId: 's1' },
//     { id: '2', name: 'Leather Wallet', description: 'Full grain leather bi-fold wallet.', price: 65.00, category: 'Leather Goods', sellerId: 's2' },
//     { id: '3', name: 'Wool Blanket', description: 'Hand-woven merino wool blanket.', price: 150.00, category: 'Textiles', sellerId: 's1' },
// ];

// const mockSellers: Seller[] = [
//     { id: 's1', name: 'Artisan Clay' },
//     { id: 's2', name: 'Fine Stitch Leather' },
// ];

// const rawCartData = [
//     { id: '1', quantity: 2 }, // Ceramic Mug (50.00)
//     { id: '2', quantity: 1 }, // Leather Wallet (65.00)
//     { id: '3', quantity: 1 }, // Wool Blanket (150.00)
// ];

// const cartItems: CartItem[] = rawCartData.map(cartEntry => {
//     const product = mockProducts.find(p => p.id === cartEntry.id);
//     if (!product) return null;
    
//     const seller = mockSellers.find(s => s.id === product.sellerId);
    
//     return {
//         ...product,
//         quantity: cartEntry.quantity,
//         sellerName: seller?.name || 'Unknown Seller'
//     } as CartItem;
// }).filter((item): item is CartItem => item !== null);


// const TAX_RATE: number = 0.08;
// const SHIPPING_COST: number = 8.00;

// function calculateTotals(items: CartItem[]) {
//     const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const tax = subtotal * TAX_RATE;
//     const total = subtotal + tax + SHIPPING_COST;
//     return { subtotal, tax, total };
// }

// // --- Checkout Step Component ---

// interface CheckoutStepProps {
//     title: string;
//     children: React.ReactNode;
// }

// const CheckoutStep: React.FC<CheckoutStepProps> = ({ title, children }) => (
//     <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm mb-8">
//         <h2 className="text-2xl font-serif text-navy mb-4 border-b pb-3">{title}</h2>
//         {children}
//     </div>
// );

// // --- Main Component ---

// export default function CheckoutPage() {
//     const totals = calculateTotals(cartItems);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [orderPlaced, setOrderPlaced] = useState(false);

//     // Placeholder function for checkout
//     const handlePlaceOrder = () => {
//         setIsProcessing(true);
//         setTimeout(() => {
//             setIsProcessing(false);
//             setOrderPlaced(true);
//             // In a real app, this is where you'd send data to a backend API
//         }, 2000);
//     };

//     if (orderPlaced) {
//         return (
//             <div className="max-w-xl mx-auto py-20 text-center">
//                 <h1 className="text-4xl font-serif text-green-700 mb-4">🎉 Order Successfully Placed!</h1>
//                 <p className="text-lg text-gray-700 mb-8">
//                     Thank you for supporting our artisans. Your order confirmation has been sent to your email.
//                 </p>
//                 <div className="flex justify-center space-x-4">
//                     <Link href="/home/products" className="bg-sage text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors shadow-lg">
//                         Continue Shopping
//                     </Link>
//                     <Link href="/home" className="border border-navy text-navy px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
//                         Go Home
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             {/* Custom Styles */}
//             <style jsx global>{`
//                 :root {
//                     --color-navy: #1f2937;
//                     --color-sage: #4b5563;
//                     --color-mustard: #ca8a04;
//                 }
//                 .text-navy { color: var(--color-navy); }
//                 .bg-navy { background-color: var(--color-navy); }
//                 .bg-sage { background-color: var(--color-sage); }
//                 .focus\:ring-sage:focus { --tw-ring-color: var(--color-sage); }
//                 .focus\:border-sage:focus { border-color: var(--color-sage); }
//                 .input-field {
//                     padding: 0.75rem;
//                     border: 1px solid #d1d5db;
//                     border-radius: 0.375rem;
//                     width: 100%;
//                     font-size: 1rem;
//                     color: var(--color-navy);
//                     transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//                 }
//                 .input-field:focus {
//                     outline: none;
//                     border-color: var(--color-sage);
//                     box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.5); /* Focus ring effect */
//                 }
//             `}</style>

//             <h1 className="text-4xl font-serif text-navy mb-10">Secure Checkout</h1>

//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* === BACK LINK ADDED HERE === */}
//                 <div className="mb-6">
//                     <Link 
//                         href="/cart" 
//                         className="text-gray-600 hover:text-[#7E9F8E] transition-colors flex items-center text-sm font-medium"
//                     >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//                         </svg>
//                         Back to Cart
//                     </Link>
//                 </div>
//                 {/* === END BACK LINK === */}
                
//                 {/* 1. Checkout Forms (Left Column) */}
//                 <div className="flex-1 lg:max-w-3xl">
                    
//                     {/* Shipping Address */}
//                     <CheckoutStep title="1. Shipping Information">
//                         <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input type="email" placeholder="Email Address" className="input-field md:col-span-2" required />
//                             <input type="text" placeholder="First Name" className="input-field" required />
//                             <input type="text" placeholder="Last Name" className="input-field" required />
//                             <input type="text" placeholder="Address Line 1" className="input-field md:col-span-2" required />
//                             <input type="text" placeholder="Address Line 2 (Optional)" className="input-field md:col-span-2" />
//                             <input type="text" placeholder="City" className="input-field" required />
//                             <input type="text" placeholder="State/Province" className="input-field" required />
//                             <input type="text" placeholder="Zip/Postal Code" className="input-field" required />
//                             <input type="text" placeholder="Country" className="input-field" required />
//                         </form>
//                     </CheckoutStep>

//                     {/* Payment Details */}
//                     <CheckoutStep title="2. Payment Details">
//                         <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input type="text" placeholder="Card Number" className="input-field md:col-span-2" required />
//                             <input type="text" placeholder="Name on Card" className="input-field md:col-span-2" required />
//                             <input type="text" placeholder="MM/YY" className="input-field" required />
//                             <input type="text" placeholder="CVC" className="input-field" required />
//                         </form>
//                         <div className="mt-4 flex items-center">
//                             <input id="save-card" type="checkbox" className="h-4 w-4 text-sage border-gray-300 rounded focus:ring-sage" />
//                             <label htmlFor="save-card" className="ml-2 text-sm text-gray-600">Save card details for future purchases</label>
//                         </div>
//                     </CheckoutStep>
//                 </div>

//                 {/* 2. Order Summary (Right Column - Sticky) */}
//                 <aside className="lg:w-96 lg:sticky lg:top-24 h-fit p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-serif text-navy border-b border-gray-300 pb-4 mb-4">Your Order ({cartItems.length} items)</h2>
                    
//                     {/* Item list for quick review */}
//                     <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2">
//                         {cartItems.map(item => (
//                             <div key={item.id} className="flex justify-between text-sm text-gray-600">
//                                 <span className="truncate pr-2">{item.quantity} x {item.name}</span>
//                                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Totals */}
//                     <div className="space-y-3 font-sans text-navy border-t border-gray-300 pt-4">
//                         <div className="flex justify-between text-base">
//                             <span>Subtotal</span>
//                             <span>${totals.subtotal.toFixed(2)}</span>
//                         </div>
                        
//                         <div className="flex justify-between text-base">
//                             <span>Shipping</span>
//                             <span className={clsx({ 'text-mustard font-bold': SHIPPING_COST === 0 })}>
//                                 ${SHIPPING_COST.toFixed(2)}
//                             </span>
//                         </div>

//                         <div className="flex justify-between text-base border-b border-gray-200 pb-3">
//                             <span>Tax ({Math.round(TAX_RATE * 100)}%)</span>
//                             <span>${totals.tax.toFixed(2)}</span>
//                         </div>
                        
//                         <div className="flex justify-between text-xl font-bold pt-3 text-navy">
//                             <span>Total Due</span>
//                             <span>${totals.total.toFixed(2)}</span>
//                         </div>
//                     </div>

//                     {/* Place Order Button */}
//                     <button
//                         onClick={handlePlaceOrder}
//                         disabled={isProcessing}
//                         className={clsx(
//                             "mt-8 w-full flex justify-center text-white text-lg font-bold py-3 px-10 rounded-full transition-colors focus:ring-4 focus:ring-offset-2 shadow-lg",
//                             isProcessing 
//                                 ? "bg-gray-400 cursor-not-allowed" 
//                                 : "bg-sage hover:bg-opacity-90 focus:ring-sage"
//                         )}
//                     >
//                         {isProcessing ? (
//                             <div className="flex items-center">
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Processing...
//                             </div>
//                         ) : (
//                             `Place Order (${cartItems.length} items)`
//                         )}
//                     </button>
                    
//                     {/* <p className="text-xs text-center text-gray-500 mt-3">By clicking 'Place Order', you agree to the terms and conditions.</p> */}
//                 </aside>
//             </div>
//         </>
//     );
// }