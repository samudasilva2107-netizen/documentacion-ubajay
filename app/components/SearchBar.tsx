"use client";

import { useState, useEffect } from "react";
import { Search, Mic, Loader2, Sparkles } from "lucide-react";
import { enhanceQuery } from "@/lib/gemini";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Buscar comercios, servicios..." }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleVoiceSearch = () => {
        if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
            alert("Tu navegador no soporta búsqueda por voz.");
            return;
        }

        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-AR';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setQuery(transcript);
            handleFinalSearch(transcript);
        };

        recognition.start();
    };

    const handleFinalSearch = async (searchTerm: string) => {
        if (!searchTerm.trim()) return;

        setIsEnhancing(true);
        try {
            const enhanced = await enhanceQuery(searchTerm);
            onSearch(enhanced);
        } catch (error) {
            onSearch(searchTerm);
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFinalSearch(query);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-2">
            <form onSubmit={handleSubmit} className="search-container relative">
                <Search className="w-5 h-5 text-slate-400 mr-2" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-slate-700 text-sm md:text-base font-medium"
                />
                <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-50 text-red-500 animate-pulse' : 'text-slate-400 hover:text-[var(--color-brand-emerald-500)]'}`}
                >
                    <Mic className="w-5 h-5" />
                </button>
                <button type="submit" className="search-btn ml-2 disabled:opacity-50" disabled={isEnhancing}>
                    {isEnhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : "BUSCAR"}
                </button>
            </form>
            {isEnhancing && (
                <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-600 font-bold uppercase tracking-widest animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Optimizando con IA...
                </div>
            )}
        </div>
    );
}
