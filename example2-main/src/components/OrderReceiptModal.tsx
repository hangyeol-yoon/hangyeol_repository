import React from 'react';
import { X, CheckCircle2, Clock, Coffee, Sparkles, MapPin, Copy, ArrowRight } from 'lucide-react';
import { Order } from '../types';

interface OrderReceiptModalProps {
  order: Order | null;
  onClose: () => void;
  onSimulateStatusAdvance: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  order,
  onClose,
  onSimulateStatusAdvance,
}) => {
  if (!order) return null;

  const getStatusStep = () => {
    switch (order.status) {
      case 'RECEIVED':
        return 1;
      case 'PREPARING':
        return 2;
      case 'READY':
        return 3;
      case 'COMPLETED':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto" id="order-receipt-modal">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DEC8] relative text-left my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A6859] hover:text-[#2D2421] hover:bg-[#F3ECE2] rounded-full transition-colors cursor-pointer"
          id="close-receipt-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center pb-6 border-b border-[#E8DEC8]">
          <div className="w-12 h-12 bg-[#2E6B2E]/10 text-[#2E6B2E] rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest block">
            Café Lumière Smart Pickup
          </span>
          <h2 className="font-serif-kr text-2xl font-bold text-[#1F1815] mt-1">
            픽업 주문이 접수되었습니다!
          </h2>
          <p className="text-xs text-[#7A6859] mt-1">
            주문번호: <strong className="text-[#C86D51] font-mono text-sm">{order.orderCode}</strong>
          </p>
        </div>

        {/* Live Status Progress Timeline */}
        <div className="py-6 border-b border-[#E8DEC8]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-[#3D2C27] flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>실시간 제조 & 픽업 현황</span>
            </h3>

            {currentStep < 3 && (
              <button
                onClick={onSimulateStatusAdvance}
                className="px-2.5 py-1 bg-[#F3ECE2] hover:bg-[#E8DDD0] text-[#3D2C27] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                title="다음 진행 상태로 변경 테스트"
              >
                진행 단계 변경 (시뮬레이션)
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div
              className={`p-3 rounded-2xl border transition-all ${
                currentStep >= 1
                  ? 'bg-[#E8F3E8] border-[#BDE0BD] text-[#2E6B2E] font-bold'
                  : 'bg-[#FAF7F2] border-[#E8DEC8] text-[#8C7A6B]'
              }`}
            >
              <span className="block text-lg mb-1">📝</span>
              <span>1. 주문 접수</span>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                currentStep >= 2
                  ? 'bg-[#E8F3E8] border-[#BDE0BD] text-[#2E6B2E] font-bold animate-pulse'
                  : 'bg-[#FAF7F2] border-[#E8DEC8] text-[#8C7A6B]'
              }`}
            >
              <span className="block text-lg mb-1">☕</span>
              <span>2. 음료 제조 중</span>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                currentStep >= 3
                  ? 'bg-[#C86D51] border-[#C86D51] text-white font-bold shadow-md'
                  : 'bg-[#FAF7F2] border-[#E8DEC8] text-[#8C7A6B]'
              }`}
            >
              <span className="block text-lg mb-1">✨</span>
              <span>3. 픽업 준비 완료</span>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="py-6 space-y-4">
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DEC8] space-y-2 text-xs">
            <div className="flex justify-between text-[#7A6859]">
              <span>픽업자 성함:</span>
              <strong className="text-[#2D2421]">{order.customerName}</strong>
            </div>
            <div className="flex justify-between text-[#7A6859]">
              <span>연락처:</span>
              <strong className="text-[#2D2421]">{order.customerPhone}</strong>
            </div>
            <div className="flex justify-between text-[#7A6859]">
              <span>예상 픽업시간:</span>
              <strong className="text-[#C86D51]">{order.pickupTime}</strong>
            </div>
            <div className="flex justify-between text-[#7A6859]">
              <span>매장 위치:</span>
              <strong className="text-[#2D2421]">서울 마포구 연남로 12 (연남동 본점 1F 카운터)</strong>
            </div>
          </div>

          {/* Ordered Item List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#3D2C27]">주문 내역 ({order.items.length}개)</h4>
            {order.items.map((ci) => (
              <div
                key={ci.cartItemId}
                className="flex items-center justify-between text-xs py-1.5 border-b border-[#F0E6D8]"
              >
                <div>
                  <span className="font-bold text-[#2D2421]">
                    {ci.item.name} ({ci.selections.temperature}) x {ci.quantity}
                  </span>
                </div>
                <span className="font-semibold text-[#1F1815]">
                  {ci.totalPrice.toLocaleString()}원
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between text-sm font-bold text-[#1F1815]">
            <span>총 결제금액</span>
            <span className="font-serif-kr text-[#C86D51] text-base">
              {order.finalAmount.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#3D2C27] hover:bg-[#2A1E1B] text-white font-bold text-sm rounded-2xl transition-colors cursor-pointer"
        >
          확인 완료
        </button>

      </div>
    </div>
  );
};
