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
  const ringRadius = 14;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringPercentage = Math.min(percentage, 100);
  const ringOffset = ringCircumference - (ringCircumference * ringPercentage) / 100;

  const formattedCurrent = currentSteps.toLocaleString('id-ID');
  const formattedTarget = targetSteps.toLocaleString('id-ID');

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-emerald-200/80 transition-all hover:border-emerald-300">
      <div className="flex items-center justify-between">
        {/* Left Side: Total, Big Steps, Hari Ini */}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-emerald-700 tracking-wide uppercase leading-none">
            Total
          </span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl font-black tracking-tight text-slate-800 leading-none">
              {formattedCurrent}
            </span>
            <span className="text-xs font-bold text-emerald-600">langkah</span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 leading-none">
            Hari ini
          </span>
        </div>

        {/* Right Side: Mini Ring & Target Info (Harmonious Emerald/Tosca Palette) */}
        <div className="flex items-center gap-3">
          {/* Mini Circular Progress Ring */}
          <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
            <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
              {/* Harmonious light mint track */}
              <circle
                cx="18"
                cy="18"
                r={ringRadius}
                fill="transparent"
                stroke="#E2F5EE"
                strokeWidth="3.5"
              />
              {/* Fresh Emerald/Tosca Progress */}
              <circle
                cx="18"
                cy="18"
                r={ringRadius}
                fill="transparent"
                stroke="#1ABC9C"
                strokeWidth="3.5"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            {/* Soft accent dot */}
            <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>

          {/* Target & Kemajuan */}
          <button
            type="button"
            onClick={onOpenTargetModal}
            className="flex flex-col text-left group cursor-pointer"
          >
            <div className="text-xs text-slate-600 font-medium group-hover:text-emerald-700 transition-colors flex items-center gap-0.5">
              <span>Target <strong className="font-bold text-slate-800">{formattedTarget}</strong> langkah</span>
              <span className="text-emerald-600 text-[10px] ml-0.5 group-hover:translate-x-0.5 transition-transform">&gt;</span>
            </div>
            <span className="text-xs font-medium text-slate-500 mt-0.5">
              Kemajuan <strong className="font-bold text-emerald-600">{percentage}%</strong>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
