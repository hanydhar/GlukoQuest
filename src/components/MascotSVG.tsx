import React from 'react';

export type MascotFormKey = 'classic' | 'blob' | 'fluffy' | 'sprout' | 'mochi' | 'chibi';
export type FurColorKey = 'tosca' | 'sky' | 'purple' | 'peach' | 'pink' | 'emerald';
export type HeadwearKey = 'none' | 'cap' | 'crown' | 'headband' | 'grad_cap';
export type EyewearKey = 'none' | 'glasses' | 'sunglasses' | 'star_glasses';
export type NeckwearKey = 'none' | 'medal' | 'bowtie' | 'scarf';

export interface MascotCustomization {
  form: MascotFormKey;
  furColor: FurColorKey;
  headwear: HeadwearKey;
  eyewear: EyewearKey;
  neckwear: NeckwearKey;
}

interface MascotSVGProps {
  mood?: 'happy' | 'tired';
  className?: string;
  size?: number;
  isEating?: boolean;
  customization?: MascotCustomization;
}

export const MASCOT_FORMS: { key: MascotFormKey; name: string; icon: string; desc: string; tag: string }[] = [
  { key: 'classic', name: 'Gogi Klasik', icon: '🦖', desc: 'Bentuk monster tosca asli dengan tanduk bergaris', tag: 'Asli Referensi' },
  { key: 'blob', name: 'Boba Jelly', icon: '🫧', desc: 'Bentuk bulat squishy menggemaskan & pipi bantal super chubby', tag: 'Super Gemoy' },
  { key: 'fluffy', name: 'Pompom Bulu', icon: '☁️', desc: 'Siluet awan berbulu lembut dengan tanduk mini lucu', tag: 'Lembut & Imut' },
  { key: 'sprout', name: 'Dino Tunas', icon: '🌱', desc: 'Monster imut bermahkotakan tunas daun keberuntungan', tag: 'Segar & Ceria' },
  { key: 'mochi', name: 'Mochi Manis', icon: '🍡', desc: 'Monster siluet mochi empuk dengan senyum imut menggemaskan', tag: 'Favorit Lucu' },
  { key: 'chibi', name: 'Chibi Star', icon: '⭐', desc: 'Monster chibi mungil berkepala bulat & pipi tembam merona', tag: 'Mini & Manis' },
];

export const FUR_PALETTES: Record<
  FurColorKey,
  {
    name: string;
    bodyStart: string;
    bodyMid: string;
    bodyEnd: string;
    bellyStart: string;
    bellyEnd: string;
    accentDark: string;
    tuft: string;
  }
> = {
  tosca: {
    name: 'Tosca Asli',
    bodyStart: '#27D6B2',
    bodyMid: '#1BCBA5',
    bodyEnd: '#13A886',
    bellyStart: '#84E8D1',
    bellyEnd: '#68DCBF',
    accentDark: '#0E856A',
    tuft: '#2CE6BE',
  },
  sky: {
    name: 'Biru Langit',
    bodyStart: '#38BDF8',
    bodyMid: '#0284C7',
    bodyEnd: '#0369A1',
    bellyStart: '#BAE6FD',
    bellyEnd: '#7DD3FC',
    accentDark: '#075985',
    tuft: '#60A5FA',
  },
  purple: {
    name: 'Lilac Manis',
    bodyStart: '#C084FC',
    bodyMid: '#9333EA',
    bodyEnd: '#7E22CE',
    bellyStart: '#E9D5FF',
    bellyEnd: '#D8B4FE',
    accentDark: '#6B21A8',
    tuft: '#D8B4FE',
  },
  peach: {
    name: 'Peach Oranye',
    bodyStart: '#FB923C',
    bodyMid: '#EA580C',
    bodyEnd: '#C2410C',
    bellyStart: '#FED7AA',
    bellyEnd: '#FDBA74',
    accentDark: '#9A3412',
    tuft: '#FDBA74',
  },
  pink: {
    name: 'Berry Pink',
    bodyStart: '#F472B6',
    bodyMid: '#DB2777',
    bodyEnd: '#BE185D',
    bellyStart: '#FBCFE8',
    bellyEnd: '#F9A8D4',
    accentDark: '#9D174D',
    tuft: '#F472B6',
  },
  emerald: {
    name: 'Hijau Daun',
    bodyStart: '#34D399',
    bodyMid: '#059669',
    bodyEnd: '#047857',
    bellyStart: '#A7F3D0',
    bellyEnd: '#6EE7B7',
    accentDark: '#065F46',
    tuft: '#6EE7B7',
  },
};

