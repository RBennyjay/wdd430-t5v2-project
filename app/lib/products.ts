// app/lib/products.ts
import { Product } from './definitions';

const allProducts: Product[] = [
    { id: 1, name: 'Woven Basket', price: 45.00, rating: 4.5, reviewCount: 42,
      image: '/images/products/basket.webp', link: '/home/products/1', 
      description: 'Sturdy, handwoven river reeds basket.', sellerName: 'Willow & Weave', sellerId: 101, category: 'Home Decor' },

    { id: 2, name: 'Ceramic Mug', price: 22.00, rating: 5.0, reviewCount: 88,
      image: '/images/products/mug.webp', link: '/home/products/2', 
      description: 'Hand-thrown sage green ceramic mug.', sellerName: 'Clay & Kiln', sellerId: 102, category: 'Home Decor' },

    { id: 3, name: 'Leather Wallet', price: 60.00, rating: 4.2, reviewCount: 15,
      image: '/images/products/wallet.webp', link: '/home/products/3', 
      description: 'Full-grain, hand-stitched leather wallet.', sellerName: 'Leatherworks Co.', sellerId: 103, category: 'Gifts' },

    { id: 4, name: 'Wool Blanket', price: 95.00, rating: 4.8, reviewCount: 65,
      image: '/images/products/blanket.webp', link: '/home/products/4', 
      description: 'Icelandic wool herringbone pattern blanket.', sellerName: 'Fiber Guild', sellerId: 104, category: 'Home Decor' },

    { id: 5, name: 'Hand-dyed Scarf', price: 35.00, rating: 4.0, reviewCount: 10,
      image: '/images/products/scarf.webp', link: '/home/products/5', 
      description: 'Silk-cotton blend scarf with shibori tie-dye.', sellerName: 'Indigo Dreams', sellerId: 105, category: 'Apparel' },

    { id: 6, name: 'Wooden Coaster Set', price: 28.00, rating: 4.7, reviewCount: 30,
      image: '/images/products/coaster.webp', link: '/home/products/6', 
      description: 'Set of four Acacia wood coasters.', sellerName: 'Wood & Grain', sellerId: 106, category: 'Home Decor' },

    { id: 7, name: 'Terracotta Planter', price: 55.00, rating: 4.9, reviewCount: 22,
      image: '/images/products/planter.webp', link: '/home/products/7', 
      description: 'Oversized terracotta planter with antique wash.', sellerName: 'The Plant Pot Co.', sellerId: 107, category: 'Home Decor' },

    { id: 8, name: 'Embroidered Cushion', price: 40.00, rating: 4.3, reviewCount: 18,
      image: '/images/products/cushion.webp', link: '/home/products/8', 
      description: 'Linen cushion with intricate floral embroidery.', sellerName: 'Textile Art', sellerId: 108, category: 'Home Decor' },

    { id: 9, name: 'Brass Candlestick', price: 75.00, rating: 4.6, reviewCount: 9,
      image: '/images/products/candlestick.webp', link: '/home/products/9', 
      description: 'Classic, weighty brass candlestick holder.', sellerName: 'Found Vintage', sellerId: 109, category: 'Jewelry' },

    { id: 10, name: 'Artisan Soap Bar', price: 12.00, rating: 5.0, reviewCount: 45,
      image: '/images/products/soap.webp', link: '/home/products/10', 
      description: 'Cold-pressed soap made with essential oils.', sellerName: 'The Soap Shop', sellerId: 110, category: 'Gifts' },

    { id: 11, name: 'Minimalist Clock', price: 110.00, rating: 4.1, reviewCount: 12,
      image: '/images/products/clock.webp', link: '/home/products/11', 
      description: 'Silent wall clock with wood bezel.', sellerName: 'Timeless Goods', sellerId: 111, category: 'Home Decor' },

    { id: 12, name: 'Copper Kettle', price: 130.00, rating: 4.8, reviewCount: 38,
      image: '/images/products/kettle.webp', link: '/home/products/12', 
      description: 'Stove-top safe copper kettle with hammered finish.', sellerName: 'Copper Craft', sellerId: 112, category: 'Kitchen' },
];

// export { allProducts };
export default allProducts;  