'use client';

import { useShop } from '@/context/ShopContext';
import { Package, Mail, MapPin, ChevronDown, User, Shield, Star, Moon, Bug, Zap, Sword, Frown, Hammer } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';

const ICON_MAP = { Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer };

export default function ProfilePage() {
    const { user, orders } = useShop();
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white border-4 border-black shadow-comic-card overflow-hidden">
                <div className="bg-brand-blue p-8 text-white border-b-4 border-black relative overflow-hidden">
                    <div className="absolute inset-0 comic-bg opacity-30"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center overflow-hidden">
                            <User className="w-12 h-12 text-black" />
                        </div>
                        <div>
                            <h2 className="font-bangers text-4xl">AGENT: {user.name}</h2>
                            <p className="font-bold opacity-80 uppercase">LEVEL 5 ACCESS | MEMBER SINCE 2024</p>
                        </div>
                    </div>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-100 border-b-4 border-black">
                    <div className="bg-white border-2 border-black p-4 text-center shadow-sm">
                        <div className="text-3xl font-bangers text-brand-blue">LVL 5</div>
                        <div className="text-xs font-bold text-gray-500">ACCESS LEVEL</div>
                    </div>
                    <div className="bg-white border-2 border-black p-4 text-center shadow-sm">
                        <div className="text-3xl font-bangers text-brand-red">{orders.length}</div>
                        <div className="text-xs font-bold text-gray-500">MISSIONS</div>
                    </div>
                    <div className="bg-white border-2 border-black p-4 text-center shadow-sm">
                        <div className="text-3xl font-bangers text-brand-yellow">240</div>
                        <div className="text-xs font-bold text-gray-500">POINTS</div>
                    </div>
                    <div className="bg-white border-2 border-black p-4 text-center shadow-sm">
                        <div className="text-3xl font-bangers">3</div>
                        <div className="text-xs font-bold text-gray-500">COUPONS</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3">
                    <div className="bg-gray-50 border-r-0 md:border-r-4 border-b-4 md:border-b-0 border-black p-6">
                        <nav className="space-y-2">
                            <button className="w-full text-left font-bold p-2 bg-black text-white border-2 border-black shadow-comic">MISSION HISTORY</button>
                            <button className="w-full text-left font-bold p-2 hover:bg-yellow-200 border-2 border-transparent hover:border-black transition-all">SECRET SETTINGS</button>
                            <button onClick={() => router.push('/')} className="w-full text-left font-bold p-2 hover:bg-red-200 border-2 border-transparent hover:border-black transition-all text-red-600">LOGOUT</button>
                        </nav>
                    </div>

                    <div className="md:col-span-2 p-8">
                        <h3 className="font-bangers text-3xl mb-6">PREVIOUS ORDERS</h3>
                        <div className="space-y-4 mb-8">
                            {orders.length === 0 ? (
                                <p className="text-gray-500 font-bold p-4 bg-yellow-50 border-2 border-black border-dashed">No missions on record yet.</p>
                            ) : (
                                orders.map((order, i) => (
                                    <OrderItem key={i} order={order} />
                                ))
                            )}
                        </div>

                        {/* WISHLIST GRID */}
                        <h3 className="font-bangers text-3xl mb-4 border-b-2 border-black pb-2">SAVED LOOT (WISHLIST)</h3>
                        <WishlistGrid />
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
