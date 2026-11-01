/**
 * Portfolio projects.
 *
 * `categories` drives the filter bar; a project may belong to more than one
 * category (the ML predictor is both `ml` and `web`).
 */

export const projectFilters = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'web', label: 'Web Apps' },
  { id: 'game', label: 'Game Development' },
  { id: 'ml', label: 'Machine Learning' },
] as const;

export type ProjectCategory = 'mobile' | 'web' | 'game' | 'ml';

export type Project = {
  slug: string;
  title: string;
  /** Short label shown on the card banner. */
  type: string;
  role: string;
  description: string;
  features: string[];
  tags: string[];
  categories: ProjectCategory[];
  icon: string;
  /** CSS gradient used for the card's icon plate and glow. */
  gradient: [string, string];
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    slug: 'fresh-start',
    title: 'Fresh Start',
    type: 'Mobile App',
    role: 'Mobile Developer',
    description:
      'Built a mobile application platform using Flutter engineered to empower Micro, Small, and Medium Enterprises (UMKM) while connecting job-seekers with accessible career opportunities.',
    features: [
      'MSME (UMKM) empowerment workflows',
      'Intuitive UI/UX and seamless state management',
    ],
    tags: ['Flutter', 'Dart', 'State Management', 'UI/UX'],
    categories: ['mobile'],
    icon: 'smartphone',
    gradient: ['#059669', '#10b981'],
  },
  {
    slug: 'gestura',
    title: 'Gestura',
    type: 'Mobile App',
    role: 'Mobile Developer',
    description:
      'Designed and developed the Gestura mobile app focused on fluid user interaction, responsive tactile gesture mechanics, and optimal 60fps mobile performance.',
    features: [
      'Interactive gesture detection & micro-interactions',
      'High-performance rendering optimization',
    ],
    tags: ['Flutter', 'Dart', 'Custom Animations', 'Performance'],
    categories: ['mobile'],
    icon: 'hand',
    gradient: ['#2563eb', '#38bdf8'],
  },
  {
    slug: 'cafe-rubeka-batam',
    title: 'Cafe Rubeka Batam',
    type: 'Full-Stack Web',
    role: 'Full-Stack Web Developer',
    description:
      'Developed an end-to-end responsive web application for Cafe Rubeka in Batam, integrating relational database management, robust API endpoints, and a custom administrative dashboard.',
    features: [
      'Admin panel to streamline digital menu & order operations',
      'Secure REST APIs & relational database schema',
    ],
    tags: ['React', 'Laravel', 'SQL Database', 'Admin Panel'],
    categories: ['web'],
    icon: 'coffee',
    gradient: ['#d97706', '#f59e0b'],
  },
  {
    slug: 'new-horizon',
    title: 'New Horizon',
    type: 'Published Game',
    role: 'Game Developer',
    description:
      'Designed, programmed, and published the video game "New Horizon" onto the itch.io platform, architecting core gameplay physics, 2D/3D asset pipelines, and immersive level design.',
    features: [
      'C# gameplay programming & state controllers',
      'Published & distributed playable release on itch.io',
    ],
    tags: ['C#', 'Game Engine', 'itch.io', 'Level Design'],
    categories: ['game'],
    icon: 'cube',
    gradient: ['#7c3aed', '#a855f7'],
    link: { href: 'https://itch.io', label: 'itch.io' },
  },
  {
    slug: 'car-price-predictor',
    title: 'Car Price Predictor',
    type: 'Machine Learning',
    role: 'Web Developer & ML Modeler (Jan 2025 – May 2025)',
    description:
      'Collected and cleaned vehicle datasets to train predictive machine learning regression algorithms, and deployed an interactive web application serving instantaneous price predictions.',
    features: [
      'Dataset preprocessing & feature engineering',
      'Web user interface connected to model inference API',
    ],
    tags: ['Python', 'Machine Learning', 'Data Cleaning', 'Web App'],
    categories: ['ml', 'web'],
    icon: 'activity',
    gradient: ['#0284c7', '#06b6d4'],
  },
  {
    slug: 'survival-platform-portfolio',
    title: 'Survival Platform & Portfolio',
    type: 'Game & Web',
    role: 'Developer & Graphic Designer (Aug 2023 – May 2024)',
    description:
      'Authored game background art assets via Adobe Photoshop and programmed real-time gameplay timer mechanics for Survival Platform, paired with personal branding portfolio architecture.',
    features: [
      'Custom Photoshop game assets & UI graphics',
      'Timer mechanics and interactive web showcase',
    ],
    tags: ['Adobe Photoshop', 'Game Logic', 'Web Development'],
    categories: ['game', 'web'],
    icon: 'pen',
    gradient: ['#e11d48', '#f43f5e'],
  },
];
