import { Bangers, Public_Sans } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ProductModal from "@/components/ProductModal";
import ToastContainer from "@/components/ToastContainer";
import PowEffect from "@/components/PowEffect";
import SpinWheel from "@/components/SpinWheel";
import { Suspense } from 'react';

const bangers = Bangers({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-bangers",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sticker Verse | Premium Superhero Merch",
  description: "The multiverse's premium vinyl collection.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bangers.variable} ${publicSans.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <div className="fixed inset-0 comic-bg pointer-events-none z-0"></div>
        <ShopProvider>
          {/* Suspense wrapper removed as per instruction */}
          <Navbar />
          {/* CartDrawer changed to CartSidebar as per instruction */}
          <CartSidebar />
          <ProductModal />
          <main className="flex-grow relative z-10 w-full">
            {children}
          </main>
          <Footer />
          <ToastContainer />
          <PowEffect />
          <SpinWheel />
        </ShopProvider>
      </body>
    </html>
  );
}
