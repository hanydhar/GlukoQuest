import React from 'react';

interface CompactStepCardProps {
  currentSteps: number;
  targetSteps: number;
  onOpenTargetModal?: () => void;
}

export const CompactStepCard: React.FC<CompactStepCardProps> = ({
  currentSteps,
  targetSteps,
  onOpenTargetModal,
}) => {
  const percentage = Math.round((currentSteps / targetSteps) * 100);
  
  // Progress Ring Calculations
  const ringRadius = 26;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringPercentage = Math.min(percentage, 100);
  const ringOffset = ringCircumference - (ringCircumference * ringPercentage) / 100;

  const formattedCurrent = currentSteps.toLocaleString('id-ID');
  const formattedTarget = targetSteps.toLocaleString('id-ID');

  // 7 Days Streak Data (Senin - Minggu)
  // Hari ke-5 (Kamis) adalah hari aktif saat ini
  const days = [
    { label: 'Sen', status: 'done' },
    { label: 'Sel', status: 'done' },
    { label: 'Rab', status: 'done' },
    { label: 'Kam', status: 'done' },
    { label: 'Jum', status: 'current', dayName: 'Kam' },
    { label: 'Sab', status: 'future' },
    { label: 'Min', status: 'future' },
  ];

  const isCompleted = percentage >= 100;

  return (
    <div className="w-full bg-[#0E6C5E] text-white rounded-[26px] p-4.5 sm:p-5 shadow-xs border border-[#0B5A4E] transition-all">
      {/* Top Row: Langkah Hari Ini & Progress Circular Ring */}
      <div className="flex items-center justify-between">
        {/* Left Side: Text Info */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-emerald-100/90 leading-tight">
            Langkah hari ini
          </span>
          <span className="text-3xl sm:text-[34px] font-black text-white tracking-tight leading-none my-1">
            {formattedCurrent}
          </span>
          <button
            type="button"
            onClick={onOpenTargetModal}
            className="text-xs font-normal text-emerald-100/80 text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Target {formattedTarget} langkah</span>
          </button>
        </div>

        {/* Right Side: Circular Progress Ring */}
        <div
          onClick={onOpenTargetModal}
          className="relative w-[72px] h-[72px] flex items-center justify-center flex-shrink-0 cursor-pointer group"
          title="Lihat target langkah & konversi energi"
        >
          <svg className="w-[72px] h-[72px] transform -rotate-90" viewBox="0 0 64 64">
            {/* Background Dark Track */}
            <circle
              cx="32"
              cy="32"
              r={ringRadius}
              fill="transparent"
              stroke="#094A40"
              strokeWidth="5.5"
            />
            {/* Progress Stroke (Amber/Golden Yellow) */}
            <circle
              cx="32"
              cy="32"
              r={ringRadius}
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="5.5"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Text inside Ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-base sm:text-lg font-black text-white leading-none">
              {percentage}%
            </span>
            <span className="text-[9px] font-medium text-emerald-100/90 leading-none mt-1">
              kemajuan
            </span>
          </div>
        </div>
      </div>

      {/* Thin Subtle Divider Line */}
      <div className="w-full h-px bg-white/15 my-3.5" />

      {/* Bottom Row: 7-Day Streak & Status Badge */}
      <div className="flex items-center justify-between">
        {/* Left Side: 7 Day Indicators */}
        <div className="flex items-center gap-1.5">
          {days.map((d, idx) => {
            if (d.status === 'done') {
              return (
                <div
                  key={idx}
                  className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-amber-400 text-[#0E6C5E] flex items-center justify-center shadow-2xs"
                  title={`Hari ${idx + 1}: Selesai`}
                >
                  <i className="fa-solid fa-check text-[9px] sm:text-[10px] text-[#0E6C5E] font-black"></i>
                </div>
              );
            }
            if (d.status === 'current') {
              return (
                <div
                  key={idx}
                  className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-white text-[#0E6C5E] flex items-center justify-center font-bold text-[9px] sm:text-[10px] shadow-2xs"
                  title={`Hari ini (${d.dayName || 'Kam'})`}
                >
                  {d.dayName || 'Kam'}
                </div>
              );
            }
            return (
              <div
                key={idx}
                className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full border border-dashed border-emerald-300/50 bg-transparent"
                title={`Hari ${idx + 1}: Belum tercapai`}
              />
            );
          })}
        </div>

        {/* Right Side: Status Badge */}
        <button
          type="button"
          onClick={onOpenTargetModal}
          className="px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-emerald-950 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
        >
          <i className="fa-solid fa-trophy text-[11px] text-emerald-950"></i>
          <span>{isCompleted ? 'Tercapai' : `${percentage}% Selesai`}</span>
        </button>
      </div>
    </div>
  );
};
