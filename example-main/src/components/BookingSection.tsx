import React, { useState, useEffect } from 'react';
import { Doctor, Department, Appointment } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { DoctorAvatar } from './DoctorAvatar';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  QrCode,
  Search,
  XCircle,
  AlertCircle,
  Building2,
  ChevronRight,
  ArrowLeft,
  Send,
  FileText,
  Smartphone,
} from 'lucide-react';

interface BookingSectionProps {
  preselectedDoctor?: Doctor | null;
  onBookingCompleted?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedDoctor,
  onBookingCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'lookup'>('new');

  // Booking Flow States
  const [step, setStep] = useState<number>(1);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    preselectedDoctor?.departmentId || 'internal'
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(
    preselectedDoctor || DOCTORS[0]
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-03');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  // Patient Info Form
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('010-');
  const [patientBirth, setPatientBirth] = useState('1990-01-01');
  const [visitType, setVisitType] = useState<'first' | 'return'>('first');
  const [symptomDescription, setSymptomDescription] = useState('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState<Appointment | null>(null);
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  // Lookup Form
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupName, setLookupName] = useState('');
  const [lookupResults, setLookupResults] = useState<Appointment[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchingLookup, setIsSearchingLookup] = useState(false);

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDeptId(preselectedDoctor.departmentId);
      setSelectedDoctor(preselectedDoctor);
    }
  }, [preselectedDoctor]);

  // Filter doctors based on selected dept
  const deptDoctors = DOCTORS.filter((d) => d.departmentId === selectedDeptId);

  // Time slots
  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  // Submit appointment to server
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !selectedDoctor) {
      alert('환자 성함과 연락처를 정확히 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedDept = DEPARTMENTS.find((d) => d.id === selectedDeptId);
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          patientPhone,
          patientBirth,
          departmentId: selectedDeptId,
          departmentName: selectedDept?.koreanName || '진료과',
          doctorId: selectedDoctor.id,
          doctorName: selectedDoctor.name,
          doctorTitle: selectedDoctor.title,
          date: selectedDate,
          time: selectedTime,
          visitType,
          symptomDescription: symptomDescription || '상담 후 진료',
        }),
      });

      const data = await res.json();
      if (data.success && data.appointment) {
        setConfirmedTicket(data.appointment);
        setStep(4); // Ticket screen
      } else {
        alert(data.error || '예약 생성 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 통신 실패. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lookup appointments by phone number
  const handleLookupSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupPhone.trim()) {
      alert('검색하실 휴대폰 번호를 입력해 주세요.');
      return;
    }

    setIsSearchingLookup(true);
    try {
      const res = await fetch(`/api/appointments?phone=${encodeURIComponent(lookupPhone)}`);
      const data = await res.json();
      let results: Appointment[] = data.appointments || [];
      if (lookupName.trim()) {
        results = results.filter((a) => a.patientName.includes(lookupName.trim()));
      }
      setLookupResults(results);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      alert('예약 조회 중 오류가 발생했습니다.');
    } finally {
      setIsSearchingLookup(false);
    }
  };

  // Cancel Appointment
  const handleCancelAppointment = async (apptId: string) => {
    if (!confirm('정말로 이 진료 예약을 취소하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/appointments/${apptId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('예약이 정상적으로 취소되었습니다.');
        // Refresh list
        handleLookupSearch(new Event('submit') as any);
      }
    } catch (err) {
      console.error(err);
      alert('취소 처리 실패');
    }
  };

  const currentDepartment = DEPARTMENTS.find((d) => d.id === selectedDeptId);

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-teal-600 text-xs font-bold uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            <span>ONLINE APPOINTMENT SYSTEM</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
            스마트 온라인 진료 예약
          </h2>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            원하시는 진료과, 담당 교수, 날짜 및 시간을 자유롭게 선택하실 수 있습니다.
          </p>

          {/* Tab buttons (New Reservation vs Lookup) */}
          <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl mt-4">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'new'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              신규 진료 예약하기
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'lookup'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              내 예약 조회 / 취소
            </button>
          </div>
        </div>

        {/* TAB 1: New Booking Wizard */}
        {activeTab === 'new' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Step Progress Bar */}
            {step < 4 && (
              <div className="bg-slate-900 text-white p-4 sm:p-6 border-b border-slate-800">
                <div className="flex items-center justify-between max-w-2xl mx-auto text-xs sm:text-sm font-semibold">
                  <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-400' : 'text-slate-500'}`}>
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold">1</span>
                    <span>의료진 선택</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-400' : 'text-slate-500'}`}>
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold">2</span>
                    <span>날짜·시간</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className={`flex items-center gap-2 ${step >= 3 ? 'text-teal-400' : 'text-slate-500'}`}>
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold">3</span>
                    <span>환자정보 입력</span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* STEP 1: Select Department & Doctor */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif mb-1">
                      1. 진료과 및 담당 교수를 선택하세요
                    </h3>
                    <p className="text-xs text-slate-500">원하시는 진료 분야를 먼저 선택하시면 전문의 목록이 나타납니다.</p>
                  </div>

                  {/* Department Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DEPARTMENTS.map((dept) => (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => {
                          setSelectedDeptId(dept.id);
                          const firstDoc = DOCTORS.find((d) => d.departmentId === dept.id);
                          if (firstDoc) setSelectedDoctor(firstDoc);
                        }}
                        className={`p-3 rounded-2xl border text-left transition text-xs sm:text-sm ${
                          selectedDeptId === dept.id
                            ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">DEPARTMENT</span>
                        <span>{dept.koreanName}</span>
                      </button>
                    ))}
                  </div>

                  {/* Doctor Selection */}
                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-3">
                      담당 전문의 선택 ({deptDoctors.length}명)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {deptDoctors.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDoctor(doc)}
                          className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                            selectedDoctor?.id === doc.id
                              ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <DoctorAvatar
                            src={doc.image}
                            name={doc.name}
                            title={doc.title}
                            doctorId={doc.id}
                            className="w-14 h-14 rounded-xl border border-slate-200 shrink-0"
                          />
                          <div className="space-y-0.5">
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">
                              {doc.departmentName}
                            </span>
                            <h4 className="text-base font-bold text-slate-900">{doc.name} 교수</h4>
                            <p className="text-xs text-slate-500">{doc.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Step Button */}
                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!selectedDoctor}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50"
                    >
                      <span>다음: 진료 날짜·시간 선택</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time Picker */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-serif mb-1">
                        2. 진료 희망 날짜 및 시간을 선택하세요
                      </h3>
                      <p className="text-xs text-slate-500">
                        선택 교수: <strong className="text-blue-700">{selectedDoctor?.name} 교수</strong> ({currentDepartment?.koreanName})
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> 의료진 다시선택
                    </button>
                  </div>

                  {/* Date selection quick buttons */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase">진료 날짜 선택</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { date: '2026-08-03', label: '8월 3일 (월)' },
                        { date: '2026-08-04', label: '8월 4일 (화)' },
                        { date: '2026-08-05', label: '8월 5일 (수)' },
                        { date: '2026-08-06', label: '8월 6일 (목)' },
                        { date: '2026-08-07', label: '8월 7일 (금)' },
                        { date: '2026-08-08', label: '8월 8일 (토)' },
                      ].map((item) => (
                        <button
                          key={item.date}
                          type="button"
                          onClick={() => setSelectedDate(item.date)}
                          className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition ${
                            selectedDate === item.date
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slot picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase">가능한 진료 시간</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-2.5 rounded-xl border text-center font-semibold text-xs sm:text-sm transition ${
                            selectedTime === time
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100"
                    >
                      이전 단계
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm flex items-center gap-2 shadow-md shadow-blue-500/20"
                    >
                      <span>다음: 환자 정보 입력</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Patient Info Form */}
              {step === 3 && (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif mb-1">
                      3. 예약 환자 정보 입력
                    </h3>
                    <p className="text-xs text-slate-500">
                      진료 예약 확인 및 안내 문자 발송을 위해 정보를 정확히 입력해주세요.
                    </p>
                  </div>

                  {/* Selected Booking Summary Bar */}
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-wrap items-center justify-between text-xs text-blue-900 font-medium gap-2">
                    <div>
                      <span>진료과: <strong>{currentDepartment?.koreanName}</strong></span>
                      <span className="mx-2">•</span>
                      <span>담당교수: <strong>{selectedDoctor?.name} 교수</strong></span>
                    </div>
                    <div>
                      <span>일시: <strong className="text-blue-700">{selectedDate} ({selectedTime})</strong></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">환자 성명 *</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="예: 홍길동"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">휴대폰 번호 *</label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="010-1234-5678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">생년월일 (8자리)</label>
                      <input
                        type="date"
                        value={patientBirth}
                        onChange={(e) => setPatientBirth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">진료 구문</label>
                      <div className="flex items-center gap-4 py-2">
                        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="visitType"
                            checked={visitType === 'first'}
                            onChange={() => setVisitType('first')}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>초진 (본원 처음 방문)</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="visitType"
                            checked={visitType === 'return'}
                            onChange={() => setVisitType('return')}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>재진 (재방문)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">주요 불편 증상 요약 (선택)</label>
                    <textarea
                      rows={2}
                      value={symptomDescription}
                      onChange={(e) => setSymptomDescription(e.target.value)}
                      placeholder="의사 선생님께 미리 전달하실 증상이 있다면 간단히 작성해주세요. (예: 2주 전부터 속쓰림 증상 지속)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Terms checkbox */}
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 space-y-1 border border-slate-200">
                    <p className="font-semibold text-slate-700">[개인정보 수집 및 이용 동의]</p>
                    <p>본 병원은 진료 예약 서비스 제공을 위해 최소한의 개인정보(성명, 연락처, 생년월일)를 수집합니다.</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100"
                    >
                      이전 단계
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold px-8 py-3.5 rounded-xl transition text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>예약 접수 중...</span>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>진료 예약 확정하기</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: Digital Appointment Confirmation Ticket */}
              {step === 4 && confirmedTicket && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                      예약 접수 완료
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 font-serif mt-2">
                      진료 예약이 성공적으로 완료되었습니다!
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      입력하신 휴대폰 번호로 예약 안내 알림톡이 전송되었습니다.
                    </p>
                  </div>

                  {/* Digital Ticket Card */}
                  <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-2xl border border-slate-700 text-left relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-teal-400" />
                        <span className="font-bold text-sm tracking-wide">서울대학교병원 진료표</span>
                      </div>
                      <span className="text-xs font-mono bg-slate-800 text-teal-300 px-2.5 py-1 rounded-md border border-slate-700">
                        {confirmedTicket.id}
                      </span>
                    </div>

                    <div className="py-4 space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">환자 성함:</span>
                        <span className="font-bold text-sm text-white">{confirmedTicket.patientName} 님 ({confirmedTicket.visitType === 'first' ? '초진' : '재진'})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">진료과 / 담당교수:</span>
                        <span className="font-bold text-slate-200">{confirmedTicket.departmentName} / <strong className="text-teal-300">{confirmedTicket.doctorName} 교수</strong></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">진료 예정 일시:</span>
                        <span className="font-bold text-amber-300 text-sm">{confirmedTicket.date} ({confirmedTicket.time})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">방문 위치:</span>
                        <span className="font-medium text-slate-300">{currentDepartment?.floor || '2층 외래진료센터'}</span>
                      </div>
                    </div>

                    {/* QR Code Simulator */}
                    <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between bg-slate-950/60 p-3 rounded-2xl">
                      <div>
                        <p className="text-[10px] text-slate-400">무인 수납 및 원패스 모바일 QR</p>
                        <p className="text-xs font-mono text-teal-400 font-bold">{confirmedTicket.qrCodeId}</p>
                      </div>
                      <QrCode className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* SMS Simulation Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setSmsSentNotice(true)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <Smartphone className="w-4 h-4 text-blue-600" />
                      <span>예약 문자 다시 받기</span>
                    </button>
                    <button
                      onClick={() => {
                        setStep(1);
                        setConfirmedTicket(null);
                        setSmsSentNotice(false);
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition"
                    >
                      새로운 진료 예약
                    </button>
                  </div>

                  {smsSentNotice && (
                    <div className="p-3 bg-teal-50 text-teal-800 text-xs rounded-xl font-medium border border-teal-200 max-w-md mx-auto animate-in fade-in">
                      📱 [{confirmedTicket.patientPhone}] 번호로 진료 안내 문자가 전송되었습니다.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Lookup Existing Appointments */}
        {activeTab === 'lookup' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-serif mb-1">
                예약 내역 조회 및 취소
              </h3>
              <p className="text-xs text-slate-500">
                예약 시 입력하신 휴대폰 번호로 진료 내역을 조회하실 수 있습니다.
              </p>
            </div>

            <form onSubmit={handleLookupSearch} className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                required
                value={lookupPhone}
                onChange={(e) => setLookupPhone(e.target.value)}
                placeholder="휴대폰 번호 입력 (예: 010-1234-5678)"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                value={lookupName}
                onChange={(e) => setLookupName(e.target.value)}
                placeholder="환자 성함 (선택)"
                className="w-full sm:w-40 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSearchingLookup}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow"
              >
                <Search className="w-4 h-4" />
                <span>{isSearchingLookup ? '조회 중...' : '예약 조회'}</span>
              </button>
            </form>

            {/* Results List */}
            {hasSearched && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500">
                  조회 결과 총 <strong className="text-blue-600">{lookupResults.length}건</strong>의 예약 내역이 있습니다.
                </p>

                {lookupResults.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                    입력하신 정보와 일치하는 예약 내역이 존재하지 않습니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lookupResults.map((appt) => (
                      <div
                        key={appt.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">
                              {appt.departmentName}
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                appt.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {appt.status === 'confirmed' ? '예약 확정' : '취소됨'}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900">
                            {appt.doctorName} {appt.doctorTitle}
                          </h4>
                          <p className="text-xs text-slate-600">
                            환자: {appt.patientName} | 일시: <strong className="text-blue-700">{appt.date} ({appt.time})</strong>
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono">예약번호: {appt.id}</p>
                        </div>

                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelAppointment(appt.id)}
                            className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition shrink-0"
                          >
                            예약 취소
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
