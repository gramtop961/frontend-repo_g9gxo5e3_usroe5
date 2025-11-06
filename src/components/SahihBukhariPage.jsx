import React, { useEffect, useMemo, useState } from 'react';
import HadithCard from './HadithCard';

// Pagination size chosen for smooth UX on large data
const PAGE_SIZE = 20;

// Fallback demo dataset (keeps UI functional without heavy payloads)
const FALLBACK_SAMPLE = Array.from({ length: 40 }).map((_, i) => ({
  number: i + 1,
  ref: `Bukhari ${i + 1}`,
  ar: i === 0 ? 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ' : 'نَصُّ حَدِيثٍ عَرَبِيٍّ لِلتَّجْرِبَةِ',
  ur: i === 0 ? 'اعمال کا دارومدار نیتوں پر ہے۔' : 'نمائشی حدیث کے ساتھ اردو ترجمہ',
  en: i === 0 ? 'Actions are only by intentions.' : 'Sample hadith with Urdu and English translation.',
  note: i === 0 ? 'Foundational hadith on sincerity.' : undefined
}));

function useDebounced(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function SahihBukhariPage() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const q = useDebounced(query, 250);

  // Try loading full dataset in this order:
  // 1) Public JSON asset at /bukhari.json or /data/bukhari.json
  // 2) Global window.__BUKHARI_DATA__ if provided
  // 3) Fallback sample
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        // Try common paths in public/
        const paths = ['/data/bukhari.json', '/bukhari.json'];
        let loaded = null;
        for (const p of paths) {
          try {
            const res = await fetch(p, { headers: { 'Accept': 'application/json' } });
            if (res.ok) {
              const json = await res.json();
              if (Array.isArray(json) && json.length) {
                loaded = json;
                break;
              }
            }
          } catch (_) { /* try next */ }
        }
        if (!loaded && Array.isArray(window.__BUKHARI_DATA__) && window.__BUKHARI_DATA__.length) {
          loaded = window.__BUKHARI_DATA__;
        }
        if (!loaded) {
          loaded = FALLBACK_SAMPLE;
        }
        if (mounted) {
          setAllData(loaded);
          setError('');
        }
      } catch (e) {
        if (mounted) {
          setAllData(FALLBACK_SAMPLE);
          setError('Unable to load full dataset. Showing a small sample.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // SEO updates
  useEffect(() => {
    const title = 'Sahih al-Bukhari — Arabic, Urdu, English';
    document.title = `${title} — Noor Al‑Hadith`;
    const canonical = document.querySelector('link[rel="canonical"]') || (() => { const c = document.createElement('link'); c.setAttribute('rel', 'canonical'); document.head.appendChild(c); return c; })();
    const url = `${window.location.origin}/#/hadith/sahih-bukhari`;
    canonical.setAttribute('href', url);

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Sahih al-Bukhari',
      url,
      hasPart: (allData || []).slice(0, 50).map(h => ({
        '@type': 'Article',
        name: h.ref,
        articleBody: `${h.en} | ${h.ur} | ${h.ar}`,
        inLanguage: ['ar','ur','en']
      }))
    };
    const existing = document.getElementById('ld-collection');
    const script = existing || (() => { const s = document.createElement('script'); s.type = 'application/ld+json'; s.id='ld-collection'; document.head.appendChild(s); return s; })();
    script.text = JSON.stringify(ld);
  }, [allData]);

  const filtered = useMemo(() => {
    if (!q) return allData;
    const needle = q.toLowerCase();
    return allData.filter(h =>
      (h.en && h.en.toLowerCase().includes(needle)) ||
      (h.ur && h.ur.toLowerCase().includes(needle)) ||
      (h.ar && h.ar.includes(q)) ||
      (String(h.number).includes(needle)) ||
      (h.ref && h.ref.toLowerCase().includes(needle))
    );
  }, [allData, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [q]);

  return (
    <section className="bg-emerald-50" id="collection">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-900">Sahih al-Bukhari</h1>
            <p className="mt-2 text-emerald-700">Arabic with Urdu and English translations. Use search to filter; pagination keeps performance smooth.</p>
          </div>
          <div className="w-full md:w-80">
            <label className="block text-sm text-emerald-700 mb-1">Search (Arabic / Urdu / English / number)</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hadith..."
              className="w-full rounded-md border border-emerald-200 bg-white/80 px-3 py-2 text-emerald-900 placeholder:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {loading && (
          <div className="mt-6 text-emerald-700">Loading collection…</div>
        )}
        {error && (
          <div className="mt-2 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded">{error}</div>
        )}

        <div className="mt-6 text-sm text-emerald-700">
          Showing {pageItems.length} of {filtered.length} results{q ? ` for "${q}"` : ''}.
        </div>

        <div className="mt-6 grid gap-5">
          {pageItems.map((h, idx) => (
            <HadithCard key={`${h.number}-${idx}`} hadith={h} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-40"
          >
            Previous
          </button>
          <div className="text-sm text-emerald-800">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>

        <div className="mt-10 text-xs text-emerald-700">
          To load all 7,563 hadiths, add a JSON file at public/data/bukhari.json (array of records with keys: number, ref, ar, ur, en, note) or set window.__BUKHARI_DATA__ before the app mounts.
        </div>
      </div>
    </section>
  );
}
