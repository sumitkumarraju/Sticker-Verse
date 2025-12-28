'use client';

import { useState, useEffect } from 'react';
import { Gift, X } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function SpinWheel() {
    const { showToast, applyCoupon } = useShop();
    const [isOpen, setIsOpen] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const spun = localStorage.getItem('sv_hasSpun');
        if (spun) setHasSpun(true);
    }, []);

    const handleSpin = () => {
        if (hasSpun) {
            showToast("You already spun today!", "error");
            return;
        }

        setIsSpinning(true);
        // Random rotation between 720 and 1440 deg
        const deg = Math.floor(720 + Math.random() * 720);
        setRotation(deg);

        setTimeout(() => {
            showToast("WINNER! Code: VILLAIN20 applied!", "success");
            setHasSpun(true);
            applyCoupon('VILLAIN20');
            localStorage.setItem('sv_hasSpun', 'true');
            setTimeout(() => setIsOpen(false), 2000);
        }, 4000);
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-40 bg-brand-yellow border-4 border-black p-4 rounded-full shadow-comic hover:-translate-y-2 transition-transform group"
            >
                <Gift className="w-8 h-8 text-black group-hover:rotate-12 transition-transform" />
                {!hasSpun && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 border-2 border-black rounded rotate-12">
                        WIN!
                    </span>
                )}
            </button>

            {/* Modal */}
            <div className={`modal fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm ${isOpen ? 'open' : ''}`}>
                <div className={`modal-content bg-white border-4 border-black p-6 max-w-md w-full relative text-center shadow-[0_0_50px_rgba(252,211,77,0.5)] m-4`}>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 hover:bg-red-100 p-1 rounded-full border-2 border-transparent hover:border-black transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="font-bangers text-4xl mb-2 text-brand-red">VILLAIN'S GAMBLE</h2>
                    <p className="font-bold mb-6 text-gray-600">Spin to win a discount code!</p>

                    <div className="relative w-64 h-64 mx-auto mb-6">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-black"></div>
                        <div
                            className="w-full h-full rounded-full border-4 border-black overflow-hidden relative wheel-spin"
                            style={{
                                background: 'conic-gradient(#FCD34D 0deg 90deg, #DC2626 90deg 180deg, #2563EB 180deg 270deg, #ffffff 270deg 360deg)',
                                transform: `rotate(${rotation}deg)`
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-black rounded-full z-10"></div>
                            </div>
                            <span className="absolute top-8 left-1/2 -translate-x-1/2 font-bangers text-xl">10%</span>
                            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-bangers text-xl text-white">20%</span>
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bangers text-xl text-white">5%</span>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bangers text-xl">50%</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSpin}
                        disabled={isSpinning || hasSpun}
                        className="w-full bg-black text-white font-bangers text-2xl py-3 border-4 border-black hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {hasSpun ? "ALREADY SPUN" : "SPIN IT!"}
                    </button>
                </div>
            </div>
        </>
    );
}
