import React, { useState } from 'react';
import {
  MascotCustomization,
  MascotFormKey,
  FurColorKey,
  HeadwearKey,
  EyewearKey,
  NeckwearKey,
  FUR_PALETTES,
  MASCOT_FORMS,
  MascotSVG,
} from './MascotSVG';

interface MascotCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: MascotCustomization;
  onSave: (newCustomization: MascotCustomization) => void;
}

export const MascotCustomizerModal: React.FC<MascotCustomizerModalProps> = ({
  isOpen,
  onClose,
  customization,
  onSave,
}) => {
  const [activeCategory, setActiveCategory] = useState<'form' | 'fur' | 'head' | 'accessories'>('form');
  const [current, setCurrent] = useState<MascotCustomization>(customization);

  if (!isOpen) return null;

  const furOptions: { key: FurColorKey; label: string; color: string }[] = [
    { key: 'tosca', label: 'Tosca Asli', color: '#1ABC9C' },
    { key: 'sky', label: 'Biru Langit', color: '#0284C7' },
    { key: 'purple', label: 'Lilac Manis', color: '#9333EA' },
    { key: 'peach', label: 'Peach Oranye', color: '#EA580C' },
    { key: 'pink', label: 'Berry Pink', color: '#DB2777' },
    { key: 'emerald', label: 'Hijau Daun', color: '#059669' },
  ];

  const headOptions: { key: HeadwearKey; label: string; icon: string }[] = [
    { key: 'none', label: 'Tanpa Topi', icon: '❌' },
    { key: 'cap', label: 'Topi SMP', icon: '🧢' },
    { key: 'crown', label: 'Mahkota Emas', icon: '👑' },
    { key: 'headband', label: 'Bando Semangat', icon: '🔴' },
    { key: 'grad_cap', label: 'Topi Cerdas', icon: '🎓' },
  ];

  const accessoryOptions: { key: NeckwearKey; label: string; icon: string }[] = [
    { key: 'none', label: 'Tanpa Aksesoris', icon: '❌' },
    { key: 'medal', label: 'Medali Juara', icon: '🥇' },
    { key: 'bowtie', label: 'Dasi Kupu-Kupu', icon: '🎀' },
  ];

  const handleApply = () => {
    onSave(current);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="text-sm font-bold leading-tight">Dandani Virtual Pet</h3>
              <p className="text-[11px] text-slate-300">Pilih bentuk, warna bulu & aksesoris</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="bg-[#F8FAFC] py-2.5 flex flex-col items-center justify-center border-b border-slate-200 relative">
          <MascotSVG size={150} customization={current} mood="happy" />
          <span className="text-[11px] font-bold text-slate-700 mt-1">
            {MASCOT_FORMS.find((f) => f.key === current.form)?.name || 'Gogi Klasik'} • {FUR_PALETTES[current.furColor]?.name || 'Tosca Asli'}
          </span>
        </div>

        {/* Tab Category Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveCategory('form')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeCategory === 'form'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Bentuk
          </button>
          <button
            onClick={() => setActiveCategory('fur')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeCategory === 'fur'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Warna
          </button>
          <button
            onClick={() => setActiveCategory('head')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeCategory === 'head'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Topi
          </button>
          <button
            onClick={() => setActiveCategory('accessories')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeCategory === 'accessories'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Aksesoris
          </button>
        </div>

        {/* Category Content Selection */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* TAB 1: PILIHAN BENTUK VIRTUAL PET */}
          {activeCategory === 'form' && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Pilih Bentuk Karakter Favorit
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {MASCOT_FORMS.map((f) => {
                  const isSelected = (current.form || 'classic') === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => setCurrent({ ...current, form: f.key })}
                      className={`p-3 rounded-2xl border flex flex-col items-start gap-1 text-left transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-2xl">{f.icon}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-600">
                          {f.tag}
                        </span>
                      </div>
                      <span className="font-extrabold text-xs leading-tight mt-0.5">{f.name}</span>
                      <span className="text-[10px] text-slate-500 leading-tight">{f.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: WARNA BULU */}
          {activeCategory === 'fur' && (
            <div className="grid grid-cols-3 gap-2.5">
              {furOptions.map((f) => {
                const isSelected = current.furColor === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setCurrent({ ...current, furColor: f.key })}
                    className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-xs border border-white"
                      style={{ backgroundColor: f.color }}
                    />
                    <span className="text-[11px] text-center leading-tight">{f.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 3: TOPI */}
          {activeCategory === 'head' && (
            <div className="grid grid-cols-2 gap-2.5">
              {headOptions.map((h) => {
                const isSelected = current.headwear === h.key;
                return (
                  <button
                    key={h.key}
                    onClick={() => setCurrent({ ...current, headwear: h.key })}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-xs font-semibold ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{h.icon}</span>
                    <span className="text-[11px] leading-tight text-left">{h.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 4: AKSESORIS */}
          {activeCategory === 'accessories' && (
            <div className="grid grid-cols-2 gap-2.5">
              {accessoryOptions.map((n) => {
                const isSelected = current.neckwear === n.key;
                return (
                  <button
                    key={n.key}
                    onClick={() => setCurrent({ ...current, neckwear: n.key })}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-xs font-semibold ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{n.icon}</span>
                    <span className="text-[11px] leading-tight text-left">{n.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100"
          >
            Batal
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-xs"
          >
            Simpan Tampilan
          </button>
        </div>
      </div>
    </div>
  );
};
