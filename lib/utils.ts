import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function normalizeText(text: string) {
    return String(text || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function checkIfOpen(horariosStr: string, estaAbiertoManual?: boolean | string) {
    if (estaAbiertoManual === true || String(estaAbiertoManual) === 'true') return true;
    if (!horariosStr) return false;

    const t = normalizeText(horariosStr);
    if (t.includes("24") || t.includes("siempre") || t.includes("abierto")) return true;

    try {
        const now = new Date();
        const diaHoy = now.getDay();
        const curTime = now.getHours() * 100 + now.getMinutes();

        const diasMapa: { [key: string]: number[] } = {
            'lun': [1], 'mar': [2], 'mie': [3], 'jue': [4], 'vie': [5], 'sab': [6], 'dom': [0],
            'lunes': [1], 'martes': [2], 'miercoles': [3], 'jueves': [4], 'viernes': [5],
            'sabado': [6], 'domingo': [0]
        };

        if (diaHoy === 0 && !t.includes("dom") && !t.includes("diario") && !t.includes("todos los dias")) return false;

        const rangeRegex = /(lun|lunes|mar|martes|mie|miercoles|jue|jueves|vie|viernes|sab|sabado|dom|domingo)\s*a\s*(lun|lunes|mar|martes|mie|miercoles|jue|jueves|vie|viernes|sab|sabado|dom|domingo)/g;
        const ranges = [...t.matchAll(rangeRegex)];
        let diaValido = ranges.length === 0;

        for (const r of ranges) {
            const start = diasMapa[r[1]][0], end = diasMapa[r[2]][0];
            if (start <= end) { if (diaHoy >= start && diaHoy <= end) diaValido = true; }
            else { if (diaHoy >= start || diaHoy <= end) diaValido = true; }
        }

        if (!diaValido) return false;

        const timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(?:a|to|-)\s*(\d{1,2})(?::(\d{2}))?/g;
        const matches = [...t.matchAll(timeRegex)];
        if (matches.length === 0) return true;

        for (const m of matches) {
            let sH = parseInt(m[1]), sM = m[2] ? parseInt(m[2]) : 0, eH = parseInt(m[3]), eM = m[4] ? parseInt(m[4]) : 0;
            let start = sH * 100 + sM, end = eH * 100 + eM;
            if (end < start) { if (curTime >= start || curTime <= end) return true; }
            else { if (curTime >= start && curTime <= end) return true; }
        }
    } catch (e) { return false; }
    return false;
}
