import { Instagram, Mail, Undo2, UserMinus, ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-white pt-24 pb-12 mt-auto px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-left">

                {/* Columna 1: Identidad */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-emerald-500)] italic leading-none">
                        Ubajay Digital
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed italic font-light">
                        Infraestructura tecnológica que une nuestra historia con el potencial comercial de la Tierra de Palmares.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/ubajaydigital" target="_blank" rel="noopener"
                            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[var(--color-brand-emerald-600)] transition duration-300">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Columna 2: Titular y Contacto */}
                <div className="space-y-6">
                    <h3 className="font-bold text-[var(--color-brand-emerald-500)] uppercase text-xs tracking-widest font-sans">
                        Mención Legal
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                            <p className="text-xs font-bold text-white mb-1">Samuel Da Silva</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">CUIT: 20-42965567-7</p>
                            <p className="text-[10px] text-slate-500 mt-2 italic font-medium">Ubajay, Entre Ríos, Argentina</p>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>
                                <a href="mailto:info@ubajaydigital.com" className="hover:text-[var(--color-brand-emerald-500)] transition-colors flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[var(--color-brand-emerald-600)]" />
                                    info@ubajaydigital.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Columna 3: Gestión del Consumidor */}
                <div className="space-y-6">
                    <h3 className="font-bold text-[var(--color-brand-emerald-500)] uppercase text-xs tracking-widest font-sans">
                        Protección al Usuario
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        <a href="/legales#devoluciones" className="bg-white text-slate-900 rounded-xl p-3 font-bold text-[10px] uppercase flex items-center justify-center gap-2 shadow-xl hover:bg-slate-100 transition border-b-4 border-[var(--color-brand-emerald-500)]">
                            <Undo2 className="w-4 h-4 text-[var(--color-brand-emerald-600)]" /> ARREPENTIMIENTO
                        </a>
                        <a href="/legales#devoluciones" className="bg-white text-slate-900 rounded-xl p-3 font-bold text-[10px] uppercase flex items-center justify-center gap-2 shadow-xl hover:bg-slate-100 transition border-b-4 border-slate-300">
                            <UserMinus className="w-4 h-4 text-slate-400" /> BAJA DE SERVICIO
                        </a>
                        <p className="text-[9px] text-slate-500 uppercase font-bold text-center mt-2 px-2">
                            Cumplimiento Disposición 954/2025
                        </p>
                    </div>
                </div>

                {/* Columna 4: Transparencia */}
                <div className="space-y-6">
                    <h3 className="font-bold text-[var(--color-brand-emerald-500)] uppercase text-xs tracking-widest font-sans">
                        Transparencia
                    </h3>
                    <div className="flex items-start gap-4 mb-6">
                        <a href="https://firebasestorage.googleapis.com/v0/b/ubajaydigital.firebasestorage.app/o/image.webp?alt=media&token=eba152b5-78a6-40f7-8b8e-d4cac372c7f0" target="_blank">
                            <img src="https://firebasestorage.googleapis.com/v0/b/ubajaydigital.firebasestorage.app/o/image.webp?alt=media&token=eba152b5-78a6-40f7-8b8e-d4cac372c7f0"
                                alt="Data Fiscal ARCA" className="w-[80px] rounded-lg shadow-lg hover:scale-105 transition" />
                        </a>
                        <div className="space-y-2">
                            <a href="/legales" className="block text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider underline">Términos</a>
                            <a href="/legales" className="block text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider underline">Privacidad</a>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                        <a href="/registro" className="block w-full py-3 bg-[var(--color-brand-emerald-600)] text-white rounded-xl font-black text-[10px] text-center uppercase shadow-xl hover:bg-[var(--color-brand-emerald-500)] transition">
                            Inscribir mi Local
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800/50 text-center">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic">
                    &copy; 2026 Ubajay Digital - Corazón del Palmar | <a href="/admin" className="hover:text-[var(--color-brand-emerald-500)] transition-colors">Admin</a>
                </p>
            </div>
        </footer>
    );
}
