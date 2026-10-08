import React from 'react';

export type MascotMood = 'happy' | 'neutral' | 'tired';

interface MascotSVGProps {
  mood?: MascotMood;
  className?: string;
  size?: number;
  isEating?: boolean;
}

export const MascotSVG: React.FC<MascotSVGProps> = ({
  mood = 'happy',
  className = '',
  size = 210,
  isEating = false,
}) => {
  const isHappy = mood === 'happy';
  const isNeutral = mood === 'neutral';
  const isTired = mood === 'tired';

  const imageSrc = isTired
    ? '/assets/mascot/tired.png'
    : isNeutral
    ? '/assets/mascot/neutral.png'
    : '/assets/mascot/happy.png';

  const moodLabel = isTired ? 'Lesu (Mulut Melengkung ke Bawah)' : isNeutral ? 'Netral (Mulut Datar)' : 'Ceria & Bugar';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Indikator makan saat diberi apel */}
      {isEating && (
        <div className="absolute -top-3 z-20 flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
          <span>🍎 Nyam! Kenyang & Bugar</span>
          <span className="text-rose-200">❤️</span>
        </div>
      )}

      {/* Badge status saat lesu */}
      {isTired && !isEating && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-amber-50/95 border border-amber-300 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs animate-pulse">
          <span>💧 Lesu</span>
          <span className="text-slate-400">💤</span>
        </div>
      )}

      {/* Gambar Asli Karakter Virtual Pet Transparan */}
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`relative flex items-center justify-center transition-transform duration-300 ${
          isHappy ? (isEating ? 'animate-bounce' : 'animate-mascot-float') : isTired ? 'animate-pulse' : 'animate-mascot-bounce'
        }`}
      >
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
      </div>
    </div>
  );
};
