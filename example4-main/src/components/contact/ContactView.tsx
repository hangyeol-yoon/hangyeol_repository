import React, { useState } from 'react';
import { 
  MessageSquare, 
  Calculator, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  Navigation,
  Train,
  Bus,
  Car,
  Building2,
  Calendar
} from 'lucide-react';
import { ContactSubSection, QuoteCalculationState } from '../../types';
import { COMPANY_INFO } from '../../data/companyData';

interface ContactViewProps {
  initialSubSection?: string;
  onNavigate: (category: any, subSection?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ initialSubSection = 'consulting', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ContactSubSection>(
    (initialSubSection as ContactSubSection) || 'consulting'
  );

  // Form State
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [consultForm, setConsultForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    topic: 'AI 에이전트 도입',
    preferredDate: '',
    message: ''
  });
  const [isConsultSubmitted, setIsConsultSubmitted] = useState(false);

  // Quote Calculator State
  const [quoteState, setQuoteState] = useState<QuoteCalculationState>({
    serviceType: 'ai',
    userScale: 'medium',
    additionalOptions: ['rag', 'monitoring'],
    urgency: 'normal'
  });
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  const calculateEstimate = () => {
    let base = 3000000;
    if (quoteState.serviceType === 'ai') base = 4500000;
    if (quoteState.serviceType === 'cloud') base = 3500000;
    if (quoteState.serviceType === 'data') base = 4000000;
    if (quoteState.serviceType === 'custom') base = 5000000;

    let multiplier = 1.0;
    if (quoteState.userScale === 'small') multiplier = 0.8;
    if (quoteState.userScale === 'medium') multiplier = 1.2;
    if (quoteState.userScale === 'enterprise') multiplier = 2.0;

    const optionsAdd = quoteState.additionalOptions.length * 800000;
    const urgencyMultiplier = quoteState.urgency === 'express' ? 1.25 : 1.0;

    const total = Math.round((base * multiplier + optionsAdd) * urgencyMultiplier);
    return total;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const tabs: { id: ContactSubSection; label: string; icon: any }[] = [
    { id: 'consulting', label: '상담 신청', icon: MessageSquare },
    { id: 'quote', label: '견적 문의', icon: Calculator },
    { id: 'location', label: '오시는 길', icon: MapPin },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            CONTACT & LOCATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            문의 및 오시는 길
          </h1>
          <p className="text-sm text-slate-400">
            전문 기술 엔지니어와의 1:1 상담 및 인터랙티브 예상 견적 산출
          </p>
        </div>

        {/* Sub Navigation Bar */}
        <div className="max-w-xl mx-auto mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* 1. 상담 신청 */}
        {activeTab === 'consulting' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-bold text-white">1:1 무상 기술 상담 신청</h2>
                <p className="text-xs text-slate-400 mt-1">
                  접수 후 2시간 이내에 담당 수석 엔지니어가 직접 연락을 드립니다.
                </p>
              </div>

              {isConsultSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">상담 신청이 완료되었습니다!</h3>
                  <p className="text-xs text-slate-300">
                    입력하신 연락처({consultForm.phone})로 전담 컨설턴트가 빠르게 안내해 드리겠습니다.
                  </p>
                  <button
                    onClick={() => setIsConsultSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl"
                  >
                    추가 문의하기
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsConsultSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">성함 *</label>
                      <input 
                        type="text" 
                        required 
                        value={consultForm.name}
                        onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                        placeholder="홍길동"
                        className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">회사명 / 소속 *</label>
                      <input 
                        type="text" 
                        required 
                        value={consultForm.company}
                        onChange={(e) => setConsultForm({...consultForm, company: e.target.value})}
                        placeholder="(주)한국테크"
                        className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">연락처 *</label>
                      <input 
                        type="tel" 
                        required 
                        value={consultForm.phone}
                        onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                        placeholder="010-1234-5678"
                        className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">이메일 주소 *</label>
                      <input 
                        type="email" 
                        required 
                        value={consultForm.email}
                        onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                        placeholder="contact@company.com"
                        className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">상담 분야 선택</label>
                      <select
                        value={consultForm.topic}
                        onChange={(e) => setConsultForm({...consultForm, topic: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                      >
                        <option value="AI 에이전트 도입">AI 에이전트 & Private LLM 도입</option>
                        <option value="클라우드 마이그레이션">멀티 클라우드 구축 & FinOps</option>
                        <option value="빅데이터 레이크하우스">실시간 데이터 레이크하우스</option>
                        <option value="맞춤 시스템 개발">차세대 웹/앱 커스텀 개발</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 font-bold block mb-1">희망 상담 일시</label>
                      <input 
                        type="date" 
                        value={consultForm.preferredDate}
                        onChange={(e) => setConsultForm({...consultForm, preferredDate: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">문의 및 요구사항</label>
                    <textarea 
                      rows={4}
                      value={consultForm.message}
                      onChange={(e) => setConsultForm({...consultForm, message: e.target.value})}
                      placeholder="구축하고자 하는 프로젝트 개요 및 문의 내용을 적어주세요."
                      className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>상담 신청 제출하기</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 2. 견적 문의 (Interactive Calculator) */}
        {activeTab === 'quote' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white">인터랙티브 실시간 견적 산출 계산기</h2>
                <p className="text-xs text-slate-400 mt-1">
                  원하는 프로젝트 항목을 선택하시면 예상 월/일시 구축 표준 비용이 즉시 계산됩니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Options Controls */}
                <div className="space-y-6 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-2">1. 서비스 솔루션 유형</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'ai', label: 'Enterprise AI & RAG' },
                        { id: 'cloud', label: 'Multi-Cloud & SRE' },
                        { id: 'data', label: 'BigData Lakehouse' },
                        { id: 'custom', label: 'Full-stack Custom' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setQuoteState({...quoteState, serviceType: s.id as any})}
                          className={`p-3 rounded-xl font-bold border text-left transition-all ${
                            quoteState.serviceType === s.id
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-2">2. 기업 및 트래픽 규모</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'small', label: '스타트업 / 소규모' },
                        { id: 'medium', label: '중견기업 / 확장형' },
                        { id: 'enterprise', label: '대기업 / 고트래픽' }
                      ].map((sc) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => setQuoteState({...quoteState, userScale: sc.id as any})}
                          className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                            quoteState.userScale === sc.id
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-2">3. 추가 옵션 모듈</label>
                    <div className="space-y-2">
                      {[
                        { id: 'rag', label: '사내 문서 RAG 백엔드 (+80만원)' },
                        { id: 'pii', label: 'PII 개인정보 자동 마스킹 (+80만원)' },
                        { id: 'monitoring', label: '24/7 전담 SRE 실시간 관제 (+80만원)' }
                      ].map((opt) => {
                        const isChecked = quoteState.additionalOptions.includes(opt.id);
                        return (
                          <label 
                            key={opt.id} 
                            className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${
                              isChecked ? 'bg-blue-950/40 border-blue-500/50 text-blue-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setQuoteState({...quoteState, additionalOptions: [...quoteState.additionalOptions, opt.id]});
                                } else {
                                  setQuoteState({...quoteState, additionalOptions: quoteState.additionalOptions.filter(i => i !== opt.id)});
                                }
                              }}
                              className="accent-blue-500"
                            />
                            <span>{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">
                      ESTIMATED PRICING SUMMARY
                    </span>

                    <div className="space-y-2 text-xs border-b border-slate-800 pb-4">
                      <div className="flex justify-between text-slate-400">
                        <span>선택 솔루션</span>
                        <span className="font-bold text-white uppercase">{quoteState.serviceType}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>기업 규모</span>
                        <span className="font-bold text-white uppercase">{quoteState.userScale}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>추가 옵션 수</span>
                        <span className="font-bold text-white">{quoteState.additionalOptions.length}개 선택</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block">예상 구축/운영 표준 월 견적</span>
                      <div className="text-3xl font-black text-cyan-400 mt-1">
                        {(calculateEstimate() / 10000).toLocaleString()} <span className="text-sm font-normal text-slate-300">만원 / 월</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">* VAT 별도, 세부 커스터마이징 범위에 따라 변동될 수 있습니다.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`예상 견적 ${(calculateEstimate() / 10000).toLocaleString()}만원으로 정식 견적서 제출 신청이 완료되었습니다.`)}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/30"
                  >
                    이 견적으로 정식 안내서 다운로드
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. 오시는 길 */}
        {activeTab === 'location' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Info Column */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">HEADQUARTERS</span>
                  <h2 className="text-2xl font-bold text-white mt-1">테헤란로 본사 오시는 길</h2>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="font-bold text-slate-300 block">주소</span>
                    <p className="text-slate-300">{COMPANY_INFO.address}</p>
                    <button
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-[11px] font-bold border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? '주소 복사 완료!' : '주소 복사하기'}</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Train className="w-4 h-4 text-blue-400" />
                      <span>지하철 이용 안내</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-400 leading-relaxed">
                      <li>• 2호선 / 수인분당선 <strong className="text-white">선릉역</strong> 10번 출구 도보 5분</li>
                      <li>• 2호선 <strong className="text-white">삼성역</strong> 5번 출구 도보 7분</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Car className="w-4 h-4 text-blue-400" />
                      <span>주차 안내</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      넥스트타워 지하 B3~B6 고객 전용 주차장 보유 (방문 고객 2시간 무료 주차 지원)
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Interactive Custom Kakao/Google Map Simulation */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden h-[500px] relative">
                {/* Simulated Map Visual */}
                <div className="w-full h-full bg-slate-950 relative flex items-center justify-center bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:2rem_2rem]">
                  {/* Road Grid Lines */}
                  <div className="absolute w-full h-12 bg-slate-800/60 top-1/2 -translate-y-1/2 flex items-center justify-around text-[10px] font-mono text-slate-500">
                    <span>테헤란로 (Teheran-ro)</span>
                  </div>
                  <div className="absolute h-full w-12 bg-slate-800/60 left-1/2 -translate-x-1/2 flex flex-col justify-around text-[10px] font-mono text-slate-500 items-center">
                    <span className="rotate-90">삼성로</span>
                  </div>

                  {/* Marker */}
                  <div className="relative z-10 text-center space-y-2 animate-bounce">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-500/50 border-2 border-white">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="bg-slate-900/90 text-white font-bold text-xs px-3 py-1.5 rounded-xl border border-blue-500 shadow-2xl">
                      (주)넥스트이노베이션 본사
                    </div>
                  </div>

                  {/* Subway stations */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-12 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded">
                    선릉역 (2호선)
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-12 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded">
                    삼성역 (2호선)
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300">서울특별시 강남구 테헤란로 427 넥스트타워 12층</span>
                  <button 
                    onClick={handleCopyAddress}
                    className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500"
                  >
                    네비게이션 길안내
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
