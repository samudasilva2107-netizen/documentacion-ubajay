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

export default function Home() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    const searchTerms = term.toLowerCase()
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const filtered = businesses.filter((b) => {
      const content = `${b.nombre} ${b.categoria} ${b.descripcion}`.toLowerCase();
      return searchTerms.some(t => content.includes(t));
    });
    setFilteredBusinesses(filtered);
  };

  return (
    <main className="min-h-screen">
      <Hero onSearch={handleSearch} />

      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Info Bento Grid */}
        <InfoGrid />

        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white font-serif">Explorar Ubajay</h2>
            <p className="text-slate-500 italic">Encontrá lo que necesitás en nuestra comunidad</p>
          </div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {filteredBusinesses.length} Resultados
          </span>
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
