import React from 'react';
import { HeartHandshake, GraduationCap, Users, Globe, Church, Quote, Mail } from 'lucide-react';
import { CHURCH_INFO, PASTORAL_STAFF } from '../data/churchData';

export const ChurchInfo: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
          ABOUT OUR CHURCH
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          교회 소개
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          말씀 위에 굳건히 서서 은혜와 평강을 나누는 성경적 교회를 지향합니다.
        </p>
      </div>

      {/* Senior Pastor Greeting Box */}
      <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-md">
              <img
                src={PASTORAL_STAFF[0].imageUrl}
                alt={PASTORAL_STAFF[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center sm:text-left">
              <h3 className="font-serif font-bold text-xl text-stone-900">{CHURCH_INFO.seniorPastor}</h3>
              <p className="text-xs text-amber-800 font-medium">은혜와 평강 교회 담임목사</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-amber-800 font-serif text-sm font-semibold">
              <Quote className="w-5 h-5 text-amber-700" />
              <span>환영의 말씀</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 leading-snug">
              "주님의 보혈과 은혜 안에서 진정한 평안을 경험하십시오."
            </h3>

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-serif whitespace-pre-line">
              <p>
                사랑하는 성도 여러분, 그리고 은혜와 평강교회 홈페이지를 방문해주신 여러분을 주님의 이름으로 진심으로 환영합니다.
              </p>
              <p>
                오늘날 우리 시대는 물질의 풍요 속에서도 마음의 고독과 영적 갈증으로 신음하고 있습니다. 성경은 예수 그리스도만이 우리 영혼의 진정한 목자이시며, 상황을 초월한 하나님 나라의 평강을 주시는 분이라 말씀하십니다.
              </p>
              <p>
                은혜와 평강교회는 살아있는 예배, 신실한 성경 공부, 사랑의 교제, 그리고 다음세대 양육을 통해 성도 한 분 한 분이 그리스도의 참 제자로 세워지는 교회입니다.
              </p>
              <p>
                이곳에서 하나님의 따뜻한 사랑을 경험하시고 영육 간의 거룩한 회복과 평안을 누리시기를 기도합니다.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-amber-900">은혜와 평강교회 교역자 일동</span>
              <span className="italic">{CHURCH_INFO.mottoYear} 표어</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Core Visions */}
      <div className="space-y-8 pt-6">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            교회의 4대 핵심 비전
          </h3>
          <p className="text-stone-600 text-sm">
            하나님께서 우리 교회에 주신 거룩한 사명과 핵심 가치입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHURCH_INFO.visions.map((v, idx) => {
            const icons = [HeartHandshake, GraduationCap, Users, Globe];
            const IconComp = icons[idx] || Church;
            return (
              <div
                key={idx}
                className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/80 hover:bg-amber-100/50 transition-colors space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-800 text-amber-50 flex items-center justify-center shadow-xs">
                  <IconComp className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-lg">{v.title}</h4>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pastoral Team Showcase */}
      <div className="space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            섬기는 교역자들
          </h3>
          <p className="text-stone-600 text-sm">
            기도와 말씀으로 성도들을 격려하고 섬기는 교역자진을 소개합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PASTORAL_STAFF.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="aspect-square relative bg-stone-100 overflow-hidden">
                <img
                  src={staff.imageUrl}
                  alt={staff.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-stone-900 text-lg">{staff.name} {staff.role}</h4>
                  </div>
                  <p className="text-xs text-amber-800 font-semibold mb-2">{staff.department}</p>
                  <p className="text-stone-600 text-xs leading-relaxed">{staff.bio}</p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">{staff.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
