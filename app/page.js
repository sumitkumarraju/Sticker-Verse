'use client';

import { useRouter } from 'next/navigation';
import { PRODUCTS } from "@/lib/data";
import { ShieldCheck, Zap, Gift, Star } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import gsap from 'gsap';
import { useEffect, useState } from 'react';
import { Moon, Shield, Bug, Sword, Frown, Hammer } from 'lucide-react';

const ICON_MAP = {
  Moon, Shield, Bug, Zap, Star, Sword, Frown, Hammer
};

function DealCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 30, s: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { h: 12, m: 30, s: 45 }; // Reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n) => n.toString().padStart(2, '0');

  return (
    <div className="flex gap-4 font-bangers text-4xl">
      <div className="bg-white text-black border-4 border-black p-2 w-16 shadow-sm leading-none flex items-center justify-center">
        {format(timeLeft.h)}
      </div>
      <span className="self-center pb-2">:</span>
      <div className="bg-white text-black border-4 border-black p-2 w-16 shadow-sm leading-none flex items-center justify-center">
        {format(timeLeft.m)}
      </div>
      <span className="self-center pb-2">:</span>
      <div className="bg-white text-black border-4 border-black p-2 w-16 shadow-sm leading-none flex items-center justify-center">
        {format(timeLeft.s)}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.fromTo(".animate-slide-right",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  // Get 4 trending items
  const trending = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden bg-yellow-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-left animate-slide-right reveal">
            <div className="inline-block bg-brand-yellow border-4 border-black px-4 py-1 font-bold mb-6 text-sm md:text-lg shadow-comic rotate-2 badge-pop">
              💥 NEW SEASON DROPS
            </div>
            <h1 className="font-bangers text-6xl md:text-8xl leading-[0.9] mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
              STICK YOUR<br />ALLEGIANCE
            </h1>
            <p className="text-xl text-slate-700 mb-8 max-w-lg font-medium">
              The multiverse's premium vinyl collection. Waterproof, scratch-proof, and approved by the Justice League.
            </p>
            <div className="flex gap-4">
              <button onClick={() => router.push('/shop')} className="px-8 py-3 bg-brand-red text-white border-4 border-black text-xl font-bold hover:bg-red-700 hover:-translate-y-1 transition-transform shadow-comic">
                SHOP NOW
              </button>
              <button className="px-8 py-3 bg-white text-black border-4 border-black text-xl font-bold hover:bg-gray-100 hover:-translate-y-1 transition-transform shadow-comic">
                GET COUPONS
              </button>
            </div>
          </div>
          <div className="relative animate-float hidden md:block reveal">
            <div className="absolute inset-0 bg-brand-yellow rounded-full opacity-20 blur-3xl transform scale-75"></div>
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix&backgroundColor=transparent" alt="Hero" className="w-full max-w-md mx-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-black text-white py-12 border-y-4 border-black reveal">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-brand-yellow mb-4" />
            <h3 className="font-bangers text-2xl">VILLAIN PROOF</h3>
            <p className="text-slate-400">Water & Scratch Resistant Vinyl</p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-12 h-12 text-brand-yellow mb-4" />
            <h3 className="font-bangers text-2xl">SUPER FAST SHIPPING</h3>
            <p className="text-slate-400">Faster than a speeding bullet</p>
          </div>
          <div className="flex flex-col items-center">
            <Gift className="w-12 h-12 text-brand-yellow mb-4" />
            <h3 className="font-bangers text-2xl">EXCLUSIVE DROPS</h3>
            <p className="text-slate-400">Limited Edition Artist Series</p>
          </div>
        </div>
      </section>

      {/* SECRET ORIGIN */}
      <section className="py-24 px-4 bg-white border-b-4 border-black reveal">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative border-4 border-black p-2 bg-black rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop" alt="Comics" className="w-full grayscale hover:grayscale-0 transition-all duration-500 border-2 border-white" />
              <div className="absolute -top-4 -left-4 bg-brand-red text-white font-bangers text-2xl px-4 py-2 border-4 border-black -rotate-6">SECRET ORIGIN</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-bangers text-5xl mb-6">CREATED IN A LAB...</h2>
            <p className="text-lg font-bold mb-4">Since 2024, Sticker Verse has been the headquarters for pop-culture enthusiasts.</p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              It started with a radioactive spider... wait, no. It started with a printer and a dream. We believe that your laptop shouldn't be boring. Your water bottle needs personality. We source the highest quality vinyl from across the galaxy to bring you art that lasts longer than most movie franchises.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 border-2 border-black">
                <h4 className="font-bangers text-2xl">10k+</h4>
                <p className="text-xs font-bold">HEROES SERVED</p>
              </div>
              <div className="bg-yellow-50 p-4 border-2 border-black">
                <h4 className="font-bangers text-2xl">500+</h4>
                <p className="text-xs font-bold">DESIGNS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-20 px-4 reveal">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-bangers text-5xl md:text-6xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-brand-blue">TRENDING NOW</h2>
            <button onClick={() => router.push('/shop')} className="hidden md:block font-bold border-b-2 border-black hover:text-brand-red transition-colors">VIEW ALL LOOT</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {trending.map((p, i) => {
              const IconComp = ICON_MAP[p.img] || Star;
              return (
                <div key={p.id} className="group bg-white border-4 border-black p-4 shadow-comic hover:shadow-comic-hover hover:-translate-y-2 transition-all cursor-pointer reveal" onClick={() => router.push('/shop')}>
                  <div className="bg-gray-100 h-48 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden">
                    <IconComp className="w-20 h-20 text-slate-700 transform group-hover:scale-110 transition-transform" />
                    <div className="absolute top-2 right-2 bg-brand-yellow px-2 border-2 border-black font-bold text-xs badge-pop">HOT</div>
                  </div>
                  <h3 className="font-bangers text-2xl mt-1 leading-none">{p.name}</h3>
                  <span className="font-bold text-xl text-brand-red">${p.price}</span>
                </div>
              )
            })}
          </div>

          <button onClick={() => router.push('/shop')} className="md:hidden w-full mt-8 font-bold border-2 border-black py-3 hover:bg-yellow-50">VIEW ALL LOOT</button>
        </div>
      </section>

      {/* DEAL OF DAY */}
      <section className="py-16 px-4 bg-brand-yellow border-y-4 border-black reveal">
        <div className="container mx-auto bg-brand-red border-4 border-black p-8 md:p-12 text-white shadow-comic-card flex flex-col md:flex-row items-center justify-between gap-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <div>
            <h2 className="font-bangers text-5xl mb-2">⚡ DEAL OF THE DAY</h2>
            <p className="text-xl font-bold">Get 50% OFF the "Dark Knight" Collection.</p>
            <div className="mt-4 text-3xl font-bangers bg-black text-brand-yellow inline-block px-4 py-2 -rotate-2 border-2 border-white cursor-pointer hover:scale-110 transition-transform" onClick={() => { navigator.clipboard.writeText('POW50'); }}>
              CODE: POW50
            </div>
            <p className="text-xs font-bold mt-2 opacity-80">(Click code to copy)</p>
          </div>
          <div className="text-center">
            <p className="font-bold mb-2">OFFER ENDS IN:</p>
            <DealCountdown />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-4 bg-white border-t-4 border-black reveal">
        <div className="container mx-auto text-center mb-12">
          <h2 className="font-bangers text-5xl">COMMUNITY VOICES</h2>
          <p className="font-bold text-gray-500">Don't take our word for it.</p>
        </div>
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          {[
            { name: "Bruce W.", text: "I put the Bat-symbol on my Tumbler. It survived a crash and an explosion. 10/10 quality.", bg: "bg-brand-blue" },
            { name: "Tony S.", text: "Jarvis ordered these for the lab. They stick perfectly to the Iron Legion armor suits.", bg: "bg-brand-red" },
            { name: "Bruce B.", text: "HULK SMASH KEYBOARD! BUT STICKER STAY ON! PUNY STICKER STRONG!", bg: "bg-green-600" }
          ].map((rev, i) => (
            <div key={i} className="bg-white p-6 border-4 border-black shadow-comic card-enter" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-center -mt-10 mb-4">
                <div className={`w-16 h-16 ${rev.bg} rounded-full border-4 border-black flex items-center justify-center`}>
                  <span className="font-bangers text-white text-xl">{rev.name.split(' ')[0][0] + rev.name.split(' ')[1][0]}</span>
                </div>
              </div>
              <p className="italic mb-4">"{rev.text}"</p>
              <div className="flex justify-center text-brand-yellow mb-2 gap-1">
                {Array(5).fill(0).map((_, j) => <Star key={j} className="fill-current w-4 h-4" />)}
              </div>
              <p className="font-bold text-sm uppercase">- {rev.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
