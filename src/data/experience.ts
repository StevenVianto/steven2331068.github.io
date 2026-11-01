/** Work experience timeline. */

export type Experience = {
  role: string;
  company: string;
  duration: string;
  /** Bullets support a tiny subset of inline markup: **bold**. */
  bullets: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: 'Mobile Developer Intern',
    company: 'Infinite Learning Indonesia',
    duration: '6 Months Duration',
    bullets: [
      'Developed and maintained responsive cross-platform mobile applications utilizing the **Flutter** framework, ensuring seamless rendering across iOS and Android ecosystems.',
      'Collaborated proactively within an **Agile Scrum workflow**, participating in daily stand-ups, sprint planning, and designing sleek user interfaces that integrate with backend REST APIs to deliver production-ready features.',
      'Contributed actively to architectural decision-making, rigorous peer code reviews, debugging, and end-to-end application quality testing.',
    ],
    tech: [
      'Flutter',
      'Dart',
      'RESTful APIs',
      'Agile Scrum',
      'State Management',
      'Git / GitHub',
      'Mobile UI/UX',
    ],
  },
];
