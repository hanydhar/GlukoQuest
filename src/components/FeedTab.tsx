import React, { useState } from 'react';

interface AchievementFeedItem {
  id: number;
  userName: string;
  avatar: string;
  school: string;
  schoolCode: 'SMPN 1' | 'Lainnya';
  achievement: string;
  steps: number;
  time: string;
  likes: number;
  hasLiked?: boolean;
  streakDays?: number;
  isCurrentUser?: boolean;
}

const INITIAL_FEEDS: AchievementFeedItem[] = [
  {
    id: 1,
    userName: 'Dimas Aditya',
    avatar: '🚴‍♂️',
    school: 'SMPN 3 Surabaya',
    schoolCode: 'Lainnya',
    achievement: 'baru saja mencapai rekor 4.200 langkah jalan sehat sore!',
    steps: 4200,
    time: '2 menit lalu',
    likes: 27,
    streakDays: 5,
  },
  {
    id: 2,
    userName: 'Anisa Maharani',
    avatar: '👩‍🎓',
    school: 'SMPN 1 (Kelas 8-A)',
    schoolCode: 'SMPN 1',
    achievement: 'baru saja menyelesaikan target 2.150 langkah hari ini!',
    steps: 2150,
    time: '8 menit lalu',
    likes: 24,
    streakDays: 4,
  },
  {
    id: 3,
    userName: 'Kevin Sanjaya',
    avatar: '👟',
    school: 'SMP Harapan Bangsa',
    schoolCode: 'Lainnya',
    achievement: 'berhasil menuntaskan target 3.100 langkah jalan santai!',
    steps: 3100,
    time: '15 menit lalu',
    likes: 18,
    streakDays: 3,
  },
  {
    id: 4,
    userName: 'Budi Santoso (Kamu)',
    avatar: '👦',
    school: 'SMPN 1 (Kelas 8-B)',
    schoolCode: 'SMPN 1',
    achievement: 'baru saja menyelesaikan target 2.100 langkah hari ini!',
    steps: 2100,
    time: '25 menit lalu',
    likes: 38,
    streakDays: 5,
    isCurrentUser: true,
  },
  {
    id: 5,
    userName: 'Nadira Putri',
    avatar: '🏃‍♀️',
    school: 'SMPN 5 Surabaya',
    schoolCode: 'Lainnya',
    achievement: 'sukses menyelesaikan tantangan 3.000 langkah pagi hari!',
    steps: 3050,
    time: '45 menit lalu',
    likes: 31,
    streakDays: 6,
  },
  {
    id: 6,
    userName: 'Rizky Pratama',
    avatar: '🏃‍♂️',
    school: 'SMPN 1 (Kelas 7-C)',
    schoolCode: 'SMPN 1',
    achievement: 'baru saja mencapai target 3.500 langkah keliling sekolah!',
    steps: 3500,
    time: '1 jam lalu',
    likes: 19,
    streakDays: 6,
  },
  {
    id: 7,
    userName: 'Ahmad Fauzi',
    avatar: '⚽',
    school: 'SMP Nusantara',
    schoolCode: 'Lainnya',
    achievement: 'berhasil mencatatkan 2.800 langkah aktif sore ini!',
    steps: 2800,
    time: '2 jam lalu',
    likes: 14,
    streakDays: 2,
  },
  {
    id: 8,
    userName: 'Siti Rahmawati',
    avatar: '🧗‍♀️',
    school: 'SMPN 1 (Kelas 9-A)',
    schoolCode: 'SMPN 1',
    achievement: 'baru saja menyelesaikan target 3.000 langkah harian!',
    steps: 3000,
    time: '3 jam lalu',
    likes: 35,
    streakDays: 8,
  },
];

export const FeedTab: React.FC = () => {
  const [feeds, setFeeds] = useState<AchievementFeedItem[]>(INITIAL_FEEDS);
  const [filter, setFilter] = useState<'all' | 'school'>('all');

  const handleToggleLike = (id: number) => {
    setFeeds((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.hasLiked;
          return {
            ...item,
            hasLiked: nextLiked,
            likes: nextLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  const displayedFeeds = feeds.filter((f) => {
    if (filter === 'school') return f.schoolCode === 'SMPN 1';
    return true;
  });

  const countAll = feeds.length;
  const countSchool = feeds.filter((f) => f.schoolCode === 'SMPN 1').length;

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pt-1">
        <h2 className="text-lg font-black text-slate-800 leading-tight">
          Feed Capaian Langkah
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Aktivitas pencapaian target jalan kaki teman & pelajar lain
        </p>
      </div>

      {/* Filter Tabs dengan Indikator Jumlah & Status Aktif yang Jelas */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            filter === 'all'
              ? 'bg-white text-emerald-800 shadow-xs font-bold border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Semua Pelajar</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              filter === 'all'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {countAll}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilter('school')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            filter === 'school'
              ? 'bg-white text-emerald-800 shadow-xs font-bold border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Teman SMPN 1</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              filter === 'school'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {countSchool}
          </span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-2.5 animate-in fade-in duration-150" key={filter}>
        {displayedFeeds.map((feed) => (
          <div
            key={feed.id}
            className={`p-3.5 rounded-2xl border transition-all ${
              feed.isCurrentUser
                ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            {/* Top user row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shadow-xs flex-shrink-0">
                  {feed.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-800 leading-tight">
                      {feed.userName}
                    </span>
                    {feed.streakDays && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-1.5 py-0.5 rounded-md border border-amber-200">
                        🔥 {feed.streakDays}h
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                        feed.schoolCode === 'SMPN 1'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {feed.school}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      • {feed.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Badge */}
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                  {feed.steps.toLocaleString('id-ID')} langkah
                </span>
              </div>
            </div>

            {/* Achievement text */}
            <p className="text-xs text-slate-700 font-medium mt-2 leading-relaxed pl-11">
              <strong className="text-slate-900 font-bold">{feed.userName.replace(' (Kamu)', '')}</strong>{' '}
              {feed.achievement}
            </p>

            {/* Bottom Actions */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between pl-11">
              <button
                type="button"
                onClick={() => handleToggleLike(feed.id)}
                className={`text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  feed.hasLiked
                    ? 'text-rose-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <i className={`${feed.hasLiked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-xs`}></i>
                <span>{feed.likes}</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleLike(feed.id)}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <span>👏 Beri Selamat</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