export const MascotSVG: React.FC<MascotSVGProps> = ({
  mood = 'happy',
  className = '',
  size = 208,
  isEating = false,
  customization = {
    form: 'classic',
    furColor: 'tosca',
    headwear: 'none',
    eyewear: 'none',
    neckwear: 'none',
  },
}) => {
  const isHappy = mood === 'happy';
  const fur = FUR_PALETTES[customization.furColor] || FUR_PALETTES.tosca;
  const formKey = customization.form || 'classic';
  const { headwear, eyewear, neckwear } = customization;

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Feeding heart / fruit indicator when eating */}
      {isEating && (
        <div className="absolute -top-4 z-20 flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
          <span>🍎 Nyam! Kenyang & Bugar</span>
          <span className="text-rose-200">❤️</span>
        </div>
      )}

      {/* Floating sweatdrop or sleepy icon when tired */}
      {!isHappy && !isEating && (
        <div className="absolute top-2 right-6 z-20 flex items-center gap-1 bg-sky-100/90 border border-sky-300 text-sky-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs animate-pulse">
          <span>💧 Lesu</span>
          <span className="text-slate-400">💤</span>
        </div>
      )}

      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 240 248"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 ease-in-out"
      >
        <defs>
          {/* Fur Gradients */}
          <linearGradient id={`mFurGrad_${customization.furColor}`} x1="120" y1="36" x2="120" y2="198" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={fur.bodyStart} />
            <stop offset="55%" stopColor={fur.bodyMid} />
            <stop offset="100%" stopColor={fur.bodyEnd} />
          </linearGradient>

          <linearGradient id={`mBellyGrad_${customization.furColor}`} x1="120" y1="122" x2="120" y2="186" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={fur.bellyStart} stopOpacity="0.95" />
            <stop offset="100%" stopColor={fur.bellyEnd} stopOpacity="0.88" />
          </linearGradient>

          {/* Tanduk Monster (Curved Horns with Tan-Orange Gradient) */}
          <linearGradient id="mHornGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#F6C361" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Pedestal Grass Gradient */}
          <linearGradient id="mGrassMound" x1="120" y1="194" x2="120" y2="238" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9BD854" />
            <stop offset="65%" stopColor="#81C43B" />
            <stop offset="100%" stopColor="#67A026" />
          </linearGradient>

          {/* Cheek Glow Gradient */}
          <radialGradient id="mBlushGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF728A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF728A" stopOpacity="0" />
          </radialGradient>

          <filter id="mDropShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0B2E24" floodOpacity="0.14" />
          </filter>
        </defs>

        {/* --- 1. BASE PEDESTAL (GRASS & EARTH ISLAND) --- */}
        <g id="pedestal-island">
          <ellipse cx="120" cy="225" rx="74" ry="14" fill="#604126" />
          <ellipse cx="120" cy="222" rx="72" ry="13" fill="#755030" />
          <ellipse cx="120" cy="216" rx="70" ry="14" fill="url(#mGrassMound)" />
          <ellipse cx="120" cy="213" rx="66" ry="11" fill="#A4DE5B" />

          {/* Rerumputan di sisi kiri dan kanan */}
          <path d="M68 214 C65 204 70 202 73 209 Z" fill="#7DBE36" />
          <path d="M74 213 C72 201 78 200 81 207 Z" fill="#8ACF3E" />
          <path d="M82 215 C80 207 85 205 88 211 Z" fill="#7DBE36" />
          <path d="M156 215 C159 207 163 207 161 214 Z" fill="#7DBE36" />
          <path d="M163 213 C166 201 172 202 170 208 Z" fill="#8ACF3E" />
          <path d="M171 214 C175 205 179 207 176 213 Z" fill="#7DBE36" />

          {/* Bayangan Halus di Bawah Monster */}
          <ellipse cx="120" cy="212" rx="46" ry="9" fill="#3B6916" fillOpacity="0.35" />
        </g>

        {/* --- 2. MASCOT BODY CONTAINER (KONSISTEN UNTUK CERIA & LESU) --- */}
        <g
          id="mascot-body-wrapper"
          className={isHappy ? (isEating ? 'animate-bounce' : 'animate-mascot-float') : 'animate-pulse'}
          filter="url(#mDropShadow)"
        >
          {/* Subtle fatigue posture adjustment (slight weary sink when tired) */}
          <g transform={isHappy ? '' : 'translate(0, 4) scale(1, 0.99)'}>

            {/* A. TAIL PEAKING BEHIND (UNTUK DINO KLASIK & DINO TUNAS) */}
            {(formKey === 'classic' || formKey === 'sprout') && (
              <g id="mascot-tail">
                <path
                  d={
                    isHappy
                      ? "M72 165 C50 162 42 180 54 192 C62 196 72 188 76 178 Z"
                      : "M72 170 C52 172 46 188 56 195 C63 198 70 190 74 182 Z"
                  }
                  fill={`url(#mFurGrad_${customization.furColor})`}
                  stroke={fur.accentDark}
                  strokeWidth="0.8"
                />
                {/* Back scales */}
                <path d="M68 152 C60 152 60 160 67 163 Z" fill={fur.accentDark} />
                <path d="M64 168 C58 170 59 178 66 178 Z" fill={fur.accentDark} />
              </g>
            )}

            {/* B. SHORT STUBBY LEGS (KONSISTEN) */}
            <g id="mascot-feet">
              <ellipse cx="96" cy="199" rx="14" ry="10" fill={fur.accentDark} />
              <ellipse cx="144" cy="199" rx="14" ry="10" fill={fur.accentDark} />
              {/* Cute little claw pads */}
              <circle cx="91" cy="202" r="2.2" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="96" cy="203" r="2.2" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="101" cy="202" r="2.2" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="139" cy="202" r="2.2" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="144" cy="203" r="2.2" fill="#FFFFFF" fillOpacity="0.8" />
              <circle cx="149" cy="202" r="2.2" fill="#FFFFFF" fillOpacity="0.8" />
            </g>

            {/* C. BODY SHAPE VARIANTS (100% PERSISTEN DI SEMUA KONDISI) */}
            <g id="mascot-torso">
              {formKey === 'classic' && (
                /* 1. GOGI KLASIK: Chubby Dinosaur Bean Monster */
                <path
                  d="M120 46
                     C76 46 62 82 62 126
                     C62 166 74 198 120 198
                     C166 198 178 166 178 126
                     C178 82 164 46 120 46 Z"
                  fill={`url(#mFurGrad_${customization.furColor})`}
                />
              )}

              {formKey === 'blob' && (
                /* 2. BOBA JELLY: Squishy round teardrop with bouncy chubby cheeks */
                <path
                  d="M120 54
                     C76 54 54 90 54 136
                     C54 180 70 200 120 200
                     C170 200 186 180 186 136
                     C186 90 164 54 120 54 Z"
                  fill={`url(#mFurGrad_${customization.furColor})`}
                />
              )}

              {formKey === 'fluffy' && (
                /* 3. POMPOM BULU: Scalloped fluffy cloud monster with soft round lobes */
                <path
                  d="M120 46
                     C92 44 76 60 70 76
                     C60 90 56 108 60 126
                     C54 146 58 168 70 182
                     C84 198 102 198 120 198
                     C138 198 156 198 170 182
                     C182 168 186 146 180 126
                     C184 108 180 90 170 76
                     C164 60 148 44 120 46 Z"
                  fill={`url(#mFurGrad_${customization.furColor})`}
                />
              )}

              {formKey === 'sprout' && (
                /* 4. DINO TUNAS: Baby Round Dino with smooth chubby body */
                <path
                  d="M120 48
                     C78 48 64 84 64 124
                     C64 164 74 198 120 198
                     C166 198 176 164 176 124
                     C176 84 162 48 120 48 Z"
                  fill={`url(#mFurGrad_${customization.furColor})`}
                />
              )}

              {formKey === 'mochi' && (
                /* 5. MOCHI MANIS: Plump squishy wide dumpling mochi */
                <path
                  d="M120 52
                     C68 52 52 90 52 138
                     C52 182 72 200 120 200
                     C168 200 188 182 188 138
                     C188 90 172 52 120 52 Z"
                  fill={`url(#mFurGrad_${customization.furColor})`}
                />
              )}

              {formKey === 'chibi' && (
                /* 6. CHIBI STAR: Big kawaii round baby head + petite chubby body */
                <path
                  d="M120 44
                     C74 44 60 78 60 118
                     C60 152 70 172 80 182
                     C90 192 104 198 120 198
                     C136 198 150 192 160 182
                     C170 172 180 152 180 118
                     C180 78 166 44 120 44 Z"
                  fill={`url(#mFurGrad_${customization.furColor})`}
                />
              )}
            </g>

            {/* D. BELLY PATCH (KONSISTEN SESUAI KARAKTER) */}
            <g id="mascot-belly">
              {formKey === 'fluffy' ? (
                /* Scalloped Fluffy Cloud Belly */
                <path
                  d="M120 126
                     C104 126 94 136 94 150
                     C88 162 94 176 104 184
                     C112 188 128 188 136 184
                     C146 176 152 162 146 150
                     C146 136 136 126 120 126 Z"
                  fill={`url(#mBellyGrad_${customization.furColor})`}
                />
              ) : formKey === 'mochi' ? (
                /* Sweet Heart / Round Patch */
                <ellipse cx="120" cy="156" rx="30" ry="26" fill={`url(#mBellyGrad_${customization.furColor})`} />
              ) : formKey === 'chibi' ? (
                /* Mini Chibi Tummy */
                <ellipse cx="120" cy="158" rx="26" ry="24" fill={`url(#mBellyGrad_${customization.furColor})`} />
              ) : (
                /* Classic & Blob Chubby Oval Belly */
                <path
                  d="M120 124
                     C100 124 88 138 88 162
                     C88 180 102 188 120 188
                     C138 188 152 180 152 162
                     C152 138 140 124 120 124 Z"
                  fill={`url(#mBellyGrad_${customization.furColor})`}
                />
              )}
            </g>

            {/* E. HEAD ADORNMENTS (BERUBAH SECARA HALUS SAAT LESU, TETAP BENTUK ASLI) */}
            <g id="mascot-head-adornment">
              {formKey === 'sprout' ? (
                /* Lucky Clover Leaf Sprout on Head */
                <g transform={isHappy ? 'translate(120, 44)' : 'translate(120, 48) rotate(18)'}>
                  <path d="M0 0 Q2 -14 0 -18" stroke="#166534" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="-6" cy="-18" rx="6" ry="4" transform="rotate(-30 -6 -18)" fill="#22C55E" />
                  <ellipse cx="6" cy="-18" rx="6" ry="4" transform="rotate(30 6 -18)" fill="#4ADE80" />
                  {!isHappy && (
                    <circle cx="8" cy="-12" r="1.8" fill="#38BDF8" />
                  )}
                </g>
              ) : formKey === 'fluffy' ? (
                /* Fluffy Soft Puffs on Head */
                <g transform={isHappy ? '' : 'translate(0, 3)'}>
                  <circle cx="112" cy="46" r="6.5" fill={fur.tuft} />
                  <circle cx="120" cy="41" r="7.5" fill={fur.bodyStart} />
                  <circle cx="128" cy="46" r="6.5" fill={fur.tuft} />
                </g>
              ) : formKey === 'chibi' ? (
                /* Chibi Mini Golden Star on Head */
                <g transform={isHappy ? 'translate(120, 40)' : 'translate(120, 44) rotate(-15)'}>
                  <polygon
                    points="0,-9 2.8,-2.8 9,-2.8 4,1.8 6,8 0,4 -6,8 -4,1.8 -9,-2.8 -2.8,-2.8"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="1.2"
                  />
                  {isHappy && (
                    <circle cx="0" cy="0" r="1.8" fill="#FEF08A" />
                  )}
                </g>
              ) : formKey === 'mochi' ? (
                /* Mochi Cute Twin Soft Puffs */
                <g transform={isHappy ? '' : 'translate(0, 3)'}>
                  <ellipse cx="113" cy="48" rx="5.5" ry="6.5" fill={fur.tuft} />
                  <ellipse cx="127" cy="48" rx="5.5" ry="6.5" fill={fur.tuft} />
                </g>
              ) : (
                /* 3 Hair Tufts on Head (Classic & Blob) */
                <g transform={isHappy ? '' : 'translate(0, 4) rotate(6 120 48)'}>
                  <path d="M120 46 C117 31 123 30 126 44 Z" fill={fur.tuft} />
                  <path d="M113 48 C109 36 114 34 117 46 Z" fill={fur.bodyMid} />
                  <path d="M126 48 C129 37 134 38 130 47 Z" fill={fur.bodyEnd} />
                </g>
              )}
            </g>

            {/* F. TANDUK MONSTER (BERUBAH SUDUT SAAT LESU: CERIA = TEGAK, LESU = TERKULAI IMUT) */}
            <g id="mascot-horns">
              {/* Tanduk Kiri */}
              <g transform={isHappy ? 'rotate(-6 86 62)' : 'rotate(-24 84 72) translate(-2, 4)'}>
                <path
                  d="M84 66 C80 46 67 32 60 34 C55 37 60 55 74 72 Z"
                  fill="url(#mHornGrad)"
                  stroke="#965D1D"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M68 47 C71 49 74 53 75 57" stroke="#8C4F13" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M72 58 C76 60 79 63 80 67" stroke="#8C4F13" strokeWidth="2.8" strokeLinecap="round" />
              </g>

              {/* Tanduk Kanan */}
              <g transform={isHappy ? 'rotate(6 154 62)' : 'rotate(24 156 72) translate(2, 4)'}>
                <path
                  d="M156 66 C160 46 173 32 180 34 C185 37 180 55 166 72 Z"
                  fill="url(#mHornGrad)"
                  stroke="#965D1D"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M172 47 C169 49 166 53 165 57" stroke="#8C4F13" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M168 58 C164 60 161 63 160 67" stroke="#8C4F13" strokeWidth="2.8" strokeLinecap="round" />
              </g>
            </g>

            {/* G. ARMS / PAWS (CERIA = MELAMBAI & RELAKS, LESU = ISTIRAHAT DI PERUT IMUT) */}
            <g id="mascot-arms">
              {isHappy ? (
                <>
                  {/* Left Arm (Relaxed) */}
                  <path
                    d="M168 126
                       C178 136 182 162 168 172
                       C162 176 156 168 158 156
                       C160 144 158 133 156 128 Z"
                    fill={`url(#mFurGrad_${customization.furColor})`}
                  />
                  <circle cx="163" cy="170" r="3" fill={fur.bodyMid} />
                  <circle cx="168" cy="168" r="3" fill={fur.bodyMid} />

                  {/* Waving Right Hand */}
                  <g className="animate-arm-wave">
                    <path
                      d="M74 118
                         C60 106 45 86 46 74
                         C47 68 56 68 59 74
                         C60 70 67 69 69 75
                         C71 71 78 72 78 79
                         C82 90 82 106 80 118 Z"
                      fill={`url(#mFurGrad_${customization.furColor})`}
                      stroke={fur.accentDark}
                      strokeWidth="1"
                    />
                    <circle cx="53" cy="73" r="2.5" fill={fur.tuft} />
                    <circle cx="63" cy="71" r="2.5" fill={fur.tuft} />
                    <circle cx="73" cy="74" r="2.5" fill={fur.tuft} />
                  </g>
                </>
              ) : (
                /* Droopy Cute Arms resting softly on tummy */
                <g id="tired-arms">
                  {/* Right Arm resting on belly */}
                  <path
                    d="M72 126
                       C64 138 68 162 82 168
                       C90 171 96 164 92 154
                       C88 144 82 134 76 128 Z"
                    fill={`url(#mFurGrad_${customization.furColor})`}
                    stroke={fur.accentDark}
                    strokeWidth="0.8"
                  />
                  <circle cx="88" cy="164" r="2.5" fill={fur.bodyMid} />

                  {/* Left Arm resting on belly */}
                  <path
                    d="M168 126
                       C176 138 172 162 158 168
                       C150 171 144 164 148 154
                       C152 144 158 134 164 128 Z"
                    fill={`url(#mFurGrad_${customization.furColor})`}
                    stroke={fur.accentDark}
                    strokeWidth="0.8"
                  />
                  <circle cx="152" cy="164" r="2.5" fill={fur.bodyMid} />
                </g>
              )}
            </g>

            {/* H. CHEEKS (PIPI MERONA / BLUSH) */}
            <g id="mascot-cheeks">
              {isHappy ? (
                <>
                  <ellipse cx="88" cy="113" rx="8" ry="5" fill="#FF728A" fillOpacity="0.88" />
                  <ellipse cx="152" cy="113" rx="8" ry="5" fill="#FF728A" fillOpacity="0.88" />
                  {/* Cute sparkle dots on blush */}
                  <circle cx="86" cy="112" r="1.2" fill="#FFFFFF" />
                  <circle cx="154" cy="112" r="1.2" fill="#FFFFFF" />
                </>
              ) : (
                <>
                  <ellipse cx="88" cy="114" rx="7.5" ry="4" fill="#FF8A9E" fillOpacity="0.75" />
                  <ellipse cx="152" cy="114" rx="7.5" ry="4" fill="#FF8A9E" fillOpacity="0.75" />
                  {/* Teardrop / Sweatdrop on tired cheek */}
                  <path
                    d="M74 104 C71 99 76 94 78 98 C80 102 78 108 74 104 Z"
                    fill="#38BDF8"
                  />
                  <circle cx="75" cy="103" r="1" fill="#FFFFFF" />
                </>
              )}
            </g>

            {/* I. EYEBROWS */}
            <g id="mascot-brows">
              {isHappy ? (
                <>
                  <path d="M96 85 C99 82 106 82 109 85" stroke="#104B3E" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M131 85 C134 82 141 82 144 85" stroke="#104B3E" strokeWidth="2.2" strokeLinecap="round" />
                </>
              ) : (
                /* Cute worried puppy-dog brows (angled up in center) */
                <>
                  <path d="M96 84 C100 86 106 87 110 89" stroke="#104B3E" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M144 84 C140 86 134 87 130 89" stroke="#104B3E" strokeWidth="2.4" strokeLinecap="round" />
                </>
              )}
            </g>

            {/* J. EYES (BINAR BERKILAU SAAT CERIA / SAYU IMUT SAAT LESU) */}
            <g id="mascot-eyes">
              {isHappy ? (
                <>
                  {/* Big Glossy Chibi Pupils */}
                  <ellipse cx="102" cy="96" rx="9.8" ry="11.8" fill="#142823" />
                  <ellipse cx="138" cy="96" rx="9.8" ry="11.8" fill="#142823" />

                  {/* Binar Mata Utama (Highlight Besar) */}
                  <circle cx="99" cy="92" r="3.8" fill="#FFFFFF" />
                  <circle cx="135" cy="92" r="3.8" fill="#FFFFFF" />

                  {/* Binar Mata Sekunder (Sparkle Bawah) */}
                  <circle cx="105" cy="100" r="2.0" fill="#FFFFFF" />
                  <circle cx="141" cy="100" r="2.0" fill="#FFFFFF" />

                  {/* Kilau Halus Samping */}
                  <circle cx="96.5" cy="97" r="1.3" fill="#BAE6FD" />
                  <circle cx="132.5" cy="97" r="1.3" fill="#BAE6FD" />
                </>
              ) : (
                /* Cute sleepy/droopy watery anime eyes (super cute & expressive, not creepy!) */
                <>
                  {/* Shadow socket */}
                  <ellipse cx="102" cy="98" rx="10" ry="8" fill="#0F3B32" fillOpacity="0.15" />
                  <ellipse cx="138" cy="98" rx="10" ry="8" fill="#0F3B32" fillOpacity="0.15" />

                  {/* Droopy Kawaii Eyelids curve */}
                  <path
                    d="M92 98 C94 91 110 91 112 98 C112 105 92 105 92 98 Z"
                    fill="#142823"
                  />
                  <path
                    d="M128 98 C130 91 146 91 148 98 C148 105 128 105 128 98 Z"
                    fill="#142823"
                  />

                  {/* Gentle watery shine in tired eyes */}
                  <circle cx="98" cy="96" r="2.6" fill="#FFFFFF" />
                  <circle cx="134" cy="96" r="2.6" fill="#FFFFFF" />
                  <circle cx="104" cy="99" r="1.4" fill="#BAE6FD" />
                  <circle cx="140" cy="99" r="1.4" fill="#BAE6FD" />

                  {/* Lower eyelid line */}
                  <path d="M94 100 Q102 103 110 100" stroke="#104B3E" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  <path d="M130 100 Q138 103 146 100" stroke="#104B3E" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                </>
              )}
            </g>

            {/* K. MOUTH (SENYUM CERIA DENGAN GIGI TARING / CUTE WAVY POUT SAAT LESU) */}
            <g id="mascot-mouth">
              {isHappy ? (
                <>
                  <path
                    d="M106 110
                       C106 110 110 128 120 128
                       C130 128 134 110 134 110
                       Z"
                    fill="#7E1D35"
                  />
                  <path
                    d="M112 122
                       C115 118 125 118 128 122
                       C125 128 115 128 112 122 Z"
                    fill="#FF708D"
                  />
                  {/* Two cute tiny baby teeth */}
                  <polygon points="112,110 114.5,114 117,110" fill="#FFFFFF" />
                  <polygon points="123,110 125.5,114 128,110" fill="#FFFFFF" />
                  <path d="M104 110 Q120 113 136 110" stroke="#142823" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                </>
              ) : (
                /* Cute trembling pout (｡•́︿•̀｡) */
                <>
                  <path
                    d="M109 118 Q115 113 120 116 Q125 119 131 114"
                    stroke="#142823"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Tiny baby fang peeking out adorably */}
                  <polygon points="113,116 115,119 117,117" fill="#FFFFFF" />
                </>
              )}
            </g>

            {/* L. EATING ANIMATION (APEL SEHAT) */}
            {isEating && (
              <g id="eating-apple" transform="translate(110, 118)">
                <circle cx="10" cy="10" r="9" fill="#EF4444" />
                <path d="M10 2 Q14 -3 14 -5" stroke="#78350F" strokeWidth="1.5" fill="none" />
                <ellipse cx="15" cy="-2" rx="3.5" ry="2" fill="#22C55E" />
              </g>
            )}

          </g>
        </g>

        {/* --- 3. AKSESORIS OPSIONAL (TETAP KONSISTEN) --- */}
        <g id="accessories-layer">
          {neckwear !== 'none' && (
            <g id="accessory-neckwear">
              {neckwear === 'medal' && (
                <g transform="translate(108, 126)">
                  <path d="M4 0 L12 18 L6 18 Z" fill="#EF4444" />
                  <path d="M20 0 L12 18 L18 18 Z" fill="#3B82F6" />
                  <circle cx="12" cy="22" r="10" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
                  <circle cx="12" cy="22" r="7.5" fill="#F59E0B" />
                  <text x="12" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">1</text>
                </g>
              )}
              {neckwear === 'bowtie' && (
                <g transform="translate(105, 128)">
                  <polygon points="0,0 15,7.5 0,15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
                  <polygon points="30,0 15,7.5 30,15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
                  <circle cx="15" cy="7.5" r="4.5" fill="#DC2626" />
                </g>
              )}
            </g>
          )}

          {eyewear !== 'none' && isHappy && (
            <g id="accessory-eyewear">
              {eyewear === 'glasses' && (
                <g transform="translate(86, 84)">
                  <circle cx="16" cy="14" r="13" fill="none" stroke="#1E293B" strokeWidth="3" />
                  <circle cx="52" cy="14" r="13" fill="none" stroke="#1E293B" strokeWidth="3" />
                  <line x1="29" y1="14" x2="39" y2="14" stroke="#1E293B" strokeWidth="3" />
                </g>
              )}
              {eyewear === 'sunglasses' && (
                <g transform="translate(84, 86)">
                  <path d="M4 4 Q18 4 30 8 L28 20 Q16 23 6 18 Z" fill="#0F172A" />
                  <path d="M38 8 Q50 4 64 4 L62 18 Q52 23 40 20 Z" fill="#0F172A" />
                  <line x1="28" y1="8" x2="40" y2="8" stroke="#334155" strokeWidth="3" />
                </g>
              )}
            </g>
          )}

          {headwear !== 'none' && (
            <g id="accessory-headwear" transform={isHappy ? '' : 'translate(0, 3)'}>
              {headwear === 'cap' && (
                <g transform="translate(82, 28)">
                  <path d="M12 28 C12 12 64 12 64 28 Z" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.5" />
                  <ellipse cx="38" cy="28" rx="26" ry="6" fill="#1E40AF" />
                  <path d="M8 28 C8 24 -12 36 -10 40 C0 42 24 34 32 30 Z" fill="#1E3A8A" />
                  <circle cx="38" cy="14" r="3" fill="#FBBF24" />
                  <text x="38" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">SMP</text>
                </g>
              )}
              {headwear === 'crown' && (
                <g transform="translate(96, 26)">
                  <polygon points="0,22 8,6 24,14 40,6 48,22" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
                  <rect x="0" y="20" width="48" height="5" rx="1.5" fill="#D97706" />
                </g>
              )}
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
