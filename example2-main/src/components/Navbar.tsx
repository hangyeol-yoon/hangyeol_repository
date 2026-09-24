import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Calendar, Compass, MapPin, Sparkles, Menu as MenuIcon, X, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTasteQuiz: () => void;
  activeOrder: Order | null;
  onOpenOrderReceipt: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTasteQuiz,
  activeOrder,
  onOpenOrderReceipt,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'menu', label: '메뉴 & 음료' },
    { id: 'beans', label: '스페셜티 원두' },
    { id: 'reservation', label: '테이블 예약' },
    { id: 'gallery', label: '공간 갤러리' },
    { id: 'reviews', label: '고객 리뷰' },
    { id: 'location', label: '오시는 길' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel border-b border-[#E8DEC8]/60 shadow-xs py-3'
          : 'bg-[#FAF7F2]/90 backdrop-blur-md py-4 border-b border-[#F0E6D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center space-x-3 group text-left cursor-pointer focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-full bg-[#3D2C27] text-[#E8D0B3] flex items-center justify-center shadow-xs group-hover:bg-[#2A1E1B] transition-colors">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif-kr text-xl font-bold tracking-tight text-[#2D2421] block leading-tight">
                Café Lumière
              </span>
              <span className="text-[10px] tracking-widest text-[#8C7A6B] uppercase font-medium block">
                Specialty Coffee & Bakery
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8" id="desktop-navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                  activeSection === link.id
                    ? 'text-[#C86D51] border-[#C86D51]'
                    : 'text-[#5C4A3E] border-transparent hover:text-[#3D2C27] hover:border-[#D8C8B8]'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Utilities & Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Taste Recommendation Quiz Button */}
            <button
              onClick={onOpenTasteQuiz}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#F3ECE2] hover:bg-[#E8DDD0] text-[#3D2C27] text-xs font-semibold transition-all border border-[#E3D4C2] cursor-pointer"
              title="맞춤 커피 찾기 테스트"
              id="taste-quiz-nav-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>커피 취향 찾기</span>
            </button>

            {/* Active Order Live Tracker Badge if exists */}
            {activeOrder && (
              <button
                onClick={onOpenOrderReceipt}
                className="flex items-center space-x-2 px-3 py-1.5 bg-[#E8F3E8] border border-[#BDE0BD] text-[#2E6B2E] rounded-full text-xs font-medium hover:bg-[#D8ECD8] transition-colors cursor-pointer animate-pulse"
                title="픽업 주문 진행 현황"
                id="active-order-nav-badge"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6B2E]" />
                <span className="font-semibold">
                  {activeOrder.status === 'RECEIVED'
                    ? '주문 접수됨'
                    : activeOrder.status === 'PREPARING'
                    ? '음료 만드는 중'
                    : '픽업 준비 완료!'}
                </span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#3D2C27] hover:bg-[#2A1E1B] text-[#FAF7F2] transition-colors cursor-pointer flex items-center justify-center shadow-xs"
              aria-label="장바구니"
              id="cart-drawer-trigger"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C86D51] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF7F2] shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#3D2C27] hover:bg-[#F0E6D8] transition-colors"
              aria-label="메뉴 열기"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#E8DEC8] pb-4 space-y-2">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  onOpenTasteQuiz();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-1.5 p-2.5 rounded-lg bg-[#F3ECE2] text-[#3D2C27] text-xs font-semibold"
                id="mobile-quiz-btn"
              >
                <Sparkles className="w-4 h-4 text-[#C86D51]" />
                <span>커피 취향 찾기</span>
              </button>
              <button
                onClick={() => handleNavClick('reservation')}
                className="flex items-center justify-center space-x-1.5 p-2.5 rounded-lg bg-[#3D2C27] text-white text-xs font-semibold"
                id="mobile-reservation-btn"
              >
                <Calendar className="w-4 h-4" />
                <span>테이블 예약</span>
              </button>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#E3D4C2] text-[#3D2C27] font-semibold'
                    : 'text-[#5C4A3E] hover:bg-[#F3ECE2]'
                }`}
                id={`mobile-nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
