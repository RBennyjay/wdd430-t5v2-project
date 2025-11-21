'use client';

import { Product } from '@/app/lib/types';
import StarRating from '@/app/ui/common/star-rating';
import Button from '@/app/ui/common/button';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  showActions?: boolean;
}

export default function ProductCard({ 
  product, 
  onEdit, 
  onDelete,
  showActions = true 
}: ProductCardProps) {
  return (
    <article 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden group">
        {product.images[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Stock Badge */}
        <div className="absolute top-2 right-2">
          {product.inStock ? (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              In Stock
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <h3 
          className="text-lg font-serif text-[#2C3E50] mb-2 line-clamp-1"
          style={{ fontFamily: 'var(--font-heading)' }}
          title={product.name}
        >
          {product.name}
        </h3>
        
        <p 
          className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]"
          style={{ fontFamily: 'var(--font-body)' }}
          title={product.description}
        >
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <p 
            className="text-xl font-bold text-[#2C3E50]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            ${product.price.toFixed(2)}
          </p>
          <StarRating rating={product.rating} />
        </div>
        
        {/* Category Badge */}
        <span 
          className="inline-block px-3 py-1 bg-[#E7BB41] text-white text-xs font-medium rounded-full mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {product.category}
        </span>
        
        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => onEdit(product)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              fullWidth
              onClick={() => onDelete(product)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}