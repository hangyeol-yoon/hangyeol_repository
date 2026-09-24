import React, { useState } from 'react';
import { X, Sparkles, Coffee, Heart, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { BEAN_ORIGINS } from '../data/cafeData';
import { MenuItem, BeanOrigin } from '../types';

interface TasteQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedDrink: (item: MenuItem) => void;
}

export const TasteQuizModal: React.FC<TasteQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedDrink,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [flavorPref, setFlavorPref] = useState<'acidic' | 'nutty' | 'sweet' | 'balanced'>('balanced');
  const [drinkType, setDrinkType] = useState<'coffee' | 'latte' | 'non-coffee'>('coffee');
  const [tempPref, setTempPref] = useState<'HOT' | 'ICE'>('ICE');
  const [caffeinePref, setCaffeinePref] = useState<'full' | 'decaf'>('full');

  const [recommendedDrink, setRecommendedDrink] = useState<MenuItem | null>(null);
  const [recommendedBean, setRecommendedBean] = useState<BeanOrigin | null>(null);

  const handleFinishQuiz = (
    f = flavorPref,
    d = drinkType,
    t = tempPref,
    c = caffeinePref
  ) => {
    // Recommendation logic
    let matchedDrink = MENU_ITEMS[0];
    let matchedBean = BEAN_ORIGINS[0];

    if (c === 'decaf') {
      matchedDrink = MENU_ITEMS.find((m) => m.isDecaf) || MENU_ITEMS[6];
      matchedBean = BEAN_ORIGINS.find((b) => b.id.includes('decaf')) || BEAN_ORIGINS[2];
    } else if (f === 'acidic') {
      matchedDrink = MENU_ITEMS.find((m) => m.id.includes('ethiopia')) || MENU_ITEMS[3];
      matchedBean = BEAN_ORIGINS[1]; // Ethiopia
    } else if (f === 'sweet' || d === 'latte') {
      matchedDrink = MENU_ITEMS[0]; // Signature cream latte
      matchedBean = BEAN_ORIGINS[0]; // House blend
    } else if (d === 'non-coffee') {
      matchedDrink = MENU_ITEMS.find((m) => m.id.includes('hibiscus')) || MENU_ITEMS[7];
      matchedBean = BEAN_ORIGINS[0];
    } else {
      matchedDrink = MENU_ITEMS.find((m) => m.id.includes('americano')) || MENU_ITEMS[4];
      matchedBean = BEAN_ORIGINS[3]; // Guatemala
    }

    setRecommendedDrink(matchedDrink);
    setRecommendedBean(matchedBean);
    setStep(5); // Result step
  };

  const resetQuiz = () => {
    setStep(1);
    setRecommendedDrink(null);
    setRecommendedBean(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto" id="taste-quiz-modal">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DEC8] relative text-left my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A6859] hover:text-[#2D2421] hover:bg-[#F3ECE2] rounded-full transition-colors cursor-pointer"
          id="close-quiz-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-[#8C7A6B] mb-1.5">
              <span className="flex items-center space-x-1 text-[#C86D51]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>커피 취향 분석</span>
              </span>
              <span>Step {step} / 4</span>
            </div>
            <div className="w-full bg-[#E8DEC8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C86D51] h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Flavor */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1F1815]">
                Q1. 어떤 맛의 커피를 선호하시나요?
              </h3>
              <p className="text-xs text-[#7A6859] mt-1">평소 가장 즐기는 원두 노트 스타일을 선택해주세요.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                {
                  id: 'acidic',
                  title: '화사한 꽃향 & 과일 산미',
                  desc: '자스민, 베르가못, 레몬 계열의 산뜻한 아로마',
                },
                {
                  id: 'nutty',
                  title: '고소한 다크 초콜릿 & 견과류',
                  desc: '볶은 아몬드, 헤이즐넛, 브라운 슈가의 묵직함',
                },
                {
                  id: 'sweet',
                  title: '달콤한 크림 & 바닐라',
                  desc: '수제 폼 크림, 카라멜, 디저트 스타일 라떼',
                },
                {
                  id: 'balanced',
                  title: '구수하고 편안한 클래식 밸런스',
                  desc: '호불호 없이 매일 깔끔하게 마실 수 있는 스탠다드',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFlavorPref(opt.id as any);
                    setStep(2);
                  }}
                  className="p-4 rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#C86D51] hover:bg-[#FFFDFB] transition-all text-left group cursor-pointer shadow-2xs"
                >
                  <h4 className="text-sm font-bold text-[#2D2421] group-hover:text-[#C86D51]">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-[#7A6859] mt-1 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Beverage Style */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1F1815]">
                Q2. 선호하시는 음료의 타입을 알려주세요.
              </h3>
              <p className="text-xs text-[#7A6859] mt-1">원하시는 음료 베이스를 선택하세요.</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'coffee',
                  title: '깔끔한 아메리카노 / 핸드드립',
                  desc: '원두 본연의 아로마와 깔끔한 목넘김',
                },
                {
                  id: 'latte',
                  title: '부드럽고 고소한 밀크 라떼',
                  desc: '우유, 오트, 생크림이 조화를 이루는 부드러움',
                },
                {
                  id: 'non-coffee',
                  title: '논커피 / 블렌딩 티 / 에이드',
                  desc: '카페인 부담 없는 티 & 스페셜티 베버리지',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setDrinkType(opt.id as any);
                    setStep(3);
                  }}
                  className="w-full p-4 rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#C86D51] hover:bg-[#FFFDFB] transition-all text-left flex items-center justify-between cursor-pointer shadow-2xs"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#2D2421]">{opt.title}</h4>
                    <p className="text-xs text-[#7A6859] mt-0.5">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C86D51]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Temp */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1F1815]">
                Q3. 선호하시는 음료 온도는 무엇인가요?
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setTempPref('ICE');
                  setStep(4);
                }}
                className="p-6 rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#3B82F6] hover:bg-[#F0F6FF] transition-all text-center cursor-pointer"
              >
                <span className="text-2xl block mb-2">🧊</span>
                <h4 className="text-sm font-bold text-[#2D2421]">시원한 ICE</h4>
                <p className="text-xs text-[#7A6859] mt-1">청량하고 입안 가득 시원하게</p>
              </button>

              <button
                onClick={() => {
                  setTempPref('HOT');
                  setStep(4);
                }}
                className="p-6 rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#C86D51] hover:bg-[#FFF9F6] transition-all text-center cursor-pointer"
              >
                <span className="text-2xl block mb-2">☕</span>
                <h4 className="text-sm font-bold text-[#2D2421]">따스한 HOT</h4>
                <p className="text-xs text-[#7A6859] mt-1">원두 아로마를 진하게 감상하기</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Caffeine */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1F1815]">
                Q4. 카페인 유무를 선택해주세요.
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setCaffeinePref('full');
                  handleFinishQuiz(flavorPref, drinkType, tempPref, 'full');
                }}
                className="p-5 rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#3D2C27] transition-all text-center cursor-pointer"
              >
                <span className="text-2xl block mb-1">⚡</span>
                <h4 className="text-sm font-bold text-[#2D2421]">오리지널 카페인</h4>
                <p className="text-xs text-[#7A6859] mt-1">에너지와 활력이 필요해요</p>
              </button>

              <button
                onClick={() => {
                  setCaffeinePref('decaf');
                  handleFinishQuiz(flavorPref, drinkType, tempPref, 'decaf');
                }}
                className="p-5 rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#2E6B2E] transition-all text-center cursor-pointer"
              >
                <span className="text-2xl block mb-1">🌿</span>
                <h4 className="text-sm font-bold text-[#2E6B2E]">디카페인 (Decaf)</h4>
                <p className="text-xs text-[#7A6859] mt-1">밤에도 걱정 없이 부드럽게</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Result Screen */}
        {step === 5 && recommendedDrink && recommendedBean && (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#F5EAD8] text-[#C86D51] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>맞춤 추천 결과 완성!</span>
            </div>

            <h3 className="font-serif-kr text-2xl font-bold text-[#1F1815]">
              고객님의 취향에 딱 맞는 루미에르 메뉴
            </h3>

            {/* Recommended Drink Card */}
            <div className="p-4 rounded-2xl bg-white border-2 border-[#C86D51] text-left flex flex-col sm:flex-row items-center gap-4 shadow-md">
              <img
                src={recommendedDrink.image}
                alt={recommendedDrink.name}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <span className="text-[10px] font-bold text-[#C86D51] uppercase tracking-wider block">
                  RECOMMENDED BEVERAGE
                </span>
                <h4 className="font-serif-kr text-base font-bold text-[#1F1815]">
                  {recommendedDrink.name}
                </h4>
                <p className="text-xs text-[#7A6859] mt-1 line-clamp-2">
                  {recommendedDrink.description}
                </p>
                <span className="text-xs font-bold text-[#3D2C27] block mt-2">
                  {recommendedDrink.price.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* Recommended Bean Origin */}
            <div className="p-3.5 rounded-xl bg-[#F3ECE2] text-left text-xs text-[#5C4A3E] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8C7A6B] block">추천 매칭 원두</span>
                <strong className="text-[#3D2C27] text-sm">{recommendedBean.name}</strong>
                <p className="text-[11px] text-[#7A6859] mt-0.5">
                  테이스팅 노트: {recommendedBean.cupNotes.join(', ')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectRecommendedDrink(recommendedDrink);
                  onClose();
                }}
                className="flex-1 py-3 bg-[#C86D51] hover:bg-[#B55A3F] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                id="quiz-order-recommended-btn"
              >
                이 메뉴 옵션 선택하기
              </button>
              <button
                onClick={resetQuiz}
                className="px-4 py-3 bg-[#E8DEC8] hover:bg-[#D8C8B8] text-[#3D2C27] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>다시 테스트</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
