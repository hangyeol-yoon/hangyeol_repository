import React, { useState, useEffect } from 'react';
import { NavCategory } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/home/HomeView';
import { AboutView } from './components/about/AboutView';
import { ServicesView } from './components/services/ServicesView';
import { SolutionsView } from './components/solutions/SolutionsView';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { NewsView } from './components/news/NewsView';
import { ContactView } from './components/contact/ContactView';
import { SearchModal } from './components/modals/SearchModal';
import { QuoteModal } from './components/modals/QuoteModal';
import { JobApplyModal } from './components/modals/JobApplyModal';
import { ArrowUp, MessageCircle, Calculator } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<NavCategory>('home');
  const [currentSubSection, setCurrentSubSection] = useState<string>('');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [jobApplyTitle, setJobApplyTitle] = useState<string | null>(null);

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (category: NavCategory, subSection?: string) => {
    setCurrentCategory(category);
    if (subSection) {
      setCurrentSubSection(subSection);
    } else {
      // Default subsections per category
      const defaults: Record<NavCategory, string> = {
        home: '',
        about: 'overview',
        services: 'overview',
        solutions: 'ai',
        portfolio: 'projects',
        news: 'notice',
        contact: 'consulting'
      };
      setCurrentSubSection(defaults[category] || '');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentCategory={currentCategory}
        currentSubSection={currentSubSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuoteModal={() => setIsQuoteOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentCategory === 'home' && (
          <HomeView 
            onNavigate={handleNavigate} 
            onOpenQuoteModal={() => setIsQuoteOpen(true)} 
          />
        )}

        {currentCategory === 'about' && (
          <AboutView 
            initialSubSection={currentSubSection} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentCategory === 'services' && (
          <ServicesView 
            initialSubSection={currentSubSection} 
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => setIsQuoteOpen(true)} 
          />
        )}

        {currentCategory === 'solutions' && (
          <SolutionsView 
            initialSubSection={currentSubSection} 
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => setIsQuoteOpen(true)} 
          />
        )}

        {currentCategory === 'portfolio' && (
          <PortfolioView 
            initialSubSection={currentSubSection} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentCategory === 'news' && (
          <NewsView 
            initialSubSection={currentSubSection} 
            onNavigate={handleNavigate}
            onApplyJob={(title) => setJobApplyTitle(title)}
          />
        )}

        {currentCategory === 'contact' && (
          <ContactView 
            initialSubSection={currentSubSection} 
            onNavigate={handleNavigate} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setIsQuoteOpen(true)}
          className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-600/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          title="빠른 견적 계산"
        >
          <Calculator className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleNavigate('contact', 'consulting')}
          className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 shadow-2xl shadow-amber-500/40 flex items-center justify-center font-bold text-xs hover:scale-110 active:scale-95 transition-all"
          title="카카오 / 실시간 문의"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            title="맨 위로 스크롤"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Modals */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={handleNavigate} 
      />

      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
      />

      <JobApplyModal 
        jobTitle={jobApplyTitle} 
        onClose={() => setJobApplyTitle(null)} 
      />
    </div>
  );
}
