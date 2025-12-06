// app/home/products/[id]/page.tsx

import Link from 'next/link';
import { Product } from '@/app/lib/definitions';
// Import the client wrapper
import ReviewsClientWrapper from './ReviewsClientWrapper';

// Reusable Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
    const maxStars = 5;
    const mustard = '#E7BB41';
    
    return (
        <div className="flex items-center space-x-0.5">
            {Array.from({ length: maxStars }).map((_, index) => (
                <span 
                    key={index}
                    className="text-xl"
                    style={{ color: index < Math.floor(rating) ? mustard : '#ccc' }}
                    aria-hidden="true"
                >
                    ★
                </span>
            ))}
            <span className="text-sm text-gray-500 ml-2">({rating.toFixed(1)})</span>
        </div>
    );
};

// Mock product details
const ALL_DETAIL_PRODUCTS: Product[] = [
    { 
        id: 1, name: 'Woven Storage Basket', price: 45.00, rating: 4.5, reviewCount: 42,
        image: '/images/products/basket.webp', link: '/home/products/1',
        description: 'Handwoven from natural river reeds...',
        sellerName: 'Willow & Weave', sellerId: 101,
    },
    { 
        id: 2, name: 'Ceramic Mug (Sage)', price: 22.00, rating: 5.0, reviewCount: 88,
        image: '/images/products/mug.webp', link: '/home/products/2',
        description: 'A deeply satisfying hand-thrown ceramic mug...',
        sellerName: 'Clay & Kiln', sellerId: 102,
    },
    { 
        id: 3, name: 'Minimalist Leather Wallet', price: 60.00, rating: 4.2, reviewCount: 15,
        image: '/images/products/wallet.webp', link: '/home/products/3',
        description: 'Crafted from full-grain leather...',
        sellerName: 'Leatherworks Co.', sellerId: 103,
    },
    { 
        id: 4, name: 'Icelandic Wool Blanket', price: 95.00, rating: 4.8, reviewCount: 65,
        image: '/images/products/blanket.webp', link: '/home/products/4',
        description: 'Soft, hypoallergenic wool blanket...',
        sellerName: 'Fiber Guild', sellerId: 104,
    },
    { 
        id: 5, name: 'Hand-dyed Indigo Scarf', price: 35.00, rating: 4.0, reviewCount: 10,
        image: '/images/products/scarf.webp', link: '/home/products/5',
        description: 'Lightweight silk-cotton scarf...',
        sellerName: 'Indigo Dreams', sellerId: 105,
    },
    { 
        id: 6, name: 'Acacia Wood Coaster Set', price: 28.00, rating: 4.7, reviewCount: 30,
        image: '/images/products/coaster.webp', link: '/home/products/6',
        description: 'Set of four coasters...',
        sellerName: 'Wood & Grain', sellerId: 106,
    },
    { 
        id: 7, name: 'Large Terracotta Planter', price: 55.00, rating: 4.9, reviewCount: 22,
        image: '/images/products/planter.webp', link: '/home/products/7',
        description: 'Oversized terracotta planter...',
        sellerName: 'The Plant Pot Co.', sellerId: 107,
    },
    { 
        id: 8, name: 'Embroidered Linen Cushion', price: 40.00, rating: 4.3, reviewCount: 18,
        image: '/images/products/cushion.webp', link: '/home/products/8',
        description: 'Soft linen cushion...',
        sellerName: 'Textile Art', sellerId: 108,
    },
    { 
        id: 9, name: 'Classic Brass Candlestick', price: 75.00, rating: 4.6, reviewCount: 9,
        image: '/images/products/candlestick.webp', link: '/home/products/9',
        description: 'A timeless brass candlestick...',
        sellerName: 'Found Vintage', sellerId: 109,
    },
    { 
        id: 10, name: 'Artisan Lavender Soap Bar', price: 12.00, rating: 5.0, reviewCount: 45,
        image: '/images/products/soap.webp', link: '/home/products/10',
        description: 'Cold-pressed soap bar...',
        sellerName: 'The Soap Shop', sellerId: 110,
    },
    { 
        id: 11, name: 'Minimalist Wall Clock', price: 110.00, rating: 4.1, reviewCount: 12,
        image: '/images/products/clock.webp', link: '/home/products/11',
        description: 'Silent, non-ticking clock...',
        sellerName: 'Timeless Goods', sellerId: 111,
    },
    { 
        id: 12, name: 'Hand-Hammered Copper Kettle', price: 130.00, rating: 4.8, reviewCount: 38,
        image: '/images/products/kettle.webp', link: '/home/products/12',
        description: 'Hammered copper kettle...',
        sellerName: 'Copper Craft', sellerId: 112,
    },
];

// Async product lookup
const getProductDetails = async (id: string): Promise<Product | null> => {
    const productId = parseInt(id, 10);
    const product = ALL_DETAIL_PRODUCTS.find(p => p.id === productId) || null;
    return new Promise(resolve => setTimeout(() => resolve(product), 1));
};

//  unwrap params because it's now a Promise
export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const productId = parseInt(id, 10);
    const product = await getProductDetails(id);

    if (!product) {
        return (
            // ... (Product Not Found component) ...
            <div className="max-w-7xl mx-auto py-20 text-center">
                <h1 className="text-3xl font-serif text-red-600">Product Not Found</h1>
                <p className="text-gray-600 mt-4">The requested handcrafted treasure could not be located.</p>
                <Link href="/home/products" className="text-[#7E9F8E] font-bold mt-6 inline-block hover:underline">
                    &larr; Back to All Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            {/* ... (Back Link and Product Details section - unchanged) ... */}
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
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex space-x-2 mt-4 overflow-x-auto">
                        <div className="w-16 h-16 bg-gray-200 rounded-md border-2 border-[#7E9F8E]"></div>
                        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                    </div>
                </div>

                {/* === DETAILS === */}
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

                    <div className="bg-white p-6 rounded-lg shadow-xl border border-[#7E9F8E]">
                        <h3 className="text-lg font-serif text-[#2C3E50] mb-4">Customize & Purchase</h3>

                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                            <input 
                                id="quantity" 
                                type="number" 
                                defaultValue={1} 
                                min={1}
                                className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
                            />
                        </div>

                        <button className="w-full bg-[#E7BB41] text-[#2C3E50] text-lg font-body py-3 rounded-md font-bold hover:bg-opacity-90 transition-colors focus:ring-4 focus:ring-[#E7BB41] focus:ring-offset-2">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>

            {/* === REVIEWS: Replaced the static section with the Client Wrapper === */}
            <ReviewsClientWrapper 
                productId={productId} 
                productRating={product.rating} 
                productReviewCount={product.reviewCount} 
            />
        </div>
    );
}