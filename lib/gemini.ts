const GEMINI_API_KEY = 'AIzaSyAuUl-gXqMOXWhNWtdeXOywQF42drd06pE';
const GEMINI_EMBEDDING_MODEL = 'models/text-embedding-004';
const GEMINI_CHAT_MODEL = 'models/gemini-1.5-flash-latest';

export async function generateEmbedding(text: string) {
    const safeText = String(text || '').trim();
    if (!safeText) return null;

    const url = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_EMBEDDING_MODEL}:embedContent?key=${GEMINI_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: GEMINI_EMBEDDING_MODEL,
                content: { parts: [{ text: safeText }] }
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Gemini API error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        return data.embedding.values;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

export function cosineSimilarity(vecA: number[], vecB: number[]) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
}

export async function enhanceQuery(query: string) {
    const url = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_CHAT_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const prompt = `Eres un asistente de búsqueda para una guía comercial de Ubajay, Entre Ríos, Argentina.
Usuario busca: "${query}"
Responde SOLO con palabras clave separadas por comas, sin explicaciones.`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.3, maxOutputTokens: 100 }
            })
        });
        if (!response.ok) throw new Error(`Gemini Chat API error: ${response.status}`);
        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error('Error enhancing query:', error);
        return query;
    }
}
