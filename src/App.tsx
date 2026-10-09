/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MascotSVG } from './components/MascotSVG';
import { CompactStepCard } from './components/CompactStepCard';
import { QuizModal } from './components/QuizModal';
import { LeaderboardTab } from './components/LeaderboardTab';
import { VoucherTab } from './components/VoucherTab';
import { FeedTab } from './components/FeedTab';
import { ProfileTab, UserProfileData } from './components/ProfileTab';
import { DandaniModal } from './components/DandaniModal';
import { StandaloneCodeModal } from './components/StandaloneCodeModal';
import { RAW_STANDALONE_HTML } from './data/rawHtmlCode';

type ActiveTab = 'beranda' | 'kuis' | 'feed' | 'voucher' | 'profil';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');

  // User Profile State (Terhubung & Tersinkronisasi Beranda & Profil)
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: 'Budi Santoso',
    school: 'SMPN 1 Surabaya',
    grade: '8B',
    nisn: '0092837190',
    avatarIcon: 'fa-solid fa-user',
    avatarColor: 'bg-emerald-600',
  });

  // App State - Skenario Kemajuan 70%
  // 70% dari target 3.000 langkah = 2.100 langkah (2 Poin Energi terkumpul)
  const [steps, setSteps] = useState(2100);
  const targetSteps = 3000;

  // Total Energi terkonversi otomatis dari 1.000 langkah = 1 Energi
  // 2.100 langkah menghasilkan 2 Poin Energi aktif
  const [spentEnergy, setSpentEnergy] = useState(0);
  const totalEarnedEnergy = Math.floor(steps / 1000);
  const availableEnergy = Math.max(0, totalEarnedEnergy - spentEnergy);

  // Poin Hadiah Proporsional 70% Skenario (315 Pts dari aktivitas kuis & misi harian)
  const [userPoints, setUserPoints] = useState(315);

  // Fitur Beri Makan Maskot (Beri Makan Virtual Pet)
  const [hasFedToday, setHasFedToday] = useState(true);
  const [isEatingAnim, setIsEatingAnim] = useState(false);

  // Status Vitalitas Skenario 70%: Santai & Netral (70%)
  const [healthPercent, setHealthPercent] = useState<number>(70);

  const currentMood: 'happy' | 'neutral' | 'tired' =
    healthPercent > 70 ? 'happy' : healthPercent >= 35 ? 'neutral' : 'tired';

  const toggleHealthMode = () => {
    if (healthPercent > 70) {
      setHealthPercent(60);
      setHasFedToday(true);
      showToast('Simulasi Energi: Netral (60% - Santai & Stabil)');
    } else if (healthPercent >= 35) {
      setHealthPercent(15);
      setHasFedToday(false);
      showToast('Simulasi Energi: Lesu (15% - Butuh Langkah Kaki & Apel)');
    } else {
      setHealthPercent(95);
      setHasFedToday(true);
      showToast('Simulasi Energi: Ceria (95% - Vitalitas Bugar & Melambai)');
    }
  };

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

  // Modals & Popups
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isEcosystemModalOpen, setIsEcosystemModalOpen] = useState(false);
  const [isSugarGuideModalOpen, setIsSugarGuideModalOpen] = useState(false);
  const [isDandaniOpen, setIsDandaniOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Kustomisasi Dandani Gogi (Warna & Aksesoris)
  const [mascotCustomization, setMascotCustomization] = useState<{
    color: string;
    accessory: string;
  }>({
    color: 'default',
    accessory: 'none',
  });

  // Interaksi Maskot (Elus / Sayang Gogi - Hanya Love & Animasi Ceria, Tanpa Poin)
  const [isPetJiggling, setIsPetJiggling] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<
    Array<{ id: number; left: number }>
  >([]);

  // Fakta Gizi & Informasi Glukosa
  const [factIndex, setFactIndex] = useState(0);

  const GLUKO_FACTS = [
    {
      title: 'Batas Gula Harian Remaja',
      desc: 'Kemenkes RI membatasi maksimal 50 gram (4 sendok makan) gula/hari untuk mencegah risiko pradiabetes dini.',
      tag: 'Kemenkes RI',
      iconClass: 'fa-solid fa-utensils',
    },
    {
      title: 'Waspada Gula Tersembunyi',
      desc: '1 cup boba manis bisa mengandung 40-55g gula — langsung melebihi jatah harianmu hanya dari satu minuman!',
      tag: 'Jajanan Sekolah',
      iconClass: 'fa-solid fa-bottle-droplet',
    },
    {
      title: 'Manfaat Jalan Kaki Pasca Makan',
      desc: 'Berjalan santai 10 menit setelah makan membantu otot menyerap glukosa darah tanpa membebani kerja pankreas.',
      tag: 'Aktivitas Fisik',
      iconClass: 'fa-solid fa-person-walking',
    },
    {
      title: 'Pilih Buah Utuh, Bukan Minuman Manis',
      desc: 'Buah utuh seperti apel kaya serat pektin yang memperlambat penyerapan glukosa dan menjaga energi tetap stabil.',
      tag: 'Gizi Seimbang',
      iconClass: 'fa-solid fa-apple-whole',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Interaksi Elus Pet (HANYA EFEK VISUAL LOVE & JIGGLE - TIDAK MENAMBAH POIN APAPUN)
  const handlePetTap = () => {
    // Efek Jiggle Ceria
    setIsPetJiggling(true);
    setTimeout(() => setIsPetJiggling(false), 450);

    // Munculkan partikel hati melayang
    const newHearts = Array.from({ length: 2 }).map((_, i) => ({
      id: Date.now() + Math.random() + i,
      left: 30 + Math.random() * 40,
    }));

    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      const ids = new Set(newHearts.map((h) => h.id));
      setFloatingHearts((prev) => prev.filter((h) => !ids.has(h.id)));
    }, 1100);
  };

  // Fungsi Beri Makan (Beri Makan Virtual Pet DENGAN TOMBOL RESMI & 1 ENERGI)
  const handleFeedMascot = () => {
    if (availableEnergy < 1) {
      showToast('Energi tidak cukup! Jalan kaki 1.000 langkah untuk mendapatkan 1 Poin Energi.');
      return;
    }

    setSpentEnergy((prev) => prev + 1);
    setHasFedToday(true);
    setHealthPercent(95);
    setIsEatingAnim(true);
    showToast('Maskot berhasil diberi makan! (Vitalitas 95%)');

    setTimeout(() => {
      setIsEatingAnim(false);
    }, 2500);
  };

  // Akses Kuis (1 Energi = 1 Sesi Kuis 5 Soal)
  const handleOpenQuiz = () => {
    if (availableEnergy < 1) {
      showToast('Butuh 1 Energi untuk tiket akses kuis gizi! Kumpulkan langkah kaki harianmu.');
      return;
    }
    setActiveTab('kuis');
  };

  const handleStartSessionFromTab = (
    topicId: string,
    sessionNumber: number,
    _topicTitle: string,
    sessionTitle: string
  ) => {
    if (availableEnergy < 1) {
      showToast('Energi tidak cukup! Butuh 1 Energi untuk membuka sesi kuis ini.');
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
    showToast(`Kuis selesai! Kamu mendapatkan +${earnedPoints} Poin Hadiah! (1 Benar = 10 Pts)`);
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
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>GlukoQuest • SMPN 1</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleHealthMode}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Ubah simulasi kondisi kesehatan maskot (95% Prima vs 30% Sedih)"
          >
            <i className="fa-solid fa-heart-pulse text-emerald-600 text-[11px]"></i>
            <span>Status {healthPercent}%</span>
          </button>
          <button
            onClick={() => setIsEcosystemModalOpen(true)}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-emerald-800 font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <i className="fa-solid fa-table-list text-emerald-600 text-[11px]"></i>
            <span>Tabel Konversi</span>
          </button>
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
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
        <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-20 flex flex-col space-y-3.5">

          {/* ================= TAB 1: BERANDA (DASHBOARD UTAMA KONSISTEN & BERISI) ================= */}
          {activeTab === 'beranda' && (
            <div className="flex flex-col space-y-3.5 animate-in fade-in duration-150">

              {/* 1. Header (Atas): Profil Siswa + Energi & Poin */}
              <header className="flex items-center justify-between">
                <div
                  onClick={() => setActiveTab('profil')}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full ${userProfile.avatarColor || 'bg-emerald-600'} text-white flex items-center justify-center text-sm shadow-2xs group-hover:scale-105 transition-transform`}>
                    <i className={userProfile.avatarIcon || 'fa-solid fa-user'}></i>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                        {userProfile.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-200">
                        {userProfile.grade}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                      <i className="fa-solid fa-school text-[9px] text-slate-400"></i>
                      {userProfile.school}
                    </span>
                  </div>
                </div>

                {/* Indikator Poin & Energi */}
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => setActiveTab('voucher')}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 shadow-2xs cursor-pointer hover:bg-amber-100 transition-colors"
                    title="Poin Hadiah (Tukar E-Voucher Kantin)"
                  >
                    <i className="fa-solid fa-coins text-amber-500 text-xs"></i>
                    <span className="text-xs font-bold tracking-tight leading-none">
                      {userPoints} Pts
                    </span>
                  </div>
                  <div
                    onClick={() => setIsEcosystemModalOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-2xs cursor-pointer hover:bg-emerald-100 transition-colors"
                    title="Poin Energi (1.000 langkah = 1 Energi)"
                  >
                    <i className="fa-solid fa-bolt text-amber-500 text-xs"></i>
                    <span className="text-xs font-bold tracking-tight leading-none">
                      {availableEnergy} Energi
                    </span>
                  </div>
                </div>
              </header>

              {/* 2. Pedometer Card (Sesuai Referensi Visual) */}
              <section>
                <CompactStepCard
                  currentSteps={steps}
                  targetSteps={targetSteps}
                  onOpenTargetModal={() => setIsEcosystemModalOpen(true)}
                />
              </section>

              {/* 3. Hero Section: Virtual Pet Maskot (Tata Letak Seimbang & Terpusat) */}
              <section className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs relative flex flex-col items-center">

                {/* Header Virtual Pet: Dandani (Kiri), Judul Terpusat (Tengah), Beri Makan (Kanan) */}
                <div className="w-full flex items-center justify-between mb-3 gap-2">
                  {/* Tombol Dandani */}
                  <button
                    type="button"
                    onClick={() => setIsDandaniOpen(true)}
                    className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 active:scale-95 border border-purple-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Dandani warna & aksesoris Gogi"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles text-purple-600 text-xs"></i>
                    <span>Dandani</span>
                  </button>

                  {/* Teks Judul Gogi Virtual Pet di Tengah */}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-sm font-black text-slate-800 tracking-tight leading-tight">
                      Gogi Virtual Pet
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Sahabat Sehat
                    </span>
                  </div>

                  {/* Tombol Beri Makan (Khusus Memakai 1 Energi - Tanpa Ikon Apel) */}
                  <button
                    type="button"
                    onClick={handleFeedMascot}
                    className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 active:scale-95 border border-emerald-300 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Gunakan 1 Energi untuk memberi makan Gogi"
                  >
                    <i className="fa-solid fa-bolt text-amber-500 text-xs"></i>
                    <span>Beri Makan (1⚡)</span>
                  </button>
                </div>

                {/* Karakter Maskot: KLIK UNTUK ELUS / SAYANG */}
                <div className="relative flex flex-col items-center justify-center my-2">
                  {/* Floating Heart Particles */}
                  {floatingHearts.map((heart) => (
                    <div
                      key={heart.id}
                      style={{ left: `${heart.left}%` }}
                      className="absolute top-2 pointer-events-none text-rose-500 text-2xl font-bold animate-heart-float z-30 select-none"
                    >
                      ❤️
                    </div>
                  ))}

                  <div
                    onClick={handlePetTap}
                    className="cursor-pointer group relative flex flex-col items-center justify-center p-2"
                    title="Ketuk atau elus Gogi untuk menyapanya!"
                  >
                    <MascotSVG
                      mood={currentMood}
                      size={225}
                      isEating={isEatingAnim}
                      isPetted={isPetJiggling}
                      colorFilter={mascotCustomization.color}
                      accessory={mascotCustomization.accessory}
                    />
                  </div>

                  {/* Hint Interaksi */}
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mt-1 select-none">
                    <i className="fa-solid fa-hand-pointer text-emerald-600 text-xs"></i>
                    <span>Ketuk atau elus Gogi untuk menyapanya</span>
                  </span>
                </div>

                {/* Status & Persentase Vitalitas (Di Bawah Karakter Gogi) */}
                <div className="w-full max-w-[280px] flex flex-col items-center mt-3 pt-3 border-t border-slate-100">
                  <div className="w-full flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-700">Vitalitas</span>
                      <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                        {healthPercent}%
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        healthPercent > 70
                          ? 'text-emerald-600'
                          : healthPercent >= 35
                            ? 'text-teal-600'
                            : 'text-amber-700'
                      }`}
                    >
                      {healthPercent > 70
                        ? 'Ceria & Bugar'
                        : healthPercent >= 35
                          ? 'Santai & Netral'
                          : 'Lesu & Butuh Makan'}
                    </span>
                  </div>

                  {/* Progress Bar Vitalitas */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        healthPercent > 70
                          ? 'bg-emerald-500'
                          : healthPercent >= 35
                            ? 'bg-teal-500'
                            : 'bg-amber-500'
                      }`}
                      style={{ width: `${healthPercent}%` }}
                    />
                  </div>

                  {/* Tombol Simulasi Mood Cepat */}
                  <div className="w-full flex items-center justify-center gap-1.5 mt-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setHealthPercent(95);
                        setHasFedToday(true);
                        showToast('Status: Ceria (95% - Vitalitas Prima)');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        currentMood === 'happy'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <i className="fa-regular fa-face-smile text-[10px]"></i>
                      <span>Ceria</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHealthPercent(60);
                        setHasFedToday(true);
                        showToast('Status: Netral (60% - Santai & Stabil)');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        currentMood === 'neutral'
                          ? 'bg-teal-600 text-white shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <i className="fa-regular fa-face-meh text-[10px]"></i>
                      <span>Netral</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHealthPercent(15);
                        setHasFedToday(false);
                        showToast('Status: Lesu (15% - Butuh Langkah & Makan)');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        currentMood === 'tired'
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <i className="fa-regular fa-face-frown text-[10px]"></i>
                      <span>Lesu</span>
                    </button>
                  </div>
                </div>

              </section>

              {/* 4. Misi Harian Sehat (Gamifikasi Utama Skenario 70%) */}
              <section className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i className="fa-solid fa-list-check text-emerald-600"></i>
                      Misi Harian Sehat
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      1/3 Selesai (70% Hari)
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">Reset 00:00</span>
                </div>

                <div className="space-y-2">
                  {/* Quest 1: Langkah Harian (70% = 2.100 / 3.000 langkah) */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                        <i className="fa-solid fa-person-walking"></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">Target 3.000 Langkah</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          {steps.toLocaleString('id-ID')} / {targetSteps.toLocaleString('id-ID')} langkah
                        </span>
                      </div>
                    </div>
                    {steps >= targetSteps ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                        <i className="fa-solid fa-check text-[9px]"></i>
                        <span>Selesai (+1⚡)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                        <i className="fa-solid fa-person-walking text-[9px]"></i>
                        <span>{Math.round((steps / targetSteps) * 100)}% ({targetSteps - steps} lagi)</span>
                      </span>
                    )}
                  </div>

                  {/* Quest 2: Kuis Gizi */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                        <i className="fa-solid fa-brain"></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">Sesi Kuis Gizi Harian</span>
                        <span className="text-[10px] text-slate-400 font-medium">Uji pemahaman pradiabetes</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenQuiz}
                      className="text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-2.5 py-1 rounded-lg shadow-2xs transition-all cursor-pointer"
                    >
                      Mulai (1⚡)
                    </button>
                  </div>

                  {/* Quest 3: Beri Makan Virtual Pet */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs">
                        <i className="fa-solid fa-apple-whole"></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">Jaga Vitalitas Avatar</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          Vitalitas stabil {healthPercent}%
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                      <i className="fa-solid fa-check text-[9px]"></i>
                      <span>Stabil ({healthPercent}%)</span>
                    </span>
                  </div>
                </div>
              </section>

              {/* 6. Aksi Cepat Pintar (Quick Access 2x2 Grid) */}
              <section className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 px-0.5">
                  <i className="fa-solid fa-bolt text-amber-500"></i>
                  Aksi Cepat GlukoQuest
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Card 1: Kuis Gizi */}
                  <div
                    onClick={() => setActiveTab('kuis')}
                    className="bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs group flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                        <i className="fa-solid fa-graduation-cap"></i>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        +50 Pts
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                        Kuis & Ranking
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                        4 Topik Pradiabetes
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Voucher Kantin */}
                  <div
                    onClick={() => setActiveTab('voucher')}
                    className="bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all cursor-pointer shadow-2xs group flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                        <i className="fa-solid fa-ticket"></i>
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        Rp5.000
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-900 transition-colors">
                        Tukar E-Voucher
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                        Kantin Sehat Whitelist
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Kamus Gula Jajanan */}
                  <div
                    onClick={() => setIsSugarGuideModalOpen(true)}
                    className="bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-rose-300 transition-all cursor-pointer shadow-2xs group flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                        <i className="fa-solid fa-table-list"></i>
                      </div>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        Info Gula
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-rose-800 transition-colors">
                        Kamus Gula Snack
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                        Kadar Gula Boba & Jajanan
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Papan Peringkat Kelas */}
                  <div
                    onClick={() => setActiveTab('kuis')}
                    className="bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-sky-300 transition-all cursor-pointer shadow-2xs group flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                        <i className="fa-solid fa-ranking-star"></i>
                      </div>
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                        Rank #2
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-sky-800 transition-colors">
                        Papan Kelas 8B
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                        Kompetisi Sehat Teman
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. GlukoFact of the Day (Card Edukasi Berganti) */}
              <section className="bg-emerald-700 text-white rounded-2xl p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center text-xs text-white">
                      <i className={GLUKO_FACTS[factIndex].iconClass}></i>
                    </div>
                    <span className="text-xs font-bold tracking-wide">
                      GlukoFact Hari Ini
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFactIndex((prev) => (prev + 1) % GLUKO_FACTS.length)}
                    className="text-[10px] font-bold bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-rotate text-[9px]"></i>
                    <span>Fakta Lain</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-100">
                    {GLUKO_FACTS[factIndex].title}
                  </h4>
                  <p className="text-[11px] text-white/90 leading-relaxed font-normal">
                    {GLUKO_FACTS[factIndex].desc}
                  </p>
                </div>

                <div className="pt-0.5 flex items-center justify-between text-[10px] text-emerald-200">
                  <span className="px-2 py-0.5 bg-white/15 rounded-md font-semibold">
                    {GLUKO_FACTS[factIndex].tag}
                  </span>
                  <span>{factIndex + 1} dari {GLUKO_FACTS.length} Fakta</span>
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
              userProfile={userProfile}
              onUpdateProfile={(updated) => {
                setUserProfile(updated);
                showToast(`Profil ${updated.name} berhasil diperbarui!`);
              }}
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
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${activeTab === 'beranda' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${activeTab === 'beranda' ? 'bg-emerald-50 text-emerald-600' : ''
                }`}
            >
              <i className="fa-solid fa-house text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Beranda</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kuis')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${activeTab === 'kuis' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${activeTab === 'kuis' ? 'bg-emerald-50 text-emerald-600' : ''
                }`}
            >
              <i className="fa-solid fa-trophy text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Kuis & Rank</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${activeTab === 'feed' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${activeTab === 'feed' ? 'bg-emerald-50 text-emerald-600' : ''
                }`}
            >
              <i className="fa-solid fa-bell text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Feed</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('voucher')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${activeTab === 'voucher' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${activeTab === 'voucher' ? 'bg-emerald-50 text-emerald-600' : ''
                }`}
            >
              <i className="fa-solid fa-ticket text-sm"></i>
            </div>
            <span className="text-[10px] mt-0.5">Voucher</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profil')}
            className={`flex flex-col items-center justify-center transition-colors w-14 cursor-pointer ${activeTab === 'profil' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${activeTab === 'profil' ? 'bg-emerald-50 text-emerald-600' : ''
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


      {/* MODAL: KAMUS KADAR GULA JAJANAN & MINUMAN SEKOLAH */}
      {isSugarGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-3.5 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <i className="fa-solid fa-bottle-water text-rose-500"></i>
                <span>Kamus Gula Jajanan Sekolah</span>
              </h3>
              <button
                onClick={() => setIsSugarGuideModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
              <i className="fa-solid fa-triangle-exclamation text-rose-600 text-sm mt-0.5 flex-shrink-0"></i>
              <p className="text-[11px] leading-relaxed">
                <strong>Batas Maksimal Harian Remaja:</strong> 50 gram (setara <strong>4 sendok makan</strong>). Konsumsi rutin melebihi batas ini memicu risiko resistensi insulin dan pradiabetes dini.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {/* Boba */}
              <div className="p-3 bg-white rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-mug-saucer text-rose-500"></i>
                    <span>Boba Brown Sugar (Cup)</span>
                  </span>
                  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-rose-200">
                    48g Gula (~4 sdm)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '96%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  <strong>Alternatif Sehat:</strong> Pilih opsi <em>less sugar 30%</em> atau susu murni segar tanpa sirup tambahan.
                </p>
              </div>

              {/* Minuman Bersoda */}
              <div className="p-3 bg-white rounded-2xl border border-rose-100 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-bottle-droplet text-rose-500"></i>
                    <span>Minuman Soda Kaleng (330ml)</span>
                  </span>
                  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-rose-200">
                    35g Gula (~3 sdm)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  <strong>Alternatif Sehat:</strong> Air mineral dingin atau air kelapa murni tanpa gula.
                </p>
              </div>

              {/* Teh Manis Botol */}
              <div className="p-3 bg-white rounded-2xl border border-amber-100 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-glass-water text-amber-500"></i>
                    <span>Teh Kemasan Botol (350ml)</span>
                  </span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-200">
                    28g Gula (~2.5 sdm)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '56%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  <strong>Alternatif Sehat:</strong> Es teh tawar (0 kalori) atau infused water lemon.
                </p>
              </div>

              {/* Donat Cokelat */}
              <div className="p-3 bg-white rounded-2xl border border-amber-100 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-cookie text-amber-500"></i>
                    <span>Donat Gula / Cokelat</span>
                  </span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-200">
                    22g Gula (~1.8 sdm)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '44%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  <strong>Alternatif Sehat:</strong> Roti gandum isi telur atau pisang rebus.
                </p>
              </div>

              {/* Buah Apel Segar */}
              <div className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-apple-whole text-emerald-600"></i>
                    <span>Apel Segar / Buah Potong</span>
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-300">
                    14g Serat & Alami
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '28%' }}></div>
                </div>
                <p className="text-[10px] text-emerald-800 font-medium">
                  <strong>Pilihan Sehat:</strong> Serat alami mencegah lonjakan gula darah dan kenyang lebih lama.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSugarGuideModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
            >
              Saya Paham & Siap Memilih Sehat
            </button>
          </div>
        </div>
      )}

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

      {/* Dandani Gogi Modal (Kustomisasi Warna & Aksesoris) */}
      <DandaniModal
        isOpen={isDandaniOpen}
        onClose={() => setIsDandaniOpen(false)}
        currentColor={mascotCustomization.color}
        currentAccessory={mascotCustomization.accessory}
        onSave={(color, accessory) => {
          setMascotCustomization({ color, accessory });
          showToast('Tampilan Gogi berhasil diperbarui! ✨');
        }}
      />

    </div>
  );
}
