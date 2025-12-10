// app/ui/products/product-card.tsx

"use client";

import Link from 'next/link';
import StarRating from '@/app/ui/products/star-rating';
import { Product } from '@/app/lib/definitions';// Import the new shared component

const ProductCard = ({ product }: { product: Product }) => {
    // Secondary accent color: deep, warm navy (#2C3E50)
    // Primary accent color: Warm Sage Green (#7E9F8E)

    return (
        // Link to product detail page
        <Link 
            href={product.link} 
            className="block border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white group"
        >
            {/* Product Picture - CORRECTED to use <img> tag */}
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                    src={product.image} //  SOURCE IS NOW THE PRODUCT IMAGE PATH
                    alt={product.name}
                    className="w-full h-full object-cover" // Ensures the image fills the container nicely
                    loading="lazy"
                />
            </div>
            
            <div className="p-4">
                {/* Product Name (Serif font) */}
                <h3 className="text-lg font-serif text-[#2C3E50] mb-1 truncate group-hover:text-[#7E9F8E] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    {product.name}
                </h3>
                
                {/* Average Star Rating */}
                <div className="mb-2">
                    <StarRating rating={product.rating} />
                </div>
                
                {/* Price (Body/Sans-serif, Bold) */}
                <p className="text-base font-body text-[#2C3E50] font-bold"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;