'use client';

import { Product } from '@/app/lib/types';
import { useState, FormEvent } from 'react';
import Button from '@/app/ui/common/button';

interface ProductFormProps {
  product?: Product;
  sellerId: string;
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  'Home Decor',
  'Kitchen',
  'Accessories',
  'Apparel',
  'Gifts',
  'Jewelry'
] as const;

export default function ProductForm({ product, sellerId, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    inStock: product?.inStock ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const productData: Partial<Product> = {
      ...formData,
      sellerId,
      id: product?.id || `product_${Date.now()}`,
      images: product?.images || [''],
      rating: product?.rating || 0,
      createdAt: product?.createdAt || new Date(),
    };
    
    onSave(productData);
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-semibold text-[#2C3E50] mb-2"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7E9F8E] focus:border-transparent transition-all ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          style={{ fontFamily: 'var(--font-body)' }}
          placeholder="e.g. Handcrafted Ceramic Mug"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500" style={{ fontFamily: 'var(--font-body)' }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label 
          htmlFor="description" 
          className="block text-sm font-semibold text-[#2C3E50] mb-2"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7E9F8E] focus:border-transparent transition-all min-h-[120px] resize-y ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          style={{ fontFamily: 'var(--font-body)' }}
          placeholder="Describe your product in detail..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500" style={{ fontFamily: 'var(--font-body)' }}>
            {errors.description}
          </p>
        )}
      </div>

      {/* Price and Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price */}
        <div>
          <label 
            htmlFor="price" 
            className="block text-sm font-semibold text-[#2C3E50] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Price ($) *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              id="price"
              min="0.01"
              step="0.01"
              value={formData.price || ''}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7E9F8E] focus:border-transparent transition-all ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
              placeholder="0.00"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-500" style={{ fontFamily: 'var(--font-body)' }}>
              {errors.price}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label 
            htmlFor="category" 
            className="block text-sm font-semibold text-[#2C3E50] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7E9F8E] focus:border-transparent transition-all ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500" style={{ fontFamily: 'var(--font-body)' }}>
              {errors.category}
            </p>
          )}
        </div>
      </div>

      {/* In Stock Checkbox */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="inStock"
          checked={formData.inStock}
          onChange={(e) => handleChange('inStock', e.target.checked)}
          className="w-5 h-5 text-[#7E9F8E] border-gray-300 rounded focus:ring-[#7E9F8E] cursor-pointer"
        />
        <label 
          htmlFor="inStock" 
          className="text-sm font-medium text-[#2C3E50] cursor-pointer"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Product is in stock and available for purchase
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          {product ? 'Update Product' : 'Create Product'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}