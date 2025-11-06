import React from 'react';

export default function HadithCard({ hadith }) {
  return (
    <article className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-emerald-900">{hadith.ref}</div>
        {hadith.number && <div className="text-xs text-emerald-700">#{hadith.number}</div>}
      </div>
      <div className="mt-3 grid md:grid-cols-3 gap-4">
        <div className="md:text-right" dir="rtl">
          <div className="font-['Noto Naskh Arabic',serif] text-xl leading-relaxed">{hadith.ar}</div>
        </div>
        <div className="md:border-l md:border-r border-emerald-100 md:px-4" dir="rtl">
          <div className="font-['Noto Nastaliq Urdu',serif] text-lg leading-relaxed">{hadith.ur}</div>
        </div>
        <div>
          <div className="text-gray-800 leading-relaxed">{hadith.en}</div>
        </div>
      </div>
      {hadith.note && <div className="mt-3 text-sm text-emerald-700">{hadith.note}</div>}
    </article>
  );
}
