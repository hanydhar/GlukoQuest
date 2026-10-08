import React, { useState } from 'react';

interface AchievementFeedItem {
  id: number;
  userName: string;
  avatar: string;
  school: string;
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
    userName: 'Anisa Maharani',
    avatar: '👩‍🎓',
    school: 'SMPN 1 (Kelas 8-A)',
    achievement: 'baru saja menyelesaikan target 2.000 langkah/hari!',
    steps: 2150,
    time: '2 menit lalu',
    likes: 24,
    streakDays: 4,
  },
  {
    id: 2,
    userName: 'Rizky Pratama',
    avatar: '🏃‍♂️',
    school: 'SMPN 1 (Kelas 7-C)',
    achievement: 'baru saja mencapai target 3.500 langkah keliling sekolah!',
    steps: 3500,
    time: '12 menit lalu',
    likes: 19,
    streakDays: 6,
  },
  {
    id: 3,
    userName: 'Budi Santoso (Kamu)',
    avatar: '👦',
    school: 'SMPN 1 (Kelas 8-B)',
    achievement: 'baru saja menyelesaikan target 3.420 langkah/hari!',
    steps: 3420,
    time: '25 menit lalu',
    likes: 38,
    streakDays: 7,
    isCurrentUser: true,
  },
  {
    id: 4,
    userName: 'Farah Nadia',
    avatar: '🧕',
    school: 'SMPN 1 (Kelas 7-B)',
    achievement: 'baru saja menuntaskan target 2.000 langkah/hari!',
    steps: 2040,
    time: '1 jam lalu',
    likes: 15,
    streakDays: 3,
  },
  {
    id: 5,
    userName: 'Dimas Aditya',
    avatar: '🚴‍♂️',
    school: 'SMPN 3 Surabaya',
    achievement: 'baru saja mencapai rekor 4.200 langkah jalan sehat sore!',
    steps: 4200,
    time: '2 jam lalu',
    likes: 27,
    streakDays: 5,
  },
  {
    id: 6,
    userName: 'Siti Rahmawati',
    avatar: '🧗‍♀️',
    school: 'SMPN 1 (Kelas 9-A)',
    achievement: 'baru saja menyelesaikan target 3.000 langkah/hari!',
    steps: 3100,
    time: '3 jam lalu',
    likes: 31,
    streakDays: 8,
  },
  {
    id: 7,
    userName: 'Kevin Sanjaya',
    avatar: '👟',
    school: 'SMP Harapan Bangsa',
    achievement: 'baru saja menyelesaikan target 2.500 langkah/hari!',
    steps: 2600,
    time: '4 jam lalu',
    likes: 11,
    streakDays: 2,
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
    if (filter === 'school') return f.school.includes('SMPN 1');
    return true;
  });

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800 leading-tight">
            Feed Capaian Langkah
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Aktivitas pencapaian target jalan kaki teman & pelajar lain
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          👟 Live
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-white text-slate-800 shadow-xs font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Semua Pelajar
        </button>
        <button
          onClick={() => setFilter('school')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            filter === 'school'
              ? 'bg-white text-emerald-700 shadow-xs font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Teman SMPN 1
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-2.5">
        {displayedFeeds.map((feed) => (
          <div
            key={feed.id}
            className={`p-3.5 rounded-2xl border transition-all ${
              feed.isCurrentUser
                ? 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                : 'bg-white border-slate-200 shadow-xs'
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
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {feed.school} • {feed.time}
                  </span>
                </div>
              </div>

              {/* Step Badge */}
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                  {feed.steps.toLocaleString('id-ID')} langkah
                </span>
              </div>
            </div>

            {/* Achievement text as requested: "Anisa baru saja menyelesaikan target 2000 langkah/hari" */}
            <p className="text-xs text-slate-700 font-medium mt-2 leading-relaxed pl-11">
              <strong className="text-slate-900 font-bold">{feed.userName.replace(' (Kamu)', '')}</strong>{' '}
              {feed.achievement}
            </p>

            {/* Bottom Actions */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between pl-11">
              <button
                onClick={() => handleToggleLike(feed.id)}
                className={`text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  feed.hasLiked
                    ? 'text-rose-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <i className={`${feed.hasLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-xs`}></i>
                <span>{feed.likes} Semangat</span>
              </button>

              <button
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
