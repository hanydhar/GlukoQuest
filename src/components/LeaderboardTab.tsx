import React, { useState } from 'react';
import { SCHOOL_LEADERBOARD, QUIZ_TOPICS, QuizTopic } from '../data/mockData';

interface LeaderboardTabProps {
  onStartSession: (topicId: string, sessionNumber: number, topicTitle: string, sessionTitle: string) => void;
  userPoints: number;
  availableEnergy: number;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({
  onStartSession,
  userPoints,
  availableEnergy,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Top Banner Header */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800 leading-tight">
            Kuis Edukasi & Peringkat
          </h2>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
          <span>⚡ {availableEnergy} Energi</span>
        </span>
      </div>

      {/* Quiz Topics Container */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Pilih Topik Kuis Pradiabetes
          </h3>
        </div>

        {/* 2x2 Grid of Topics */}
        <div className="grid grid-cols-2 gap-2.5">
          {QUIZ_TOPICS.map((topic, index) => {
            const isHighlight = index === 0;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-2 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  isHighlight
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-800 border border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
                style={{ minHeight: '110px' }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    isHighlight ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <i className={`fa-solid ${topic.icon}`}></i>
                </div>

                <div className="space-y-0.5">
                  <div className={`text-xs font-bold leading-tight ${isHighlight ? 'text-white' : 'text-slate-800'}`}>
                    {topic.title}
                  </div>
                  <div className={`text-[10px] ${isHighlight ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {topic.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SESSIONS PICKER MODAL */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                  Topik Edukasi
                </span>
                <h3 className="text-sm font-black text-slate-800 mt-1">
                  {selectedTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              1 topik terdiri dari 4 sesi berjenjang. Setiap 1 sesi berisi 5 soal (1 Poin Energi untuk membuka sesi, 10 Pts per soal benar).
            </p>

            {/* List of 4 Sessions */}
            <div className="space-y-2.5">
              {selectedTopic.sessions.map((sess) => {
                const canAfford = availableEnergy >= 1;

                return (
                  <div
                    key={sess.number}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
                          {sess.number}
                        </span>
                        <span>{sess.title}</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-md shadow-xs">
                        Tiket: 1 ⚡
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {sess.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="text-[10px] text-slate-400 font-medium">
                        5 Soal • Maks 50 Poin
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTopic(null);
                          onStartSession(selectedTopic.id, sess.number, selectedTopic.title, sess.title);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          canAfford
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Buka Sesi Ini 🚀' : 'Butuh 1 Energi ⚡'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedTopic(null)}
              className="w-full py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* School Leaderboard Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800">
              Peringkat Sekolah - SMPN 1
            </h3>
            <p className="text-[10px] text-slate-400">
              Akumulasi poin hadiah dari kuis & langkah harian
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            🏆 Musim 1
          </span>
        </div>

        {/* Leaderboard Items */}
        <div className="space-y-2">
          {SCHOOL_LEADERBOARD.map((item) => {
            const isUser = item.isCurrentUser;
            const displayPoints = isUser ? userPoints : item.points;

            return (
              <div
                key={item.rank}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  isUser
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                    : 'bg-white border-slate-200 shadow-xs text-slate-800'
                }`}
              >
                {/* Left: Rank & Avatar & Name */}
                <div className="flex items-center gap-2.5">
                  <div className="w-6 flex items-center justify-center font-black text-xs">
                    {item.rank === 1 ? (
                      <span className="text-base" title="Peringkat 1">👑</span>
                    ) : (
                      <span className="text-slate-500 font-bold text-xs">{item.rank}</span>
                    )}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-base">
                    {item.avatar}
                  </div>

                  <div>
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {isUser && (
                        <span className="text-[9px] bg-emerald-700 text-white font-extrabold px-1.5 py-0.2 rounded-md">
                          Kamu
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      Kelas {item.class}
                    </div>
                  </div>
                </div>

                {/* Right: Points */}
                <div className="text-right">
                  <div className="text-xs font-black text-slate-900">
                    {displayPoints.toLocaleString('id-ID')} Pts
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    {displayPoints >= 200 ? '✅ Siap E-Voucher' : `Kurang ${200 - displayPoints} Pts`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
