
// Mock data for featured products - UPDATE IMAGE PATHS HERE
const featuredProducts = [
    { name: 'Woven Basket', price: 45.00, rating: 4.5, image: '/images/products/basket.webp' },
    { name: 'Ceramic Mug', price: 22.00, rating: 5.0, image: '/images/products/mug.webp' },
    { name: 'Leather Wallet', price: 60.00, rating: 4.2, image: '/images/products/wallet.webp' },
    { name: 'Wool Blanket', price: 95.00, rating: 4.8, image: '/images/products/blanket.webp' },   
    { name: 'Hand-dyed Scarf', price: 35.00, rating: 4.0, image: '/images/products/scarf.webp' },
    { name: 'Wooden Coaster Set', price: 28.00, rating: 4.7, image: '/images/products/coaster.webp' },
    { name: 'Terracotta Planter', price: 55.00, rating: 4.9, image: '/images/products/planter.webp' },
    { name: 'Embroidered Cushion', price: 40.00, rating: 4.3, image: '/images/products/cushion.webp' },
];


// Reusable Star Rating component (uses the Interactive/Success color: Mustard #E7BB41)
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
    // Primary accent color: Warm Sage Green (#7E9F8E)
    // Secondary accent color: deep, warm navy (#2C3E50)
    // Interactive/success color: Mustard (#E7BB41)
    
    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[500px] mb-12">
                
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center p-4">
                    {/* H1: Discover Unique Handcrafted Treasures (Serif-font) */}
                    <h1 className="text-4xl md:text-6xl text-white font-serif text-center mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                        Handcrafted Haven
                    </h1>
                    {/* "Shop All" button (Sage Green) */}
                    <a 
                        href="/home/products" 
                        className="bg-[#7E9F8E] text-white text-lg font-body py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors focus:ring-4 focus:ring-[#7E9F8E] focus:ring-offset-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Shop All
                    </a>
                </div>
            </section>
            
           <section className="mb-12">
    <h2 className="text-3xl font-serif text-[#2C3E50] mb-6">Featured Products</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {featuredProducts.slice(0, 4).map((product, index) => (
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
           
            {/* Category Tiles (Placeholder for later implementation) */}
            {/* <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#2C3E50] mb-6">Shop by Category</h2>
            
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-gray-300 flex items-center justify-center rounded-lg">
                        <p className="text-xl font-sans text-white text-center">Home Decor</p>
                    </div>
                    <div className="aspect-square bg-gray-300 flex items-center justify-center rounded-lg">
                        <p className="text-xl font-sans text-white text-center">Jewelry</p>
                    </div>
                    <div className="aspect-square bg-gray-300 flex items-center justify-center rounded-lg">
                        <p className="text-xl font-sans text-white text-center">Apparel</p>
                    </div>
                    <div className="aspect-square bg-gray-300 flex items-center justify-center rounded-lg">
                        <p className="text-xl font-sans text-white text-center">Gifts</p>
                    </div>
                </div>
            </section> */}

            <section className="mb-12">
  <h2 className="text-3xl font-serif text-[#2C3E50] mb-6">Shop by Category</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {['Home Decor', 'Jewelry', 'Apparel', 'Gifts'].map((category) => (
      <a
        key={category}
        href={`/home/products?category=${encodeURIComponent(category)}`}
        className="aspect-square bg-gray-300 flex items-center justify-center rounded-lg hover:bg-gray-400 transition-colors"
      >
        <p className="text-xl font-sans text-white text-center">{category}</p>
      </a>
    ))}
  </div>
</section>


            {/* Artisan Story Block */}
            <section className="bg-white p-8 md:p-12 border border-gray-100 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Artisan Portrait */}
                    <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-200">
                        
                    </div>
                    {/* Right: Story and CTA */}
                    <div>
                        <h2 className="text-3xl font-serif text-[#2C3E50] mb-4">Our Community Mission</h2>
                        <p className="text-base font-body text-[#2C3E50] mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-body)', minHeight: '16px' }}>
                            We believe in the power of handmade goods to tell a story. Every item supports a global community of skilled artisans, helping them turn their craft into a sustainable livelihood. Discover the passion, precision, and history woven into every piece.
                        </p>
                        <a 
                            href="/home/sellers" 
                            className="text-[#7E9F8E] font-body font-bold border-b-2 border-[#7E9F8E] pb-1 hover:text-[#2C3E50] hover:border-[#2C3E50] transition-colors focus:ring-4 focus:ring-[#7E9F8E] focus:ring-offset-2"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Meet Our Makers &rarr;
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}