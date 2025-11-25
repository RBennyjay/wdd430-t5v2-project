"use client"; // REQUIRED to use styled-jsx and other client-side features

import { useState, useMemo, useCallback } from 'react'; // Added useState, useMemo, useCallback
import Link from 'next/link';
import Image from 'next/image'; 
import clsx from 'clsx'; // Utility for conditional classes
// Assuming '@/app/lib/types' and '@/app/lib/mockData' are available as placeholders
// Re-defining internal types and mocks for self-containment:

// --- Internal Mock Definitions (To ensure the file is runnable) ---
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'Kitchen' | 'Leather Goods' | 'Textiles';
    sellerId: string;
}

interface Seller {
    id: string;
    name: string;
}

interface CartItem extends Product {
    quantity: number;
    sellerName: string;
}

const mockProducts: Product[] = [
    { id: '1', name: 'Ceramic Mug', description: 'Hand-thrown coffee mug.', price: 25.00, category: 'Kitchen', sellerId: 's1' },
    { id: '2', name: 'Leather Wallet', description: 'Full grain leather bi-fold wallet.', price: 65.00, category: 'Leather Goods', sellerId: 's2' },
    { id: '3', name: 'Wool Blanket', description: 'Hand-woven merino wool blanket.', price: 150.00, category: 'Textiles', sellerId: 's1' },
];

const mockSellers: Seller[] = [
    { id: 's1', name: 'Artisan Clay' },
    { id: 's2', name: 'Fine Stitch Leather' },
];

const rawCartData = [
    { id: '1', quantity: 2 }, 
    { id: '2', quantity: 1 }, 
    { id: '3', quantity: 1 }, 
];
// --- End Internal Mock Definitions ---


// --- Inline SVG Icon Definitions (Kept for no external dependency) ---

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.108 6.57a2.25 2.25 0 01-.013-.243m-.013-.013H2.25l-.398-1.585A1.875 1.875 0 002.396 3h19.208c.84 0 1.5.66 1.5 1.5v1.875a1.875 1.875 0 00-.398.013z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 6.75h3.75m-3.75 0V4.5a1.5 1.5 0 00-1.5-1.5h-3c-.621 0-1.125.504-1.125 1.125v.75m4.125 0H9.375" />
    </svg>
);

// --- Custom Placeholder Function (SVG to bypass Next.js hostname validation) ---
const createSvgPlaceholder = (text: string) => {
    const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    const svg = `
        <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <rect width="96" height="96" fill="#4b5563" rx="8"/>
            <text x="48" y="52" font-family="sans-serif" font-size="10" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${safeText.toUpperCase()}</text>
            <text x="48" y="65" font-family="sans-serif" font-size="8" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ITEM</text>
        </svg>
    `.trim();

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};


// --- Cart Logic and Data ---

const TAX_RATE: number = 0.08;
const SHIPPING_COST: number = 8.00;

function calculateTotals(items: CartItem[]) {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING_COST;
    return { subtotal, tax, total };
}

// Function to initialize the cart items from mock data
const initializeCartItems = (): CartItem[] => {
    return rawCartData.map(cartEntry => {
        const product = mockProducts.find(p => p.id === cartEntry.id);
        if (!product) return null;
        
        const seller = mockSellers.find(s => s.id === product.sellerId);
        
        return {
            ...product,
            quantity: cartEntry.quantity,
            sellerName: seller?.name || 'Unknown Seller'
        } as CartItem;
    }).filter((item): item is CartItem => item !== null);
};


// --- Component ---

