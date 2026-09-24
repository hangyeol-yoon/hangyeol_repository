import React, { useState } from 'react';
import { Department, Doctor } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { DoctorAvatar } from './DoctorAvatar';
import { setCustomDoctorImage } from '../utils/doctorImageStore';
import {
  Stethoscope,
  Activity,
  Brain,
  HeartPulse,
  Baby,
  Eye,
  Sparkles,
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  User,
  Search,
  Filter,
  Camera,
  Upload,
} from 'lucide-react';

interface DepartmentStaffSectionProps {
  searchQuery?: string;
  onSelectDoctorToBook: (doctor: Doctor) => void;
  onViewDoctorDetail: (doctor: Doctor) => void;
}

export const DepartmentStaffSection: React.FC<DepartmentStaffSectionProps> = ({
  searchQuery = '',
  onSelectDoctorToBook,
  onViewDoctorDetail,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [doctorSearch, setDoctorSearch] = useState<string>(searchQuery);

  const handleImageUpload = (doctorId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomDoctorImage(doctorId, event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Map icon component
  const renderDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Baby':
        return <Baby className="w-5 h-5" />;
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Stethoscope className="w-5 h-5" />;
    }
  };

  // Filter doctors
  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesDept = selectedDeptId === 'all' || doctor.departmentId === selectedDeptId;
    const q = doctorSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      doctor.name.toLowerCase().includes(q) ||
      doctor.departmentName.toLowerCase().includes(q) ||
      doctor.specialty.some((s) => s.toLowerCase().includes(q)) ||
      doctor.title.toLowerCase().includes(q);

    return matchesDept && matchesSearch;
  });

  const selectedDepartmentInfo = DEPARTMENTS.find((d) => d.id === selectedDeptId);

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-2">
              <User className="w-3.5 h-3.5" />
              <span>SPECIALISTS & CLINICS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              진료과 및 전문의 소개
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              각 분야별 최고 수준의 풍부한 임상 경험을 갖춘 전문 의료진을 소개합니다.
            </p>
          </div>

          {/* Search input inside section */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              placeholder="의사 이름, 전문 분야, 증상 검색"
              className="w-full pl-9 pr-4 py-2 bg-white text-slate-800 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 border ${
              selectedDeptId === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>전체 진료과 ({DOCTORS.length}명)</span>
          </button>

          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDeptId === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {renderDepartmentIcon(dept.iconName)}
                <span>{dept.koreanName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Department Overview Banner (if specific department selected) */}
        {selectedDepartmentInfo && (
          <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  {renderDepartmentIcon(selectedDepartmentInfo.iconName)}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  {selectedDepartmentInfo.koreanName}
                </h3>
                <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md">
                  {selectedDepartmentInfo.floor}
                </span>
              </div>
              <p className="text-sm text-slate-600">{selectedDepartmentInfo.description}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-500">주요 진료 증상:</span>
                {selectedDepartmentInfo.commonSymptoms.map((sym, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full"
                  >
                    • {sym}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/80 shrink-0 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>진료시간 안내</span>
              </div>
              <p>{selectedDepartmentInfo.operatingHours}</p>
            </div>
          </div>
        )}

        {/* Doctor Cards Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">검색된 의료진이 없습니다.</h3>
            <p className="text-sm text-slate-500 mt-1">의사 이름이나 다른 키워드로 다시 검색해 보세요.</p>
            <button
              onClick={() => {
                setSelectedDeptId('all');
                setDoctorSearch('');
              }}
              className="mt-4 bg-blue-50 text-blue-600 font-bold text-xs px-4 py-2 rounded-lg hover:bg-blue-100"
            >
              전체 검색 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="p-5 space-y-4">
                  {/* Doctor Top Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative group/avatar shrink-0">
                      <DoctorAvatar
                        src={doctor.image}
                        name={doctor.name}
                        title={doctor.title}
                        doctorId={doctor.id}
                        className="w-20 h-20 rounded-2xl border-2 border-slate-100 shadow-sm shrink-0 transition-transform"
                      />
                      <label
                        title="사진 변경하기"
                        className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full shadow-md cursor-pointer border-2 border-white transition-all transform hover:scale-110 flex items-center justify-center"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(doctor.id, e)}
                        />
                      </label>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                        {doctor.departmentName}
                      </span>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 font-serif">{doctor.name} 교수</h3>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">{doctor.title}</p>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold pt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{doctor.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({doctor.reviewCount}건 진료후기)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                    "{doctor.introduction}"
                  </p>

                  {/* Specialties */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">주요 전문 분야</p>
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.specialty.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Simple Schedule Indicator */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 mb-1">이번 주 외래 진료 가능</p>
                    <div className="grid grid-cols-6 gap-1 text-center text-[10px]">
                      {['월', '화', '수', '목', '금', '토'].map((day, i) => {
                        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                        const sched = doctor.schedule[dayKeys[i]];
                        const isAvail = sched?.am || sched?.pm;
                        return (
                          <div
                            key={day}
                            className={`p-1 rounded font-medium ${
                              isAvail ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            <span>{day}</span>
                            <span className="block text-[9px]">
                              {isAvail ? (sched.am && sched.pm ? '종일' : sched.am ? '오전' : '오후') : '휴진'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onViewDoctorDetail(doctor)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition"
                  >
                    의료진 상세 프로필
                  </button>
                  <button
                    onClick={() => onSelectDoctorToBook(doctor)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>진료 예약</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
