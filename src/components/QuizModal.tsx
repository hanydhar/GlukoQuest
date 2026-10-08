import React, { useState } from 'react';
import { getQuestionsForSession, QuizQuestion } from '../data/mockData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuiz: (earnedPoints: number) => void;
  currentEnergy: number;
  topicId?: string;
  sessionNumber?: number;
  sessionTitle?: string;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onCompleteQuiz,
  currentEnergy,
  topicId = 'gizi',
  sessionNumber = 1,
  sessionTitle = 'Sesi 1: Batas Gula Harian',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Ambil tepat 5 soal untuk sesi ini
  const sessionQuestions: QuizQuestion[] = getQuestionsForSession(topicId, sessionNumber);
  const currentQ: QuizQuestion = sessionQuestions[currentIndex] || sessionQuestions[0];

  if (!isOpen) return null;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const finalCorrect = correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0);
      // Sesuai Aturan: 1 Soal Benar = 10 Poin Hadiah (Maks 50 Poin / Sesi)
      const earnedPoints = finalCorrect * 10;
      onCompleteQuiz(earnedPoints);
    }
  };

  const handleResetAndClose = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setIsFinished(false);
    onClose();
  };

  const finalEarned = correctCount * 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🧠
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">{sessionTitle}</h3>
              <p className="text-[11px] text-emerald-100">Tiket: 1 Energi • 1 Soal Benar = 10 Pts</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="p-4 overflow-y-auto flex-1 space-y-3.5">
            {/* Progress Counter */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Soal {currentIndex + 1} dari {sessionQuestions.length}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                Sesi {sessionNumber}
              </span>
            </div>

            {/* Question Text */}
            <p className="text-slate-800 font-bold text-xs leading-relaxed">
              {currentQ.question}
            </p>

            {/* Options */}
            <div className="space-y-2 pt-0.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                if (selectedOption === idx) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/30 font-semibold';
                }

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-600 bg-emerald-100 text-emerald-950 font-bold ring-2 ring-emerald-500';
                  } else if (selectedOption === idx) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                  } else {
                    btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs leading-normal transition-all flex items-start gap-2 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center font-bold text-[10px] mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {isAnswerSubmitted && (
              <div className={`p-3 rounded-xl text-xs space-y-1 ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border border-amber-200 text-amber-900'
              }`}>
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <i className="fa-solid fa-circle-check text-emerald-600"></i>
                      <span>Jawaban Benar! (+10 Poin Hadiah)</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-circle-exclamation text-amber-600"></i>
                      <span>Penjelasan Edukasi:</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="p-5 text-center space-y-3.5 my-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl">
              🎯
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-800">Sesi {sessionNumber} Selesai!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Kamu menjawab benar {correctCount} dari 5 soal ({finalEarned} Poin).
              </p>
            </div>

            <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-200 text-center">
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                Poin Hadiah Diperoleh
              </span>
              <span className="text-2xl font-black text-emerald-700 mt-0.5 block">
                +{finalEarned} Poin Hadiah
              </span>
              <p className="text-[10px] text-emerald-600 mt-1 font-medium">
                Kumpulkan minimal 200 Poin untuk membuka E-Voucher Kantin Rp5.000!
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100">
          {!isFinished ? (
            !isAnswerSubmitted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
              >
                Kunci Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>{currentIndex < sessionQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Sesi'}</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs"
            >
              Kembali ke Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
