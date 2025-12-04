// app/home/products/page.tsx

import Link from 'next/link';
// Import Product type from the central definitions file
import { Product } from '@/app/lib/definitions'; 
import ProductCard from '@/app/ui/products/product-card';

// --- MOCK DATA (Ensure the image paths point to your files in /public/images/products/) ---
const allProducts: Product[] = [
    // Updated mock data to align with the full Product type
    { 
        id: 1, name: 'Woven Basket', price: 45.00, rating: 4.5, reviewCount: 42,
        image: '/images/products/basket.webp', link: '/home/products/1', 
        description: 'Sturdy, handwoven river reeds basket.', 
        sellerName: 'Willow & Weave', sellerId: 101,
    },
    { 
        id: 2, name: 'Ceramic Mug', price: 22.00, rating: 5.0, reviewCount: 88,
        image: '/images/products/mug.webp', link: '/home/products/2', 
        description: 'Hand-thrown sage green ceramic mug.',
        sellerName: 'Clay & Kiln', sellerId: 102,
    },
    { 
        id: 3, name: 'Leather Wallet', price: 60.00, rating: 4.2, reviewCount: 15,
        image: '/images/products/wallet.webp', link: '/home/products/3', 
        description: 'Full-grain, hand-stitched leather wallet.',
        sellerName: 'Leatherworks Co.', sellerId: 103,
    },
    { 
        id: 4, name: 'Wool Blanket', price: 95.00, rating: 4.8, reviewCount: 65,
        image: '/images/products/blanket.webp', link: '/home/products/4', 
        description: 'Icelandic wool herringbone pattern blanket.',
        sellerName: 'Fiber Guild', sellerId: 104,
    },
    { 
        id: 5, name: 'Hand-dyed Scarf', price: 35.00, rating: 4.0, reviewCount: 10,
        image: '/images/products/scarf.webp', link: '/home/products/5', 
        description: 'Silk-cotton blend scarf with shibori tie-dye.',
        sellerName: 'Indigo Dreams', sellerId: 105,
    },
    { 
        id: 6, name: 'Wooden Coaster Set', price: 28.00, rating: 4.7, reviewCount: 30,
        image: '/images/products/coaster.webp', link: '/home/products/6', 
        description: 'Set of four Acacia wood coasters.',
        sellerName: 'Wood & Grain', sellerId: 106,
    },
    { 
        id: 7, name: 'Terracotta Planter', price: 55.00, rating: 4.9, reviewCount: 22,
        image: '/images/products/planter.webp', link: '/home/products/7', 
        description: 'Oversized terracotta planter with antique wash.',
        sellerName: 'The Plant Pot Co.', sellerId: 107,
    },
    { 
        id: 8, name: 'Embroidered Cushion', price: 40.00, rating: 4.3, reviewCount: 18,
        image: '/images/products/cushion.webp', link: '/home/products/8', 
        description: 'Linen cushion with intricate floral embroidery.',
        sellerName: 'Textile Art', sellerId: 108,
    },
    { 
        id: 9, name: 'Brass Candlestick', price: 75.00, rating: 4.6, reviewCount: 9,
        image: '/images/products/candlestick.webp', link: '/home/products/9', 
        description: 'Classic, weighty brass candlestick holder.',
        sellerName: 'Found Vintage', sellerId: 109,
    },
    { 
        id: 10, name: 'Artisan Soap Bar', price: 12.00, rating: 5.0, reviewCount: 45,
        image: '/images/products/soap.webp', link: '/home/products/10', // Ensure extension matches your file
        description: 'Cold-pressed soap made with essential oils.',
        sellerName: 'The Soap Shop', sellerId: 110,
    },
    { 
        id: 11, name: 'Minimalist Clock', price: 110.00, rating: 4.1, reviewCount: 12,
        image: '/images/products/clock.webp', link: '/home/products/11', 
        description: 'Silent wall clock with wood bezel.',
        sellerName: 'Timeless Goods', sellerId: 111,
    },
    { 
        id: 12, name: 'Copper Kettle', price: 130.00, rating: 4.8, reviewCount: 38,
        image: '/images/products/kettle.webp', link: '/home/products/12', 
        description: 'Stove-top safe copper kettle with hammered finish.',
        sellerName: 'Copper Craft', sellerId: 112,
    },
];
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

export default function ProductsPage() {
    // 1. All product listings - sorted by users (Placeholder for sorting controls)
    // NOTE: In a real app, 'allProducts' would be dynamically fetched and 'sortedProducts' 
    // would be handled by React state (useState) and sorting logic based on user selection.
    const sortedProducts = allProducts; 

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            {/* Page Title */}
            <h1 className="text-4xl font-serif text-[#2C3E50] mb-8 border-b-2 border-gray-100 pb-2">
                All Handcrafted Treasures
            </h1>

            {/* Sorting and Filtering Area (Recommended for user-driven sorting) */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-body text-[#2C3E50]">
                    Showing **{sortedProducts.length}** results
                </p>
                
                {/* Placeholder for 'Sort By' dropdown */}
                <select 
                    aria-label="Sort products by"
                    className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#7E9F8E] focus:border-[#7E9F8E]"
                >
                    <option value="name">Sort by Name (A-Z)</option>
                    <option value="price-asc">Sort by Price (Low to High)</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="newest">Sort by Newest</option>
                </select>
            </div>

                 {/* 2. Responsive Product Grid */}
            {/* Grid settings: 2 columns on mobile, 3 columns on medium screens, 4 columns on large screens */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    // 3. Renders a ProductCard for each item, including the link
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </div>
    );
}