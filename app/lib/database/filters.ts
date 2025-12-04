/**
 * Database Filter Utilities
 * Helper functions for building optimized database queries
 */

export interface ProductFilters {
  sellerId?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'oldest';
  limit?: number;
  offset?: number;
}

/**
 * Build MongoDB query from filters
 */
export function buildProductQuery(filters: ProductFilters): Record<string, any> {
  const query: Record<string, any> = {
    isActive: true, // Always exclude soft-deleted products
  };

  // Filter by seller
  if (filters.sellerId) {
    query.sellerId = filters.sellerId;
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    query.category = filters.category;
  }

  // Filter by price range
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};
    if (filters.minPrice !== undefined) {
      query.price.$gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      query.price.$lte = filters.maxPrice;
    }
  }

  // Filter by stock
  if (filters.inStock !== undefined) {
    query.inStock = filters.inStock;
  }

  // Full-text search
  if (filters.search && filters.search.trim()) {
    query.$text = { $search: filters.search.trim() };
  }

  return query;
}

/**
 * Build sort options
 */
export function buildSortOptions(sortBy?: ProductFilters['sortBy']): Record<string, 1 | -1> {
  switch (sortBy) {
    case 'price_asc':
      return { price: 1 };
    case 'price_desc':
      return { price: -1 };
    case 'rating':
      return { rating: -1, createdAt: -1 };
    case 'newest':
      return { createdAt: -1 };
    case 'oldest':
      return { createdAt: 1 };
    default:
      return { createdAt: -1 }; // Default: newest first
  }
}

/**
 * Calculate pagination
 */
export function buildPagination(limit: number = 20, offset: number = 0) {
  return {
    limit: Math.min(limit, 100), // Max 100 items per page
    skip: Math.max(offset, 0),
  };
}
