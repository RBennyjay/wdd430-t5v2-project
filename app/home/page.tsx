import Link from 'next/link';

// Mock data for featured products
const featuredProducts = [
    { name: 'Woven Basket', price: 45.00, rating: 4.5, image: '/images/products/basket.webp' },
    { name: 'Ceramic Mug', price: 22.00, rating: 5.0, image: '/images/products/mug.webp' },
    { name: 'Leather Wallet', price: 60.00, rating: 4.2, image: '/images/products/wallet.webp' },
    { name: 'Wool Blanket', price: 95.00, rating: 4.8, image: '/images/products/blanket.webp' },
];

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
    const categories = ['Home Decor', 'Jewelry', 'Apparel', 'Gifts'];

    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[500px] mb-12">
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
                        </div>
                    ))}
                </div>
            </section>

            {/* Shop by Category */}
            <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#2C3E50] mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <Link 
                            key={category}
                            href={`/home/products?category=${encodeURIComponent(category)}`}
                            aria-label={`View ${category} products`}
                            className="aspect-square flex items-center justify-center rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <p className="text-xl font-sans text-white text-center">{category}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Artisan Story Block */}
            <section className="bg-white p-8 md:p-12 border border-gray-100 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Artisan Portrait */}
                    <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-200"></div>

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
        </>
    );
}
