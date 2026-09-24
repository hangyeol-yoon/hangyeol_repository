import React, { useState } from 'react';
import { 
  Bot, 
  Layers, 
  LineChart, 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Play, 
  Code2, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Cloud
} from 'lucide-react';
import { SolutionsSubSection } from '../../types';
import { SOLUTIONS_DATA } from '../../data/companyData';

interface SolutionsViewProps {
  initialSubSection?: string;
  onNavigate: (category: any, subSection?: string) => void;
  onOpenQuoteModal: () => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({ 
  initialSubSection = 'ai', 
  onNavigate,
  onOpenQuoteModal 
}) => {
  const [activeTab, setActiveTab] = useState<SolutionsSubSection>(
    (initialSubSection as SolutionsSubSection) || 'ai'
  );

  const [activeDemoOutput, setActiveDemoOutput] = useState<string | null>(null);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  const currentSolution = SOLUTIONS_DATA.find(s => s.category === activeTab) || SOLUTIONS_DATA[0];

  const handleRunSolutionDemo = () => {
    setIsDemoRunning(true);
    setActiveDemoOutput(null);

    setTimeout(() => {
      if (activeTab === 'ai') {
        setActiveDemoOutput(`[NEXT AI Gateway - Logs]
10:14:02.102 INFO  Request received from Tenant #4912
10:14:02.108 INFO  PII Masking Engine: Detected 1 Resident Registration No -> Masked [██████-███████]
10:14:02.115 INFO  Vector Store Retrieval: Found 4 match chunks in Policy_Handbook.pdf (Score: 0.94)
10:14:02.340 SUCCESS Output generated via Private Gemini/Llama Gateway. Token usage: 412 tokens.`);
      } else if (activeTab === 'cloud') {
        setActiveDemoOutput(`[NEXT Cloud Orchestrator - FinOps Engine]
Cluster Node Count: 24 Nodes (AWS EKS + GCP GKE Multi-Cloud)
Current CPU Utilization: 42%
Recommendation: 6 Idle Spot instances found -> Auto-terminating
Estimated Monthly Cost Savings: ₩1,840,000 / month saved.`);
      } else if (activeTab === 'data') {
        setActiveDemoOutput(`[NEXT Data Lakehouse - Stream Processing]
Broker: Apache Kafka -> Spark Streaming Active
Ingested Events: 124,500 events/sec
Real-time Anomaly Detection: 0 Fraud Transactions Flagged
Dashboards Updated in 12ms.`);
      } else {
        setActiveDemoOutput(`[NEXT Core Framework - Microservices Health]
Service Gateway: HEALTHY (Latency 8ms)
Auth Service (SSO/OAuth2): ACTIVE
Database Connection Pool: 25/100 active
REST/GraphQL Router: 0 errors reported in last 24h.`);
      }
      setIsDemoRunning(false);
    }, 1000);
  };

  const tabs: { id: SolutionsSubSection; label: string; icon: any }[] = [
    { id: 'ai', label: 'AI 솔루션', icon: Bot },
    { id: 'cloud', label: '클라우드', icon: Layers },
    { id: 'data', label: '데이터 분석', icon: LineChart },
    { id: 'custom', label: '맞춤 개발', icon: Cpu },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            SOLUTIONS ARCHITECTURE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            엔터프라이즈 솔루션
          </h1>
          <p className="text-sm text-slate-400">
            AI 에이전트, 멀티 클라우드, 레이크하우스 및 맞춤형 코어 프레임워크
          </p>
        </div>

        {/* Sub Navigation Bar */}
        <div className="max-w-2xl mx-auto mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveDemoOutput(null);
                }}
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
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-12 animate-in fade-in duration-300">
          {/* Solution Info Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                {currentSolution.subtitle}
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {currentSolution.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentSolution.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">솔루션 핵심 하이라이트</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {currentSolution.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">적용 테크 스택</span>
                <div className="flex flex-wrap gap-2">
                  {currentSolution.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img 
                src={currentSolution.image} 
                alt={currentSolution.title} 
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover rounded-2xl border border-slate-700 shadow-2xl"
              />
            </div>
          </div>

          {/* Solution Architecture Pipeline */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>SYSTEM ARCHITECTURE FLOW</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Microservice Ready</span>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
              <code>{currentSolution.architectureSummary}</code>
            </div>
          </div>

          {/* Interactive Live Demo Console */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-xs font-mono text-slate-400 ml-2">Interactive Solution Telemetry Console</span>
              </div>
              <button
                onClick={handleRunSolutionDemo}
                disabled={isDemoRunning}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                {isDemoRunning ? <span className="animate-spin">🌀</span> : <Play className="w-3.5 h-3.5" />}
                <span>인터랙티브 데모 시뮬레이션</span>
              </button>
            </div>

            {activeDemoOutput ? (
              <pre className="p-4 bg-slate-900 rounded-xl border border-blue-500/30 text-xs font-mono text-cyan-300 leading-relaxed whitespace-pre-wrap animate-in fade-in">
                {activeDemoOutput}
              </pre>
            ) : (
              <p className="text-xs text-slate-500 text-center py-6 font-mono">
                위 '인터랙티브 데모 시뮬레이션' 버튼을 클릭하여 솔루션 실시간 동작 로그 및 메트릭을 확인해보세요.
              </p>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">맞춤형 솔루션 도입 문의</h4>
              <p className="text-xs text-slate-400 mt-0.5">귀사 환경에 맞춰 온프레미스 / 클라우드 아키텍처 수립을 지원합니다.</p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <span>솔루션 견적 요청</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
