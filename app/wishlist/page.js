'use client';

import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist } = useShop();

    const wishedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="font-bangers text-5xl mb-4">YOUR WISHLIST</h1>
                <p className="font-bold text-gray-500">
                    Keep your eyes on the prize. Or just hoard them here.
                </p>
            </div>

            {wishedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white border-4 border-black shadow-hard">
                    <h2 className="font-bangers text-3xl mb-4 text-gray-400">YOUR HEART IS EMPTY</h2>
                    <Link href="/" className="inline-block px-8 py-3 bg-black text-white font-bold border-4 border-black hover:bg-comic-yellow hover:text-black transition-colors">
                        FIND SOME HEROES
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishedProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            )}
        </main>
    );
}
