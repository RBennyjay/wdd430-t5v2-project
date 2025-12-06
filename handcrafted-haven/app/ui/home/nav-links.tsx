"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/home' },
    { name: 'Products', href: '/home/products' },
    { name: 'Sellers', href: '/home/sellers' },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'text-sm font-medium transition-colors border-b-2 py-2',
                        // Inactive/Default state: text-navy, border-transparent
                        'text-navy border-transparent hover:text-sage hover:border-sage',
                        // Active state: text-sage, border-sage, font-bold
                        {
                            'text-sage border-sage font-bold': pathname === link.href,
                        }
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
}