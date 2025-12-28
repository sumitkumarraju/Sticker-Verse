'use client';

import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const { cart, wishlist, setIsCartOpen } = useShop();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-4 py-3 shadow-comic">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-red border-4 border-black flex items-center justify-center transform group-hover:-rotate-12 transition-transform">
                        <span className="font-bangers text-white text-2xl mt-1">S</span>
                    </div>
                    <span className="font-bangers text-3xl hidden sm:block tracking-wide">STICKER VERSE</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 font-bold text-lg">
                    <Link href="/" className="hover:text-brand-red hover:underline decoration-4 underline-offset-4 transition-all">
                        HOME
                    </Link>
                    <Link href="/shop" className="hover:text-brand-red hover:underline decoration-4 underline-offset-4 transition-all">
                        SHOP ALL
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/shop" className="hidden md:block cursor-pointer hover:text-brand-red transition-colors">
                        <Search className="w-6 h-6" />
                    </Link>

                    <Link href="/profile" className="relative cursor-pointer group">
                        <div className="border-2 border-black rounded-full p-1.5 hover:bg-brand-yellow transition-colors bg-white">
                            <User className="w-6 h-6" />
                        </div>
                    </Link>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative cursor-pointer group"
                        id="cart-icon-container"
                    >
                        <div className="border-2 border-black rounded-lg p-1.5 group-hover:bg-black group-hover:text-white transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        {cartCount > 0 && (
                            <span
                                id="cart-count"
                                className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center border-2 border-black rounded-full"
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
