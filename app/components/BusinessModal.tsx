"use client";

import { X, MessageCircle, MapPin, Clock } from "lucide-react";
import { checkIfOpen } from "@/lib/utils";

interface BusinessModalProps {
    business: {
        id: string;
        nombre: string;
        categoria: string;
        descripcion: string;
        imagen?: string;
        videoUrl?: string;
        whatsapp?: string;
        direccion?: string;
        horarios?: string;
        coords?: string;
        esta_abierto?: boolean | string;
    };
    onClose: () => void;
}

export function BusinessModal({ business, onClose }: BusinessModalProps) {
    if (!business) return null;

    const isOpen = checkIfOpen(business.horarios || '', business.esta_abierto);
    const mapsUrl = business.coords
        ? `https://www.google.com/maps/search/?api=1&query=${business.coords}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.nombre} Ubajay Entre Rios`)}`;

    return (
        <div className="fixed inset-0 z-[2000] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[2100] bg-black/50 text-white p-2.5 rounded-full hover:bg-black transition shadow-lg active:scale-95"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="overflow-y-auto scrollbar-hide">
                    {/* Media Header (Video or Image) */}
                    <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
                        {business.videoUrl ? (
                            <video
                                src={business.videoUrl}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                playsInline
                            />
                        ) : business.imagen && business.imagen.startsWith("http") ? (
                            <img src={business.imagen} alt={business.nombre} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-8xl">{business.imagen || "🏪"}</div>
                        )}
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                                {business.categoria}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                <span className={`text-[10px] font-black uppercase ${isOpen ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                                    {isOpen ? 'Abierto Ahora' : 'Cerrado'}
                                </span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 font-serif leading-tight">
                            {business.nombre}
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-light italic">
                            {business.descripcion}
                        </p>

                        <div className="space-y-4 mb-10 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
                            {business.direccion && (
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                    <span>{business.direccion}</span>
                                </div>
                            )}
                            {business.horarios && (
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <Clock className="w-4 h-4 text-emerald-600" />
                                    <span>{business.horarios}</span>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {business.whatsapp && (
                                <a
                                    href={`https://wa.me/${business.whatsapp}`}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-2xl font-black text-[10px] shadow-xl active:scale-95 transition-all hover:bg-green-700 uppercase tracking-widest"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp
                                </a>
                            )}
                            <a
                                href={mapsUrl}
                                target="_blank"
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] shadow-xl active:scale-95 transition-all hover:bg-blue-700 uppercase tracking-widest"
                            >
                                <MapPin className="w-5 h-5" />
                                Cómo llegar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
