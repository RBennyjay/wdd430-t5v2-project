import Link from 'next/link';

export default function MainFooter() {
    // Secondary accent color: deep, warm navy (#2C3E50)
    // Primary accent color: Warm Sage Green (#7E9F8E)

    return (
        <footer className="bg-[#2C3E50] text-[#FAF9F6] mt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#7E9F8E] pb-8 mb-8">
                    
                    {/* Column 1: Brand Info */}
                    <div>
                        <h4 className="text-lg font-serif mb-3 text-[#7E9F8E]">Handcraft Co.</h4>
                        <p className="text-sm font-body leading-relaxed opacity-80">
                            Dedicated to curating unique, handcrafted treasures from around the world.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-base font-body font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li><Link href="/home/products" className="hover:text-[#7E9F8E] transition-colors">All Products</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-[#7E9F8E] transition-colors">New Arrivals</Link></li>
                            <li><Link href="/sale" className="hover:text-[#7E9F8E] transition-colors">Sale</Link></li>
                            <li><Link href="/home/sellers" className="hover:text-[#7E9F8E] transition-colors">Our Makers</Link></li>
                        </ul>
                    </div>
                    
                    {/* Column 3: Customer Service */}
                    <div>
                        <h4 className="text-base font-body font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li><Link href="/faq" className="hover:text-[#7E9F8E] transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-[#7E9F8E] transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="hover:text-[#7E9F8E] transition-colors">Contact Us</Link></li>
                            <li><Link href="/accessibility" className="hover:text-[#7E9F8E] transition-colors">Accessibility</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Signup (Placeholder) */}
                    <div>
                        <h4 className="text-base font-body font-bold mb-4">Stay Connected</h4>
                        <p className="text-sm font-body mb-3 opacity-80">
                            Get exclusive offers and artisan stories delivered to your inbox.
                        </p>
                        <form className="flex">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                aria-label="Enter email for newsletter"
                                className="p-2 text-sm rounded-l-md text-[#2C3E50] focus:ring-2 focus:ring-[#7E9F8E] focus:outline-none w-full"
                            />
                            <button 
                                type="submit" 
                                className="bg-[#7E9F8E] text-white p-2 text-sm rounded-r-md hover:bg-opacity-90 transition-colors"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright/Legal */}
                <div className="flex justify-between items-center text-xs opacity-70 pt-4">
                    <p>&copy; {new Date().getFullYear()} Handcraft Co. All rights reserved.</p>
                    <div className="space-x-4">
                        <Link href="/privacy" className="hover:text-[#7E9F8E] transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#7E9F8E] transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}