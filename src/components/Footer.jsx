import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-100 border-t border-emerald-800">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-semibold">نور الحدیث</div>
          <p className="mt-2 text-emerald-200/90 text-sm">Authentic Hadith with Arabic, Urdu and English translations. Spiritual, elegant, and fast.</p>
        </div>
        <div>
          <div className="font-semibold">Explore</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#books" className="hover:text-amber-300">Hadith Books</a></li>
            <li><a href="#ai" className="hover:text-amber-300">AI Problem Solver</a></li>
            <li><a href="#blog" className="hover:text-amber-300">Blog</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#privacy" className="hover:text-amber-300">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-amber-300">Terms & Conditions</a></li>
            <li><a href="#disclaimer" className="hover:text-amber-300">Disclaimer</a></li>
            <li><a href="#cookies" className="hover:text-amber-300">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Attribution</div>
          <p className="mt-2 text-sm text-emerald-200/90">Hadith texts are provided for educational purposes. Always consult qualified scholars for religious rulings.</p>
        </div>
      </div>
      <div className="border-t border-emerald-800 py-4 text-center text-xs text-emerald-300">© {new Date().getFullYear()} Noor Al‑Hadith. All rights reserved.</div>
    </footer>
  );
}
