import React from 'react';
import { Doctor } from '../types';
import { DoctorAvatar } from './DoctorAvatar';
import {
  X,
  Star,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Clock,
  ThumbsUp,
  MapPin,
  MessageSquare,
} from 'lucide-react';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  onClose,
  onBookDoctor,
}) => {
  if (!doctor) return null;

  const days = [
    { key: 'mon', label: '월요일' },
    { key: 'tue', label: '화요일' },
    { key: 'wed', label: '수요일' },
    { key: 'thu', label: '목요일' },
    { key: 'fri', label: '금요일' },
    { key: 'sat', label: '토요일' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-8 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header Bar */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <DoctorAvatar
              src={doctor.image}
              name={doctor.name}
              title={doctor.title}
              doctorId={doctor.id}
              className="w-24 h-24 rounded-2xl border-2 border-teal-400 shadow-md shrink-0"
            />
            <div className="text-center sm:text-left space-y-1.5">
              <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-400/30">
                {doctor.departmentName}
              </span>
              <h2 className="text-2xl font-bold font-serif">{doctor.name} 교수</h2>
              <p className="text-xs text-slate-300 font-medium">{doctor.title}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-amber-400 font-bold">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{doctor.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300 font-normal">누적 진료 {doctor.reviewCount}건 만족도 98.9%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Introduction Quote */}
          <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl text-xs sm:text-sm text-blue-900 italic">
            "{doctor.introduction}"
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>주요 전문 진료 분야</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.specialty.map((s, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-800 font-semibold text-xs px-3 py-1 rounded-lg border border-slate-200/80"
                >
                  • {s}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>학력 및 약력</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                {doctor.education.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>주요 경력 및 학회 활동</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                {doctor.experience.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Weekly Schedule Grid */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>외래 진료 시간표</span>
            </h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div className="grid grid-cols-7 bg-slate-100 p-2 font-bold text-slate-700 text-center">
                <div>구분</div>
                {days.map((d) => (
                  <div key={d.key}>{d.label.slice(0, 1)}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 p-2 border-t border-slate-200 text-center items-center font-medium">
                <div className="text-slate-500 font-bold">오전 (08:30~)</div>
                {days.map((d) => {
                  const hasAm = doctor.schedule[d.key]?.am;
                  return (
                    <div key={d.key}>
                      {hasAm ? (
                        <span className="text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded-md">진료</span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-7 p-2 border-t border-slate-200 text-center items-center font-medium bg-slate-50/50">
                <div className="text-slate-500 font-bold">오후 (13:30~)</div>
                {days.map((d) => {
                  const hasPm = doctor.schedule[d.key]?.pm;
                  return (
                    <div key={d.key}>
                      {hasPm ? (
                        <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">진료</span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">※ 학회 참여 및 응급 수술 일정으로 일부 진료 시간이 변동될 수 있습니다.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-200 transition"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onBookDoctor(doctor);
            }}
            className="flex-1 max-w-xs py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
          >
            <Calendar className="w-4 h-4" />
            <span>{doctor.name} 교수 진료 예약하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
