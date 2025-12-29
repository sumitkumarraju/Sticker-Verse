'use client';

import {
    ShoppingCart, Heart, Eye, Star, Sparkles, Check,
    Moon, Shield, Bug, Zap, Sword, Frown, Hammer
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useRef } from 'react';
import gsap from 'gsap';
import { triggerAddToCartAnimation } from '@/lib/animations';

// Icon Map
const ICON_MAP = {
    Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer
};

export default function ProductCard({ product, index }) {
    const { addToCart, toggleWishlist, wishlist, setActiveProduct, toggleCompare, compareList } = useShop();
    const isWished = wishlist.includes(product.id);
    const cardRef = useRef(null);

    // Dynamic Icon
    const IconComponent = ICON_MAP[product.img] || Star;

    const handleTilt = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.1
        });
    };

    const resetTilt = () => {
        gsap.to(cardRef.current, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };

    return (
        <div
            ref={cardRef}
            className="product-card group bg-white border-4 border-black p-4 shadow-comic hover:shadow-comic-hover hover:-translate-y-2 transition-all cursor-pointer flex flex-col h-full"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
        >
            <div className="tilt-inner pointer-events-none flex-grow">
                <div className="bg-gray-100 h-48 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden group">
                    <IconComponent className="w-20 h-20 text-slate-700 transform group-hover:scale-110 transition-transform" />

                    {/* Badge */}
                    {product.stock < 10 && (
                        <div className="absolute top-2 right-2 bg-brand-red text-white px-2 border-2 border-black font-bold text-xs uppercase shadow-sm">
                            LOW STOCK
                        </div>
                    )}
                    {product.badge && (
                        <div className="absolute top-2 left-2 z-10 bg-brand-yellow border-2 border-black text-xs font-bold px-2 py-1 rotate-[-2deg] badge-pop">
                            {product.badge}
                        </div>
                    )}

                    {/* Action Overlay */}
                    <div className="absolute bottom-0 w-full bg-white/90 border-t-2 border-black flex justify-around py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
                        <button
                            onClick={(e) => { e.stopPropagation(); setActiveProduct(product); }}
                            className="hover:text-brand-blue transition-colors"
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                            className={`${isWished ? 'text-brand-red fill-current' : 'hover:text-brand-red'} transition-colors`}
                        >
                            <Heart className={`w-5 h-5 ${isWished ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h3 className="font-bangers text-2xl mt-1 leading-none group-hover:text-brand-blue transition-colors">
                            {product.name}
                        </h3>
                    </div>
                    <span className="font-bold text-xl text-brand-red">${product.price.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    triggerAddToCartAnimation(e);
                    addToCart(product);
                }}
                className="w-full bg-black text-white font-bold py-2 border-2 border-black hover:bg-brand-yellow hover:text-black transition-colors flex items-center justify-center gap-2 text-sm shadow-sm pointer-events-auto active:scale-95"
            >
                <ShoppingCart className="w-4 h-4" /> ADD TO CART
            </button>

            {/* Compare Checkbox */}
            <div className="mt-3 pt-2 border-t-2 border-gray-100 flex items-center gap-2 pointer-events-auto">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(product.id);
                    }}
                    className="flex items-center gap-2 cursor-pointer group/compare"
                >
                    <div className={`w-4 h-4 border-2 border-black flex items-center justify-center transition-colors ${compareList.includes(product.id) ? 'bg-black' : 'bg-white group-hover/compare:bg-gray-200'}`}>
                        {compareList.includes(product.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 group-hover/compare:text-black transition-colors">COMPARE</span>
                </div>
            </div>
        </div>
    );
}
