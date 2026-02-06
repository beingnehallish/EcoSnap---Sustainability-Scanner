
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Alternative } from '../types';

export const AlternativesView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await geminiService.getAlternatives(query);
      setAlternatives(results);
    } catch (err) {
      console.error(err);
      alert("Failed to find alternatives. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Sustainable Swaps</h2>
        <p className="text-slate-500 text-sm">Find greener alternatives for daily items</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Plastic bags, Shampoo bottle"
          className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 text-slate-800 focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
        />
        <button 
          type="submit"
          className="absolute right-3 top-2.5 bottom-2.5 bg-emerald-600 text-white px-4 rounded-xl font-bold text-sm shadow-sm"
        >
          Find
        </button>
      </form>

      {loading && (
        <div className="py-12 flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm">Looking for eco-friendly matches...</p>
        </div>
      )}

      {!loading && alternatives.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase px-2">Top Swaps for "{query}"</h3>
          {alternatives.map((alt, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4 animate-in slide-in-from-left duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🌱
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">{alt.name}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{alt.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && alternatives.length === 0 && !query && (
        <div className="py-12 text-center space-y-4 grayscale opacity-50">
          <div className="text-6xl">✨</div>
          <p className="text-slate-500 text-sm">Enter a product name to see sustainable magic.</p>
        </div>
      )}
    </div>
  );
};
