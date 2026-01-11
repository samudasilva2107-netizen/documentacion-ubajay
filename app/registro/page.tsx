"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";
import {
    User,
    Search,
    Star,
    Clock,
    CheckCircle,
    Tag,
    X,
    Plus,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const MASTER_DATA: Record<string, string[]> = {
    "Cerrajero": ["Apertura de puertas", "Copia de llaves", "Instalación de cerraduras", "Urgencias 24hs"],
    "Gastronomía Particular": ["Pollos asados (Domingos)", "Tortas a pedido", "Mesa dulce", "Pan casero"],
    "Construcción / Oficios": ["Albañilería", "Plomería", "Electricidad", "Pintura", "Durlock"],
    "Remis / Flete": ["Viajes locales", "Viajes a Colón", "Fletes", "Mensajería"],
    "Mantenimiento": ["Cortado de pasto", "Limpieza de piletas", "Poda", "Terrenos"]
};

export default function RegistroPage() {
    const [formData, setFormData] = useState({
        nombre: "",
        rubroInput: "",
        whatsapp: "",
        horarios: "",
        descripcion: "",
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [customService, setCustomService] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRubroInput = (val: string) => {
        setFormData({ ...formData, rubroInput: val });
        if (!val) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const filtered = Object.keys(MASTER_DATA).filter(c => c.toLowerCase().includes(val.toLowerCase()));
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
    };

    const selectCategory = (cat: string) => {
        setSelectedCategory(cat);
        setFormData({ ...formData, rubroInput: cat });
        setShowSuggestions(false);
        setSelectedServices([]); // Reset services when category changes
    };

    const toggleService = (service: string) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const addCustomService = () => {
        if (customService.trim()) {
            setSelectedServices([...selectedServices, customService.trim()]);
            setCustomService("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!auth.currentUser) await signInAnonymously(auth);

            await addDoc(collection(db, "solicitudes"), {
                ...formData,
                categoria: selectedCategory || formData.rubroInput,
                servicios: selectedServices,
                fecha: new Date().toISOString(),
                activo: false // Requests come as inactive
            });

            setIsSuccess(true);
        } catch (err: any) {
            alert("Error técnico: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="py-16 px-4 bg-slate-50 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-emerald-950 italic mb-2 tracking-tighter">Ubajay Digital</h1>
                    <p className="text-slate-500 font-bold italic text-lg opacity-80">"Cargá tus datos y empezá a vender"</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Identity Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                            <User className="text-emerald-500 w-6 h-6" /> ¿Quién eres?
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                required
                                placeholder="Nombre Comercial o de Oficio"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all text-lg"
                            />

                            <div className="relative">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Buscá tu Rubro (Ej: Cerrajero, Comida)"
                                        value={formData.rubroInput}
                                        onChange={(e) => handleRubroInput(e.target.value)}
                                        className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all text-lg"
                                    />
                                </div>
                                {showSuggestions && (
                                    <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-2xl shadow-2xl border border-slate-100 z-50 p-2 overflow-hidden">
                                        {suggestions.map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => selectCategory(cat)}
                                                className="w-full text-left p-3 hover:bg-emerald-50 rounded-xl flex items-center gap-3 text-slate-700 font-medium"
                                            >
                                                <Tag className="w-4 h-4 text-emerald-500" /> {cat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input
                                type="tel"
                                required
                                placeholder="WhatsApp (Ej: 3454958596)"
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all text-lg"
                            />
                        </div>
                    </section>

                    {/* Details Section */}
                    {selectedCategory && (
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold mb-2 flex items-center gap-3 text-emerald-600">
                                <Star className="w-6 h-6" /> Especialidades
                            </h2>
                            <p className="text-[10px] font-black text-slate-300 uppercase mb-6 tracking-widest">{selectedCategory}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {MASTER_DATA[selectedCategory].map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => toggleService(s)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2",
                                            selectedServices.includes(s)
                                                ? "bg-emerald-600 border-emerald-600 text-white shadow-lg"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-emerald-500"
                                        )}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="¿Hacés algo más? Sumalo acá..."
                                    value={customService}
                                    onChange={(e) => setCustomService(e.target.value)}
                                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={addCustomService}
                                    className="bg-emerald-600 text-white px-6 rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-md"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </section>
                    )}

                    {/* Info Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-700">
                            <Clock className="w-6 h-6" /> Horarios e Info
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Ej: Lunes a Sábados de 8 a 20hs"
                                value={formData.horarios}
                                onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all text-lg"
                            />
                            <textarea
                                placeholder="Alguna descripción extra para tus clientes..."
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all text-lg h-32"
                            />
                        </div>
                    </section>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-emerald-950 text-white rounded-[2rem] font-black text-2xl shadow-xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "ENVIAR SOLICITUD"}
                    </button>
                </form>
            </div>

            {/* Success Modal */}
            {isSuccess && (
                <div className="fixed inset-0 bg-emerald-950/90 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
                    <div className="bg-white p-10 rounded-[3rem] text-center max-w-sm shadow-2xl animate-in zoom-in duration-300">
                        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-black mb-2 uppercase text-slate-800">¡ENVIADO!</h3>
                        <p className="text-slate-500 mb-8">Gracias por sumarte a Ubajay Digital. En breve procesaremos tus datos.</p>
                        <button
                            onClick={() => window.location.href = "/"}
                            className="w-full py-4 bg-emerald-950 text-white rounded-2xl font-bold hover:bg-black transition-all"
                        >
                            VOLVER AL INICIO
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
