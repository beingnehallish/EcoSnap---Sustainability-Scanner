
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { ScanResult } from '../types';

export const ScanView: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        analyzeImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await geminiService.scanProduct(base64);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-600';
    if (score >= 5) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-emerald-100';
    if (score >= 5) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Scan Product</h2>
        <p className="text-slate-500 text-sm">Upload a photo to see its eco-impact</p>
      </div>

      {!image && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square border-2 border-dashed border-emerald-200 rounded-3xl bg-emerald-50/30 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-emerald-50 transition-colors"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">📸</div>
          <span className="text-emerald-700 font-medium">Capture or Upload Photo</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="relative">
            <img src={image} alt="Product" className="w-full h-64 object-cover rounded-3xl" />
            <button 
              onClick={() => { setImage(null); setResult(null); }}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-red-600 shadow-sm"
            >
              Retake
            </button>
          </div>

          {loading && (
            <div className="p-8 bg-white rounded-3xl text-center space-y-4 shadow-sm border border-slate-100">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-600 font-medium">AI is evaluating sustainability...</p>
            </div>
          )}

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{result.productType}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Sustainability Score</p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold ${getScoreBg(result.ecoScore)} ${getScoreColor(result.ecoScore)}`}>
                    {result.ecoScore}/10
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Reasoning</p>
                    <p className="text-sm text-slate-700">{result.reason}</p>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Eco Tip</p>
                    <p className="text-sm text-emerald-800">{result.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
