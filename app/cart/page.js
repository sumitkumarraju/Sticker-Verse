'use client';

import { useShop } from '@/context/ShopContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer } from 'lucide-react';
import { useState } from 'react';

const ICON_MAP = {
    Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer
};

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, coupon, applyCoupon, removeCoupon } = useShop(); // Updated useShop destructuring
    const router = useRouter();
    const [code, setCode] = useState(''); // Added code state

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0); // Changed total to subtotal

    let discount = 0;
    if (coupon === 'HERO20') discount = subtotal * 0.20;
    if (coupon === 'POW50') discount = subtotal * 0.50;

    const shipping = subtotal >= 50 ? 0 : 5.00;
    const total = subtotal - discount + shipping; // New total calculation

    const handleApply = () => { // Added handleApply function
        applyCoupon(code);
        setCode('');
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="bg-white border-4 border-black p-10 max-w-2xl mx-auto shadow-comic-card">
                    <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-brand-blue" />
                    <h2 className="font-bangers text-5xl mb-4">YOUR STASH IS EMPTY!</h2>
                    <p className="text-xl font-bold text-gray-500 mb-8">Even Batman needs gadgets. Go get some.</p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="bg-brand-red text-white font-bangers text-2xl py-3 px-8 border-4 border-black hover:bg-black hover:-translate-y-1 transition-all shadow-comic" // Updated button class
                    >
                        GO SHOPPING
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="font-bangers text-6xl mb-8 text-center drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-white" style={{ textShadow: '3px 3px 0 #000' }}>
                YOUR LOOT STASH
            </h1>

            <div className="flex flex-col lg:flex-row gap-8"> {/* New wrapper div */}
                {/* Cart Items */}
                <div className="flex-1 bg-white border-4 border-black shadow-comic-card p-6 md:p-8 h-fit">
                    {/* Free Shipping Bar */}
                    <div className="mb-6 bg-blue-50 p-4 border-2 border-blue-200 rounded-lg">
                        <div className="flex justify-between text-sm font-bold mb-2 text-blue-800">
                            <span>{subtotal >= 50 ? "🎉 You've unlocked FREE Shipping!" : `Add $${(50 - subtotal).toFixed(2)} for FREE Shipping!`}</span>
                            <span>${subtotal.toFixed(2)} / $50.00</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {cart.map((item) => {
                            const IconComp = ICON_MAP[item.img] || Star;
                            return (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b-4 border-black pb-6 last:border-b-0">
                                    <div className="w-24 h-24 bg-gray-100 border-2 border-black flex items-center justify-center relative shrink-0">
                                        <IconComp className="w-12 h-12 text-slate-700" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="font-bangers text-2xl leading-none">{item.name}</h3>
                                        <p className="font-bold text-gray-500 text-sm">{item.cat}</p>
                                        <p className="font-bold text-brand-red text-xl">${item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border-2 border-black bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="px-3 py-1 font-bold hover:bg-gray-100 border-r-2 border-black"
                                            >-</button>
                                            <span className="px-4 font-bangers text-xl">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 font-bold hover:bg-gray-100 border-l-2 border-black"
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:w-1/3"> {/* New summary sidebar */}
                    <div className="bg-white border-4 border-black p-6 shadow-comic sticky top-24">
                        <h3 className="font-bangers text-3xl mb-4 border-b-2 border-black pb-2">MISSION SUMMARY</h3>

                        <div className="flex justify-between mb-2 font-bold text-gray-600">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4 font-bold text-gray-600">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>

                        {/* Coupon Section */}
                        <div className="mb-6">
                            <label className="block font-bold text-sm mb-1">HAVE A CODE?</label>
                            {coupon ? (
                                <div className="flex justify-between items-center bg-green-100 border-2 border-black p-2 border-dashed">
                                    <span className="font-bold text-green-800 text-sm">CODE: {coupon} APPLIED</span>
                                    <button onClick={removeCoupon} className="text-red-500 hover:text-red-700">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="e.g. HERO20"
                                        className="flex-grow border-2 border-black px-3 py-1 uppercase font-bold focus:outline-none focus:bg-yellow-50"
                                    />
                                    <button onClick={handleApply} className="bg-black text-white px-4 font-bold hover:bg-gray-800 border-2 border-black">APPLY</button>
                                </div>
                            )}
                            {discount > 0 && (
                                <p className="text-sm font-bold mt-1 text-brand-red text-right">
                                    DISCOUNT: -${discount.toFixed(2)}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between mb-6 font-bangers text-3xl border-t-2 border-black pt-4">
                            <span>TOTAL</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => router.push('/checkout')}
                            className="w-full bg-brand-red text-white font-bold py-4 text-xl border-4 border-black shadow-comic-hover hover:translate-y-1 hover:shadow-comic transition-all flex items-center justify-center gap-2"
                        >
                            PROCEED <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
