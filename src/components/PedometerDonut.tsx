import React from 'react';

interface PedometerDonutProps {
  currentSteps: number;
  targetSteps: number;
  size?: number;
}

export const PedometerDonut: React.FC<PedometerDonutProps> = ({
  currentSteps,
  targetSteps,
  size = 190,
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((currentSteps / targetSteps) * 100, 100);
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const isGoalReached = currentSteps >= targetSteps;

  const formattedCurrent = currentSteps.toLocaleString('id-ID');
  const formattedTarget = targetSteps.toLocaleString('id-ID');

  return (
    <div className="flex flex-col items-center justify-center my-1">
      {/* Donut Chart Container */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 drop-shadow-sm"
        >
          <defs>
            <linearGradient id="pedometerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1ABC9C" />
              <stop offset="50%" stopColor="#2ECC71" />
              <stop offset="100%" stopColor="#27AE60" />
            </linearGradient>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EEF2F6" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#bgGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Foreground Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#pedometerGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 pointer-events-none">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-0.5">
            Langkah Hari Ini
          </span>
          <div className="text-[21px] font-extrabold text-slate-800 tracking-tight leading-none">
            {formattedCurrent} <span className="text-slate-400 font-semibold text-sm">/ {formattedTarget}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <i className="fa-solid fa-fire text-orange-500 text-[10px]"></i>
            <span>{Math.round(currentSteps * 0.04)} kkal</span>
          </div>
        </div>
      </div>

      {/* Target status label under the chart */}
      <div className="mt-2 flex items-center gap-1.5 text-center">
        {isGoalReached ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/90 border border-emerald-200 px-3 py-1 rounded-full shadow-xs">
            <i className="fa-solid fa-circle-check text-emerald-500"></i>
            Target Harian Tercapai! 🎉
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            <i className="fa-solid fa-person-walking text-teal-500"></i>
            Sisa {(targetSteps - currentSteps).toLocaleString('id-ID')} langkah menuju target
          </span>
        )}
      </div>
    </div>
  );
};
