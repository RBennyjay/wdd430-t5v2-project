// ap/home/page.tsx
import Link from 'next/link';
import Image from 'next/image';

// Mock data for featured products
const featuredProducts = [
    { name: 'Woven Basket', price: 45.00, rating: 4.5, image: '/images/products/basket.webp' },
    { name: 'Ceramic Mug', price: 22.00, rating: 5.0, image: '/images/products/mug.webp' },
    { name: 'Leather Wallet', price: 60.00, rating: 4.2, image: '/images/products/wallet.webp' },
    { name: 'Wool Blanket', price: 95.00, rating: 4.8, image: '/images/products/blanket.webp' },
];

// --- CATEGORY DATA  ---
const categoryData = [
    { name: 'Home Decor', image: '/images/categories/home-decor.webp' }, 
    { name: 'Jewelry', image: '/images/categories/jewelry.webp' },
    { name: 'Apparel', image: '/images/categories/apparel.webp' },
    { name: 'Gifts', image: '/images/categories/gifts.webp' },
];
// ---------------------------------------------------

// Reusable Star Rating component 
const StarRating = ({ rating }: { rating: number }) => {
    const maxStars = 5;
    const mustard = '#E7BB41';
    return (
        <div className="flex space-x-0.5">
            {Array.from({ length: maxStars }).map((_, index) => (
                <span 
                    key={index} 
                    className="text-lg"
                    style={{ color: index < Math.floor(rating) ? mustard : '#ccc' }}
                    aria-hidden="true"
                >
                    ★
                </span>
            ))}
            <span className="sr-only">Rated {rating} out of 5 stars</span>
        </div>
    );
};

export default async function Page() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Hero Section */}
            <section className="relative w-full h-[500px] mb-12">
                {/* Placeholder div (no Image component) */}
                <div className="absolute inset-0 bg-gray-600"></div>
                
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center p-4">
                    <h1 className="text-4xl md:text-6xl text-white font-serif text-center mb-8">
                        Handcrafted Haven
                    </h1>
                    <Link 
                        href="/home/products" 
                        className="bg-[#7E9F8E] text-white text-lg font-body py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors"
                    >
                        Shop All
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#2C3E50] mb-6">Featured Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
                            <Link href={`/home/products/${index + 1}`}>
                                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                                    <img 
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-serif text-[#2C3E50] mb-1 truncate">{product.name}</h3>
                                    <p className="text-base font-bold text-[#2C3E50] mb-2">${product.price.toFixed(2)}</p>
                                    <StarRating rating={product.rating} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
     

{/* Shop by Category */}
<section className="mb-12">
    <h2 className="text-3xl font-serif text-[#2C3E50] mb-6">Shop by Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryData.map((category) => (
            <Link 
                key={category.name}
                href={`/home/products?category=${encodeURIComponent(category.name)}`}
                aria-label={`View ${category.name} products`}
                // Updated border to a standard Tailwind class for a clean look
                className="aspect-square relative flex flex-col items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-transform transform group hover:scale-[1.02] bg-white border border-gray-200"
            >
                {/* 1. Next.js Image Component */}
                <Image 
                    src={category.image}
                    alt={`Handmade ${category.name}`}
                    // UPDATED SIZE: Increased from 96 (w-24) to 160 (w-40)
                    width={190}   
                    height={190}                      
                    style={{ objectFit: 'contain' }}
                    
                    className="mb-2 transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                
                {/* 3. Text: Now positioned below the image */}
                <p className="text-lg font-serif text-[#2C3E50] text-center w-full p-2">
                    {category.name}
                </p>
            </Link>
        ))}
    </div>
</section>

            {/* Artisan Story Block */}
            <section className="bg-white p-8 md:p-12 border border-gray-100 rounded-lg shadow-md mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Artisan Portrait (Placeholder div) */}
                    <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-gray-200">
                        {/* Placeholder div instead of Image component */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            Community Image Placeholder
                        </div>
                    </div>

                    {/* Right: Story and CTA */}
                    <div>
                        <h2 className="text-3xl font-serif text-[#2C3E50] mb-4">Our Community Mission</h2>
                        <p className="text-base font-body text-[#2C3E50] mb-6 leading-relaxed">
                            We believe in the power of handmade goods to tell a story. Every item supports a global community of skilled artisans, helping them turn their craft into a sustainable livelihood. Discover the passion, precision, and history woven into every piece.
                        </p>
                        <Link 
                            href="/home/sellers" 
                            className="text-[#7E9F8E] font-body font-bold border-b-2 border-[#7E9F8E] pb-1 hover:text-[#2C3E50] hover:border-[#2C3E50] transition-colors focus:ring-4 focus:ring-[#7E9F8E] focus:ring-offset-2"
                        >
                            Meet Our Makers &rarr;
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}