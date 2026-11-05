export type Language = 'es' | 'ca' | 'en';

export interface TreatmentService {
  name: string;
  description: string;
  detail?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScheduleSlot {
  dayOfWeek: string[];
  opens: string;
  closes: string;
  description?: string;
}

export interface MedicalTeamMemberSchedule {
  name: string;
  role: string;
  medicalSpecialty: string;
  scheduleSummary: Record<Language, string>;
  hoursAvailable: ScheduleSlot[];
}

export interface Specialty {
  id: string;
  slug: string;
  slugs: Record<Language, string>;
  schemaSpecialty?: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  badge: Record<Language, string>;
  leadDoctor: {
    name: string;
    role: string;
    colegiateNumber: string;
    image: string;
    scheduleSummary?: Record<Language, string>;
    hoursAvailable?: ScheduleSlot[];
  };
  medicalTeamSchedule?: MedicalTeamMemberSchedule[];
  shortDescription: Record<Language, string>;
  fullDescription: Record<Language, string>;
  indications: Record<Language, string[]>;
  treatments: Record<Language, TreatmentService[]>;
  faqs: Record<Language, FAQItem[]>;
  image: string;
  seoKeywords: string[];
  features: Record<Language, string[]>;
}

export interface TeamMember {
  id: string;
  name: string;
  role: Record<Language, string>;
  collegiateNumber?: string;
  specialty: Record<Language, string>;
  bio: Record<Language, string>;
  credentials: string[];
  image: string;
  scheduleSummary?: Record<Language, string>;
  hoursAvailable?: ScheduleSlot[];
}

export interface ClinicImage {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  description: Record<Language, string>;
  src: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: Record<Language, string>;
  comment: Record<Language, string>;
  rating: number;
  date: string;
}
