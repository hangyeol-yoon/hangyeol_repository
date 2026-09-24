import React, { useState, useRef, useEffect } from 'react';
import { AIConsultMessage, Doctor } from '../types';
import { DEPARTMENTS } from '../data/hospitalData';
import {
  Bot,
  User,
  Send,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  RefreshCw,
  PhoneCall,
  ShieldAlert,
  ChevronRight,
  Info,
} from 'lucide-react';

interface AIConsultantSectionProps {
  onSelectDepartmentToBook: (deptId: string) => void;
}

export const AIConsultantSection: React.FC<AIConsultantSectionProps> = ({
  onSelectDepartmentToBook,
}) => {
  const [messages, setMessages] = useState<AIConsultMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        '안녕하세요! 서울대학교병원 AI 건강상담 도우미입니다.\n\n불편하신 신체 증상이나 건강 관련 궁금증을 편안하게 적어주시면, 예상되는 관련 진료과와 정밀 진찰이 필요한 사항을 친절하게 안내해 드리겠습니다.\n\n(예: "며칠 전부터 명치가 쥐어짜듯 아프고 속이 쓰려요", "갑자기 고열이 나면서 머리가 너무 어지러워요")',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputSymptom, setInputSymptom] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const presetQueries = [
    '속이 쓰리고 명치가 콕콕 쑤셔요',
    '갑자기 심한 두통과 어지럼증이 있어요',
    '무릎 관절이 붓고 계단 내려갈 때 통증이 심해요',
    '아이가 고열이 나고 헛소리를 해요',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputSymptom;
    if (!query.trim() || isLoading) return;

    const userMsg: AIConsultMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputSymptom('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom: query }),
      });

      const data = await res.json();
      if (data.reply) {
        const assistantMsg: AIConsultMessage = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          suggestedDepartments: (data.suggestedDepartmentIds || []).map((id: string) => {
            const found = DEPARTMENTS.find((d) => d.id === id);
            return { id, name: found?.koreanName || '소화기내과' };
          }),
          urgencyLevel: data.urgencyLevel || 'normal',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || '응답을 받아오지 못했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: AIConsultMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          '네트워크 연결이 다소 원활하지 않아 답변을 불러오지 못했습니다.\n\n지속적인 통증이나 신체 이상 증상이 있으신 경우 본원 24시간 대표전화(02-1588-0000)로 문의해 주시기 바랍니다.',
        urgencyLevel: 'normal',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-teal-300 text-xs font-bold uppercase tracking-wider bg-teal-500/10 border border-teal-500/20 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>POWERED BY GEMINI AI</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-serif">
            AI 스마트 증상 상담 & 진료과 추천
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            자신의 신체 증상을 자연스럽게 말씀해주시면 AI 가 전문 의학 지식을 바탕으로 맞춤 진료과를 추천해 드립니다.
          </p>
        </div>

        {/* Chat Box Container */}
        <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header Bar */}
          <div className="p-4 bg-slate-950 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>서울대학교병원 AI 건강 상담원</span>
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                </h3>
                <p className="text-[11px] text-slate-400">실시간 Gemini AI 증상 분석 가이드</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:02-1588-0000"
                className="text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold px-3 py-1.5 rounded-lg border border-rose-500/30 flex items-center gap-1 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>응급 1588-0000</span>
              </a>
            </div>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-xl space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Urgency Badge if emergency */}
                  {msg.urgencyLevel === 'emergency' && (
                    <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-center gap-2 animate-pulse">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>긴급 권고: 흉통 또는 심한 신경 마비 증상은 즉시 24시간 응급의료센터로 오셔야 합니다!</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                        : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Suggested Departments CTA buttons */}
                  {msg.suggestedDepartments && msg.suggestedDepartments.length > 0 && (
                    <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-700/80 space-y-2">
                      <p className="text-[11px] font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>추천 진료과 바로 예약하기</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.suggestedDepartments.map((dept) => (
                          <button
                            key={dept.id}
                            onClick={() => onSelectDepartmentToBook(dept.id)}
                            className="bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-400/30 transition flex items-center gap-1"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{dept.name} 예약</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 block px-1">{msg.timestamp}</span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs italic">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 animate-spin" />
                </div>
                <span>Gemini AI가 증상 데이터를 분석 중입니다...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Preset Query Chips */}
          <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-slate-400 text-[11px] shrink-0 font-medium pl-2">예시 질문:</span>
            {presetQueries.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(preset)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full border border-slate-700 whitespace-nowrap transition text-[11px]"
              >
                "{preset}"
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputSymptom}
              onChange={(e) => setInputSymptom(e.target.value)}
              placeholder="증상을 입력하세요 (예: 명치가 아프고 어지러워요)"
              className="flex-1 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-700 focus:outline-none focus:border-teal-400 placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!inputSymptom.trim() || isLoading}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold px-5 py-3 rounded-2xl transition disabled:opacity-50 flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">전송</span>
            </button>
          </form>
        </div>

        {/* Disclaimer Note */}
        <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl text-xs text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            본 AI 건강상담 서비스는 환자분들의 정밀 진료 안내를 돕기 위한 보조 도구입니다. 의사의 직접적인 진찰을 대체할 수 없으므로 정확한 상태 진단을 위해 본원 외래 진료를 이용해 주시기 바랍니다.
          </p>
        </div>
      </div>
    </section>
  );
};
