/** Certifications, formal education, languages and achievements. */

export type Certification = {
  name: string;
  detail: string;
  icon: string;
};

export const certifications: Certification[] = [
  {
    name: 'Big Data Associate Certification',
    detail: 'Data Analysis & Big Data Ecosystems',
    icon: 'database',
  },
  {
    name: 'Agile Scrum Certification',
    detail: 'Agile Frameworks & Sprint Delivery',
    icon: 'sun',
  },
  {
    name: 'Project Management Certification',
    detail: 'Planning, Risk & Team Coordination',
    icon: 'calendar',
  },
  {
    name: 'SACP 300 Certification',
    detail: 'Specialized Professional Competency',
    icon: 'star',
  },
];

export type Education = {
  school: string;
  year: string;
  major: string;
  note: string;
};

export const education: Education[] = [
  {
    school: 'Universitas Internasional Batam',
    year: '2023 – Present',
    major: "Bachelor's Degree in Information Systems",
    note: 'Pursuing foundational and applied studies in software architecture, database management systems, algorithms, and business-technology alignment.',
  },
  {
    school: 'SMA Ananda Batam',
    year: '2020 – 2023',
    major: 'Natural Science Major (IPA)',
    note: 'Graduated with honors in Natural Sciences. Awarded Academic Excellence Rank 3 across Class 10 & Class 11.',
  },
];

export type Language = { name: string; level: string; /** 0–1, drives the meter. */ proficiency: number };

export const languages: Language[] = [
  { name: 'Bahasa Indonesia', level: 'Native', proficiency: 1 },
  { name: 'English', level: 'Professional (TOEIC 710)', proficiency: 0.85 },
  { name: 'Mandarin', level: 'Conversational', proficiency: 0.55 },
];

/** Achievement lines support **bold** inline markup. */
export const achievements: string[] = [
  '**TOEIC Official Score: 710** (Advanced Professional English)',
  '**Python 100 Day 2023 Bootcamp** (Completed Comprehensive Intensive)',
  '**Academic Excellence:** Rank 3 Award (Class 10 & Class 11)',
];
