"use client";

import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    addDoc,
    deleteDoc,
    query,
    orderBy
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";
import {
    LayoutDashboard,
    Store,
    ClipboardList,
    Sparkles,
    LogOut,
    Plus,
    Search,
    Edit3,
    X,
    Trash2,
    CheckCircle,
    AlertCircle,
    Users,
    Clock,
    MapPin,
    Loader2,
    Menu,
    Check,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_TOKEN = "Lioliyow2107_";
const CANONICAL_CATEGORIES = ["GASTRONOMÍA", "ALOJAMIENTO", "COMERCIO", "SERVICIOS", "SALUD", "TURISMO", "EDUCACIÓN", "VETERINARIA", "FORRAJERÍA", "LIMPIEZA", "OTROS"];

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [businesses, setBusinesses] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBusiness, setEditingBusiness] = useState<any>(null);
    const [isApprovingRequest, setIsApprovingRequest] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [auditResults, setAuditResults] = useState<any[]>([]);

    useEffect(() => {
        const savedToken = localStorage.getItem("ubajay_admin_token");
        if (savedToken === ADMIN_TOKEN) {
            handleAuth(savedToken);
        }
    }, []);

    const handleAuth = async (token: string) => {
        if (token === ADMIN_TOKEN) {
            try {
                await signInAnonymously(auth);
                setIsAuthenticated(true);
                localStorage.setItem("ubajay_admin_token", token);
                initData();
            } catch (err) {
                console.error("Auth error:", err);
            }
        } else {
            setAuthError(true);
        }
    };

    const initData = () => {
        onSnapshot(collection(db, "comercios"), (snap) => {
            setBusinesses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        onSnapshot(collection(db, "solicitudes"), (snap) => {
            setRequests(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        setLoading(false);
    };

    const runDataAudit = () => {
        const results = businesses.filter(b => !CANONICAL_CATEGORIES.includes(String(b.categoria || '').toUpperCase()));
        setAuditResults(results);
    };

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2 text-center italic">Ubajay Digital</h1>
                    <p className="text-slate-500 text-xs text-center mb-8 uppercase tracking-widest font-black">Panel de Administración</p>
                    <div className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-200 focus:border-emerald-600 text-center text-xl tracking-widest"
                        />
                        <button
                            onClick={() => handleAuth(password)}
                            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-500 transition-all"
                        >
                            Entrar al Sistema
                        </button>
                        {authError && <p className="text-red-500 text-xs text-center font-bold">Clave incorrecta.</p>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
            {/* Mobile Header */}
            <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40">
                <h2 className="text-lg font-serif font-bold text-emerald-600 italic">Ubajay Admin</h2>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-slate-50 rounded-xl text-slate-600">
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-slate-100 hidden md:block">
                    <h2 className="text-xl font-serif font-bold text-emerald-600 italic">Ubajay Admin</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1">Gestión de Directorio</p>
                </div>
                <nav className="flex-1 py-4">
                    {[
                        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                        { id: "comercios", label: "Comercios", icon: Store },
                        { id: "solicitudes", label: "Solicitudes", icon: ClipboardList, badge: requests.length },
                        { id: "limpieza", label: "Corrector", icon: Sparkles },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                            className={cn(
                                "w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all border-r-4",
                                activeSection === item.id
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-600"
                                    : "text-slate-500 border-transparent hover:bg-slate-50"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                            {item.badge && item.badge > 0 && (
                                <span className="ml-auto bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full">{item.badge}</span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={() => { localStorage.removeItem("ubajay_admin_token"); window.location.reload(); }}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-600 transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 overflow-y-auto">
                {activeSection === "dashboard" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-serif font-bold text-slate-800">Panel de Control</h1>
                                <p className="text-slate-500 text-sm italic">Estado actual del ecosistema Ubajay Digital</p>
                            </div>
                            <button
                                onClick={() => { setEditingBusiness(null); setIsApprovingRequest(false); setIsModalOpen(true); }}
                                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-500 shadow-lg shadow-emerald-100 transition-all"
                            >
                                <Plus className="w-4 h-4" /> NUEVO COMERCIO
                            </button>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Comercios" value={businesses.length} icon={Store} color="emerald" />
                            <StatCard title="Activos" value={businesses.filter(b => b.activo !== false).length} icon={CheckCircle} color="blue" />
                            <StatCard title="Alertas" value={businesses.filter(b => !CANONICAL_CATEGORIES.includes(String(b.categoria).toUpperCase())).length} icon={AlertCircle} color="amber" />
                            <StatCard title="Solicitudes" value={requests.length} icon={Users} color="indigo" />
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h4 className="text-lg font-bold text-slate-800 mb-6">Actividad Reciente</h4>
                            <div className="space-y-4">
                                {businesses.slice(-5).reverse().map(b => (
                                    <div key={b.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                            {b.imagen && b.imagen.length < 5 ? b.imagen : "🏪"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{b.nombre}</p>
                                            <p className="text-xs text-slate-400 capitalize">{b.categoria?.toLowerCase()}</p>
                                        </div>
                                        <span className="ml-auto text-[10px] font-bold text-slate-300 uppercase">Recién unido</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "comercios" && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h1 className="text-3xl font-serif font-bold text-slate-800">Gestionar Comercios</h1>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar comercio..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all text-sm w-full md:w-64"
                                />
                            </div>
                        </header>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Comercio</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Categoría</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Estado</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {businesses.filter(b => b.nombre?.toLowerCase().includes(searchTerm.toLowerCase())).map(b => (
                                            <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-lg overflow-hidden">
                                                            {b.imagen && b.imagen.startsWith('http') ? <img src={b.imagen} className="w-full h-full object-cover" /> : (b.imagen || '🏪')}
                                                        </div>
                                                        <span className="font-bold text-slate-800 text-sm">{b.nombre}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase",
                                                        CANONICAL_CATEGORIES.includes(String(b.categoria).toUpperCase()) ? "text-emerald-600" : "text-amber-600"
                                                    )}>
                                                        {b.categoria || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "text-[10px] font-bold uppercase",
                                                        b.activo === false ? "text-slate-300" : "text-emerald-500"
                                                    )}>
                                                        {b.activo === false ? 'Pausado' : 'Activo'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => { setEditingBusiness(b); setIsApprovingRequest(false); setIsModalOpen(true); }}
                                                        className="p-2 text-slate-400 hover:text-emerald-600 transition-all"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "solicitudes" && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h1 className="text-3xl font-serif font-bold text-slate-800">Solicitudes de Alta</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {requests.length === 0 ? (
                                <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 text-center flex flex-col items-center">
                                    <CheckCircle className="w-12 h-12 text-slate-100 mb-4" />
                                    <p className="text-slate-300 font-bold uppercase tracking-widest">No hay solicitudes hoy</p>
                                </div>
                            ) : requests.map(s => (
                                <div key={s.id} className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex gap-6 hover:shadow-lg transition-all">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Store className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold text-slate-800 text-xl">{s.nombre}</h3>
                                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">{s.categoria || s.rubroInput}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm mt-2 line-clamp-2">{s.descripcion || "Sin descripción"}</p>
                                        <div className="flex items-center gap-4 mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.direccion || "Desconocida"}</span>
                                            <span className="flex items-center gap-1"><Users className="w-3 h-3 text-green-500" /> WhatsApp: {s.whatsapp}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => { setEditingBusiness(s); setIsApprovingRequest(true); setIsModalOpen(true); }}
                                            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-50"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => { if (confirm("¿Eliminar solicitud?")) deleteDoc(doc(db, "solicitudes", s.id)); }}
                                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeSection === "limpieza" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-slate-800">Corrector de Datos</h1>
                            <p className="text-slate-500 text-sm">Identifica y corrige automáticamente comercios con categorías no estándar.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <div className="bg-emerald-600 text-white p-8 rounded-[2.5rem] shadow-xl shadow-emerald-100">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> CATEGORÍAS CANÓNICAS
                                    </h3>
                                    <ul className="grid grid-cols-1 gap-2 text-xs font-bold opacity-full">
                                        {CANONICAL_CATEGORIES.map(c => <li key={c} className="bg-white/10 px-3 py-2 rounded-xl flex items-center justify-between"><span>{c}</span> <Check className="w-3 h-3" /></li>)}
                                    </ul>
                                </div>
                                <button
                                    onClick={runDataAudit}
                                    className="w-full py-5 bg-white border-2 border-slate-200 text-emerald-950 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:border-emerald-500 transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" /> ESCANEAR BASE DE DATOS
                                </button>
                            </div>

                            <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                                <h4 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">Hallazgos Sugeridos</h4>
                                {auditResults.length === 0 ? (
                                    <div className="text-center py-20 text-slate-300 uppercase font-black text-xs tracking-widest flex flex-col items-center">
                                        <Sparkles className="w-10 h-10 mb-4 opacity-20" /> Ejecuat el escaneo para buscar inconsistencias
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {auditResults.map(b => (
                                            <div key={b.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-between">
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center">🏪</div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">{b.nombre}</p>
                                                        <p className="text-[10px] text-amber-600 font-bold uppercase underline decoration-2 underline-offset-4">Cat: {b.categoria || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => { setEditingBusiness(b); setIsApprovingRequest(false); setIsModalOpen(true); }}
                                                        className="bg-white text-slate-600 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
                                                    >
                                                        Corregir
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Universal Modal */}
                {isModalOpen && (
                    <BusinessModal
                        business={editingBusiness}
                        isRequest={isApprovingRequest}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </main>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    const colors: any = {
        emerald: "text-emerald-600 bg-emerald-50",
        blue: "text-blue-600 bg-blue-50",
        amber: "text-amber-600 bg-amber-50",
        indigo: "text-indigo-600 bg-indigo-50"
    };
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", colors[color])}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px]">{title}</p>
            <h3 className="text-4xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
    );
}

function BusinessModal({ business, isRequest, onClose }: any) {
    const [formData, setFormData] = useState<any>(business || {
        nombre: "",
        categoria: "",
        descripcion: "",
        tags: "",
        coords: "",
        whatsapp: "",
        direccion: "",
        horarios: "",
        imagen: "",
        activo: true,
        esta_abierto: false
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (business) {
            // Logic for suggesting category if it's a request
            let cat = business.categoria || business.rubroInput || "";
            if (isRequest) {
                const t = (cat + " " + (business.nombre || "")).toLowerCase();
                if (t.includes("hotel") || t.includes("cabaña")) cat = "ALOJAMIENTO";
                else if (t.includes("comida") || t.includes("restaurant")) cat = "GASTRONOMÍA";
                else if (t.includes("remis") || t.includes("viaje")) cat = "SERVICIOS";
            }
            setFormData({ ...business, categoria: cat.toUpperCase() });
        }
    }, [business, isRequest]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                ...formData,
                updatedAt: new Date().toISOString(),
                categoria: formData.categoria?.toUpperCase()
            };

            if (isRequest) {
                // Approving a request: add to commerce, delete from solicitudes
                await addDoc(collection(db, "comercios"), { ...payload, createdAt: new Date().toISOString() });
                await deleteDoc(doc(db, "solicitudes", business.id));
            } else if (business?.id) {
                await updateDoc(doc(db, "comercios", business.id), payload);
            } else {
                await addDoc(collection(db, "comercios"), { ...payload, createdAt: new Date().toISOString() });
            }
            onClose();
        } catch (err) {
            alert("Error saving: " + err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!business?.id) return;
        if (confirm("¿Estás seguro de eliminar este comercio?")) {
            await deleteDoc(doc(db, "comercios", business.id));
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
                <header className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-800 font-serif">{isRequest ? "Aprobar Solicitud" : (business ? "Editar Comercio" : "Nuevo Comercio")}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-red-500 bg-slate-50 p-2 rounded-full"><X className="w-6 h-6" /></button>
                </header>
                <div className="p-8 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Nombre Comercial</label>
                                <input
                                    type="text" required
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Categoría Canoníca</label>
                                <select
                                    required
                                    value={formData.categoria?.toUpperCase()}
                                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold appearance-none cursor-pointer"
                                >
                                    <option value="">Seleccionar...</option>
                                    {CANONICAL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Descripción</label>
                            <textarea
                                rows={3}
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 text-sm leading-relaxed"
                                placeholder="Describe el negocio..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">WhatsApp</label>
                                <input
                                    type="text"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 text-lg font-bold"
                                    placeholder="345..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Dirección</label>
                                <input
                                    type="text"
                                    value={formData.direccion}
                                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500"
                                    placeholder="Calle y altura..."
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-50 flex gap-4">
                            <button
                                type="submit" disabled={saving}
                                className="flex-1 bg-emerald-950 text-white py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-200 hover:bg-black disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRequest ? "APROBAR Y PUBLICAR" : "GUARDAR CAMBIOS")}
                            </button>
                            {business && !isRequest && (
                                <button
                                    type="button" onClick={handleDelete}
                                    className="px-8 bg-red-50 text-red-600 rounded-[2rem] hover:bg-red-600 hover:text-white transition-all shadow-md"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
