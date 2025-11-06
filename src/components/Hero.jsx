import React from 'react';
import { Search } from 'lucide-react';

export default function Hero({ query, setQuery, onSearch }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 opacity-95 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center text-emerald-50">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          نور الحدیث • Noor Al‑Hadith
        </h1>
        <p className="mt-4 text-emerald-100/90 max-w-2xl mx-auto">
          Explore authentic Hadith with Arabic text and translations. Ask your life questions and find guidance from Prophetic wisdom.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl flex bg-white/95 rounded-xl shadow-lg overflow-hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder="Type your question or search hadith…"
              className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
            />
            <button onClick={onSearch} className="px-4 py-3 bg-amber-400 hover:bg-amber-500 text-emerald-900 font-semibold flex items-center gap-2">
              <Search size={18}/> Search
            </button>
          </div>
        </div>
        <div className="mt-6 text-sm opacity-90">This platform provides Islamic knowledge and guidance, not religious rulings (fatwas).</div>
      </div>
    </section>
  );
}
