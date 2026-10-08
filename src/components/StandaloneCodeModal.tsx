import React, { useState } from 'react';

interface StandaloneCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
}

export const StandaloneCodeModal: React.FC<StandaloneCodeModalProps> = ({
  isOpen,
  onClose,
  htmlCode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'move-more-dashboard.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-sm font-bold">&lt;/&gt;</span>
            <div>
              <h3 className="font-bold text-sm">Source Code HTML Murni (Single File)</h3>
              <p className="text-[11px] text-slate-400">Tailwind CSS (CDN) + FontAwesome (CDN) + SVG Mascot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Info */}
        <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <span className="flex items-center gap-1.5 font-medium">
            <i className="fa-solid fa-check-circle text-emerald-600"></i>
            File siap dijalankan langsung di browser apa pun tanpa instalasi dependencies!
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="text-emerald-700 bg-white hover:bg-emerald-100/60 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <i className="fa-solid fa-download"></i>
              Unduh .html
            </button>
            <button
              onClick={handleCopy}
              className="text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
              {copied ? 'Tersalin!' : 'Salin Semua'}
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="p-4 bg-slate-950 text-slate-200 overflow-auto font-mono text-xs leading-relaxed flex-1 select-all">
          <pre>{htmlCode}</pre>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
