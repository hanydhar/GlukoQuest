import React from 'react';

export type MascotMood = 'happy' | 'neutral' | 'tired';

export interface MascotCustomization {
  color: string;
  accessory: string;
}

interface MascotSVGProps {
  mood?: MascotMood;
  className?: string;
  size?: number;
  isEating?: boolean;
  isPetted?: boolean;
  colorFilter?: string;
  accessory?: string;
}

export const COLOR_OPTIONS = [
  { id: 'default', label: 'Tosca Asli', hex: '#14B8A6' },
  { id: 'blue', label: 'Biru Samudra', hex: '#38BDF8' },
  { id: 'pink', label: 'Coral Pink', hex: '#F472B6' },
  { id: 'amber', label: 'Emas Ceria', hex: '#FBBF24' },
  { id: 'purple', label: 'Ungu Magis', hex: '#A855F7' },
  { id: 'mint', label: 'Hijau Mint', hex: '#34D399' },
];

export const ACCESSORY_OPTIONS = [
  { id: 'none', label: 'Tanpa Aksesoris', icon: 'fa-solid fa-ban' },
  { id: 'topi-wisuda', label: 'Topi Sarjana', icon: 'fa-solid fa-graduation-cap' },
  { id: 'mahkota', label: 'Mahkota Raja', icon: 'fa-solid fa-crown' },
  { id: 'topi-pesta', label: 'Topi Pesta', icon: 'fa-solid fa-hat-wizard' },
  { id: 'kacamata-hitam', label: 'Kacamata Hitam', icon: 'fa-solid fa-glasses' },
  { id: 'kacamata-bulat', label: 'Kacamata Bulat', icon: 'fa-solid fa-glasses' },
  { id: 'pita-merah', label: 'Pita Merah', icon: 'fa-solid fa-ribbon' },
  { id: 'dasi-kupu', label: 'Dasi Kupu-Kupu', icon: 'fa-solid fa-bow-tie' },
];

