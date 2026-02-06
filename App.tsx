
import React, { useState } from 'react';
import { AppView } from './types';
import { Navigation } from './components/Navigation';
import { HomeView } from './views/HomeView';
import { ScanView } from './views/ScanView';
import { AlternativesView } from './views/AlternativesView';
import { WasteGuideView } from './views/WasteGuideView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView onAction={(view) => setCurrentView(view)} />;
      case AppView.SCAN:
        return <ScanView />;
      case AppView.ALTERNATIVES:
        return <AlternativesView />;
      case AppView.WASTE_GUIDE:
        return <WasteGuideView />;
      default:
        return <HomeView onAction={(view) => setCurrentView(view)} />;
    }
  };

  return (
    <div className="mobile-container overflow-hidden">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">ES</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">EcoSnap</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm">
          👤
        </div>
      </header>

      <main className="flex-1 overflow-y-auto scroll-smooth">
        {renderView()}
      </main>

      <Navigation currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;
