import React, { useState } from 'react';
import { CreditCard, Copy, Check, Info, ShieldCheck, Heart } from 'lucide-react';
import { OFFERING_ACCOUNTS, CHURCH_INFO } from '../data/churchData';

interface OfferingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferingModal: React.FC<OfferingModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (accNum: string, index: number) => {
    navigator.clipboard.writeText(accNum);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                온라인 헌금 안내
              </h3>
              <p className="text-xs text-stone-500">
                {CHURCH_INFO.name} 공식 계좌 안내
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 font-bold text-lg">
            ✕
          </button>
        </div>

        {/* Verse */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-serif leading-relaxed italic">
          "각각 그 마음에 정한 대로 할 것이요 아까움으로나 억지로 하지 말지니 하나님은 즐겨 내는 자를 사랑하시느니라" (고린도후서 9:7)
        </div>

        {/* Account Cards */}
        <div className="space-y-4">
          {OFFERING_ACCOUNTS.map((acc, idx) => (
            <div key={idx} className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-800 text-white">
                  {acc.type}
                </span>
                <span className="text-xs text-stone-500 font-medium">예금주: {acc.holder}</span>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200 font-mono text-stone-900">
                <div>
                  <span className="text-xs text-stone-400 mr-2">{acc.bank}</span>
                  <span className="font-bold text-base sm:text-lg">{acc.accountNumber}</span>
                </div>

                <button
                  onClick={() => handleCopy(acc.accountNumber, idx)}
                  className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-700">복사완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>계좌복사</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-stone-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{acc.note}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Tax deduction notice */}
        <div className="pt-2 text-[11px] text-stone-500 space-y-1 border-t border-stone-100">
          <p className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>기부금 영수증 발급: 연말정산용 기부금 영수증 문의는 교회 행정실({CHURCH_INFO.phone})로 문의 바랍니다.</span>
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-xl"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
