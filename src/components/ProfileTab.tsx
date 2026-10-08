import React, { useState } from 'react';

interface UserProfileData {
  name: string;
  school: string;
  grade: string;
  nisn: string;
  avatar: string;
}

interface ProfileTabProps {
  currentSteps: number;
  targetSteps: number;
  userPoints: number;
  energy: number;
  onUpdateTarget: (newTarget: number) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  currentSteps,
  targetSteps,
  userPoints,
  energy,
  onUpdateTarget,
}) => {
  // Profile state
  const [profile, setProfile] = useState<UserProfileData>({
    name: 'Budi Santoso',
    school: 'SMPN 1',
    grade: '8-B',
    nisn: '0092837190',
    avatar: '👦',
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifReminders: true,
    hapticFeedback: true,
    soundEffects: true,
    autoSyncPedometer: true,
  });

  // Active modal state
  const [activeModal, setActiveModal] = useState<'edit' | 'settings' | 'guide' | 'about' | 'faq' | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState<UserProfileData>(profile);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setActiveModal(null);
  };

  return (
    <div className="space-y-3.5 pb-20 animate-in fade-in duration-150">
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xs flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl">
              {profile.avatar}
            </div>
          </div>
          <button
            onClick={() => {
              setEditForm(profile);
              setActiveModal('edit');
            }}
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] hover:bg-emerald-600 transition-colors"
            title="Edit Foto"
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-800 truncate">
              {profile.name}
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Juara 1 SMP
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {profile.school} • Kelas {profile.grade}
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            NISN: {profile.nisn}
          </p>
        </div>
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <span className="text-[10px] font-medium text-slate-400 block">Poin Sekolah</span>
          <span className="text-sm font-black text-emerald-600 mt-0.5 block">
            {userPoints.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <span className="text-[10px] font-medium text-slate-400 block">Energi ⚡</span>
          <span className="text-sm font-black text-amber-500 mt-0.5 block">
            {energy}
          </span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <span className="text-[10px] font-medium text-slate-400 block">Langkah</span>
          <span className="text-sm font-black text-sky-600 mt-0.5 block">
            {currentSteps.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Profile Menu List as Requested: edit, setting, panduan, about, dll */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {/* 1. Edit Profil */}
        <button
          onClick={() => {
            setEditForm(profile);
            setActiveModal('edit');
          }}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                Edit Profil
              </div>
              <div className="text-[10px] text-slate-400">
                Ubah nama, kelas, NISN, dan avatar
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-300 text-xs group-hover:translate-x-0.5 transition-transform"></i>
        </button>

        {/* 2. Pengaturan (Setting) */}
        <button
          onClick={() => setActiveModal('settings')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-sliders"></i>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                Pengaturan Aplikasi
              </div>
              <div className="text-[10px] text-slate-400">
                Target langkah, notifikasi & sensor
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-300 text-xs group-hover:translate-x-0.5 transition-transform"></i>
        </button>

        {/* 3. Panduan Aplikasi */}
        <button
          onClick={() => setActiveModal('guide')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                Panduan GlukoQuest
              </div>
              <div className="text-[10px] text-slate-400">
                Cara kumpulkan energi & cegah diabetes
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-300 text-xs group-hover:translate-x-0.5 transition-transform"></i>
        </button>

        {/* 4. Tentang Aplikasi (About) */}
        <button
          onClick={() => setActiveModal('about')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-circle-info"></i>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                Tentang GlukoQuest
              </div>
              <div className="text-[10px] text-slate-400">
                Versi 1.2.0 • Misi kesehatan remaja
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-300 text-xs group-hover:translate-x-0.5 transition-transform"></i>
        </button>

        {/* 5. Bantuan & FAQ */}
        <button
          onClick={() => setActiveModal('faq')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-circle-question"></i>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                Bantuan & FAQ
              </div>
              <div className="text-[10px] text-slate-400">
                Tanya jawab klaim voucher kantin
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-300 text-xs group-hover:translate-x-0.5 transition-transform"></i>
        </button>
      </div>

      {/* Program Info Card */}
      <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2.5">
        <i className="fa-solid fa-shield-heart text-emerald-600 mt-0.5 text-xs flex-shrink-0"></i>
        <span>
          GlukoQuest terhubung dengan UKS SMPN 1 untuk pencegahan diabetes remaja melalui kebiasaan jalan kaki aktif & edukasi nutrisi rendah gula.
        </span>
      </div>

      {/* ================= MODAL 1: EDIT PROFIL ================= */}
      {activeModal === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800">Edit Profil Pengguna</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Pilih Avatar</label>
                <div className="flex gap-2 justify-between">
                  {['👦', '👧', '🏃‍♂️', '🚴‍♀️', '🧑‍🎓'].map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setEditForm({ ...editForm, avatar: av })}
                      className={`w-10 h-10 rounded-xl text-xl border flex items-center justify-center transition-all ${
                        editForm.avatar === av
                          ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:outline-emerald-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Sekolah</label>
                  <input
                    type="text"
                    value={editForm.school}
                    onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Kelas</label>
                  <input
                    type="text"
                    value={editForm.grade}
                    onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:outline-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">NISN</label>
                <input
                  type="text"
                  value={editForm.nisn}
                  onChange={(e) => setEditForm({ ...editForm, nisn: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium font-mono focus:outline-emerald-600"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: PENGATURAN (SETTINGS) ================= */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800">Pengaturan GlukoQuest</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Target steps quick change */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-700 block">Target Harian Langkah</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[2000, 3000, 5000].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => onUpdateTarget(t)}
                      className={`py-1.5 rounded-lg font-bold border transition-all text-xs ${
                        targetSteps === t
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2.5 pt-1">
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-800 text-xs">Pengingat Langkah Siang</div>
                    <div className="text-[10px] text-slate-400">Ingatkan jalan kaki saat istirahat sekolah</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifReminders}
                    onChange={(e) => setSettings({ ...settings, notifReminders: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-800 text-xs">Efek Suara Gamifikasi</div>
                    <div className="text-[10px] text-slate-400">Bunyi koin saat klaim energi & kuis</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundEffects}
                    onChange={(e) => setSettings({ ...settings, soundEffects: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-800 text-xs">Sinkronisasi Sensor Otomatis</div>
                    <div className="text-[10px] text-slate-400">Hitung langkah dari giroskop smartphone</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoSyncPedometer}
                    onChange={(e) => setSettings({ ...settings, autoSyncPedometer: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: PANDUAN APLIKASI ================= */}
      {activeModal === 'guide' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <span>📖 Panduan GlukoQuest</span>
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-person-walking text-emerald-600"></i>
                  <span>1. Kumpulkan Langkah Harian</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Target harian adalah minimal 3.000 langkah. Setiap langkah mengaktifkan reseptor insulin dan mencegah penumpukan gula darah.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-bolt text-amber-600"></i>
                  <span>2. Energi & Virtual Pet</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Langkah kaki terakumulasi menjadi energi ⚡. Jika jarang bergerak, maskot akan lesu (Health 15%). Jika rajin bergerak, maskot ceria (Health 95%)!
                </p>
              </div>

              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 text-teal-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-brain text-teal-600"></i>
                  <span>3. Kuis Edukasi & Voucher Kantin</span>
                </div>
                <p className="text-[11px] text-teal-800">
                  Gunakan energimu untuk mengikuti kuis seputar nutrisi, batas konsumsi gula, dan gizi seimbang. Poin yang didapat bisa ditukar dengan voucher makan siang sehat di kantin sekolah!
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: ABOUT GLUKOQUEST ================= */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl text-center space-y-3.5">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-3xl shadow-sm">
              👟
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">GlukoQuest</h3>
              <p className="text-xs text-emerald-600 font-bold">Versi 1.2.0 (Build 2026)</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed text-left bg-slate-50 p-3 rounded-2xl border border-slate-200">
              GlukoQuest adalah platform gamifikasi kesehatan remaja untuk mencegah risiko diabetes tipe-2 dini di lingkungan sekolah. Dibuat dengan pendekatan interaktif melalui virtual pet tosca, pedometer pintar, kuis nutrisi, dan insentif voucher kantin sehat.
            </p>
            <div className="text-[10px] text-slate-400 text-center">
              Program Kerjasama UKS SMPN 1 & Kemenkes RI • Hak Cipta Terlindungi
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL 5: BANTUAN & FAQ ================= */}
      {activeModal === 'faq' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800">Bantuan & FAQ</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="font-bold text-slate-800">Bagaimana cara menukar voucher kantin?</div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Buka tab 'Voucher', pilih menu makan siang sehat yang kamu sukai, lalu tunjukkan barcode kepada petugas stand kantin saat jam istirahat.
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="font-bold text-slate-800">Mengapa maskot saya lesu?</div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Maskot akan lesu jika langkah kakimu di bawah target harian. Berjalanlah minimal 2.000 langkah agar maskot kembali ceria dan tersenyum!
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="font-bold text-slate-800">Apakah data langkah saya aman?</div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Ya, data aktivitas dihitung langsung di perangkat untuk keperluan gamifikasi sekolah dan tidak disebarluaskan ke pihak ketiga.
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
