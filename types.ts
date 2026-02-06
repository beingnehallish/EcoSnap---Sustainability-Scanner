
export enum AppView {
  HOME = 'HOME',
  SCAN = 'SCAN',
  ALTERNATIVES = 'ALTERNATIVES',
  WASTE_GUIDE = 'WASTE_GUIDE'
}

export interface ScanResult {
  productType: string;
  ecoScore: number;
  reason: string;
  tip: string;
}

export interface Alternative {
  name: string;
  benefit: string;
}

export interface WasteResult {
  binType: 'Wet Waste' | 'Dry Waste' | 'E-Waste' | 'Hazardous Waste';
  disposalTip: string;
}

export enum BinColor {
  WET = 'bg-green-600',
  DRY = 'bg-blue-600',
  EWASTE = 'bg-red-600',
  HAZARDOUS = 'bg-yellow-600'
}
