'use client';

import { useShop } from '@/context/ShopContext';
import { X, Trash2, Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer } from 'lucide-react';
import Link from 'next/link';

const ICON_MAP = {
    Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer
};

export default function CartSidebar() {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity } = useShop();

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className={`fixed inset-0 z-[60] flex justify-end transition-all duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsCartOpen(false)}
            ></div>

            <div className={`relative w-full max-w-md bg-white h-full border-l-4 border-black shadow-2xl flex flex-col transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-5 border-b-4 border-black bg-brand-yellow flex justify-between items-center">
                    <h2 className="font-bangers text-3xl">YOUR STASH</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-10 font-bold text-gray-400">
                            Your stash is empty.
                        </div>
                    ) : (
                        cart.map(item => {
                            const IconComp = ICON_MAP[item.img] || Star;
                            return (
                                <div key={item.id} className="flex gap-4 items-center bg-gray-50 border-2 border-black p-2 relative">
                                    <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center">
                                        <IconComp className="w-8 h-8 text-black" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bangers text-lg leading-none">{item.name}</h4>
                                        <p className="text-sm font-bold text-gray-500">${item.price}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-sm"
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-600 p-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="p-6 border-t-4 border-black bg-gray-50">
                    <div className="flex justify-between text-xl font-bold mb-4">
                        <span>TOTAL</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    {cart.length > 0 && (
                        <Link
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full text-center bg-black text-white font-bangers text-2xl py-4 border-4 border-transparent hover:bg-brand-red hover:border-black hover:shadow-comic transition-all"
                        >
                            CHECKOUT NOW
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
