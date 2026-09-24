import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp, X } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/cafeData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [drinkTag, setDrinkTag] = useState('루미에르 시그니처 크림 라떼');
  const [reviewText, setReviewText] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      author: `${authorName} 님`,
      rating,
      date: new Date().toLocaleDateString('ko-KR'),
      text: reviewText,
      drinkTag,
      verifiedPickup: true,
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    setAuthorName('');
    setReviewText('');
  };

  const avgRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#C86D51] uppercase bg-[#F5EAD8] px-3 py-1 rounded-full inline-block mb-3">
            Customer Reviews
          </span>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#1F1815]">
            방문 고객 후기
          </h2>
          <p className="text-sm sm:text-base text-[#7A6859] mt-2 leading-relaxed">
            루미에르를 직접 다녀가신 소중한 손님들의 솔직한 이야기입니다.
          </p>
        </div>

        {/* Rating Overview Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-left">
          <div className="flex items-center space-x-4">
            <div className="text-center px-4 py-2 bg-[#F5EAD8] rounded-2xl border border-[#E8DEC8]">
              <span className="font-serif-kr text-4xl font-bold text-[#C86D51] block">
                {avgRating}
              </span>
              <div className="flex text-[#D4AF37] text-xs mt-0.5">
                {'★'.repeat(5)}
              </div>
              <span className="text-[10px] text-[#8C7A6B] block mt-1">총 {reviews.length}개 리뷰</span>
            </div>

            <div>
              <h4 className="font-serif-kr text-base font-bold text-[#1F1815]">
                방문객 만족도 98.4%
              </h4>
              <p className="text-xs text-[#7A6859] mt-1 leading-relaxed">
                "커피 향미의 정교함과 공간의 아늑함이 최고예요."
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-[#3D2C27] hover:bg-[#2A1E1B] text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-full transition-colors flex items-center space-x-2 cursor-pointer shadow-xs"
            id="write-review-btn"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#E8D0B3]" />
            <span>방문 후기 작성하기</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-[#E8DEC8] text-left flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-shadow"
              id={`review-card-${rev.id}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-[#1F1815]">{rev.author}</span>
                    {rev.verifiedPickup && (
                      <span className="text-[10px] bg-[#E8F3E8] text-[#2E6B2E] font-bold px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>픽업 인증</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#9A8B7E]">{rev.date}</span>
                </div>

                <div className="flex text-[#D4AF37] text-xs my-1.5">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </div>

                <span className="inline-block px-2.5 py-0.5 bg-[#F3ECE2] text-[#3D2C27] text-[11px] font-semibold rounded-md mb-2">
                  주문 음료: {rev.drinkTag}
                </span>

                <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed mt-1">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs text-[#8C7A6B]">
                <span>Café Lumière Verified Review</span>
                <button className="flex items-center space-x-1 hover:text-[#C86D51] transition-colors cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>도움돼요</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DEC8] text-left relative space-y-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#7A6859] hover:bg-[#FAF7F2] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif-kr text-xl font-bold text-[#1F1815]">방문 후기 작성</h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#3D2C27] mb-1">성함 / 닉네임</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="김루미"
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2C27] mb-1">별점 평가</label>
                  <div className="flex space-x-2 text-xl text-[#D4AF37]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="cursor-pointer focus:outline-none"
                      >
                        {star <= rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2C27] mb-1">드신 음료 / 디저트</label>
                  <input
                    type="text"
                    value={drinkTag}
                    onChange={(e) => setDrinkTag(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2C27] mb-1">후기 내용</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="음료 맛과 매장 분위기에 대한 솔직한 후기를 남겨주세요."
                    className="w-full p-3 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C86D51] hover:bg-[#B55A3F] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  후기 등록하기
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
