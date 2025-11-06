import React from 'react';
import { Globe, BookOpen, Home, Bot } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'ur', label: 'اردو', dir: 'rtl' },
];

export default function Header({ language, onChangeLanguage }) {
  const langMeta = languages.find(l => l.code === language) || languages[0];
  return (
    <header className="w-full sticky top-0 z-30 bg-emerald-900/90 backdrop-blur border-b border-emerald-800 text-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-700 grid place-items-center text-amber-300 font-semibold">ن</div>
          <div className="leading-tight">
            <div className="font-semibold tracking-wide">نور الحدیث</div>
            <div className="text-xs opacity-80">Noor Al‑Hadith</div>
          </div>
        </a>
        <nav className={`hidden md:flex items-center gap-6 ${langMeta.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <a href="#home" className="flex items-center gap-2 hover:text-amber-300"><Home size={18}/> <span>Home</span></a>
          <a href="#books" className="flex items-center gap-2 hover:text-amber-300"><BookOpen size={18}/> <span>Hadith Books</span></a>
          <a href="#ai" className="flex items-center gap-2 hover:text-amber-300"><Bot size={18}/> <span>AI Solver</span></a>
          <a href="#about" className="flex items-center gap-2 hover:text-amber-300"><Globe size={18}/> <span>About</span></a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              aria-label="Select language"
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value)}
              className="appearance-none bg-emerald-800/70 border border-emerald-700 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
