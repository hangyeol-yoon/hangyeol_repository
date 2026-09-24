import React, { useState } from 'react';
import { CHECKUP_PACKAGES } from '../data/hospitalData';
import { CheckupPackage } from '../types';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  PhoneCall,
  FileText,
  UserCheck,
} from 'lucide-react';

interface HealthCheckupSectionProps {
  onOpenBooking: () => void;
}

export const HealthCheckupSection: React.FC<HealthCheckupSectionProps> = ({
  onOpenBooking,
}) => {
  const [expandedPkgId, setExpandedPkgId] = useState<string>('precision');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedPkgName, setSelectedPkgName] = useState('정밀 소화기·상복부 검진');
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('010-');
  const [requestedDate, setRequestedDate] = useState('2026-08-10');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantPhone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>EXECUTIVE HEALTH CHECKUP CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            맞춤형 종합건강증진센터
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            최첨단 3.0T MRI, 128채널 CT, 원스톱 당일 내시경 검진 솔루션을 만나보세요.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHECKUP_PACKAGES.map((pkg) => {
            const isExpanded = expandedPkgId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                  pkg.tag === '인기 1위' || pkg.tag === 'VIP 명품'
                    ? 'border-emerald-300 ring-2 ring-emerald-500/10'
                    : 'border-slate-200'
                }`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      {pkg.tag}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {pkg.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{pkg.subtitle}</p>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900">
                        {pkg.discountPrice
                          ? pkg.discountPrice.toLocaleString()
                          : pkg.price.toLocaleString()}
                        <span className="text-sm font-normal text-slate-600">원</span>
                      </span>
                      {pkg.discountPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {pkg.price.toLocaleString()}원
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recommended List */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">추천 대상</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {pkg.recommendedFor.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Test items toggler */}
                  <button
                    onClick={() => setExpandedPkgId(isExpanded ? '' : pkg.id)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition"
                  >
                    <span>{isExpanded ? '검사 세부항목 닫기' : '포함된 세부검사 보기'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Expanded Items */}
                  {isExpanded && (
                    <div className="pt-2 space-y-3 text-xs bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/80 animate-in fade-in">
                      {pkg.items.map((cat, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="font-bold text-emerald-900">{cat.category}</p>
                          <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1">
                            {cat.list.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedPkgName(pkg.name);
                      setShowRequestModal(true);
                      setIsSuccess(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>건강검진 상담/예약 신청</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Examination Prep Instructions Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              건강검진 전날 및 당일 필수 주의사항
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <p className="font-bold text-slate-900">1. 금식 안내 (8시간 이상)</p>
              <p>검사 전날 저녁 8시 이후부터 물, 음료수, 담배, 껌을 포함하여 완벽히 금식해 주시기 바랍니다.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <p className="font-bold text-slate-900">2. 약물 복용 사전 상담</p>
              <p>혈압약은 검사 당일 새벽 소량의 물과 복용 가능하며, 아스피린/항응고제 및 당뇨약은 사전 중단이 필요합니다.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <p className="font-bold text-slate-900">3. 내원 시 준비물</p>
              <p>신분증을 반드시 지참해 주시고 수면 검사 대상자는 당일 자가 운전이 불가능하므로 대중교통을 이용해주세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkup Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            {!isSuccess ? (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    상담 신청
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-serif mt-1">
                    {selectedPkgName}
                  </h3>
                  <p className="text-xs text-slate-500">전문 간호사가 전화로 상세 일정을 확인해 드립니다.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">신청자 성함 *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">검진 희망 연월일</label>
                  <input
                    type="date"
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition"
                >
                  검진 상담 예약 신청 완료
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  상담 신청이 정상 완료되었습니다!
                </h3>
                <p className="text-xs text-slate-600">
                  {applicantName} 님 ({applicantPhone})으로 상담 간호사가 빠른 시일 내 전화 안내를 도와드리겠습니다.
                </p>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
