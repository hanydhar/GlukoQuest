/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MascotSVG, MascotCustomization } from './components/MascotSVG';
import { CompactStepCard } from './components/CompactStepCard';
import { MascotCustomizerModal } from './components/MascotCustomizerModal';
import { QuizModal } from './components/QuizModal';
import { LeaderboardTab } from './components/LeaderboardTab';
import { VoucherTab } from './components/VoucherTab';
import { FeedTab } from './components/FeedTab';
import { ProfileTab } from './components/ProfileTab';
import { StandaloneCodeModal } from './components/StandaloneCodeModal';
import { RAW_STANDALONE_HTML } from './data/rawHtmlCode';

type ActiveTab = 'beranda' | 'kuis' | 'feed' | 'voucher' | 'profil';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  
  // App State - Kurasi Otomatis dari Pelacak Langkah Kaki
  // 1.000 langkah = 1 Poin Energi (Target: 3.000 langkah/hari)
  const [steps, setSteps] = useState(3420);
  const targetSteps = 3000;

  // Total Energi terkonversi otomatis dari 1.000 langkah = 1 Energi
  // 3.420 langkah menghasilkan 3 Poin Energi awal hari ini
  const [spentEnergy, setSpentEnergy] = useState(0);
  const totalEarnedEnergy = Math.floor(steps / 1000);
  const availableEnergy = Math.max(0, totalEarnedEnergy - spentEnergy);

  // Poin Hadiah (Kuis: 1 Benar = 10 Pts, 200 Pts = 1 E-Voucher Kantin Rp5.000)
  const [userPoints, setUserPoints] = useState(450);

  // Fitur Beri Makan Maskot (Beri Makan Virtual Pet)
  const [hasFedToday, setHasFedToday] = useState(true);
  const [isEatingAnim, setIsEatingAnim] = useState(false);

  // Status Vitalitas: Default 95% (Prima & Ceria) atau 30% (Lesu & Sedih)
  const [healthPercent, setHealthPercent] = useState<number>(95);
  const currentMood = healthPercent > 50 ? 'happy' : 'tired';

  const toggleHealthMode = () => {
    if (healthPercent > 50) {
      setHealthPercent(30);
      setHasFedToday(false);
      showToast('Simulasi: Health 30% (Virtual Pet Lesu & Sedih) 😔');
    } else {
      setHealthPercent(95);
      setHasFedToday(true);
      showToast('Simulasi: Health 95% (Virtual Pet Ceria & Bugar) ✨');
    }
  };

  // Mascot Customization (Default tosca murni tanpa aksesoris / dukung upload PNG sendiri)
  const [customization, setCustomization] = useState<MascotCustomization>(() => {
    try {
      const saved = localStorage.getItem('glukoquest_customization');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      form: 'classic',
      furColor: 'tosca',
      headwear: 'none',
      eyewear: 'none',
      neckwear: 'none',
      customImage: null,
      customSadImage: null,
    };
  });

  // Quiz Configuration (1 Topik = 4 Sesi, 1 Sesi = 5 Soal, 1 Energi = 1 Sesi)
  const [quizConfig, setQuizConfig] = useState<{
    topicId: string;
    sessionNumber: number;
    sessionTitle: string;
  }>({
    topicId: 'gizi',
    sessionNumber: 1,
    sessionTitle: 'Sesi 1: Batas Gula Harian',
  });

  // Modals
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isEcosystemModalOpen, setIsEcosystemModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fungsi Beri Makan (Beri Makan Virtual Pet)
  const handleFeedMascot = () => {
    if (availableEnergy < 1) {
      showToast('Energi tidak cukup! Jalan kaki 1.000 langkah untuk mendapatkan 1 Poin Energi ⚡');
      return;
    }

    setSpentEnergy((prev) => prev + 1);
    setHasFedToday(true);
    setHealthPercent(95);
    setIsEatingAnim(true);
    showToast('🍎 Maskot berhasil diberi makan! Vitalitas kembali kenyang, ceria & bugar (Health: 95%)');

    setTimeout(() => {
      setIsEatingAnim(false);
    }, 2500);
  };

  // Akses Kuis (1 Energi = 1 Sesi Kuis 5 Soal)
  const handleOpenQuiz = () => {
    if (availableEnergy < 1) {
      showToast('Butuh 1 Energi untuk tiket akses kuis gizi! Kumpulkan langkah kaki harianmu ⚡');
      return;
    }
    // Langsung buka pilihan topik di Tab Kuis atau buka sesi aktif
    setActiveTab('kuis');
  };

  const handleStartSessionFromTab = (
    topicId: string,
    sessionNumber: number,
    _topicTitle: string,
    sessionTitle: string
  ) => {
    if (availableEnergy < 1) {
      showToast('Energi tidak cukup! Butuh 1 Energi untuk membuka sesi kuis ini ⚡');
      return;
    }
    setQuizConfig({
      topicId,
      sessionNumber,
      sessionTitle,
    });
    setIsQuizOpen(true);
  };

  const handleCompleteQuiz = (earnedPoints: number) => {
    setSpentEnergy((prev) => prev + 1);
    setUserPoints((prev) => prev + earnedPoints);
    showToast(`🎯 Kuis selesai! Kamu mendapatkan +${earnedPoints} Poin Hadiah! (1 Benar = 10 Pts)`);
  };

  // Penukaran Voucher (Minimal 200 Poin Hadiah = 1 E-Voucher Kantin Rp5.000)
  const handleRedeemVoucher = (cost: number, voucherTitle: string) => {
    if (userPoints < cost) {
      showToast(`Poin Hadiah belum cukup (${userPoints}/200 Poin) untuk menukar E-Voucher!`);
      return false;
    }
    setUserPoints((prev) => prev - cost);
    showToast(`Berhasil menukar ${voucherTitle}! Saldo terpotong ${cost} Poin Hadiah.`);
    return true;
  };

  return (
    <div className="min-h-screen bg-[#ECEFF3] text-slate-800 flex flex-col items-center justify-start p-0 sm:py-5 sm:px-4">

      {/* Top Desktop Helper Toolbar */}
      <div className="w-full max-w-md hidden sm:flex items-center justify-between mb-2.5 px-1 text-xs">
        <div className="flex items-center gap-2 font-black text-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>GlukoQuest • SMPN 1</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleHealthMode}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-bold shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
            title="Ubah simulasi kondisi kesehatan maskot (95% Prima vs 30% Sedih)"
          >
            <span>{healthPercent > 50 ? '😊 95% Ceria' : '😔 30% Sedih'}</span>
          </button>
          <button
            onClick={() => setIsEcosystemModalOpen(true)}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-emerald-800 font-bold shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <i className="fa-solid fa-table-list text-emerald-600 text-[11px]"></i>
            <span>Tabel Konversi</span>
          </button>
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <i className="fa-solid fa-code text-[11px]"></i>
            <span>Kode HTML</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 z-50 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in duration-150">
          <i className="fa-solid fa-circle-check text-emerald-400"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Frame Container (max-w-md mx-auto) */}
      <div className="w-full max-w-md bg-[#F9F9F9] min-h-screen sm:min-h-[812px] sm:max-h-[860px] sm:rounded-[36px] shadow-xl relative flex flex-col justify-between overflow-hidden border border-slate-200">

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-20 flex flex-col">

          {/* ================= TAB 1: BERANDA (DASHBOARD UTAMA) ================= */}
          {activeTab === 'beranda' && (
            <div className="flex-1 flex flex-col justify-between space-y-3 animate-in fade-in duration-150">

              {/* 1. Header (Atas) */}
              <header className="flex items-center justify-between">
                {/* Kiri: Foto Profil (berbentuk lingkaran kecil) dengan teks "Budi - SMPN 1" */}
                <div
                  onClick={() => setActiveTab('profil')}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-500 p-0.5 shadow-xs group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg overflow-hidden">
                      👦
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-slate-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                      Budi
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                      SMPN 1
                    </span>
                  </div>
                </div>

                {/* Kanan: Indikator energi (Petir ⚡ kuning + teks "3 Poin Energi", border hijau tipis) */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 shadow-xs">
                  <span className="text-yellow-500 text-sm font-black leading-none">⚡</span>
                  <span className="text-xs font-black tracking-tight text-emerald-700 leading-none">
                    {availableEnergy} Poin Energi
                  </span>
                </div>
              </header>

              {/* 2. Pedometer Simple Card (Palet Selaras GlukoQuest: Emerald / Tosca / Putih Bersih) */}
              <section>
                <CompactStepCard
                  currentSteps={steps}
                  targetSteps={targetSteps}
                  onOpenTargetModal={() => setIsEcosystemModalOpen(true)}
                />
              </section>

              {/* 3. Hero Section (Tengah - Virtual Pet Maskot Awal dengan Fitur Beri Makan) */}
              <section className="flex flex-col items-center justify-center my-auto py-1 relative">
                
                {/* Bar Atas Virtual Pet: Status (Kiri) | Beri Makan (Tengah) | Dandani (Kanan) */}
                <div className="w-full grid grid-cols-3 items-center mb-1.5 px-0.5">
                  {/* Kiri: Status Vitalitas (Klik untuk toggle simulasi 95% Ceria vs 30% Sedih) */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={toggleHealthMode}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs whitespace-nowrap cursor-pointer transition-colors ${
                        healthPercent > 50
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100'
                          : 'text-amber-800 bg-amber-50 border border-amber-300 hover:bg-amber-100'
                      }`}
                      title="Klik untuk tes mode 95% Ceria vs 30% Lesu/Sedih"
                    >
                      <i className={`fa-solid ${healthPercent > 50 ? 'fa-heart-pulse text-emerald-600' : 'fa-face-frown text-amber-600'} text-[10px]`}></i>
                      <span>{healthPercent > 50 ? 'Kenyang' : 'Sedih (30%)'}</span>
                    </button>
                  </div>

                  {/* Tengah: Button Beri Makan (Berada pas di atas tengah virtual pet, tanpa "(1 energi)") */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleFeedMascot}
                      className="text-[11px] font-extrabold text-emerald-800 bg-white hover:bg-emerald-50 active:scale-95 border-2 border-emerald-500 px-3 py-1 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                      title="Beri makan maskot untuk menjaga vitalitas tetap prima!"
                    >
                      <span className="text-xs">🍎</span>
                      <span>Beri Makan</span>
                    </button>
                  </div>

                  {/* Kanan: Button Dandani */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsCustomizerOpen(true)}
                      className="text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-50 active:scale-95 border border-slate-200 px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                      title="Dandani maskot & pilih kostum!"
                    >
                      <span>✨ Dandani</span>
                    </button>
                  </div>
                </div>

                {/* Karakter Virtual Pet (Monster Tosca: Binar Mata Berkilau, Mood Ceria atau Sedih saat 30%) */}
                <div
                  onClick={handleFeedMascot}
                  className="cursor-pointer group relative flex flex-col items-center justify-center my-0.5"
                  title="Klik untuk memberi makan maskot!"
                >
                  <MascotSVG
                    mood={currentMood}
                    size={200}
                    isEating={isEatingAnim}
                    customization={customization}
                  />
                </div>

                {/* Progress bar memanjang kecil: "Health: 95%" atau "Health: 30%" */}
                <div
                  onClick={toggleHealthMode}
                  className="w-full max-w-[210px] flex flex-col items-center mt-0.5 cursor-pointer group"
                  title="Klik untuk tes simulasi Health 30% (Lesu/Sedih) vs 95% (Ceria)"
                >
                  <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span className="group-hover:text-emerald-700 transition-colors">Health: {healthPercent}%</span>
                    <span className={healthPercent > 50 ? 'text-emerald-600' : 'text-amber-700 font-extrabold'}>
                      {healthPercent > 50 ? 'Vitalitas Prima ✨' : 'Lesu & Sedih 😔'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        healthPercent > 50 ? 'bg-[#2ECC71]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${healthPercent}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5">
                    {healthPercent <= 50 ? '⚠️ Butuh jalan kaki atau makan apel' : 'Klik bar untuk tes mode 30% lesu'}
                  </span>
                </div>

                {/* Opsi Bentuk Virtual Pet Lucu & Gemoy (Klik Langsung untuk Ganti Bentuk) */}
                <div className="w-full mt-2 px-1 flex flex-col items-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>Pilihan Karakter Lucu:</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    {[
                      { key: 'classic', label: 'Gogi', icon: '🦖' },
                      { key: 'blob', label: 'Boba', icon: '🫧' },
                      { key: 'fluffy', label: 'Pompom', icon: '☁️' },
                      { key: 'sprout', label: 'Tunas', icon: '🌱' },
                      { key: 'mochi', label: 'Mochi', icon: '🍡' },
                      { key: 'chibi', label: 'Chibi', icon: '⭐' },
                    ].map((item) => {
                      const isActive = customization.form === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => {
                            setCustomization((prev) => ({ ...prev, form: item.key as any }));
                            showToast(`Bentuk karakter diubah ke ${item.label}! ✨`);
                          }}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-500'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </section>

            </div>
          )}

          {/* ================= TAB 2: KUIS & RANK ================= */}
          {activeTab === 'kuis' && (
            <LeaderboardTab
              onStartSession={handleStartSessionFromTab}
              userPoints={userPoints}
              availableEnergy={availableEnergy}
            />
          )}

          {/* ================= TAB 3: FEED ================= */}
          {activeTab === 'feed' && <FeedTab />}

          {/* ================= TAB 4: VOUCHER (200 Poin Hadiah = 1 E-Voucher Rp5.000) ================= */}
          {activeTab === 'voucher' && (
            <VoucherTab
              userPoints={userPoints}
              onRedeemVoucher={handleRedeemVoucher}
            />
          )}

          {/* ================= TAB 5: PROFIL ================= */}
          {activeTab === 'profil' && (
            <ProfileTab
              currentSteps={steps}
              targetSteps={targetSteps}
              userPoints={userPoints}
              energy={availableEnergy}
              onUpdateTarget={() => {
                showToast('Target harian terkalibrasi otomatis pada 3.000 langkah/hari (Move More)');
              }}
            />
          )}

        </div>

        {/* ================= 5. BOTTOM NAVIGATION BAR ================= */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around z-30 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('beranda')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${
              activeTab === 'beranda' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeTab === 'beranda' ? 'bg-emerald-50 text-emerald-600' : ''
              }`}
            >
              <i className="fa-solid fa-house text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Beranda</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kuis')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${
              activeTab === 'kuis' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeTab === 'kuis' ? 'bg-emerald-50 text-emerald-600' : ''
              }`}
            >
              <i className="fa-solid fa-trophy text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Kuis & Rank</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${
              activeTab === 'feed' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeTab === 'feed' ? 'bg-emerald-50 text-emerald-600' : ''
              }`}
            >
              <i className="fa-solid fa-bell text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Feed</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('voucher')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${
              activeTab === 'voucher' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeTab === 'voucher' ? 'bg-emerald-50 text-emerald-600' : ''
              }`}
            >
              <i className="fa-solid fa-ticket text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Voucher</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profil')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${
              activeTab === 'profil' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                activeTab === 'profil' ? 'bg-emerald-50 text-emerald-600' : ''
              }`}
            >
              <i className="fa-solid fa-user text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Profil</span>
          </button>
        </nav>

      </div>

      {/* MODAL: TABEL EKOSISTEM & AKUMULASI POIN GLUKOQUEST */}
      {isEcosystemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-3.5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <i className="fa-solid fa-chart-pie text-emerald-600"></i>
                <span>Ekosistem Poin GlukoQuest</span>
              </h3>
              <button
                onClick={() => setIsEcosystemModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-900 flex justify-between">
                  <span>Input Aktivitas Fisik</span>
                  <span className="text-emerald-700">1.000 langkah = 1 Energi</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Target harian 3.000 langkah/hari untuk mendorong kebiasaan fisik harian (Move More).
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900 flex justify-between">
                  <span>Alokasi Poin Energi</span>
                  <span className="text-amber-700">1 Energi/hari</span>
                </div>
                <ul className="text-[11px] text-amber-800 list-disc list-inside space-y-0.5">
                  <li><strong>1 Energi/hari:</strong> Beri Makan Virtual Pet (jaga vitalitas avatar).</li>
                  <li><strong>1 Energi:</strong> 1 Sesi Kuis Gizi (5 Soal).</li>
                </ul>
              </div>

              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 space-y-1">
                <div className="font-bold text-teal-900 flex justify-between">
                  <span>Sistem Edukasi Kuis</span>
                  <span className="text-teal-700">1 Soal Benar = 10 Pts</span>
                </div>
                <p className="text-[11px] text-teal-800">
                  Maksimal 50 Poin Hadiah per sesi untuk menguji pemahaman 4 topik pradiabetes.
                </p>
              </div>

              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
                <div className="font-bold text-sky-900 flex justify-between">
                  <span>Redemption & Insentif</span>
                  <span className="text-sky-700">200 Pts = E-Voucher</span>
                </div>
                <p className="text-[11px] text-sky-800">
                  200 Poin Hadiah = 1 E-Voucher Kantin (Rp5.000) untuk menstimulasi konsumsi jajanan sehat whitelist.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEcosystemModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
            >
              Tutup Penjelasan
            </button>
          </div>
        </div>
      )}

      {/* Mascot Customizer Modal (Mendukung Ganti Bentuk, Warna, Aksesoris & Upload PNG Asli) */}
      <MascotCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        customization={customization}
        onSave={(newC) => {
          setCustomization(newC);
          try {
            localStorage.setItem('glukoquest_customization', JSON.stringify(newC));
          } catch {
            // ignore
          }
          showToast('Tampilan maskot berhasil diperbarui! ✨');
        }}
      />

      {/* Quiz Modal (4 Sesi per Topik, 5 Soal per Sesi, 1 Energi = 1 Sesi) */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onCompleteQuiz={handleCompleteQuiz}
        currentEnergy={availableEnergy}
        topicId={quizConfig.topicId}
        sessionNumber={quizConfig.sessionNumber}
        sessionTitle={quizConfig.sessionTitle}
      />

      {/* Standalone Single File Code Modal */}
      <StandaloneCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        htmlCode={RAW_STANDALONE_HTML}
      />

    </div>
  );
}
