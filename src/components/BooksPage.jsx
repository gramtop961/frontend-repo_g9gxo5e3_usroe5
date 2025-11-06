import React, { useEffect, useMemo, useState } from 'react';
import HadithCard from './HadithCard';
import SahihBukhariPage from './SahihBukhariPage';

// Minimal client-side router using hash (#/hadith/:book)
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash.replace(/^#/, '');
}

// Demo dataset for non-Bukhari books to keep the bundle small.
const DATA = {
  'sahih-muslim': {
    title: 'Sahih Muslim',
    items: [
      {
        number: 2622,
        ref: 'Muslim 2622: Anger',
        ar: 'لاَ تَغْضَبْ',
        ur: 'غصہ نہ کرو۔',
        en: 'Do not become angry.'
      }
    ]
  },
  'jami-tirmidhi': {
    title: 'Jamiʿ at‑Tirmidhi',
    items: [
      {
        number: 1209,
        ref: 'Tirmidhi 1209: Trade',
        ar: 'الْبَيْعَانِ بِالْخِيَارِ',
        ur: 'خرید و فروخت کرنے والے دونوں کو اختیار ہے۔',
        en: 'The buyer and the seller have the option as long as they have not separated.'
      }
    ]
  },
  'sunan-abu-dawood': {
    title: 'Sunan Abu Dawood',
    items: [
      {
        number: 4940,
        ref: 'Abu Dawood 4940: Character',
        ar: 'إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا',
        ur: 'تم میں سے بہترین وہ ہے جس کے اخلاق اچھے ہوں۔',
        en: 'The best among you are those with the best character.'
      }
    ]
  },
  'sunan-an-nasai': {
    title: 'Sunan an‑Nasa’i',
    items: [
      {
        number: 4998,
        ref: 'an‑Nasa’i 4998: Trust',
        ar: 'أَدِّ الأَمَانَةَ إِلَى مَنِ ائْتَمَنَكَ',
        ur: 'امانت اس تک پہنچاؤ جس نے تم پر اعتماد کیا۔',
        en: 'Render the trust to the one who entrusted you.'
      }
    ]
  },
  'sunan-ibn-majah': {
    title: 'Sunan Ibn Majah',
    items: [
      {
        number: 4210,
        ref: 'Ibn Majah 4210: Truthfulness',
        ar: 'عَلَيْكُمْ بِالصِّدْقِ',
        ur: 'تم پر سچ لازم ہے۔',
        en: 'Adhere to truthfulness.'
      }
    ]
  }
};

export default function BooksPage() {
  const route = useHashRoute();
  const match = route.match(/^\/hadith\/+([^/?#]+)/);
  const bookId = match ? decodeURIComponent(match[1]) : null;

  // Special full-page for Sahih al-Bukhari, wired for 7,563 hadiths with pagination
  if (bookId === 'sahih-bukhari') {
    return <SahihBukhariPage />;
  }

  const book = bookId ? DATA[bookId] : null;

  useEffect(() => {
    if (book) {
      document.title = `${book.title} — Noor Al‑Hadith`;
      const canonical = document.querySelector('link[rel="canonical"]') || (() => { const c = document.createElement('link'); c.setAttribute('rel', 'canonical'); document.head.appendChild(c); return c; })();
      const url = `${window.location.origin}/#/hadith/${bookId}`;
      canonical.setAttribute('href', url);
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: book.title,
        url,
        hasPart: book.items.map(h => ({
          '@type': 'Article',
          name: h.ref,
          articleBody: `${h.en} | ${h.ur} | ${h.ar}`,
          inLanguage: ['ar','ur','en']
        }))
      };
      const existing = document.getElementById('ld-collection');
      const script = existing || (() => { const s = document.createElement('script'); s.type = 'application/ld+json'; s.id='ld-collection'; document.head.appendChild(s); return s; })();
      script.text = JSON.stringify(ld);
    }
  }, [book, bookId]);

  if (!bookId) return null;

  if (!book) {
    return (
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Collection Not Found</h2>
          <p className="mt-2 text-emerald-700">Please choose a valid hadith collection from the homepage.</p>
          <a href="#books" className="mt-4 inline-block text-emerald-700 hover:text-emerald-900">← Back to books</a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-emerald-50" id="collection">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-900">{book.title}</h1>
        <p className="mt-2 text-emerald-700">Arabic with Urdu and English translations. SEO‑optimized with structured data. Sample entries shown; connect to backend for the complete book.</p>
        <div className="mt-8 grid gap-5">
          {book.items.map((h, idx) => (
            <HadithCard key={idx} hadith={h} />
          ))}
        </div>
      </div>
    </section>
  );
}
