import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, X } from 'lucide-react';
import { SeatingZone, Reservation } from '../types';

interface ReservationSectionProps {
  onReservationComplete: (res: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationComplete,
}) => {
  const [selectedZone, setSelectedZone] = useState<SeatingZone>('window');
  const [date, setDate] = useState('2026-07-31');
  const [time, setTime] = useState('14:00');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const zones: {
    id: SeatingZone;
    title: string;
    sub: string;
    desc: string;
    image: string;
  }[] = [
    {
      id: 'window',
      title: '1F 창가 햇살 라운지',
      sub: '인기 1위 • 연남동 거리 감성뷰',
      desc: '자연광이 가득한 따스한 2~4인용 창가 테이블 구역입니다.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'terrace',
      title: '2F 루프탑 가든 테라스',
      sub: '반려동물 동반 가능 • 야외 파라솔',
      desc: '연남동의 녹음과 바람을 마주하는 숲속 테라스 구역입니다.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'quiet',
      title: '2F 콰이엇 서재존',
      sub: '콘센트 보유 • 독서/노트북 스터디',
      desc: '은은한 조명 아래서 조용히 작업이나 책을 읽기 좋은 공간.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'sofa',
      title: '1F 프라이빗 단체 소파석',
      sub: '4~8인 단체 소모임 & 미팅',
      desc: '폭신한 패브릭 소파와 넉넉한 원목 테이블이 구비된 그룹존.',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const code = `LUM-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes: Reservation = {
      id: Date.now().toString(),
      reservationCode: code,
      name,
      phone,
      email,
      date,
      time,
      guests,
      zone: selectedZone,
      specialRequest,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setConfirmedReservation(newRes);
    onReservationComplete(newRes);
  };

  return (
    <section id="reservation" className="py-16 md:py-24 bg-[#F3ECE2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#C86D51] uppercase bg-[#E8DEC8] px-3 py-1 rounded-full inline-block mb-3">
            Table & Zone Reservation
          </span>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#1F1815]">
            온라인 테이블 & 공간 예약
          </h2>
          <p className="text-sm sm:text-base text-[#7A6859] mt-2 leading-relaxed">
            원하시는 날짜와 좌석 구역을 미리 지정해 지인들과 특별한 시간을 준비해보세요.
          </p>
        </div>

        {/* Zone Selector Grid */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-[#3D2C27] mb-4 text-left">
            1. 예약 좌석 구역 선택
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {zones.map((z) => (
              <div
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={`rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 bg-white flex flex-col justify-between text-left ${
                  selectedZone === z.id
                    ? 'border-[#C86D51] shadow-md ring-2 ring-[#C86D51]/20'
                    : 'border-[#E8DEC8] hover:border-[#D8C8B8]'
                }`}
                id={`zone-card-${z.id}`}
              >
                <div className="relative aspect-16/10 bg-[#E8DEC8]">
                  <img
                    src={z.image}
                    alt={z.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedZone === z.id && (
                    <div className="absolute top-2 right-2 bg-[#C86D51] text-white p-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#C86D51] block mb-0.5">
                      {z.sub}
                    </span>
                    <h4 className="font-serif-kr text-base font-bold text-[#1F1815]">{z.title}</h4>
                    <p className="text-xs text-[#7A6859] mt-1 line-clamp-2">{z.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reservation Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-lg max-w-4xl mx-auto text-left">
          <h3 className="text-base font-bold text-[#3D2C27] mb-6 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#C86D51]" />
            <span>2. 세부 일시 및 방문 정보 입력</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-1.5">방문 날짜</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs font-semibold text-[#2D2421]"
                  id="res-date-input"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-1.5">방문 시간</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs font-semibold text-[#2D2421]"
                  id="res-time-select"
                >
                  <option value="10:00">오전 10:00</option>
                  <option value="12:00">오후 12:00 (점심 피크)</option>
                  <option value="14:00">오후 02:00</option>
                  <option value="16:00">오후 04:00</option>
                  <option value="18:00">오후 06:00</option>
                  <option value="20:00">오후 08:00</option>
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-1.5">방문 인원</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs font-semibold text-[#2D2421]"
                  id="res-guests-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num}명 {num >= 5 ? '(단체)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#F0E6D8]">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-1.5">예약자 성함 *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421]"
                  id="res-name-input"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-1.5">연락처 *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421]"
                  id="res-phone-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-1.5">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@lumiere.kr"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421]"
                  id="res-email-input"
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-bold text-[#3D2C27] mb-1.5">
                요청 사항 (생일 기념일 세팅, 아기의자, 휠체어 이용 등)
              </label>
              <textarea
                rows={2}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="특별히 신경 써주시길 바라는 부분이 있으시면 작성해 주세요."
                className="w-full p-3 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421]"
                id="res-request-textarea"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#3D2C27] hover:bg-[#2A1E1B] text-white font-bold text-sm rounded-2xl transition-all shadow-md cursor-pointer"
              id="submit-reservation-btn"
            >
              테이블 예약 신청하기
            </button>
          </form>
        </div>

        {/* Confirmation Modal Overlay */}
        {confirmedReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DEC8] text-center space-y-4">
              <div className="w-12 h-12 bg-[#2E6B2E]/10 text-[#2E6B2E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="font-serif-kr text-xl font-bold text-[#1F1815]">
                예약이 성공적으로 확정되었습니다!
              </h3>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DEC8] text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#7A6859]">예약 번호:</span>
                  <strong className="text-[#C86D51]">{confirmedReservation.reservationCode}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6859]">예약자:</span>
                  <strong>{confirmedReservation.name} 님</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6859]">방문 일시:</span>
                  <strong>{confirmedReservation.date} {confirmedReservation.time}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6859]">인원 및 구역:</span>
                  <strong>{confirmedReservation.guests}명 ({confirmedReservation.zone} 구역)</strong>
                </div>
              </div>

              <p className="text-xs text-[#7A6859]">
                방문 10분 전 매장에 도착해주시면 지정된 테이블로 안내 도와드리겠습니다.
              </p>

              <button
                onClick={() => setConfirmedReservation(null)}
                className="w-full py-3 bg-[#3D2C27] text-white font-bold text-xs rounded-xl hover:bg-[#2A1E1B] cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
