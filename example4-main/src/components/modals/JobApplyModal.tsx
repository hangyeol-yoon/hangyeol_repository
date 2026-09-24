import React, { useState } from 'react';
import { Send, X, Check, Paperclip } from 'lucide-react';

interface JobApplyModalProps {
  jobTitle: string | null;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ jobTitle, onClose }) => {
  const [applicant, setApplicant] = useState({ name: '', phone: '', email: '', portfolioUrl: '', memo: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!jobTitle) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">RECRUITMENT APPLICATION</span>
            <h3 className="text-lg font-bold text-white">{jobTitle} 지원</h3>
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
            <h4 className="text-base font-bold text-white">서류 제출이 완료되었습니다!</h4>
            <p className="text-xs text-slate-400">
              채용 피플팀에서 검토 후 영업일 기준 3일 이내에 개별 연락드리겠습니다.
            </p>
            <button 
              onClick={onClose} 
              className="mt-4 px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              확인
            </button>
          </div>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }} 
            className="space-y-4 text-xs"
          >
            <div>
              <label className="text-slate-400 font-bold block mb-1">지원자 성함 *</label>
              <input 
                type="text" 
                required 
                value={applicant.name}
                onChange={(e) => setApplicant({...applicant, name: e.target.value})}
                placeholder="홍길동"
                className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-bold block mb-1">연락처 *</label>
                <input 
                  type="tel" 
                  required 
                  value={applicant.phone}
                  onChange={(e) => setApplicant({...applicant, phone: e.target.value})}
                  placeholder="010-0000-0000"
                  className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">이메일 *</label>
                <input 
                  type="email" 
                  required 
                  value={applicant.email}
                  onChange={(e) => setApplicant({...applicant, email: e.target.value})}
                  placeholder="dev@email.com"
                  className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">이력서 / GitHub / 포트폴리오 URL</label>
              <input 
                type="url" 
                value={applicant.portfolioUrl}
                onChange={(e) => setApplicant({...applicant, portfolioUrl: e.target.value})}
                placeholder="https://github.com/username 또는 Notion 링크"
                className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">자기소개 및 한줄 메시지</label>
              <textarea 
                rows={3}
                value={applicant.memo}
                onChange={(e) => setApplicant({...applicant, memo: e.target.value})}
                placeholder="지원 동기 및 주요 기술 경력을 간단히 적어주세요."
                className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>입사 지원서 제출하기</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
