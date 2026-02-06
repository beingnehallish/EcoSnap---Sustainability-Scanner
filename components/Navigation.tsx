
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: AppView.HOME, label: 'Home', icon: '🏠' },
    { view: AppView.SCAN, label: 'Scan', icon: '📸' },
    { view: AppView.ALTERNATIVES, label: 'Swaps', icon: '♻️' },
    { view: AppView.WASTE_GUIDE, label: 'Waste', icon: '🗑️' },
  ];

  return (
    <nav className="flex justify-around items-center h-16 bg-white border-t border-slate-100 pb-2">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => onNavigate(item.view)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === item.view ? 'text-emerald-600 font-semibold' : 'text-slate-400'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
