export interface Department {
  id: string;
  name: string;
  koreanName: string;
  iconName: string;
  description: string;
  commonSymptoms: string[];
  operatingHours: string;
  floor: string;
  bgGradient: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  specialty: string[];
  education: string[];
  experience: string[];
  schedule: {
    [key: string]: { am: boolean; pm: boolean }; // e.g. "mon": { am: true, pm: false }
  };
  image: string;
  rating: number;
  reviewCount: number;
  introduction: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientBirth: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  date: string;
  time: string;
  visitType: 'first' | 'return';
  symptomDescription: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  qrCodeId: string;
}

export interface CheckupPackage {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  discountPrice?: number;
  tag: string;
  recommendedFor: string[];
  items: { category: string; list: string[] }[];
  duration: string;
  prepNotes: string[];
}

export interface AIConsultMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestedDepartments?: { id: string; name: string }[];
  urgencyLevel?: 'normal' | 'caution' | 'emergency';
  timestamp: string;
}

export interface HospitalNotice {
  id: string;
  category: '공지' | '건강정보' | '채용' | '언론보도';
  title: string;
  date: string;
  views: number;
  important?: boolean;
  content: string;
}
