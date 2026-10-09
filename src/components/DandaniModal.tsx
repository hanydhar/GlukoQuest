import React, { useState } from 'react';
import { MascotSVG, COLOR_OPTIONS, ACCESSORY_OPTIONS } from './MascotSVG';

interface DandaniModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentColor: string;
  currentAccessory: string;
  onSave: (color: string, accessory: string) => void;
}

export const DandaniModal: React.FC<DandaniModalProps> = ({
  isOpen,
  onClose,
  currentColor,
  currentAccessory,
  onSave,
}) => {
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [selectedAccessory, setSelectedAccessory] = useState(currentAccessory);
  const [activeTab, setActiveTab] = useState<'aksesoris' | 'warna'>('aksesoris');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedColor, selectedAccessory);
    onClose();
  };

  const handleReset = () => {
    setSelectedColor('default');
    setSelectedAccessory('none');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 leading-tight">Dandani Gogi</h3>
              <p className="text-[10px] text-slate-400 font-medium">Kustomisasi warna & aksesoris maskot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Live Preview Arena */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
          <MascotSVG
            mood="happy"
            size={155}
            colorFilter={selectedColor}
            accessory={selectedAccessory}
          />
          <span className="text-[10px] font-bold text-slate-400 mt-1">Pratinjau Langsung</span>
        </div>

        {/* Tab Switcher: Aksesoris vs Warna */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('aksesoris')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'aksesoris'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-crown text-[11px]"></i>
            <span>Aksesoris</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('warna')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'warna'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-palette text-[11px]"></i>
            <span>Warna Kulit</span>
          </button>
        </div>

        {/* Tab Content: Aksesoris */}
        {activeTab === 'aksesoris' && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-700 block">Pilih Aksesoris:</span>
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORY_OPTIONS.map((acc) => {
                const isSelected = selectedAccessory === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setSelectedAccessory(acc.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-2xs ring-1 ring-purple-400'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <i className={acc.icon}></i>
                    </div>
                    <span className="text-xs font-bold leading-tight">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content: Warna */}
        {activeTab === 'warna' && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-700 block">Pilih Warna Maskot:</span>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_OPTIONS.map((col) => {
                const isSelected = selectedColor === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setSelectedColor(col.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-2xs ring-1 ring-purple-400'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: col.hex }}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-2xs flex-shrink-0"
                    />
                    <span className="text-xs font-bold leading-tight">{col.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-check text-[11px]"></i>
              <span>Simpan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
