'use client';

import { ArrowUp, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';

export default function FloatingControls() {
    const [showScroll, setShowScroll] = useState(false);
    const { showToast } = useShop();

    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Scroll Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-24 right-6 z-40 bg-white border-4 border-black p-3 shadow-comic hover:-translate-y-1 transition-all ${showScroll ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            >
                <ArrowUp className="w-6 h-6" />
            </button>

            {/* Need Help */}
            <button
                onClick={() => showToast("Support Agents are on a clear donut break.", "info")}
                className="fixed bottom-24 left-6 z-40 bg-brand-blue text-white border-4 border-black px-4 py-3 shadow-comic hover:-translate-y-1 font-bold flex items-center gap-2 transition-transform"
            >
                <MessageCircle className="w-6 h-6" />
                <span className="hidden md:inline">NEED HELP?</span>
            </button>
        </>
    );
}
