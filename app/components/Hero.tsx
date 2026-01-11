"use client";

import { SearchBar } from "./SearchBar";

interface HeroProps {
    onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
    return (
        <section className="hero-v7 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-0" />
            <div className="relative z-10 w-full max-w-4xl px-4 text-center">
                <span className="inline-block px-4 py-1 rounded-full bg-[var(--color-brand-emerald-500)] text-white text-[10px] font-bold tracking-widest uppercase mb-4 shadow-lg animate-in fade-in slide-in-from-bottom duration-700">
                    Custodios del Sitio Ramsar Palmar Yatay
                </span>
                <h1 className="text-white text-5xl md:text-8xl font-bold mb-4 font-serif italic drop-shadow-2xl">
                    Ubajay <span className="text-[var(--color-brand-emerald-500)]">Digital</span>
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-light mb-12 uppercase tracking-[0.3em] font-sans">
                    Guía Comercial y Turística
                </p>
                <SearchBar onSearch={onSearch} />
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {["Gastronomía", "Alojamiento", "Comercio", "Servicios"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onSearch(cat)}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-white/20 transition-all uppercase tracking-widest"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
