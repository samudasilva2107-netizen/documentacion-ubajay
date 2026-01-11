"use client";

import { MessageCircle, MapPin, Clock } from "lucide-react";

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
    };
}

export function BusinessCard({ business }: BusinessCardProps) {
    return (
        <div className="card-pro">
            <div className="media-box">
                {business.imagen && business.imagen.startsWith("http") ? (
                    <img src={business.imagen} alt={business.nombre} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-slate-100">
                        {business.imagen || "🏪"}
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-[var(--emerald-450)] uppercase tracking-widest">
                        {business.categoria}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{business.nombre}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{business.descripcion}</p>

                <div className="space-y-2 mb-4">
                    {business.direccion && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{business.direccion}</span>
                        </div>
                    )}
                    {business.horarios && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span className="truncate">{business.horarios}</span>
                        </div>
                    )}
                </div>

                {business.whatsapp && (
                    <a
                        href={`https://wa.me/${business.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[var(--emerald-50)] text-[var(--emerald-600)] py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[var(--emerald-100)] transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        CONTACTAR
                    </a>
                )}
            </div>
        </div>
    );
}
