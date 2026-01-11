"use client";

import { MessageCircle, MapPin, Clock } from "lucide-react";
import { checkIfOpen } from "@/lib/utils";

interface BusinessCardProps {
    business: {
        id: string;
        nombre: string;
        categoria: string;
        descripcion: string;
        imagen?: string;
        whatsapp?: string;
        direccion?: string;
        horarios?: string;
        esta_abierto?: boolean | string;
    };
}

export function BusinessCard({ business }: BusinessCardProps) {
    const isOpen = checkIfOpen(business.horarios || '', business.esta_abierto);

    return (
        <div className="card-pro">
            <div className="media-box aspect-square">
                {business.imagen && business.imagen.startsWith("http") ? (
                    <img src={business.imagen} alt={business.nombre} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-slate-100 dark:bg-slate-800">
                        {business.imagen || "🏪"}
                    </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded-full shadow-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    <span className="text-[8px] font-black uppercase tracking-tighter text-slate-700 dark:text-slate-300">
                        {isOpen ? 'Abierto' : 'Cerrado'}
                    </span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-[var(--color-brand-emerald-450)] uppercase tracking-widest">
                        {business.categoria}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">{business.nombre}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{business.descripcion}</p>

                <div className="space-y-2 mb-4">
                    {business.direccion && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{business.direccion}</span>
                        </div>
                    )}
                    {business.horarios && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span className="truncate">{business.horarios}</span>
                        </div>
                    )}
                </div>

                {business.whatsapp && (
                    <a
                        href={`https://wa.me/54${business.whatsapp.toString().replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[var(--color-brand-emerald-50)] dark:bg-emerald-900/20 text-[var(--color-brand-emerald-600)] dark:text-emerald-400 py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[var(--color-brand-emerald-100)] dark:hover:bg-emerald-900/30 transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        CONTACTAR
                    </a>
                )}
            </div>
        </div>
    );
}
