import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BooksGrid from './components/BooksGrid';
import AISolver from './components/AISolver';
import Footer from './components/Footer';
import BooksPage from './components/BooksPage';

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash.replace(/^#/, '');
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const [query, setQuery] = useState('');
  const route = useHashRoute();

  // Basic SEO tags injection
  useMemo(() => {
    const title = 'Noor Al‑Hadith — Authentic Hadith in Arabic, Urdu and English';
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]') || (() => { const m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); return m; })();
    metaDesc.setAttribute('content', 'Explore authentic hadith with Arabic text and translations in Urdu and English. SEO‑friendly, multilingual, and mobile‑first.');

    const canonical = document.querySelector('link[rel="canonical"]') || (() => { const c = document.createElement('link'); c.setAttribute('rel', 'canonical'); document.head.appendChild(c); return c; })();
    canonical.setAttribute('href', window.location.href);

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Noor Al‑Hadith',
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
    const existing = document.getElementById('ld-json');
    const script = existing || (() => { const s = document.createElement('script'); s.type = 'application/ld+json'; s.id='ld-json'; document.head.appendChild(s); return s; })();
    script.text = JSON.stringify(ld);
  }, []);

  const onSearch = () => {
    const aiEl = document.getElementById('ai');
    if (aiEl) aiEl.scrollIntoView({ behavior: 'smooth' });
  };

  const isCollection = /^\/hadith\//.test(route);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjIzNTg2NzV8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen backdrop-blur-sm bg-emerald-950/70 text-emerald-50">
        <Header language={language} onChangeLanguage={setLanguage} />
        <main>
          {isCollection ? (
            <BooksPage />
          ) : (
            <>
              <Hero query={query} setQuery={setQuery} onSearch={onSearch} />
              <BooksGrid />
              <AISolver query={query} setQuery={setQuery} />
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
