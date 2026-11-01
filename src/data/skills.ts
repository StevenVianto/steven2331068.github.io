/** Skill groups shown in the Expertise section. */

export type SkillChip = {
  label: string;
  /** Optional dot colour; falls back to the theme's muted dot. */
  color?: string;
};

export type SkillGroup = {
  title: string;
  subtitle: string;
  icon: string;
  chips: SkillChip[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & DB',
    subtitle: 'Core Logic & Data',
    icon: 'code',
    chips: [
      { label: 'Python' },
      { label: 'C#' },
      { label: 'Java' },
      { label: 'C++' },
      { label: 'SQL' },
      { label: 'HTML5' },
      { label: 'CSS3 / JS' },
    ],
  },
  {
    title: 'Frameworks & Libs',
    subtitle: 'Application Architectures',
    icon: 'layers',
    chips: [
      { label: 'Flutter (Mobile)', color: '#0284c7' },
      { label: 'React (Frontend)', color: '#38bdf8' },
      { label: 'Laravel (Backend)', color: '#ef4444' },
      { label: 'Modern Web Frameworks' },
      { label: 'Mobile Architecture' },
    ],
  },
  {
    title: 'Tools & Creative',
    subtitle: 'Design & Deployment',
    icon: 'settings',
    chips: [
      { label: 'Adobe Photoshop', color: '#3b82f6' },
      { label: 'Git & GitHub', color: '#f97316' },
      { label: 'itch.io Deployment', color: '#fa5c5c' },
      { label: 'Game Engines' },
      { label: 'VS Code' },
    ],
  },
  {
    title: 'Soft Skills',
    subtitle: 'Mindset & Execution',
    icon: 'users',
    chips: [
      { label: 'Agile Collaboration', color: '#10b981' },
      { label: 'Project Management', color: '#10b981' },
      { label: 'Effective Decision Making', color: '#10b981' },
      { label: 'Team Work', color: '#10b981' },
      { label: 'Open-mindedness', color: '#10b981' },
    ],
  },
];
