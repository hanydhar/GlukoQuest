import React, { useState } from 'react';
import { CANTEEN_VOUCHERS, CanteenVoucher } from '../data/mockData';

interface VoucherTabProps {
  userPoints: number;
  onRedeemVoucher: (cost: number, voucherTitle: string) => boolean;
}

interface ClaimedVoucher extends CanteenVoucher {
  code: string;
  redeemedAt: string;
}

export const VoucherTab: React.FC<VoucherTabProps> = ({
  userPoints,
  onRedeemVoucher,
}) => {
  const [claimedList, setClaimedList] = useState<ClaimedVoucher[]>([
    {
      ...CANTEEN_VOUCHERS[1],
      code: 'KANTIN-SMP1-SLD-8821',
      redeemedAt: 'Hari ini, 09:45 WIB',
    },
  ]);
  const [activeModalVoucher, setActiveModalVoucher] = useState<ClaimedVoucher | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleClaim = (voucher: CanteenVoucher) => {
    if (userPoints < voucher.pointsCost) {
      setNotification(`Poin belum mencukupi! Kamu butuh ${voucher.pointsCost} Pts, poinmu saat ini ${userPoints} Pts.`);
      setTimeout(() => setNotification(null), 4000);
      return;
    }

    const success = onRedeemVoucher(voucher.pointsCost, voucher.title);
    if (success) {
      const newClaim: ClaimedVoucher = {
        ...voucher,
        code: `SMP1-${voucher.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        redeemedAt: 'Baru saja',
      };
      setClaimedList([newClaim, ...claimedList]);
      setActiveModalVoucher(newClaim);
    }
  };

  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pt-1">
        <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <span>Voucher Kantin Sehat</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            Kantin SMPN 1
          </span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Tukarkan poin langkahmu dengan makan siang kaya serat & rendah gula
        </p>
      </div>

      {/* Point Balance Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-4 text-white shadow-md shadow-emerald-700/20 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-emerald-100 tracking-wider uppercase">
            Saldo Poin Hadiahmu
          </span>
          <div className="text-2xl font-black tracking-tight mt-0.5">
            {userPoints.toLocaleString('id-ID')} <span className="text-sm font-bold text-emerald-200">Poin Hadiah</span>
          </div>
          <p className="text-[10px] text-emerald-100 mt-1 flex items-center gap-1 font-medium">
            <i className="fa-solid fa-tag text-emerald-300"></i>
            Nilai Konversi: 200 Poin Hadiah = 1 E-Voucher Rp5.000
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
          🎟️
        </div>
      </div>

      {/* Alert Notification */}
      {notification && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation text-amber-600 flex-shrink-0"></i>
          <span>{notification}</span>
        </div>
      )}

      {/* Available Vouchers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Menu Makan Siang Sehat Pilihan</h3>
          <span className="text-[11px] text-slate-400">Nutrisi Terverifikasi UKS</span>
        </div>

        <div className="space-y-3">
          {CANTEEN_VOUCHERS.map((voucher) => {
            const canAfford = userPoints >= voucher.pointsCost;

            return (
              <div
                key={voucher.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3 transition-all hover:border-emerald-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {voucher.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-teal-600">
                        {voucher.standName}
                      </span>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {voucher.pointsCost} Pts
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 mt-0.5 leading-snug">
                      {voucher.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {voucher.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50/60 px-2 py-0.5 rounded-md w-fit">
                      <i className="fa-solid fa-shield-heart text-emerald-500"></i>
                      <span>{voucher.calories}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Tunjukkan barcode di kasir kantin
                  </span>
                  <button
                    type="button"
                    onClick={() => handleClaim(voucher)}
                    disabled={!canAfford}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      canAfford
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Tukar Sekarang' : `Kurang ${voucher.pointsCost - userPoints} Pts`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Claimed Vouchers list */}
      {claimedList.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-receipt text-teal-600"></i>
            <span>Voucher Aktif Milikmu</span>
          </h3>

          <div className="space-y-2">
            {claimedList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveModalVoucher(item)}
                className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:bg-emerald-100/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{item.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Kode: {item.code}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 shadow-xs">
                    Tampilkan QR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR/Barcode Modal */}
      {activeModalVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl text-center space-y-4 border border-slate-100">
            <button
              onClick={() => setActiveModalVoucher(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-xs"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
              {activeModalVoucher.icon}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Voucher Sah Kantin SMPN 1
              </span>
              <h4 className="text-sm font-bold text-slate-800 mt-2">
                {activeModalVoucher.title}
              </h4>
              <p className="text-[11px] text-slate-500">{activeModalVoucher.standName}</p>
            </div>

            {/* Simulated Barcode */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
              <div className="h-12 flex items-center justify-center gap-1 overflow-hidden px-2">
                {/* Visual barcode lines */}
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-slate-800"
                    style={{
                      width: i % 3 === 0 ? '3px' : i % 5 === 0 ? '4px' : '1.5px',
                      opacity: i % 7 === 0 ? 0.3 : 1,
                    }}
                  />
                ))}
              </div>
              <div className="font-mono text-xs font-bold text-slate-700 tracking-wider">
                {activeModalVoucher.code}
              </div>
            </div>

            <p className="text-[10px] text-slate-400">
              Tunjukkan layar ini kepada petugas kantin saat mengambil makanan. Selamat menikmati makanan sehat!
            </p>

            <button
              onClick={() => setActiveModalVoucher(null)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
            >
              Tutup Voucher
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
