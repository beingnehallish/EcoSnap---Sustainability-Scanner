
import React from 'react';
import { AppView } from '../types';

interface HomeViewProps {
  onAction: (view: AppView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onAction }) => {
  return (
    <div className="p-6 space-y-6">
      <section className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-100">
        <h2 className="text-2xl font-bold mb-2">Hello, Eco Warrior! 🌿</h2>
        <p className="opacity-90 text-sm">Ready to make a positive impact today? Start by scanning your everyday items.</p>
        <div className="mt-4 flex gap-4">
          <div className="bg-white/20 rounded-xl p-3 flex-1 text-center">
            <span className="block text-xl font-bold">12</span>
            <span className="text-[10px] uppercase opacity-80">Items Scanned</span>
          </div>
          <div className="bg-white/20 rounded-xl p-3 flex-1 text-center">
            <span className="block text-xl font-bold">A+</span>
            <span className="text-[10px] uppercase opacity-80">Eco Grade</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => onAction(AppView.SCAN)}
          className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-emerald-200 transition-all text-left"
        >
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">📸</div>
          <div>
            <h3 className="font-bold text-slate-800">Scan Product</h3>
            <p className="text-xs text-slate-500">Check eco-scores & packaging</p>
          </div>
        </button>

        <button 
          onClick={() => onAction(AppView.ALTERNATIVES)}
          className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-emerald-200 transition-all text-left"
        >
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">♻️</div>
          <div>
            <h3 className="font-bold text-slate-800">Greener Alternatives</h3>
            <p className="text-xs text-slate-500">Find sustainable swaps</p>
          </div>
        </button>

        <button 
          onClick={() => onAction(AppView.WASTE_GUIDE)}
          className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-emerald-200 transition-all text-left"
        >
          <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-2xl">🗑️</div>
          <div>
            <h3 className="font-bold text-slate-800">Waste Guide</h3>
            <p className="text-xs text-slate-500">Which bin does it go in?</p>
          </div>
        </button>
      </div>

      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Eco Tips for You</h3>
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100">
            "Did you know? Aluminum cans are 100% recyclable and can be back on shelves in just 60 days."
          </div>
          <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100">
            "Carry a reusable coffee cup to save over 300 single-use cups a year."
          </div>
        </div>
      </section>
    </div>
  );
};
