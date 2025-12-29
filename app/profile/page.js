'use client';

import { useShop } from '@/context/ShopContext';
import { Package, Mail, MapPin, ChevronDown, User, Shield, Star, Moon, Bug, Zap, Sword, Frown, Hammer, Check } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';

const ICON_MAP = { Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer };

export default function ProfilePage() {
    const { user, orders } = useShop();
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* PROFILE HEADER & COMPLETION */}
            <div className="bg-white border-4 border-black p-6 mb-8 shadow-comic relative overflow-hidden">
                <div className="flex justify-between items-end mb-4 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-brand-yellow border-4 border-black rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-black" />
                        </div>
                        <div>
                            <h2 className="font-bangers text-4xl">AGENT: {user.name}</h2>
                            <p className="font-bold text-gray-500 text-sm">LEVEL 5 ACCESS</p>
                        </div>
                    </div>
                    <span className="font-bangers text-4xl text-brand-green">75%</span>
                </div>

                <div className="w-full h-6 bg-gray-200 border-2 border-black rounded-full overflow-hidden relative mb-4">
                    <div className="bg-brand-green h-full w-[75%] striped-bg"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black/50">ALMOST A HERO</div>
                </div>

                <div className="flex gap-4 text-sm font-bold flex-wrap">
                    <span className="text-green-600 flex items-center gap-1"><Check className="w-4 h-4" /> Hero Name</span>
                    <span className="text-green-600 flex items-center gap-1"><Check className="w-4 h-4" /> Shipping Addr</span>
                    <span className="text-red-500 flex items-center gap-1"><Shield className="w-4 h-4" /> Payment Method</span>
                </div>
            </div>

            {/* STATS GRID */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border-4 border-black p-4 text-center shadow-comic hover:-translate-y-1 transition-transform">
                    <div className="font-bangers text-5xl text-brand-blue">{orders.reduce((acc, o) => acc + o.items.reduce((s, i) => s + i.quantity, 0), 0)}</div>
                    <div className="font-bold text-xs tracking-wider uppercase">Stickers Bought</div>
                </div>
                <div className="bg-white border-4 border-black p-4 text-center shadow-comic hover:-translate-y-1 transition-transform">
                    <div className="font-bangers text-5xl text-brand-red">{orders.length}</div>
                    <div className="font-bold text-xs tracking-wider uppercase">Orders Placed</div>
                </div>
                <div className="bg-white border-4 border-black p-4 text-center shadow-comic hover:-translate-y-1 transition-transform">
                    <div className="font-bangers text-5xl text-brand-yellow">9</div>
                    <div className="font-bold text-xs tracking-wider uppercase">Favorites</div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* LEFT COL: ORDERS & HISTORY */}
                <div className="md:col-span-2 space-y-8">
                    {/* FAN OF SECTION */}
                    <div className="bg-white border-4 border-black p-6 shadow-comic">
                        <h3 className="font-bangers text-2xl mb-4 border-b-2 border-black inline-block">FAN OF</h3>
                        <div className="flex gap-3 flex-wrap">
                            <span className="px-4 py-2 bg-black text-white border-2 border-black font-bold -rotate-1 shadow-sm flex items-center gap-2"><Moon className="w-4 h-4" /> Batman</span>
                            <span className="px-4 py-2 bg-brand-red text-white border-2 border-black font-bold rotate-1 shadow-sm flex items-center gap-2"><Bug className="w-4 h-4" /> Spider-Man</span>
                            <button className="px-4 py-2 border-2 border-black font-bold hover:bg-yellow-200 border-dashed uppercase text-sm">+ Add Fandom</button>
                        </div>
                    </div>

                    {/* PREVIOUS ORDERS */}
                    <div>
                        <h3 className="font-bangers text-3xl mb-4">MISSION HISTORY</h3>
                        <div className="space-y-4">
                            {orders.length === 0 ? (
                                <p className="text-gray-500 font-bold p-4 bg-yellow-50 border-2 border-black border-dashed">No missions on record yet.</p>
                            ) : (
                                orders.map((order, i) => (
                                    <div key={i} className="mb-4">
                                        <OrderItem order={order} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: WISHLIST / ACTIONS */}
                <div className="space-y-6">
                    <div className="bg-white border-4 border-black p-6 shadow-comic">
                        <h3 className="font-bangers text-2xl mb-4 border-b-2 border-black inline-block">SAVED LOOT</h3>
                        <WishlistGrid />
                    </div>

                    <div className="bg-gray-100 border-4 border-black p-6">
                        <nav className="space-y-2">
                            <button className="w-full text-left font-bold p-3 bg-white border-2 border-black shadow-sm hover:translate-x-1 transition-transform flex justify-between">
                                SECRET SETTINGS <ChevronDown className="w-4 h-4" />
                            </button>
                            <button onClick={() => router.push('/')} className="w-full text-left font-bold p-3 bg-red-100 border-2 border-black shadow-sm hover:bg-red-200 transition-colors text-red-600 flex justify-between">
                                LOGOUT <Shield className="w-4 h-4" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OrderItem({ order }) {
    const [expanded, setExpanded] = useState(false);
    const { addToCart } = useShop();

    return (
        <div className="bg-white border-2 border-black transition-all hover:shadow-comic">
            <div
                className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 cursor-pointer bg-white"
                onClick={() => setExpanded(!expanded)}
            >
                <div>
                    <p className="font-bold text-lg flex items-center gap-2">
                        #{order.orderId.split('-')[1] || order.orderId}
                        <span className={`text-xs px-2 py-0.5 rounded-full border border-black ${order.status === 'Processing' ? 'bg-yellow-200' : 'bg-green-200'}`}>
                            {order.status}
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 font-bold">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bangers text-xl">${Number(order.total).toFixed(2)}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {expanded && (
                <div className="border-t-2 border-black p-4 bg-gray-50 flex flex-col gap-3">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-2 border-2 border-gray-200">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-400 text-sm">x{item.quantity}</span>
                                <span className="font-bold">{item.name}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(item);
                                }}
                                className="text-xs bg-brand-yellow border-2 border-black px-2 py-1 font-bold hover:bg-black hover:text-white"
                            >
                                BUY AGAIN
                            </button>
                        </div>
                    ))}
                    <div className="mt-2 text-xs font-bold text-gray-500 text-right">
                        SHIPPING TO: <span className="text-black">{order.shipping?.city || "SECRET BASE"}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function WishlistGrid() {
    const { wishlist, addToCart } = useShop();

    if (wishlist.length === 0) {
        return <p className="text-gray-400 text-sm font-bold">No saved items yet.</p>;
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {wishlist.map(id => {
                const p = PRODUCTS.find(x => x.id === id);
                if (!p) return null;
                const Icon = ICON_MAP[p.img] || Star;
                return (
                    <div key={id} className="border-2 border-black p-2 bg-gray-50 text-center relative group shadow-sm hover:shadow-comic transition-all">
                        <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-white border border-black rounded-full">
                            <Icon className="w-8 h-8 text-black" />
                        </div>
                        <div className="font-bold text-sm truncate">{p.name}</div>
                        <button
                            onClick={() => addToCart(p)}
                            className="mt-2 text-xs bg-black text-white px-2 py-1 w-full font-bold hover:bg-brand-yellow hover:text-black transition-colors border-2 border-transparent hover:border-black"
                        >
                            ADD
                        </button>
                    </div>
                )
            })}
        </div>
    );
}
