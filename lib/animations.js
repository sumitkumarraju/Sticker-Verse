export function triggerAddToCartAnimation(event, iconName) {
    const btn = event.target.closest('button') || event.target;
    const rect = btn.getBoundingClientRect();
    const cartIcon = document.getElementById('cart-icon-container')?.getBoundingClientRect();

    if (!cartIcon) return;

    // 1. Create Flyer
    const flyer = document.createElement('div');
    // Using a generic star icon if iconName isn't easily mapped, or mapping it.
    // For simplicity in this vanilla-like port, we'll just use a circle with color.
    flyer.className = 'fly-animate w-12 h-12 bg-white border-2 border-black flex items-center justify-center rounded-full shadow-md fixed z-[9999]';
    flyer.style.left = `${rect.left}px`;
    flyer.style.top = `${rect.top}px`;
    flyer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`; // Star icon

    // Calculate Vector
    const tx = cartIcon.left - rect.left + (cartIcon.width / 2) - 24; // Center it
    const ty = cartIcon.top - rect.top + (cartIcon.height / 2) - 24;

    flyer.style.setProperty('--tx', `${tx}px`);
    flyer.style.setProperty('--ty', `${ty}px`);
    document.body.appendChild(flyer);

    setTimeout(() => {
        flyer.remove();

        // 2. Cart Wiggle
        const cartContainer = document.getElementById('cart-icon-container');
        if (cartContainer) {
            cartContainer.classList.add('cart-wiggle');
            setTimeout(() => cartContainer.classList.remove('cart-wiggle'), 400);
        }

        // 3. POW Explosion
        const pow = document.getElementById('pow-effect');
        if (pow) {
            pow.style.left = `${cartIcon.left - 40}px`;
            pow.style.top = `${cartIcon.top - 20}px`;
            pow.style.display = 'block';
            pow.classList.remove('hidden'); // Ensure it's visible
            pow.classList.add('pow-animate');

            setTimeout(() => {
                pow.classList.remove('pow-animate');
                pow.classList.add('hidden');
                pow.style.display = 'none';
            }, 600);
        }

        // 4. Update Count Animation
        const countEl = document.getElementById('cart-count');
        if (countEl) {
            countEl.classList.add('qty-animate');
            setTimeout(() => countEl.classList.remove('qty-animate'), 300);
        }

    }, 750); // Match CSS animation duration
}
