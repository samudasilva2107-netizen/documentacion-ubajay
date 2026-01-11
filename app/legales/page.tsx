"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
    { id: "terminos", label: "Términos y Condiciones" },
    { id: "privacidad", label: "Política de Privacidad" },
    { id: "devoluciones", label: "Política de Devoluciones" },
];

export default function LegalesPage() {
    const [activeTab, setActiveTab] = useState("terminos");

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900 mb-4">Marco Legal & Gobernanza</h1>
                    <p className="text-slate-500 text-lg mb-8">Documentos que regulan el uso responsable de Ubajay Digital y protegen tus derechos.</p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100">📄 Versión 1.2</span>
                        <span className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100">✅ Conforme Ley 25.326</span>
                        <span className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100">⚖️ Conforme Ley 24.240</span>
                        <span className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100">📅 Enero 2026</span>
                    </div>
                </div>

                {/* Tabs Container */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex border-b border-slate-100 flex-wrap">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 min-w-[150px] p-5 text-sm font-bold transition-all border-b-2",
                                    activeTab === tab.id
                                        ? "text-emerald-600 border-emerald-600 bg-emerald-50/30"
                                        : "text-slate-400 border-transparent hover:text-emerald-500"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 md:p-12 prose prose-slate max-w-none">
                        {activeTab === "terminos" && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-3xl font-bold text-emerald-900 mb-6 font-serif">Términos y Condiciones de Uso</h2>

                                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 border-l-4 border-emerald-500 pl-4">1. Objeto y Descripción del Servicio</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    <strong>Ubajay Digital</strong> es un motor de búsqueda y directorio comercial que centraliza la
                                    oferta de productos, servicios y turismo de la localidad de Ubajay, Entre Ríos, Argentina.
                                </p>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    La plataforma permite a usuarios buscar y descubrir comercios locales, y a comercios registrar su oferta.
                                </p>

                                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 border-l-4 border-emerald-500 pl-4">2. Limitación de Responsabilidad</h3>
                                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl my-6">
                                    <strong className="text-emerald-900 block mb-2">⚠️ Aviso Importante:</strong>
                                    <p className="text-emerald-800 text-sm">
                                        Ubajay Digital NO se responsabiliza por la exactitud de los datos cargados por comercios ni por transacciones realizadas fuera de la plataforma.
                                    </p>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 border-l-4 border-emerald-500 pl-4">3. Cumplimiento Legal</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    El uso de Ubajay Digital está sujeto a las leyes argentinas, incluyendo la Ley 25.326 de Protección de Datos Personales y la Ley 24.240 de Defensa del Consumidor.
                                </p>
                            </div>
                        )}

                        {activeTab === "privacidad" && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-3xl font-bold text-emerald-900 mb-6 font-serif">Política de Privacidad</h2>
                                <p className="text-emerald-600 font-bold mb-8">✅ Conforme a la Ley 25.326 de Protección de Datos Personales (Argentina)</p>

                                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 border-l-4 border-emerald-500 pl-4">1. Responsable de los Datos</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Ubajay Digital, bajo la dirección de Samuel Da Silva, es responsable del tratamiento de datos personales recolectados a través de esta plataforma.
                                </p>

                                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 border-l-4 border-emerald-500 pl-4">2. Infraestructura y Seguridad</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Los datos se alojan en Google Firebase (Google Cloud Platform) con medidas de seguridad de nivel industrial, incluyendo encriptación TLS y reglas de acceso granulares.
                                </p>
                            </div>
                        )}

                        {activeTab === "devoluciones" && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-3xl font-bold text-emerald-900 mb-6 font-serif">Política de Devoluciones</h2>
                                <p className="text-emerald-600 font-bold mb-8">✅ Conforme a la Ley 24.240 de Defensa del Consumidor (Argentina)</p>

                                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 border-l-4 border-emerald-500 pl-4">1. Botón de Arrepentimiento</h3>
                                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl my-6">
                                    <strong className="text-emerald-900 block mb-2">⚠️ Derecho Obligatorio</strong>
                                    <p className="text-emerald-800 text-sm">
                                        Los comercios que realizan ventas online DEBEN incluir un botón de Arrepentimiento que permita revocar la compra dentro de los 10 días corridos.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer info inside legales */}
                <footer className="mt-12 text-center text-slate-400 text-xs uppercase tracking-widest font-bold border-t border-slate-200 pt-8">
                    <p className="mb-2">Ubajay Digital © 2026</p>
                    <p>Samuel Da Silva — CUIT 20-42965567-7</p>
                </footer>
            </div>
        </main>
    );
}
