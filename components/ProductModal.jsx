'use client';

import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/lib/data';
import { X, Plus, Star, Moon, Shield, Bug, Zap, Sword, Frown, Hammer, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ICON_MAP = {
    Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer
};

export default function ProductModal() {
    const { activeProduct, setActiveProduct, addToCart } = useShop();
    const contentRef = useRef(null);

    useEffect(() => {
        if (activeProduct) {
            gsap.to(contentRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
        }
    }, [activeProduct]);

    if (!activeProduct) return null;

    const handleClose = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            onComplete: () => setActiveProduct(null)
        });
    };

    // Get 3 related products
    const related = PRODUCTS
        .filter(p => p.cat === activeProduct.cat && p.id !== activeProduct.id)
        .slice(0, 3);

    // Icon for active product
    const ActiveIcon = ICON_MAP[activeProduct.img] || Star;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            ></div>
            <div
                ref={contentRef}
                className="bg-white w-full max-w-4xl border-4 border-black shadow-comic relative flex flex-col md:flex-row overflow-hidden transform scale-95 opacity-0 max-h-[90vh]"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 border-2 border-black hover:bg-red-100"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="w-full md:w-1/2 bg-brand-yellow flex items-center justify-center p-8 border-b-4 md:border-b-0 md:border-r-4 border-black relative bg-dots">
                    <ActiveIcon className="w-64 h-64 text-slate-800 drop-shadow-xl animate-float" />
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-black text-white px-3 py-1 text-xs font-bold w-fit">
                            {activeProduct.cat}
                        </span>
                        {activeProduct.rating === 5 && (
                            <span className="bg-brand-red text-white px-3 py-1 text-xs font-bold w-fit flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> BESTSELLER
                            </span>
                        )}
                    </div>

                    <h2 className="font-bangers text-5xl mb-2 leading-none">
                        {activeProduct.name}
                    </h2>
                    <div className="flex items-center gap-3 mb-6">
                        <p className="text-3xl font-bold text-brand-blue">
                            ${activeProduct.price}
                        </p>
                        <div className="flex text-brand-red">
                            {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < activeProduct.rating ? "fill-current" : "text-gray-300"}`} />
                            ))}
                        </div>
                    </div>

                    <p className="text-gray-600 font-bold mb-8 text-lg leading-relaxed">
                        {activeProduct.desc} High quality vinyl, weatherproof, and ready for action.
                    </p>

                    <div className="mt-auto pt-4 border-t-2 border-gray-200">
                        <button
                            onClick={() => {
                                addToCart(activeProduct);
                                handleClose();
                            }}
                            className="w-full bg-brand-red text-white font-bangers text-2xl py-3 border-4 border-black hover:bg-black hover:text-white shadow-comic transition-all flex justify-center items-center gap-2 hover:-translate-y-1 hover:shadow-comic-hover"
                        >
                            ADD TO CART <Plus className="w-6 h-6" />
                        </button>
                    </div>

                    {related.length > 0 && (
                        <div className="mt-6 pt-4 border-t-4 border-black border-dashed">
                            <h3 className="font-bangers text-xl mb-3 text-gray-400">ALSO COOL</h3>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {related.map(p => {
                                    const RelIcon = ICON_MAP[p.img] || Star;
                                    return (
                                        <div
                                            key={p.id}
                                            className="min-w-[80px] cursor-pointer hover:scale-105 transition-transform"
                                            onClick={() => setActiveProduct(p)}
                                        >
                                            <div className="w-20 h-20 bg-gray-50 border-2 border-black flex items-center justify-center p-1 mb-1">
                                                <RelIcon className="w-10 h-10 text-slate-700" />
                                            </div>
                                            <p className="text-[10px] font-bold truncate leading-tight">{p.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
