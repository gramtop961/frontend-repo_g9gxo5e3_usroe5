import React, { useMemo, useState } from 'react';
import { Bot, Sparkles, Info } from 'lucide-react';

// Lightweight client-side semantic match (placeholder until backend vector search)
const sampleHadith = [
  {
    id: 'bukhari-13',
    book: 'Sahih al-Bukhari',
    number: 13,
    ar: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    ur: 'اعمال کا دار و مدار نیتوں پر ہے۔',
    en: 'Actions are but by intentions.',
    topic: ['intention', 'sincerity', 'niyyah'],
    note: 'Foundational hadith on sincerity in all actions.'
  },
  {
    id: 'muslim-2622',
    book: 'Sahih Muslim',
    number: 2622,
    ar: 'لاَ تَغْضَبْ',
    ur: 'غصہ نہ کرو۔',
    en: 'Do not become angry.',
    topic: ['anger', 'patience', 'sabr', 'character'],
    note: 'Brief counsel emphasizing self-restraint.'
  },
  {
    id: 'tirmidhi-1209',
    book: 'Jamiʿ at‑Tirmidhi',
    number: 1209,
    ar: 'الْبَيْعَانِ بِالْخِيَارِ',
    ur: 'خرید و فروخت کرنے والے دونوں کو اختیار ہے۔',
    en: 'The buyer and the seller have the option (to cancel) as long as they have not separated.',
    topic: ['business', 'trade', 'honesty'],
    note: 'Guidance regarding business ethics and consent.'
  },
];

function simpleSimilarity(a, b) {
  const toTokens = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,'').split(/\s+/).filter(Boolean);
  const A = new Set(toTokens(a));
  const B = new Set(toTokens(b));
  const inter = [...A].filter(x => B.has(x)).length;
  return inter / Math.max(1, Math.min(A.size, B.size));
}

export default function AISolver({ query, setQuery }) {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const onSearch = () => {
    setSearched(true);
    if (!query.trim()) { setResults([]); return; }
    const ranked = sampleHadith
      .map(h => {
        const score = Math.max(
          simpleSimilarity(query, h.en + ' ' + h.ur + ' ' + h.ar),
          ...h.topic.map(t => simpleSimilarity(query, t))
        );
        return { ...h, score };
      })
      .sort((a, b) => b.score - a.score)
      .filter(h => h.score > 0)
      .slice(0, 3);
    setResults(ranked);
  };

  return (
    <section id="ai" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center"><Bot/></div>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">AI Problem Solver</h2>
        </div>
        <p className="mt-2 text-emerald-700 max-w-3xl">Type your life question and we will match it to relevant hadiths. This is educational content, not a fatwa.</p>
        <div className="mt-6 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            placeholder="e.g., I am confused about a business decision"
            className="flex-1 px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button onClick={onSearch} className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2">
            <Sparkles size={18}/> Find Guidance
          </button>
        </div>
        {searched && results.length === 0 && (
          <div className="mt-6 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-2">
            <Info size={18} className="mt-0.5"/>
            <div>No direct match found. Try different wording like patience, anger, honesty, business, or intention.</div>
          </div>
        )}
        <div className="mt-8 grid gap-4">
          {results.map((h) => (
            <article key={h.id} className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-emerald-900">{h.book} — #{h.number}</div>
                <div className="text-xs text-emerald-700">Relevance: {(h.score*100).toFixed(0)}%</div>
              </div>
              <div className="mt-3 grid md:grid-cols-3 gap-4">
                <div className="md:text-right" dir="rtl">
                  <div className="font-[\'Noto Naskh Arabic\', serif] text-xl leading-relaxed">{h.ar}</div>
                </div>
                <div className="md:border-l md:border-r border-emerald-100 md:px-4" dir="rtl">
                  <div className="font-[\'Noto Nastaliq Urdu\', serif] text-lg leading-relaxed">{h.ur}</div>
                </div>
                <div>
                  <div className="text-gray-800 leading-relaxed">{h.en}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-emerald-700">Why this matches: {h.note}</div>
              <a href={`#/hadith/${h.id.split('-')[0]}`} className="mt-3 inline-flex text-emerald-700 hover:text-emerald-900 font-medium">Open collection →</a>
              <div className="mt-4 text-xs text-emerald-700">Disclaimer: This tool offers educational guidance based on hadith texts and is not a fatwa.</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
