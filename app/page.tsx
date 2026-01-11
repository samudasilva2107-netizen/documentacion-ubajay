"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Hero } from "./components/Hero";
import { BusinessCard } from "./components/BusinessCard";
import { InfoGrid } from "./components/InfoGrid";
import { Footer } from "./components/Footer";
import { BusinessModal } from "./components/BusinessModal";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "./components/ThemeToggle";
import { checkIfOpen } from "@/lib/utils";

export default function Home() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, "comercios"), where("activo", "==", true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBusinesses(docs);
      setFilteredBusinesses(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredBusinesses(businesses);
      return;
    }

    // Split by commas (AI keywords) or just use the term
    let currentFilteredBusinesses = businesses;

    if (term.trim()) {
      const searchTerms = term.toLowerCase()
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      currentFilteredBusinesses = businesses.filter((b) => {
        const content = `${b.nombre} ${b.categoria} ${b.descripcion}`.toLowerCase();
        return searchTerms.some(t => content.includes(t));
      });
    }

    if (onlyOpen) {
      currentFilteredBusinesses = currentFilteredBusinesses.filter((b) => checkIfOpen(b.horarios || '', b.esta_abierto));
    }
    setFilteredBusinesses(currentFilteredBusinesses);
  };

  const toggleOnlyOpen = () => {
    const newOnlyOpen = !onlyOpen;
    setOnlyOpen(newOnlyOpen);

    let filtered = businesses;
    if (searchTerm) {
      const searchTerms = searchTerm.toLowerCase().split(',').map(t => t.trim()).filter(t => t.length > 0);
      filtered = filtered.filter((b) => {
        const content = `${b.nombre} ${b.categoria} ${b.descripcion}`.toLowerCase();
        return searchTerms.some(t => content.includes(t));
      });
    }

    if (newOnlyOpen) {
      filtered = filtered.filter((b) => checkIfOpen(b.horarios || '', b.esta_abierto));
    }
    setFilteredBusinesses(filtered);
  };

  return (
    <main className="min-h-screen">
      <Hero onSearch={handleSearch} />

      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Info Bento Grid */}
        <InfoGrid />

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
            Explorar Ubajay
          </h2>
          <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-xl border border-slate-100 dark:border-white/5">
            <button
              onClick={() => { setOnlyOpen(false); handleSearch(searchTerm); }}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${!onlyOpen ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}
            >
              TODOS
            </button>
            <button
              onClick={toggleOnlyOpen}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${onlyOpen ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400'}`}
            >
              <div className={`w-2 h-2 rounded-full ${onlyOpen ? 'bg-white animate-pulse' : 'bg-slate-300'}`}></div>
              ABIERTOS AHORA
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-brand-emerald-500)]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filteredBusinesses.map((business) => (
              <div key={business.id} onClick={() => setSelectedBusiness(business)}>
                <BusinessCard business={business} />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBusinesses.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-slate-400 font-bold uppercase tracking-widest">No se encontraron resultados</p>
          </div>
        )}
      </section>

      <Footer />
      <ThemeToggle />

      {/* Modal Detailed View */}
      {selectedBusiness && (
        <BusinessModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}
    </main>
  );
}
