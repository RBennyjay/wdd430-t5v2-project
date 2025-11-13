import MainHeader from '@/app/ui/home/main-header'; 
import MainFooter from '@/app/ui/home/main-footer'; 
import { Inter, Lora } from 'next/font/google'; 

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const lora = Lora({ subsets: ['latin'], variable: '--font-heading' });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
            <div className={`min-h-screen flex flex-col ${inter.variable} ${lora.variable} font-sans bg-cream text-navy`}>
            {/* Header / Main Navigation */}
            <MainHeader /> 
            
            {/* Main Content Area */}
            <main className="grow pt-4 pb-8 md:pt-8 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                {children}
            </main>

            {/* Footer */}
            <MainFooter />
        </div>
    );
}