
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { WasteResult, BinColor } from '../types';

export const WasteGuideView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WasteResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await geminiService.getWasteGuidance(query);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBinColor = (type: string) => {
    switch (type) {
      case 'Wet Waste': return BinColor.WET;
      case 'Dry Waste': return BinColor.DRY;
      case 'E-Waste': return BinColor.EWASTE;
      case 'Hazardous Waste': return BinColor.HAZARDOUS;
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Waste Segregation</h2>
        <p className="text-slate-500 text-sm">Know your bins, save the planet</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you disposing?"
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-slate-800 text-white w-14 rounded-2xl flex items-center justify-center font-bold shadow-md disabled:opacity-50"
        >
          {loading ? '...' : '🔍'}
        </button>
      </form>

      {result && (
        <div className="animate-in zoom-in duration-300">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
            <div className={`${getBinColor(result.binType)} p-8 text-center text-white`}>
              <div className="text-5xl mb-4">🗑️</div>
              <h3 className="text-2xl font-bold mb-1">{result.binType}</h3>
              <p className="text-white/80 text-sm uppercase tracking-widest font-bold">Recommended Bin</p>
            </div>
            <div className="p-6 bg-white">
              <h4 className="font-bold text-slate-800 mb-2">Disposal Tip:</h4>
              <p className="text-slate-600 leading-relaxed text-sm">{result.disposalTip}</p>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
            <h4 className="font-bold text-green-800 text-sm mb-1">Wet Waste</h4>
            <p className="text-[10px] text-green-700">Food scraps, peels, flowers</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 text-sm mb-1">Dry Waste</h4>
            <p className="text-[10px] text-blue-700">Paper, plastic, metal, glass</p>
          </div>
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <h4 className="font-bold text-red-800 text-sm mb-1">E-Waste</h4>
            <p className="text-[10px] text-red-700">Batteries, wires, devices</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
            <h4 className="font-bold text-yellow-800 text-sm mb-1">Hazardous</h4>
            <p className="text-[10px] text-yellow-700">Paint, chemicals, medicines</p>
          </div>
        </div>
      )}
    </div>
  );
};
