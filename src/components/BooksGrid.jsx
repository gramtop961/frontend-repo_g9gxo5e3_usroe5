import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const books = [
  { id: 'sahih-bukhari', title: 'Sahih al-Bukhari', count: 7563, color: 'from-emerald-600 to-emerald-800' },
  { id: 'sahih-muslim', title: 'Sahih Muslim', count: 5362, color: 'from-teal-600 to-teal-800' },
  { id: 'jami-tirmidhi', title: 'Jamiʿ at‑Tirmidhi', count: 3891, color: 'from-cyan-600 to-cyan-800' },
  { id: 'sunan-abu-dawood', title: 'Sunan Abu Dawood', count: 5274, color: 'from-sky-600 to-sky-800' },
  { id: 'sunan-an-nasai', title: 'Sunan an‑Nasa’i', count: 5662, color: 'from-blue-600 to-blue-800' },
  { id: 'sunan-ibn-majah', title: 'Sunan Ibn Majah', count: 4341, color: 'from-indigo-600 to-indigo-800' },
];

export default function BooksGrid() {
  return (
    <section id="books" className="bg-emerald-50 border-t border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Hadith Collections</h2>
          <a href="#ai" className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1">AI Solver <ArrowRight size={18}/></a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(b => (
            <a key={b.id} href={`#/hadith/${b.id}`} className={`group rounded-xl p-6 bg-gradient-to-br ${b.color} text-white shadow hover:shadow-lg transition`}> 
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 grid place-items-center"><BookOpen/></div>
                <div>
                  <div className="font-semibold text-lg">{b.title}</div>
                  <div className="text-white/80 text-sm">~{b.count.toLocaleString()} hadiths</div>
                </div>
              </div>
              <div className="mt-4 text-white/90 text-sm leading-relaxed">
                Browse Arabic text with Urdu and English translations. SEO‑friendly URLs and structured data included.
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-amber-200 group-hover:translate-x-1 transition">
                Read more <ArrowRight size={16}/>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
