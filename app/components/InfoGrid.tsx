import { Droplets, Palmtree, Hammer, Tent, TrainFront, ScrollText, ExternalLink } from "lucide-react";

export function InfoGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 -mt-12 relative z-20">
            <article className="info-card p-8 border-b-blue-500 bg-white">
                <div className="text-blue-500 mb-6 flex items-center justify-between">
                    <Droplets className="w-10 h-10" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Designación Internacional</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-serif text-slate-800 leading-tight">Sitio Ramsar Palmar Yatay</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">Desde 2011, Ubajay protege 21.450 hectáreas de humedales únicos de importancia global. Somos custodios de biodiversidad única.</p>
                <span className="bg-blue-50 text-blue-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase inline-block">21.450 HECTÁREAS</span>
            </article>

            <article className="info-card p-8 border-b-emerald-600 bg-white">
                <div className="text-emerald-800 mb-6 flex items-center justify-between">
                    <Palmtree className="w-10 h-10" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Área Protegida</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-serif text-slate-800 leading-tight">PN El Palmar</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">Puerta de entrada a los atardeceres más icónicos de Entre Ríos. Palmeras Butia Yatay centenarias a solo 5km del centro.</p>
                <a href="https://www.argentina.gob.ar/interior/ambiente/parquesnacionales/elpalmar" target="_blank" className="text-xs font-bold text-emerald-700 flex items-center gap-1 hover:underline">
                    SITIO OFICIAL <ExternalLink className="w-3 h-3" />
                </a>
            </article>

            <article className="info-card p-8 border-b-amber-600 bg-white">
                <div className="text-amber-600 mb-6 flex items-center justify-between">
                    <Hammer className="w-10 h-10" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Motor Económico</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-serif text-slate-800 leading-tight">Orgullo Maderero</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">Base de nuestro desarrollo local desde 1972. Nuestra industria forestal genera empleo de calidad para toda la región del Palmar.</p>
                <span className="bg-amber-50 text-amber-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase inline-block">UBALAM & OTROS</span>
            </article>

            <article className="info-card p-8 border-b-green-700 bg-white">
                <Tent className="text-green-700 w-10 h-10 mb-6" />
                <h3 className="text-2xl font-bold mb-4 font-serif text-slate-800 leading-tight">Aurora del Palmar</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">Reserva natural privada con experiencias de selva en galería y contacto directo con la biodiversidad autóctona.</p>
            </article>

            <article className="info-card p-8 border-b-indigo-700 bg-white">
                <TrainFront className="text-indigo-700 w-10 h-10 mb-6" />
                <h3 className="text-xl font-bold mb-2 font-serif text-slate-800 leading-tight">Museo La Estación</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">Memoria ferroviaria intacta desde 1914. Punto de encuentro con el pasado pionero de Ubajay.</p>
            </article>

            <article className="info-card p-8 border-b-slate-900 bg-white">
                <ScrollText className="text-slate-900 w-10 h-10 mb-6" />
                <h3 className="text-xl font-bold mb-2 font-serif text-slate-800 leading-tight">Legado Pionero</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">Homenaje vivo a las familias fundadoras e inmigración que forjaron el "Antiguo Pueblo Palmar".</p>
            </article>
        </section>
    );
}
