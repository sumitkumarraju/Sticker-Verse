export default function Hero() {
    return (
        <div className="bg-black text-white border-4 border-black p-8 md:p-16 mb-12 shadow-hard-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/comic-dots.png')] opacity-20 transition-transform duration-[10s] group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <span className="bg-comic-yellow text-black px-4 py-1 font-bold border-2 border-black shadow-[4px_4px_0px_white] rotate-[-2deg] inline-block mb-4">
                        NEW DROPS
                    </span>
                    <h1 className="font-bangers text-6xl md:text-8xl leading-none mb-4 drop-shadow-[4px_4px_0px_#FF4444]">
                        HEROES<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-comic-blue to-white">
                            UNLEASHED
                        </span>
                    </h1>
                    <button className="bg-white text-black font-bangers text-xl px-8 py-3 border-4 border-black hover:bg-comic-red hover:text-white transition-all shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                        START COLLECTION
                    </button>
                </div>
                <div className="w-64 h-64 md:w-80 md:h-80 relative">
                    <div className="absolute inset-0 bg-comic-blue rounded-full border-4 border-black animate-pulse"></div>
                    <img 
                        src="https://placehold.co/400x400/FF4444/ffffff/png?text=POW!&font=bangers" 
                        alt="POW!" 
                        className="relative z-10 sticker-img w-full h-full rotate-6 hover:rotate-12 transition-transform" 
                    />
                </div>
            </div>
        </div>
    );
}