export const MascotSVG: React.FC<MascotSVGProps> = ({
  mood = 'happy',
  className = '',
  size = 225,
  isEating = false,
  isPetted = false,
  colorFilter = 'default',
  accessory = 'none',
}) => {
  const isHappy = mood === 'happy';
  const isNeutral = mood === 'neutral';
  const isTired = mood === 'tired';

  const baseMood = isTired ? 'tired' : isNeutral ? 'neutral' : 'happy';
  const isDefaultColor = !colorFilter || colorFilter === 'default';
  const colorSuffix = isDefaultColor ? '' : `_${colorFilter}`;
  const imageSrc = `/assets/mascot/${baseMood}${colorSuffix}.png`;

  const moodLabel = isTired
    ? 'Lesu (Mulut Melengkung ke Bawah)'
    : isNeutral
    ? 'Netral (Mulut Datar)'
    : 'Ceria & Bugar';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Badge status saat lesu */}
      {isTired && !isEating && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-amber-50/95 border border-amber-300 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs animate-pulse">
          <span>💧 Lesu</span>
          <span className="text-slate-400">💤</span>
        </div>
      )}

      {/* Kontainer Karakter Utama & Aksesoris Terkalibrasi Presisi */}
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`relative flex items-center justify-center transition-transform duration-300 ${
          isPetted
            ? 'animate-pet-jiggle'
            : isEating
            ? 'animate-bounce'
            : isHappy
            ? 'animate-mascot-float'
            : isTired
            ? 'animate-pulse'
            : 'animate-mascot-bounce'
        }`}
      >
        {/* Gambar Asli Karakter dengan Warna Badan Alami Tanpa Filter Glitch */}
        <img
          src={imageSrc}
          alt={`Maskot GlukoQuest (${moodLabel})`}
          className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
          loading="eager"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/assets/mascot/happy.png')) {
              target.src = '/assets/mascot/happy.png';
            }
          }}
        />

        {/* ================= OVERLAY AKSESORIS TERKALIBRASI PRESISI ================= */}

        {/* 1. Topi Wisuda (Di Atas Kepala y=1%) */}
        {accessory === 'topi-wisuda' && (
          <div className="absolute top-[1%] left-1/2 -translate-x-1/2 w-[38%] pointer-events-none z-30 drop-shadow-md">
            <svg viewBox="0 0 68 42" className="w-full h-auto" fill="none">
              {/* Mortarboard Rhombus */}
              <polygon points="34,4 66,16 34,26 2,16" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
              <polygon points="34,7 60,16 34,24 8,16" fill="#334155" />
              {/* Skull cap underneath */}
              <path d="M20 20 Q34 29 48 20 L48 27 Q34 35 20 27 Z" fill="#1E293B" />
              {/* Gold Tassel */}
              <circle cx="34" cy="15" r="2.5" fill="#F59E0B" />
              <path d="M34 15 Q46 22 52 30" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
              <rect x="50" y="28" width="4" height="7" rx="1.5" fill="#D97706" />
            </svg>
          </div>
        )}

        {/* 2. Mahkota Emas Raja (Tepat di Atas Kepala y=3%) */}
        {accessory === 'mahkota' && (
          <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[32%] pointer-events-none z-30 drop-shadow-md">
            <svg viewBox="0 0 58 36" className="w-full h-auto" fill="none">
              <path
                d="M4 28 L10 8 L22 20 L29 4 L36 20 L48 8 L54 28 Z"
                fill="#FBBF24"
                stroke="#D97706"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <rect x="4" y="28" width="50" height="5" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
              {/* Jewels */}
              <circle cx="29" cy="8" r="2.5" fill="#EF4444" />
              <circle cx="10" cy="11" r="2" fill="#3B82F6" />
              <circle cx="48" cy="11" r="2" fill="#10B981" />
              <circle cx="29" cy="30.5" r="2" fill="#3B82F6" />
              <circle cx="18" cy="30.5" r="1.5" fill="#EF4444" />
              <circle cx="40" cy="30.5" r="1.5" fill="#10B981" />
            </svg>
          </div>
        )}

        {/* 3. Topi Pesta Kerucut (Di Atas Kepala y=-4%) */}
        {accessory === 'topi-pesta' && (
          <div className="absolute -top-[4%] left-1/2 -translate-x-1/2 w-[24%] pointer-events-none z-30 drop-shadow-md rotate-6">
            <svg viewBox="0 0 44 54" className="w-full h-auto" fill="none">
              <polygon points="22,6 38,48 6,48" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="22" cy="24" r="2.5" fill="#FDE047" />
              <circle cx="15" cy="36" r="3" fill="#60A5FA" />
              <circle cx="29" cy="38" r="3" fill="#34D399" />
              <circle cx="22" cy="6" r="4.5" fill="#FACC15" />
            </svg>
          </div>
        )}

        {/* 4. Kacamata Hitam Keren (Tepat di Area Mata y=28%) */}
        {accessory === 'kacamata-hitam' && (
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[46%] pointer-events-none z-30 drop-shadow-md">
            <svg viewBox="0 0 108 34" className="w-full h-auto" fill="none">
              {/* Left Lens */}
              <path d="M6 6 Q28 6 48 8 L46 26 Q26 30 8 24 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              {/* Right Lens */}
              <path d="M60 8 Q80 6 102 6 L100 24 Q82 30 62 26 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              {/* Bridge */}
              <rect x="46" y="8" width="16" height="3.5" rx="1.5" fill="#334155" />
              {/* Highlights */}
              <line x1="14" y1="10" x2="36" y2="12" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
              <line x1="68" y1="12" x2="90" y2="10" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* 5. Kacamata Bulat Akademisi (Tepat di Area Mata y=27%) */}
        {accessory === 'kacamata-bulat' && (
          <div className="absolute top-[27%] left-1/2 -translate-x-1/2 w-[48%] pointer-events-none z-30 drop-shadow-md">
            <svg viewBox="0 0 112 40" className="w-full h-auto" fill="none">
              {/* Left Frame */}
              <circle cx="28" cy="20" r="18" fill="rgba(255,255,255,0.18)" stroke="#D97706" strokeWidth="3" />
              {/* Right Frame */}
              <circle cx="84" cy="20" r="18" fill="rgba(255,255,255,0.18)" stroke="#D97706" strokeWidth="3" />
              {/* Bridge */}
              <path d="M46 16 Q56 12 66 16" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Reflection */}
              <path d="M16 14 A 12 12 0 0 1 28 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M72 14 A 12 12 0 0 1 84 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        )}

        {/* 6. Pita Merah Cantik (Di Tanduk/Telinga Kanan y=10%) */}
        {accessory === 'pita-merah' && (
          <div className="absolute top-[10%] left-[67%] -translate-x-1/2 w-[20%] pointer-events-none z-30 drop-shadow-md rotate-12">
            <svg viewBox="0 0 42 34" className="w-full h-auto" fill="none">
              {/* Left loop */}
              <path d="M21 17 Q6 2 4 14 Q2 26 21 17 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              {/* Right loop */}
              <path d="M21 17 Q36 2 38 14 Q40 26 21 17 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              {/* Center knot */}
              <circle cx="21" cy="17" r="4.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
              {/* Ribbons hanging */}
              <path d="M19 20 L13 32 L19 29 L23 32 L22 20 Z" fill="#DC2626" />
            </svg>
          </div>
        )}

        {/* 7. Dasi Kupu-Kupu Elegan (Di Dada/Leher y=48%) */}
        {accessory === 'dasi-kupu' && (
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-[24%] pointer-events-none z-30 drop-shadow-md">
            <svg viewBox="0 0 52 30" className="w-full h-auto" fill="none">
              {/* Left wing */}
              <polygon points="26,15 4,4 6,26" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Right wing */}
              <polygon points="26,15 48,4 46,26" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Knot */}
              <rect x="22" y="10" width="8" height="10" rx="3" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
            </svg>
          </div>
        )}

      </div>
    </div>
  );
};
