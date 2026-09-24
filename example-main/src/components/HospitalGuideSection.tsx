import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Car,
  Bus,
  Train,
  Clock,
  PhoneCall,
  CheckCircle,
  HelpCircle,
  Calculator,
  Navigation,
} from 'lucide-react';

export const HospitalGuideSection: React.FC = () => {
  const [activeFloor, setActiveFloor] = useState<string>('2F');

  // Parking Calculator State
  const [parkingHours, setParkingHours] = useState<number>(2);
  const [visitPurpose, setVisitPurpose] = useState<'outpatient' | 'checkup' | 'inpatient' | 'visitor'>('outpatient');

  const floors = [
    { id: '1F', title: '1층: 로비 / 응급의료센터 / 접수·수납 / 원내약국 / 소아청소년과' },
    { id: '2F', title: '2층: 외래진료센터 / 소화기·순환기 내과 / 정형외과·관절센터 / 주사실 / 채혈실' },
    { id: '3F', title: '3층: 뇌신경센터(신경외과) / 심장혈관센터 / CT·MRI 영상의학센터 / 중앙수술실' },
    { id: '4F', title: '4층: 안과 센터 / 피부성형외과 / 물리치료·도수치료 센터' },
    { id: '5F', title: '5층: 종합건강증진센터 (VIP 검진 대기실 / 내시경센터)' },
    { id: '6F', title: '6층~8층: 입원병동 (6F 일반병동, 7F 간호간병통합병동, 8F VIP 입원실)' },
  ];

  // Calculate Parking Fee
  const calculateParkingFee = () => {
    let freeHours = 0;
    if (visitPurpose === 'outpatient') freeHours = 4;
    else if (visitPurpose === 'checkup') freeHours = 4;
    else if (visitPurpose === 'inpatient') freeHours = 24;
    else freeHours = 0.5; // Visitor 30 min free

    const excessHours = Math.max(0, parkingHours - freeHours);
    const fee = excessHours * 3000; // 3,000 KRW per hour
    return { freeHours, fee };
  };

  const { freeHours, fee } = calculateParkingFee();

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-50 px-3.5 py-1 rounded-full">
            <Building2 className="w-4 h-4" />
            <span>HOSPITAL GUIDE & LOCATION</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
            병원 이용안내 및 오시는 길
          </h2>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            서울대학교병원의 층별 안내, 대중교통 및 주차요금 시스템을 안내해 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Floor Map Guide */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>병원 층별 시설 안내</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">B2F~8F 전층 엘리베이터 가동</span>
            </div>

            {/* Floor Buttons */}
            <div className="flex flex-wrap gap-2">
              {floors.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFloor(f.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activeFloor === f.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.id}
                </button>
              ))}
            </div>

            {/* Selected Floor Content */}
            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-3">
              <h4 className="text-base font-bold text-blue-900">
                {floors.find((f) => f.id === activeFloor)?.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                해당 층에는 최신 원스톱 키오스크 접수대와 자율 수납기가 구비되어 있습니다. 각 진료실 앞 대기 화면을 통해 실시간 대기 순번을 확인하실 수 있습니다.
              </p>
            </div>

            {/* Parking Fee Calculator Box */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Car className="w-5 h-5 text-teal-600" />
                  <span>스마트 무인 주차요금 계산기</span>
                </h4>
                <span className="text-xs text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full font-bold">
                  외래 진료시 4시간 무료
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">방문 목적 선택</label>
                  <select
                    value={visitPurpose}
                    onChange={(e: any) => setVisitPurpose(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="outpatient">외래 진료 환자 (4시간 무료)</option>
                    <option value="checkup">종합검진 받으시는 분 (4시간 무료)</option>
                    <option value="inpatient">입원/퇴원 환자 당일 (24시간 무료)</option>
                    <option value="visitor">일반 면회객 (30분 무료)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">예상 주차 시간</label>
                  <select
                    value={parkingHours}
                    onChange={(e) => setParkingHours(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((h) => (
                      <option key={h} value={h}>
                        {h}시간 주차
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Calculator Result Display */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="text-slate-400 text-[11px]">무료 적용시간: {freeHours}시간</p>
                  <p className="text-slate-200 font-bold">예상 주차 정산 금액</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-teal-300">
                    {fee.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Directions & Simulated Map View */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                <span>위치 및 대중교통 안내</span>
              </h3>

              {/* Simulated Interactive Map Display */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center group">
                <img
                  src="병원위치.png"
                  alt="병원 지도 위치"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/40" />
                <div className="absolute bg-white/95 text-slate-900 p-3 rounded-2xl shadow-xl border border-slate-200 text-center space-y-0.5">
                  <Building2 className="w-6 h-6 text-blue-600 mx-auto" />
                  <p className="text-xs font-bold font-serif">서울대학교병원 본관</p>
                  <p className="text-[10px] text-slate-500">서울특별시 종로구 대학로 101 (혜화동/연건동)</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Train className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">지하철 이용 시</p>
                    <p className="text-slate-600">4호선 혜화역 3번 출구 도보 3분 거리</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Bus className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">시내버스 이용 시</p>
                    <p className="text-slate-600">간선: 101, 102, 104, 106, 140, 150 | 지선: 2112, 7025 (혜화동/서울대병원 정류장 하차)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <PhoneCall className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">원내 대표 종합 문의</p>
                    <p className="text-slate-600">대표전화: 02-1588-0000 | 24시간 응급센터: 02-1588-0001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
