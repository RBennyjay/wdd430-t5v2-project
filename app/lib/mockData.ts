import { Seller, Product } from './types';

export const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'Artisan Pottery Studio',
    bio: 'Handcrafted ceramics and pottery made with traditional techniques passed down through generations. Each piece is unique and tells its own story.',
    profileImage: '',
    bannerImage: '',
    categories: ['Home Decor', 'Kitchen', 'Gifts'],
    rating: 4.8,
    productsCount: 15
  },
  {
    id: '2',
    name: 'Heritage Leather Works',
    bio: 'Premium leather goods crafted by hand using sustainable materials. We believe in quality that lasts a lifetime.',
    profileImage: '',
    bannerImage: '',
    categories: ['Accessories', 'Gifts'],
    rating: 4.9,
    productsCount: 12
  },
  {
    id: '3',
    name: 'Cozy Textile Co.',
    bio: 'Warm, comfortable textiles woven with care. From blankets to scarves, we create pieces that bring warmth to your home.',
    profileImage: '',
    bannerImage: '',
    categories: ['Home Decor', 'Apparel', 'Gifts'],
    rating: 4.7,
    productsCount: 20
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    sellerId: '1',
    name: 'Ceramic Mug',
    description: 'Beautiful handmade ceramic mug with a smooth glaze finish. Perfect for your morning coffee or tea.',
    price: 22.00,
    category: 'Kitchen',
    images: [''],
    rating: 5.0,
    inStock: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    sellerId: '2',
    name: 'Leather Wallet',
    description: 'Premium full-grain leather wallet with multiple card slots and a sleek design. Ages beautifully over time.',
    price: 60.00,
    category: 'Accessories',
    images: [''],
    rating: 4.2,
    inStock: true,
    createdAt: new Date('2024-02-20')
  },
  {
    id: '3',
    sellerId: '3',
    name: 'Wool Blanket',
    description: 'Cozy 100% wool blanket perfect for cold evenings. Hand-woven with traditional patterns.',
    price: 95.00,
    category: 'Home Decor',
    images: [''],
    rating: 4.8,
    inStock: true,
    createdAt: new Date('2024-03-10')
  }
];