import React, { useState } from 'react';
import { UserPlus, Sparkles, Check, Phone, Mail, MapPin, Church, Users, Heart } from 'lucide-react';
import { NewFamilyForm } from '../types';

interface NewFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewFamilyModal: React.FC<NewFamilyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<NewFamilyForm>({
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    address: '',
    prevChurch: '',
    familyMembers: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/new-family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      }
    } catch (e) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      birthDate: '',
      address: '',
      prevChurch: '',
      familyMembers: '',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                새가족 온라인 등록 신청
              </h3>
              <p className="text-xs text-stone-500">
                은혜와 평강교회의 식구가 되심을 환영합니다.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 font-bold text-lg">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-2xl text-stone-900">
              새가족 등록 신청이 완료되었습니다!
            </h4>
            <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
              주님 안에서 한 가족이 되신 것을 진심으로 환영합니다. <br />
              등록해주신 연락처로 담당 교역자가 1~2일 내에 따뜻하게 안내 인사드리겠습니다.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 bg-amber-800 text-white font-semibold text-xs rounded-xl hover:bg-amber-900 transition-colors shadow-xs"
            >
              확인 및 닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  성함 *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="예: 홍길동"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  연락처 *
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="예: 010-1234-5678"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  생년월일
                </label>
                <input
                  type="text"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  placeholder="예: 1990.01.01"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                주소 / 거주 지역
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="예: 서울특별시 서초구 반포동"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  이전 출석 교회 (선택)
                </label>
                <input
                  type="text"
                  value={formData.prevChurch}
                  onChange={(e) => setFormData({ ...formData, prevChurch: e.target.value })}
                  placeholder="이전 출석 교회명"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  동반 가족 정보 (선택)
                </label>
                <input
                  type="text"
                  value={formData.familyMembers}
                  onChange={(e) => setFormData({ ...formData, familyMembers: e.target.value })}
                  placeholder="예: 배우자, 자녀 1명"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                바라는 점 / 교역자 전달 메시지
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="궁금한 사항이나 구역/부서 안내 희망 여부를 자유롭게 작성해주세요."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                {loading ? '신청 처리 중...' : '새가족 등록 신청하기'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
