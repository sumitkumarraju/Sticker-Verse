'use client';

import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreditCard, MapPin } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, placeOrder } = useShop();
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', address: '', city: '', zip: '', cardNum: '', expiry: '', cvc: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const finalTotal = total + shipping;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create order details
        const orderDetails = {
            items: cart,
            total: finalTotal.toFixed(2),
            date: new Date().toISOString().split('T')[0],
            status: 'Processing',
            shipping: {
                city: formData.city,
                address: formData.address
            }
        };

        const orderId = placeOrder(orderDetails);
        router.push(`/success?order=${orderId}`);
    };

    if (cart.length === 0) {
        return <div className="p-10 text-center font-bangers text-3xl">YOUR CART IS EMPTY! GO SHOPPING!</div>;
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-12">
            <h2 className="font-bangers text-5xl mb-8 text-center">SECURE BASE</h2>

            <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-8 shadow-comic-card">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="col-span-2">
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" /> SHIPPING ADDRESS</h3>
                    </div>
                    <div>
                        <label className="block font-bold text-sm mb-1">First Name</label>
                        <input name="firstName" required onChange={handleChange} className="w-full border-2 border-black p-2 bg-gray-50 focus:bg-yellow-50 outline-none font-bold" />
                    </div>
                    <div>
                        <label className="block font-bold text-sm mb-1">Last Name</label>
                        <input name="lastName" required onChange={handleChange} className="w-full border-2 border-black p-2 bg-gray-50 focus:bg-yellow-50 outline-none font-bold" />
                    </div>
                    <div className="col-span-2">
                        <label className="block font-bold text-sm mb-1">Secret Lair Address</label>
                        <input name="address" required onChange={handleChange} className="w-full border-2 border-black p-2 bg-gray-50 focus:bg-yellow-50 outline-none font-bold" />
                    </div>
                    <div>
                        <label className="block font-bold text-sm mb-1">City</label>
                        <input name="city" required onChange={handleChange} className="w-full border-2 border-black p-2 bg-gray-50 focus:bg-yellow-50 outline-none font-bold" />
                    </div>
                    <div>
                        <label className="block font-bold text-sm mb-1">Zip Code</label>
                        <input name="zip" required onChange={handleChange} className="w-full border-2 border-black p-2 bg-gray-50 focus:bg-yellow-50 outline-none font-bold" />
                    </div>
                </div>

                <div className="mb-8 border-t-4 border-black pt-6">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5" /> PAYMENT METHOD</h3>
                    <div className="flex gap-4 mb-4">
                        <div className="border-2 border-black p-4 flex-1 text-center bg-yellow-100 font-bold cursor-pointer transition-colors hover:bg-yellow-200">CREDIT CARD</div>
                        <div className="border-2 border-gray-300 p-4 flex-1 text-center text-gray-400 cursor-not-allowed">STARK INDUSTRIES PAY</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="cardNum" placeholder="Card Number" required onChange={handleChange} className="col-span-2 border-2 border-black p-2 font-bold focus:bg-yellow-50 outline-none" />
                        <input name="expiry" placeholder="MM/YY" required onChange={handleChange} className="border-2 border-black p-2 font-bold focus:bg-yellow-50 outline-none" />
                        <input name="cvc" placeholder="CVC" required onChange={handleChange} className="border-2 border-black p-2 font-bold focus:bg-yellow-50 outline-none" />
                    </div>
                </div>

                <div className="flex justify-between items-center border-t-4 border-black pt-6 mb-6">
                    <span className="font-bold text-lg">TOTAL TO PAY:</span>
                    <span className="font-bangers text-4xl text-brand-red">${finalTotal.toFixed(2)}</span>
                </div>

                <button type="submit" className="w-full bg-black text-white font-bangers text-3xl py-4 hover:bg-gray-800 transition-colors shadow-comic hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                    PAY NOW & DEPLOY
                </button>
            </form>
        </div>
    );
}
