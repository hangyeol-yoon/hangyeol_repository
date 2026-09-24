export type NavCategory = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'solutions' 
  | 'portfolio' 
  | 'news' 
  | 'contact';

export type AboutSubSection = 'ceo' | 'overview' | 'vision' | 'history' | 'org';
export type ServicesSubSection = 'overview' | 'features' | 'cases' | 'pricing';
export type SolutionsSubSection = 'ai' | 'cloud' | 'data' | 'custom';
export type PortfolioSubSection = 'projects' | 'clients' | 'success';
export type NewsSubSection = 'notice' | 'blog' | 'press' | 'careers';
export type ContactSubSection = 'consulting' | 'quote' | 'location';

export interface NavItem {
  id: NavCategory;
  label: string;
  subSections?: {
    id: string;
    label: string;
    description?: string;
  }[];
}

export interface CeoInfo {
  name: string;
  title: string;
  quote: string;
  greeting: string[];
  signature: string;
  image: string;
}

export interface CompanyOverviewInfo {
  mission: string;
  visionText: string;
  slogan: string;
  stats: { label: string; value: string; unit: string; change?: string }[];
  coreValues: { title: string; desc: string; icon: string }[];
}

export interface HistoryItem {
  year: string;
  quarter?: string;
  title: string;
  desc: string;
  tag?: string;
}

export interface OrgNode {
  title: string;
  head?: string;
  description: string;
  children?: OrgNode[];
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  target: string;
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export interface SolutionItem {
  id: string;
  category: SolutionsSubSection;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  highlights: string[];
  techStack: string[];
  architectureSummary: string;
  demoType?: 'ai-chat' | 'cloud-metrics' | 'data-chart' | 'custom-workflow';
  image: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  industry: 'finance' | 'manufacturing' | 'healthcare' | 'commerce' | 'public';
  duration: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  tags: string[];
  image: string;
}

export interface ClientPartner {
  name: string;
  logo: string;
  industry: string;
  description: string;
}

export interface NewsPost {
  id: string;
  category: 'notice' | 'blog' | 'press';
  title: string;
  date: string;
  author?: string;
  readTime?: string;
  summary: string;
  content: string;
  tags: string[];
  thumbnail?: string;
  mediaName?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: '정규직' | '계약직' | '인턴';
  experience: string;
  location: string;
  deadline: string;
  responsibilities: string[];
  qualifications: string[];
  preferences: string[];
}

export interface QuoteCalculationState {
  serviceType: 'ai' | 'cloud' | 'data' | 'custom';
  userScale: 'small' | 'medium' | 'enterprise';
  additionalOptions: string[];
  urgency: 'normal' | 'express';
}
