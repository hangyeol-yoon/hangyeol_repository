import React, { useState } from 'react';
import { 
  Newspaper, 
  BookOpen, 
  Bell, 
  Briefcase, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  Building2
} from 'lucide-react';
import { NewsSubSection, NewsPost, JobOpening } from '../../types';
import { NEWS_POSTS, JOB_OPENINGS } from '../../data/companyData';

interface NewsViewProps {
  initialSubSection?: string;
  onNavigate: (category: any, subSection?: string) => void;
  onApplyJob: (jobTitle: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ 
  initialSubSection = 'notice', 
  onNavigate,
  onApplyJob
}) => {
  const [activeTab, setActiveTab] = useState<NewsSubSection>(
    (initialSubSection as NewsSubSection) || 'notice'
  );

  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = NEWS_POSTS.filter((post) => {
    const matchesCategory = activeTab === 'careers' ? true : post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const tabs: { id: NewsSubSection; label: string; icon: any }[] = [
    { id: 'notice', label: '공지사항', icon: Bell },
    { id: 'blog', label: '블로그', icon: BookOpen },
    { id: 'press', label: '보도자료', icon: Newspaper },
    { id: 'careers', label: '채용', icon: Briefcase },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            NEWS & MEDIA
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            뉴스 & 채용
          </h1>
          <p className="text-sm text-slate-400">
            넥스트이노베이션의 공식 언론 보도, 기술 인사이트 및 인재 채용
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
        {/* Posts Sections: Notice, Blog, Press */}
        {activeTab !== 'careers' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex justify-end">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="제목 / 내용 키워드 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="font-mono">{post.date}</span>
                      {post.mediaName && <span className="text-blue-400 font-semibold">{post.mediaName}</span>}
                      {post.author && <span className="text-slate-400">{post.author}</span>}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="shrink-0 text-xs font-bold text-blue-400 flex items-center gap-1">
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Careers Section */}
        {activeTab === 'careers' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">JOIN OUR TEAM</span>
              <h2 className="text-3xl font-black text-white">
                글로벌 AI 시대를 함께 열어갈 인재를 찾습니다
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                테헤란로 최신 오피스 환경, 최고사양 M3/M4 Max 장비 지원, 재택 혼합 근무 및 자율 성장의 기회를 제공합니다.
              </p>
            </div>

            {/* Benefits & Culture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '자율성과 신뢰', desc: '시차출퇴근제 & 주 2회 재택 자율 선택' },
                { title: '최고사양 장비', desc: 'MacBook Pro M-Max 시리즈 & 4K 듀얼 모니터' },
                { title: '성장 지원', desc: '연간 300만 원 자기개발비, 학회 참석 지원' },
                { title: '수평적 문화', desc: '직급 없는 "님" 호칭 및 수평적 토론 문화' }
              ].map((b, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-xs flex items-center justify-center">
                    0{i + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white">{b.title}</h4>
                  <p className="text-xs text-slate-400">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Open Positions */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">진행 중인 채용 포지션</h3>
              <div className="space-y-4">
                {JOB_OPENINGS.map((job) => (
                  <div key={job.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded">
                            {job.department}
                          </span>
                          <span className="text-xs text-slate-400">{job.type} · {job.experience}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mt-1">{job.title}</h4>
                      </div>

                      <button
                        onClick={() => onApplyJob(job.title)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>지원하기</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                      <div>
                        <span className="font-bold text-slate-400 block mb-1">주요 업무</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-400">
                          {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-400 block mb-1">자격 요건</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-400">
                          {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-blue-400 font-bold">{selectedPost.date}</span>
              <button onClick={() => setSelectedPost(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white">{selectedPost.title}</h3>

            <div className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950 p-6 rounded-2xl border border-slate-800">
              {selectedPost.content}
            </div>

            <button
              onClick={() => setSelectedPost(null)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
