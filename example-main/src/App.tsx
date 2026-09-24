import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DepartmentStaffSection } from './components/DepartmentStaffSection';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { BookingSection } from './components/BookingSection';
import { AIConsultantSection } from './components/AIConsultantSection';
import { HealthCheckupSection } from './components/HealthCheckupSection';
import { HospitalGuideSection } from './components/HospitalGuideSection';
import { NoticeSection } from './components/NoticeSection';
import { Footer } from './components/Footer';
import { Doctor } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [heroSearchQuery, setHeroSearchQuery] = useState<string>('');
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState<Doctor | null>(null);
  const [preselectedBookingDoctor, setPreselectedBookingDoctor] = useState<Doctor | null>(null);

  // Handle hero search
  const handleHeroSearch = (query: string) => {
    setHeroSearchQuery(query);
    setActiveTab('departments');
  };

  // Select doctor to book
  const handleSelectDoctorToBook = (doctor: Doctor) => {
    setPreselectedBookingDoctor(doctor);
    setActiveTab('booking');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => setActiveTab('booking')}
      />

      {/* Main Content Router View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onSearch={handleHeroSearch}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenBooking={() => setActiveTab('booking')}
            />
            <DepartmentStaffSection
              searchQuery={heroSearchQuery}
              onSelectDoctorToBook={handleSelectDoctorToBook}
              onViewDoctorDetail={(doctor) => setSelectedDoctorForModal(doctor)}
            />
            <AIConsultantSection
              onSelectDepartmentToBook={(deptId) => {
                setActiveTab('booking');
              }}
            />
            <HealthCheckupSection onOpenBooking={() => setActiveTab('booking')} />
            <HospitalGuideSection />
            <NoticeSection />
          </>
        )}

        {activeTab === 'departments' && (
          <DepartmentStaffSection
            searchQuery={heroSearchQuery}
            onSelectDoctorToBook={handleSelectDoctorToBook}
            onViewDoctorDetail={(doctor) => setSelectedDoctorForModal(doctor)}
          />
        )}

        {activeTab === 'booking' && (
          <BookingSection preselectedDoctor={preselectedBookingDoctor} />
        )}

        {activeTab === 'ai-consult' && (
          <AIConsultantSection
            onSelectDepartmentToBook={(deptId) => {
              setActiveTab('booking');
            }}
          />
        )}

        {activeTab === 'checkup' && (
          <HealthCheckupSection onOpenBooking={() => setActiveTab('booking')} />
        )}

        {activeTab === 'guide' && <HospitalGuideSection />}

        {activeTab === 'notices' && <NoticeSection />}
      </main>

      {/* Doctor Detail Popup Modal */}
      {selectedDoctorForModal && (
        <DoctorDetailModal
          doctor={selectedDoctorForModal}
          onClose={() => setSelectedDoctorForModal(null)}
          onBookDoctor={handleSelectDoctorToBook}
        />
      )}

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
