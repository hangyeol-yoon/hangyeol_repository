import React, { useState } from 'react';
import { X, Trash2, Clock, Ticket, ShoppingBag, ArrowRight, CheckCircle2, User, Phone } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onCheckout: (orderData: {
    customerName: string;
    customerPhone: string;
    pickupTime: string;
    discountAmount: number;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [pickupTime, setPickupTime] = useState('15분 후 (약 10~15분 소요)');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const finalTotal = Math.max(0, subtotal - couponDiscount);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'WELCOME10') {
      const disc = Math.round(subtotal * 0.1);
      setCouponDiscount(disc);
      setAppliedCoupon('WELCOME10 (10% 할인 쿠폰)');
      setErrorMessage('');
    } else if (couponCode.trim().toUpperCase() === 'TUMBLER500') {
      setCouponDiscount(500);
      setAppliedCoupon('TUMBLER500 (텀블러 지참 500원 할인)');
      setErrorMessage('');
    } else {
      setErrorMessage('유효하지 않은 쿠폰 코드입니다. (추천: WELCOME10)');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage('픽업자 이름과 연락처를 입력해주세요.');
      return;
    }

    onCheckout({
      customerName,
      customerPhone,
      pickupTime,
      discountAmount: couponDiscount,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs" id="cart-drawer">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 text-left">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#3D2C27]" />
            <h3 className="font-serif-kr text-lg font-bold text-[#1F1815]">스마트 픽업 장바구니</h3>
            <span className="text-xs bg-[#C86D51] text-white px-2 py-0.5 rounded-full font-bold">
              {cartItems.length}개
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6859] hover:text-[#2D2421] hover:bg-[#E8DEC8] rounded-full transition-colors cursor-pointer"
            id="close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#8C7A6B] py-12">
              <ShoppingBag className="w-16 h-16 text-[#E0D0C0] mb-3" />
              <h4 className="font-bold text-[#3D2C27] text-base">장바구니가 비어 있습니다.</h4>
              <p className="text-xs text-[#8C7A6B] mt-1 max-w-xs">
                루미에르의 시그니처 라떼와 갓 구운 수제 크로플을 장바구니에 담아보세요!
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cartItems.map((ci) => (
                  <div
                    key={ci.cartItemId}
                    className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] flex gap-3 relative"
                  >
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif-kr text-sm font-bold text-[#1F1815]">
                          {ci.item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(ci.cartItemId)}
                          className="text-[#9A8B7E] hover:text-red-600 transition-colors cursor-pointer p-1"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Summaries */}
                      <p className="text-[11px] text-[#7A6859] mt-0.5 space-x-1">
                        <span className="font-semibold text-[#C86D51]">[{ci.selections.temperature}]</span>
                        {ci.selections.milkType !== 'standard' && (
                          <span>• 우유: {ci.selections.milkType}</span>
                        )}
                        {ci.selections.syrupType !== 'none' && (
                          <span>• 시럽: {ci.selections.syrupType}</span>
                        )}
                        {ci.selections.extraShots > 0 && (
                          <span>• +{ci.selections.extraShots}샷</span>
                        )}
                      </p>

                      {/* Quantity & Item Total */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-white rounded-lg border border-[#E0D0C0] px-2 py-0.5 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, ci.quantity - 1)}
                            className="font-bold text-[#3D2C27] hover:text-[#C86D51] px-1 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold text-[#2D2421]">{ci.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, ci.quantity + 1)}
                            className="font-bold text-[#3D2C27] hover:text-[#C86D51] px-1 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-bold text-xs text-[#1F1815]">
                          {ci.totalPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pickup Time Selector */}
              <div className="p-4 rounded-2xl bg-[#F3ECE2] border border-[#E3D4C2] space-y-2">
                <label className="block text-xs font-bold text-[#3D2C27] flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>예상 픽업시간 선택</span>
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E0D0C0] rounded-xl text-xs font-semibold text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
                  id="pickup-time-select"
                >
                  <option value="10분 후 (빠른 픽업)">10분 후 (빠른 픽업)</option>
                  <option value="15분 후 (약 10~15분 소요)">15분 후 (약 10~15분 소요)</option>
                  <option value="30분 후">30분 후</option>
                  <option value="45분 후">45분 후</option>
                  <option value="60분 후">60분 후</option>
                </select>
              </div>

              {/* Coupon Code Input */}
              <div className="p-4 rounded-2xl bg-[#F3ECE2] border border-[#E3D4C2] space-y-2">
                <label className="block text-xs font-bold text-[#3D2C27] flex items-center space-x-1">
                  <Ticket className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>할인 쿠폰 등록</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="쿠폰코드 (예: WELCOME10)"
                    className="flex-1 px-3 py-1.5 bg-white border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421] uppercase"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    type="button"
                    className="px-3 py-1.5 bg-[#3D2C27] text-white font-bold text-xs rounded-xl hover:bg-[#2A1E1B] transition-colors cursor-pointer"
                  >
                    적용
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-[11px] text-[#2E6B2E] font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{appliedCoupon}</span>
                  </p>
                )}
              </div>

              {/* Customer Contact Inputs */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-3">
                <h4 className="text-xs font-bold text-[#3D2C27]">픽업자 정보</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#7A6859] mb-1">성함 *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="김커피"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E0D0C0] rounded-lg text-xs text-[#2D2421]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#7A6859] mb-1">연락처 *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E0D0C0] rounded-lg text-xs text-[#2D2421]"
                    />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 font-semibold px-1">{errorMessage}</p>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E8DEC8] bg-[#FAF7F2] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C4A3E]">
              <div className="flex justify-between">
                <span>상품 총 금액</span>
                <span>{subtotal.toLocaleString()}원</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#C86D51] font-semibold">
                  <span>쿠폰 할인</span>
                  <span>-{couponDiscount.toLocaleString()}원</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#1F1815] pt-1 border-t border-[#E8DEC8]">
                <span>최종 결제 금액</span>
                <span className="font-serif-kr text-xl text-[#C86D51]">
                  {finalTotal.toLocaleString()}원
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              className="w-full py-3.5 bg-[#3D2C27] hover:bg-[#2A1E1B] text-[#FAF7F2] font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              id="checkout-order-btn"
            >
              <span>스마트 픽업 주문 접수하기</span>
              <ArrowRight className="w-4 h-4 text-[#E8D0B3]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
