import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t-8 border-brand-red py-12 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-bangers text-4xl mb-4">JOIN THE SQUAD</h2>
                <div className="flex justify-center gap-4 mb-8">
                    <Instagram className="w-6 h-6 hover:text-brand-yellow cursor-pointer transition-colors" />
                    <Twitter className="w-6 h-6 hover:text-brand-yellow cursor-pointer transition-colors" />
                    <Facebook className="w-6 h-6 hover:text-brand-yellow cursor-pointer transition-colors" />
                </div>
                <div className="text-slate-600 text-sm font-bold">
                    © 2025 STICKER VERSE. NO CAPES ALLOWED.
                </div>
            </div>
        </footer>
    );
}
