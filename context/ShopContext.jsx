'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({
        name: "Sumit Kumar",
        email: "sumit.dev@example.com",
        phone: "+91 98765 43210",
        address: "Chandigarh University, Punjab"
    });
    const [toasts, setToasts] = useState([]);

    // UI State
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null); // For Modal

    const [coupon, setCoupon] = useState(null);

    // Load state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('stickerShopStateV2');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                setCart(parsed.cart || []);
                setWishlist(parsed.wishlist || []);
                setOrders(parsed.orders || []);
                setCoupon(parsed.coupon || null);
                // User can be updated here if needed
            } catch (e) {
                console.error("Failed to parse state from localStorage", e);
            }
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        const stateToSave = { cart, wishlist, orders, coupon };
        localStorage.setItem('stickerShopStateV2', JSON.stringify(stateToSave));
    }, [cart, wishlist, orders, coupon]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(`Added ${product.name} to stash!`);
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, change) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + change;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const toggleWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            setWishlist(prev => prev.filter(id => id !== productId));
            showToast('Removed from Wishlist');
        } else {
            setWishlist(prev => [...prev, productId]);
            showToast('Saved to Wishlist!', 'love');
        }
    };

    const clearCart = () => setCart([]);

    const applyCoupon = (code) => {
        if (code === 'POW50' || code === 'VILLAIN20') {
            setCoupon(code);
            showToast(`${code} applied!`, 'success');
        } else {
            showToast('Invalid Code', 'error');
        }
    };

    const removeCoupon = () => {
        setCoupon(null);
        showToast('Coupon removed');
    };

    const placeOrder = (orderDetails) => {
        const newOrder = {
            orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleDateString(),
            items: [...cart],
            total: cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2),
            status: 'Processing',
            shipping: orderDetails
        };
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        return newOrder.orderId;
    };

    const showToast = (message, type = 'default') => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <ShopContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart,
            wishlist, toggleWishlist,
            orders, placeOrder,
            user, setUser,
            toasts, showToast,
            isCartOpen, setIsCartOpen,
            activeProduct, setActiveProduct,
            coupon, applyCoupon, removeCoupon
        }}>
            {children}
        </ShopContext.Provider>
    );
}

export const useShop = () => useContext(ShopContext);
