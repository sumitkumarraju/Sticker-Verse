'use client';

import { useShop } from '@/context/ShopContext';
import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Heart, Zap } from 'lucide-react';

export default function ToastContainer() {
    const { toasts } = useShop();

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
}

function Toast({ toast }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    let Icon = Zap;
    let bgColor = 'bg-black';
    let borderColor = 'border-black';

    if (toast.type === 'love') {
        Icon = Heart;
        bgColor = 'bg-brand-red';
    } else if (toast.type === 'success') {
        Icon = CheckCircle;
        bgColor = 'bg-green-600';
    } else if (toast.type === 'error') {
        Icon = AlertCircle;
        bgColor = 'bg-red-600';
    }

    return (
        <div
            className={`
                pointer-events-auto min-w-[300px] flex items-center gap-3 p-4 border-4 border-black shadow-comic text-white font-bold
                transition-all duration-300 transform
                ${visible ? 'toast-enter opacity-100' : 'translate-x-full opacity-0'}
                ${bgColor}
            `}
        >
            <Icon className="w-6 h-6 shrink-0" />
            <span className="flex-grow font-sans text-sm">{toast.message}</span>
        </div>
    );
}
