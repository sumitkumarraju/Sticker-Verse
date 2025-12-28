'use client';

import { Suspense, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Search } from 'lucide-react';
import gsap from "gsap";

export default function ShopPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = PRODUCTS.filter(p => {
        const matchesCat = activeCategory === 'All' || p.cat === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCat && matchesSearch;
    });

    useEffect(() => {
        gsap.fromTo(".product-card",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }, [filtered.length, activeCategory]);

    const categories = ["All", "Marvel", "DC"];

    return (
        <div className="px-4 py-8">
            <div className="container mx-auto">
                <h2 className="font-bangers text-6xl mb-8 text-center text-brand-dark">THE ARMORY</h2>

                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-4 border-4 border-black shadow-comic">
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 border-2 border-black font-bold transition-colors ${activeCategory === cat
                                        ? "bg-black text-white hover:bg-slate-800"
                                        : "bg-white hover:bg-yellow-200"
                                    }`}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search for a hero..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 border-2 border-black font-bold focus:outline-none focus:bg-yellow-50"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-20 font-bold text-gray-400 text-xl">
                        NO HEROES FOUND IN THIS TIMELINE...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filtered.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
