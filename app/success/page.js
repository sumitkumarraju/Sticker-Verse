'use client';

import { useShop } from '@/context/ShopContext';
import { Check, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
    const { orders, user } = useShop();
    const router = useRouter();

    const lastOrder = orders[0];

    useEffect(() => {
        if (!lastOrder) {
            router.push('/');
            return;
        }

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FF4444', '#4488FF', '#FFD700'] }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#FF4444', '#4488FF', '#FFD700'] }));
        }, 250);

        return () => clearInterval(interval);
    }, [lastOrder, router]);

    if (!lastOrder) return null;

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center min-h-[60vh]">
            <div className="w-24 h-24 bg-green-500 border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-hard animate-bounce">
                <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-bangers text-6xl mb-2">BOOYAH!</h1>
            <p className="text-xl font-bold text-gray-600 mb-8">
                Order <span className="font-mono text-black">{lastOrder.orderId}</span> has been secured.
            </p>

            <div className="bg-white border-4 border-black p-6 w-full max-w-md shadow-hard mb-8 text-left">
                <p className="font-bold text-sm text-gray-400">SHIPPING TO:</p>
                <p className="font-bold text-lg mb-4">{lastOrder.shipping?.name || "Hero"}</p>
                <p className="font-bold text-sm text-gray-400">ESTIMATED ARRIVAL:</p>
                <p className="font-bold text-lg text-comic-blue">3-5 Business Days</p>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => router.push('/profile')}
                    className="bg-black text-white px-8 py-3 font-bold border-4 border-black hover:bg-gray-800"
                >
                    VIEW ORDER
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="bg-white text-black px-8 py-3 font-bold border-4 border-black hover:bg-gray-50"
                >
                    KEEP SHOPPING
                </button>
            </div>
        </div>
    );
}