export default function CartPage() {
    // 1. Initialize cart state
    const [cartItems, setCartItems] = useState<CartItem[]>(initializeCartItems);

    // 2. Recalculate totals whenever cartItems changes
    const totals = useMemo(() => calculateTotals(cartItems), [cartItems]);

    // 3. Handlers
    
    // Handle quantity changes (increase or decrease)
    const handleQuantityChange = useCallback((itemId: string, delta: 1 | -1) => {
        setCartItems(prevItems => {
            const newItems = prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + delta;
                    // Prevent quantity from dropping below 1
                    return { ...item, quantity: Math.max(1, newQuantity) };
                }
                return item;
            });
            return newItems;
        });
    }, []);

    // Handle item removal
    const handleRemoveItem = useCallback((itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }, []);


    return (
        <>
            <style jsx global>{`
                /* Define custom Tailwind colors for better aesthetics */
                :root {
                    --color-navy: #1f2937; /* Dark blue/Navy */
                    --color-sage: #4b5563; /* Gray-Sage */
                    --color-mustard: #ca8a04; /* Yellow/Mustard */
                    --color-cream: #f3f4f6; /* Off-white/Cream */
                }
                .text-navy { color: var(--color-navy); }
                .hover\:text-sage:hover { color: var(--color-sage); }
                .bg-navy { background-color: var(--color-navy); }
                .bg-sage { background-color: var(--color-sage); }
                .text-mustard { color: var(--color-mustard); }
                .border-cream { border-color: var(--color-cream); }
                .focus\:ring-sage:focus { --tw-ring-color: var(--color-sage); }
                .focus\:border-sage:focus { border-color: var(--color-sage); }
            `}</style>
            
            <h1 className="text-4xl font-serif text-navy mb-10">Your Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-10" suppressHydrationWarning>
                
                {/* 1. Item List (Left Column) */}
                <section className="flex-1 lg:max-w-4xl">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-10 border border-gray-200 rounded-lg bg-white shadow-sm">
                            <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
                            <Link href="/" className="text-sage font-bold hover:underline">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="flex items-start border-b border-gray-200 pb-6 pr-2 bg-white rounded-lg p-4 shadow-sm"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 mr-4 border border-cream relative overflow-hidden">
                                        <Image 
                                            src={createSvgPlaceholder(item.category)} 
                                            alt={item.name} 
                                            width={96}
                                            height={96}
                                            className="object-cover rounded-md"
                                            unoptimized
                                        />
                                    </div>

                                    <div className="flex-grow flex justify-between">
                                        {/* Item Details */}
                                        <div>
                                            <h2 className="text-lg font-serif text-navy hover:text-sage mb-1">
                                                <Link href={`/products/${item.id}`}>{item.name}</Link>
                                            </h2>
                                            <p className="text-sm text-gray-500 font-sans mb-3">Seller: {item.sellerName}</p>
                                            
                                            {/* Quantity Selector - CONNECTED */}
                                            <div className="flex items-center space-x-2">
                                                <button 
                                                    aria-label="Decrease quantity"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    // Disable button if quantity is already 1
                                                    disabled={item.quantity <= 1} 
                                                    className={clsx(
                                                        "p-1 border border-gray-300 rounded-full text-navy transition-colors",
                                                        item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                                                    )}
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <span className="font-sans text-base w-6 text-center">{item.quantity}</span>
                                                <button 
                                                    aria-label="Increase quantity"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="p-1 border border-gray-300 rounded-full text-navy hover:bg-gray-100 transition-colors"
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Price and Remove Button */}
                                        <div className="flex flex-col items-end">
                                            <p className="text-lg font-bold text-navy mb-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            <button 
                                                aria-label="Remove item"
                                                onClick={() => handleRemoveItem(item.id)} // CONNECTED
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Discount/Coupon Code (Simple Placeholder) */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-base font-bold text-navy mb-2">Have a coupon code?</h3>
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="Enter code" 
                                className="p-2 border border-gray-300 rounded-l-md w-full focus:ring-sage focus:border-sage text-navy"
                            />
                            <button className="bg-navy text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                                Apply
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2. Order Summary (Right Column - Sticky on desktop) */}
                <aside className="lg:w-80 lg:sticky lg:top-24 h-fit p-6 bg-white border border-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-serif text-navy border-b border-gray-200 pb-4 mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 font-sans text-navy">
                        {/* Subtotal */}
                        <div className="flex justify-between text-base">
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>${totals.subtotal.toFixed(2)}</span>
                        </div>
                        
                        {/* Shipping */}
                        <div className="flex justify-between text-base">
                            <span>Estimated Shipping</span>
                            <span className={clsx({ 'text-mustard font-bold': SHIPPING_COST === 0 })}>
                                ${SHIPPING_COST.toFixed(2)}
                            </span>
                        </div>

                        {/* Tax */}
                        <div className="flex justify-between text-base border-b border-gray-200 pb-3">
                            <span>Tax ({Math.round(TAX_RATE * 100)}%)</span>
                            <span>${totals.tax.toFixed(2)}</span>
                        </div>
                        
                        {/* Total */}
                        <div className="flex justify-between text-xl font-bold pt-3">
                            <span>Order Total</span>
                            <span>${totals.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout Button (Sage Green CTA) */}
                    <Link
                        href="/checkout"
                        className={clsx(
                            "mt-6 w-full flex justify-center text-white text-lg font-bold py-3 px-10 rounded-full transition-colors focus:ring-4 focus:ring-offset-2 shadow-md",
                            cartItems.length === 0 ? "bg-gray-400 pointer-events-none" : "bg-sage hover:bg-opacity-90 focus:ring-sage"
                        )}
                        aria-disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </Link>
                </aside>
            </div>
        </>
    );
}