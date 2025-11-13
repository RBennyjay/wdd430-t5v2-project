import Link from 'next/link';
import NavLinks from '@/app/ui/home/nav-links';

// Placeholder for simple line-art icons (replace with actual icons like Lucide/Heroicons/etc.)
const Icon = ({ className }: { className: string }) => <div className={`w-6 h-6 border-2 border-[#2C3E50] rounded-full ${className}`}></div>; 

export default function MainHeader() {
    // Primary accent color: Warm Sage Green (#7E9F8E)
    // Secondary accent color: deep, warm navy (#2C3E50)
    // Background color: Off-white/Cream (#FAF9F6)
    
    return (
        <header className="sticky top-0 z-50 bg-[#FAF9F6] shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                {/* Logo/Branding - Use a Serif Font for the Brand Name */}
                <Link href="/home" className="text-2xl font-serif text-[#2C3E50] font-bold">
                    Handcraft Co.
                </Link>

                {/* Primary Navigation Links (Hidden on Mobile, use a separate Menu icon) */}
                <nav className="hidden md:flex space-x-8">
                    <NavLinks />
                </nav>

                {/* Icons - Simple Line-Art Style */}
                <div className="flex items-center space-x-4">
                    <button aria-label="Search" className="focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition"><Icon className="border-none bg-transparent" /></button> 
                    <button aria-label="Account" className="focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition"><Icon className="border-none bg-transparent" /></button>
                    <Link href="/cart" aria-label="Cart" className="relative focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition">
                        <Icon className="border-none bg-transparent" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-[#E7BB41] rounded-full text-xs text-white flex items-center justify-center -mt-1 -mr-1">3</span>
                    </Link>
                    {/* Menu for Mobile */}
                    <button aria-label="Menu" className="md:hidden focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition"><Icon className="border-none bg-transparent" /></button>
                </div>
            </div>
        </header>
    );
}