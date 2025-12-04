import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Minimal Header for branding and returning home */}
            <header className="py-6 border-b border-gray-100 bg-cream">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Logo/Branding - Serif Font */}
                    <Link href="/home" className="text-3xl font-serif text-navy font-bold hover:text-sage transition-colors">
                        Handcraft Co.
                    </Link>
                </div>
            </header>
            
            {/* Main Content Area */}
            <main className="grow py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
                {children}
            </main>
            
            {/* Simple Footer */}
            <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-100 mt-auto">
                <p>&copy; {new Date().getFullYear()} Handcraft Co. | <Link href="/home/products" className="hover:text-navy transition-colors">Continue Shopping</Link></p>
            </footer>
        </div>
    );
}