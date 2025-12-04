/**
 * DATABASE SCHEMA DESIGN
 * 
 * This file defines the database structure for the marketplace.
 * Designed for MongoDB but compatible with SQL (PostgreSQL, MySQL).
 */

// ============================================
// SELLERS COLLECTION/TABLE
// ============================================

export interface SellerSchema {
  _id: string;                    // Primary Key
  name: string;                   // Indexed
  email: string;                  // Unique, Indexed
  bio: string;
  profileImage: string;
  bannerImage: string;
  categories: string[];           // Array of categories
  rating: number;                 // Calculated field (avg of reviews)
  productsCount: number;          // Calculated field
  isActive: boolean;              // For soft delete
  createdAt: Date;                // Indexed
  updatedAt: Date;
}

// MongoDB Indexes for Sellers:
// - { email: 1 } UNIQUE
// - { name: 1 }
// - { createdAt: -1 }
// - { isActive: 1, rating: -1 } COMPOUND INDEX

// ============================================
// PRODUCTS COLLECTION/TABLE
// ============================================

export interface ProductSchema {
  _id: string;                    // Primary Key
  sellerId: string;               // Foreign Key -> Sellers._id (INDEXED)
  name: string;                   // Indexed for search
  description: string;            // Full-text search index
  price: number;                  // Indexed for range queries
  category: string;               // Indexed for filtering
  images: string[];               // Array of image URLs
  rating: number;                 // Calculated field (avg of reviews)
  reviewsCount: number;           // Calculated field
  inStock: boolean;               // Indexed
  stock: number;                  // Quantity available
  isActive: boolean;              // For soft delete
  createdAt: Date;                // Indexed
  updatedAt: Date;
}

// MongoDB Indexes for Products:
// - { sellerId: 1, isActive: 1 } COMPOUND INDEX (most important!)
// - { category: 1, price: 1 } COMPOUND INDEX for filters
// - { price: 1 } for price range queries
// - { name: "text", description: "text" } FULL-TEXT SEARCH
// - { rating: -1, createdAt: -1 } COMPOUND INDEX for sorting
// - { inStock: 1 }

// ============================================
// REVIEWS COLLECTION/TABLE
// ============================================

export interface ReviewSchema {
  _id: string;                    // Primary Key
  productId: string;              // Foreign Key -> Products._id (INDEXED)
  sellerId: string;               // Foreign Key -> Sellers._id (INDEXED)
  userId: string;                 // Foreign Key -> Users._id
  rating: number;                 // 1-5 stars
  comment: string;
  images: string[];               // Optional review images
  isVerifiedPurchase: boolean;
  createdAt: Date;                // Indexed
  updatedAt: Date;
}

// MongoDB Indexes for Reviews:
// - { productId: 1, createdAt: -1 } COMPOUND INDEX
// - { sellerId: 1, rating: -1 } COMPOUND INDEX
// - { userId: 1 }

// ============================================
// USERS COLLECTION/TABLE (Future implementation)
// ============================================

export interface UserSchema {
  _id: string;                    // Primary Key
  email: string;                  // Unique, Indexed
  name: string;
  passwordHash: string;
  role: 'buyer' | 'seller' | 'admin';
  profileImage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// ORDERS COLLECTION/TABLE (Future implementation)
// ============================================

export interface OrderSchema {
  _id: string;                    // Primary Key
  userId: string;                 // Foreign Key -> Users._id (INDEXED)
  sellerId: string;               // Foreign Key -> Sellers._id (INDEXED)
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;                // Indexed
  updatedAt: Date;
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ============================================
// QUERY PATTERNS & PERFORMANCE NOTES
// ============================================

/**
 * MOST COMMON QUERIES (optimized with indexes):
 * 
 * 1. Get all products by seller (FAST):
 *    - Query: { sellerId: "seller_123", isActive: true }
 *    - Index: { sellerId: 1, isActive: 1 }
 * 
 * 2. Filter products by category and price range (FAST):
 *    - Query: { category: "Kitchen", price: { $gte: 10, $lte: 50 }, isActive: true }
 *    - Index: { category: 1, price: 1 }
 * 
 * 3. Search products by name (FAST with full-text):
 *    - Query: { $text: { $search: "ceramic mug" } }
 *    - Index: { name: "text", description: "text" }
 * 
 * 4. Get top-rated products (FAST):
 *    - Query: { isActive: true }
 *    - Sort: { rating: -1, createdAt: -1 }
 *    - Index: { rating: -1, createdAt: -1 }
 * 
 * 5. Get seller's products with filters (FAST):
 *    - Query: { sellerId: "seller_123", category: "Kitchen", inStock: true }
 *    - Index: { sellerId: 1, category: 1, inStock: 1 }
 */

/**
 * ESTIMATED QUERY PERFORMANCE (with proper indexes):
 * 
 * - 10,000 products: < 10ms
 * - 100,000 products: < 50ms
 * - 1,000,000 products: < 200ms
 * 
 * WITHOUT indexes: 500ms - 5000ms for same queries!
 */