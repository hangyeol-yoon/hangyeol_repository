import React, { useState } from 'react';
import { Calculator, X, Send, Check } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [service, setService] = useState('ai');
  const [scale, setScale] = useState('medium');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const calculateEstimate = () => {
    let base = 3500000;
    if (service === 'ai') base = 4500000;
    if (service === 'cloud') base = 3800000;
    if (service === 'custom') base = 5000000;

    let mult = 1.0;
    if (scale === 'small') mult = 0.8;
    if (scale === 'enterprise') mult = 1.8;

    return Math.round(base * mult);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">빠른 실시간 예상 견적</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">견적 요청이 접수되었습니다!</h4>
            <p className="text-xs text-slate-400">
              선택하신 사양 기반 상세 맞춤 견적서가 담당자 이메일로 전송될 예정입니다.
            </p>
            <button 
              onClick={() => { setSubmitted(false); onClose(); }} 
              className="mt-4 px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              확인
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 font-bold block mb-1.5">도입 희망 솔루션</label>
              <select 
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value="ai">Enterprise AI & Private LLM RAG</option>
                <option value="cloud">Multi-Cloud Orchestrator & FinOps</option>
                <option value="data">BigData Lakehouse & Real-time BI</option>
                <option value="custom">맞춤형 풀스택 엔터프라이즈 SW 개발</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1.5">인프라 및 사용 규모</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', label: '스타트업' },
                  { id: 'medium', label: '중견기업' },
                  { id: 'enterprise', label: '대기업/공공' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScale(s.id)}
                    className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                      scale === s.id 
                        ? 'bg-blue-600 text-white border-blue-500' 
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-slate-400 block text-[11px]">산출 표준 월 예산 범위</span>
              <div className="text-2xl font-black text-cyan-400">
                {(calculateEstimate() / 10000).toLocaleString()} <span className="text-xs font-normal text-slate-300">만원 / 월</span>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors"
            >
              이 견적으로 상담 문의 제출하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
