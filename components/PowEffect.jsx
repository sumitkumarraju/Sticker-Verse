'use client';

export default function PowEffect() {
    return (
        <div id="pow-effect" className="fixed z-[10000] pointer-events-none hidden w-32 h-32">
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl">
                <path d="M60 5 L75 40 L115 45 L80 70 L90 110 L60 85 L30 110 L40 70 L5 45 L45 40 Z" fill="#FACC15" stroke="black" strokeWidth="3" />
                <text x="60" y="75" textAnchor="middle" fontFamily="Bangers" fontSize="36" fill="black">POW!</text>
            </svg>
        </div>
    );
}
