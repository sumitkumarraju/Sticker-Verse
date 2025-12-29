'use client';

import { useShop } from '@/context/ShopContext';
import { Swords, X, Check, Shield } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { useState, useEffect } from 'react';

export default function CompareWidget() {
    const { compareList, clearCompare, isCompareOpen, setIsCompareOpen, addToCart } = useShop();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const items = PRODUCTS.filter(p => compareList.includes(p.id));
        setProducts(items);
    }, [compareList]);

    if (compareList.length === 0) return null;

    return (
        <>
            {/* Floating FAB */}
            <button
                onClick={() => setIsCompareOpen(true)}
                className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-black text-white px-6 py-3 font-bangers text-xl border-4 border-white shadow-comic animate-bounce hover:bg-gray-800 transition-colors ${isCompareOpen ? 'hidden' : 'flex'} items-center gap-2`}
            >
                <Swords className="w-6 h-6" /> VERSUS MODE ({compareList.length})
            </button>

            {/* Modal */}
            <div className={`modal fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm ${isCompareOpen ? 'open' : ''}`}>
                <div className="modal-content bg-white border-4 border-black p-6 max-w-4xl w-full relative shadow-[0_0_0_1000px_rgba(0,0,0,0.5)] m-4 max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={() => setIsCompareOpen(false)}
                        className="absolute top-2 right-2 hover:bg-red-100 p-2 rounded-full border-2 border-transparent hover:border-black transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="font-bangers text-5xl mb-8 text-center text-brand-red tracking-wide drop-shadow-sm">VERSUS MODE</h2>

                    <div className="grid grid-cols-3 gap-0 md:gap-4 text-center font-bold text-sm md:text-base border-4 border-black bg-gray-100">
                        {/* Headers */}
                        <div className="p-4 flex flex-col justify-end items-center border-r-4 border-black bg-white">
                            <span className="font-bangers text-2xl text-gray-400">STATS</span>
                        </div>
                        {products.map((p, i) => (
                            <div key={p.id} className={`p-4 border-r-4 border-black last:border-r-0 bg-white relative ${i === 0 ? 'bg-red-50' : 'bg-blue-50'}`}>
                                <h3 className="font-bangers text-2xl md:text-3xl leading-none mb-2">{p.name}</h3>
                                {i === 0 && <span className="absolute top-0 left-0 bg-brand-red text-white text-[10px] px-2 font-bold">CHALLENGER</span>}
                                {i === 1 && <span className="absolute top-0 right-0 bg-brand-blue text-white text-[10px] px-2 font-bold">DEFENDER</span>}
                            </div>
                        ))}
                        {[...Array(2 - products.length)].map((_, i) => (
                            <div key={`empty-${i}`} className="p-4 bg-gray-200 flex items-center justify-center border-r-4 border-black last:border-r-0">
                                <span className="text-gray-400 font-bangers text-xl">WAITING...</span>
                            </div>
                        ))}

                        {/* Price */}
                        <div className="p-3 border-t-2 border-r-4 border-black bg-white flex items-center justify-center font-bangers text-xl">BOUNTY</div>
                        {products.map(p => (
                            <div key={`price-${p.id}`} className="p-3 border-t-2 border-r-4 border-black last:border-r-0 bg-white text-brand-green font-bangers text-2xl">
                                ${p.price.toFixed(2)}
                            </div>
                        ))}
                        {[...Array(2 - products.length)].map((_, i) => <div key={`e-price-${i}`} className="border-t-2 border-r-4 border-black last:border-r-0 bg-gray-100"></div>)}

                        {/* Category */}
                        <div className="p-3 border-t-2 border-r-4 border-black bg-white flex items-center justify-center font-bangers text-xl">FACTION</div>
                        {products.map(p => (
                            <div key={`cat-${p.id}`} className="p-3 border-t-2 border-r-4 border-black last:border-r-0 bg-white uppercase">
                                {p.cat}
                            </div>
                        ))}
                        {[...Array(2 - products.length)].map((_, i) => <div key={`e-cat-${i}`} className="border-t-2 border-r-4 border-black last:border-r-0 bg-gray-100"></div>)}

                        {/* Rating (Random Mock) */}
                        <div className="p-3 border-t-2 border-r-4 border-black bg-white flex items-center justify-center font-bangers text-xl">POWER</div>
                        {products.map(p => (
                            <div key={`rat-${p.id}`} className="p-3 border-t-2 border-r-4 border-black last:border-r-0 bg-white">
                                <div className="flex justify-center gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-3 h-3 rounded-full border border-black ${i < 4 ? 'bg-brand-yellow' : 'bg-gray-300'}`}></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {[...Array(2 - products.length)].map((_, i) => <div key={`e-rat-${i}`} className="border-t-2 border-r-4 border-black last:border-r-0 bg-gray-100"></div>)}

                        {/* Actions */}
                        <div className="p-3 border-t-2 border-r-4 border-black bg-white flex items-center justify-center font-bangers text-xl">ACTION</div>
                        {products.map(p => (
                            <div key={`act-${p.id}`} className="p-3 border-t-2 border-r-4 border-black last:border-r-0 bg-white">
                                <button
                                    onClick={() => addToCart(p)}
                                    className="bg-black text-white px-4 py-1 font-bold text-xs hover:bg-brand-yellow hover:text-black transition-colors border-2 border-black"
                                >
                                    ADD TO LOOT
                                </button>
                            </div>
                        ))}
                        {[...Array(2 - products.length)].map((_, i) => <div key={`e-act-${i}`} className="border-t-2 border-r-4 border-black last:border-r-0 bg-gray-100"></div>)}
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={clearCompare}
                            className="bg-white text-gray-500 border-2 border-gray-400 px-6 py-2 font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors"
                        >
                            CLEAR ARENA
                        </button>
                        <button
                            onClick={() => setIsCompareOpen(false)}
                            className="bg-black text-white border-4 border-black px-8 py-2 font-bangers text-xl hover:scale-105 transition-transform"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
