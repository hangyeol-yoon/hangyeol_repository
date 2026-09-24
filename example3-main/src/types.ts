export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  scripture: string;
  date: string;
  youtubeId: string;
  thumbnailUrl: string;
  series?: string;
  summary: string;
  transcript: string;
  duration: string;
  viewCount: number;
}

export interface BulletinOrder {
  step: string;
  title: string;
  content: string;
  performer?: string;
}

export interface Bulletin {
  id: string;
  issueNumber: string;
  date: string;
  weeklyVerse: {
    text: string;
    reference: string;
  };
  sermonInfo: {
    title: string;
    speaker: string;
    scripture: string;
  };
  orderOfWorship: BulletinOrder[];
  churchNews: {
    id: string;
    category: string;
    title: string;
    content: string;
    date: string;
    isImportant?: boolean;
  }[];
  pastoralColumn: {
    title: string;
    author: string;
    content: string;
  };
  weeklyReadings: {
    day: string;
    passage: string;
  }[];
  memberUpdates: {
    type: '입교/세례' | '소천' | '결혼' | '득남득녀' | '새가족';
    content: string;
  }[];
  volunteers: {
    role: string;
    names: string;
  }[];
}

export interface WorshipTime {
  id: string;
  category: '주일예배' | '주중예배' | '다음세대';
  name: string;
  time: string;
  location: string;
  target?: string;
  description: string;
}

export interface PastoralStaff {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  imageUrl: string;
  bio: string;
  quote?: string;
}

export interface Ministry {
  id: string;
  name: string;
  target: string;
  time: string;
  location: string;
  leader: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface PrayerRequest {
  id: string;
  author: string;
  isPrivate: boolean;
  category: '건강' | '가정' | '진로/학업' | '신앙' | '기타';
  content: string;
  createdAt: string;
  prayCount: number;
  answered?: boolean;
}

export interface OfferingAccount {
  type: string;
  bank: string;
  accountNumber: string;
  holder: string;
  note: string;
}

export interface NewFamilyForm {
  name: string;
  phone: string;
  email: string;
  birthDate?: string;
  address?: string;
  prevChurch?: string;
  familyMembers?: string;
  message?: string;
}
