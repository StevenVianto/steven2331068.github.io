/**
 * Site-wide identity, contact and navigation.
 * Single source of truth for everything that appears in more than one component.
 */

export const site = {
  url: 'https://steven2331068.github.io',
  name: 'Steven Valiant V.',
  initials: 'SV',
  title: 'Mobile, Full-Stack Web & Game Developer',
  tagline: 'Hi, I\'m',
  displayName: 'STEVEN VALIANT V.',
  description:
    "Personal Portfolio of Steven Valiant V. — Mobile Developer (Flutter), Full-Stack Web Developer (React, Laravel), and Game Developer based in Batam City.",
  keywords:
    'Steven Valiant, Mobile Developer, Flutter, Full-Stack, React, Laravel, Game Developer, UIB Batam',
  status: 'Available for Opportunities & Projects',
  heroDescription:
    "Versatile and open-minded Software, Mobile, and Game Developer pursuing a Bachelor's degree in Information Systems at Universitas Internasional Batam. Experienced in end-to-end cross-platform mobile development (Flutter), modern full-stack web development (React, Laravel), and game development (C#, Python). Proven track record of delivering impactful digital solutions through an intensive 6-month internship at Infinite Learning Indonesia and multiple published projects.",
  location: 'Monde Bay Residences, Batam City',
  email: 'stevenvianto@gmail.com',
  phoneDisplay: '+62-811-7004-788',
  /** Digits only, for tel: and wa.me links. */
  phoneRaw: '+628117004788',
  whatsapp: 'https://wa.me/628117004788',
  /** Lives in /public so it ships untouched to the Pages root. */
  resumeUrl: '/docs/Resume-Steven-Valiant-V.pdf',
  formEndpoint: 'https://formspree.io/f/mgeglzwr',
  copyright: '© 2025 – 2026 Steven Valiant V. All rights reserved. • Batam City',
} as const;

/** Roles cycled by the hero typewriter. */
export const roles = [
  'Mobile Developer (Flutter)',
  'Full-Stack Web Developer (React & Laravel)',
  'Game Developer (C# & Python)',
] as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/StevenVianto', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/steven-valiant-vianto-551b50288',
    icon: 'linkedin',
  },
  { label: 'Instagram', href: 'https://www.instagram.com/stevenvianto/', icon: 'instagram' },
];

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#skills' },
  { label: 'Education & Certs', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

/** Hero stat ribbon. */
export type Stat = { value: string; label: string; icon: string };

export const stats: Stat[] = [
  { value: '6 Mo', label: 'Mobile Dev Internship', icon: 'clock' },
  { value: '6+', label: 'Published & Real Projects', icon: 'folder' },
  { value: '4', label: 'Industry Certifications', icon: 'star' },
  { value: '3', label: 'Languages (ID, EN, CN)', icon: 'globe' },
];

/** Floating pills around the hero portrait. */
export type HeroBadge = {
  eyebrow: string;
  value: string;
  icon: string;
  accent: string;
  position: 'top-left' | 'bottom-right';
};

export const heroBadges: HeroBadge[] = [
  {
    eyebrow: 'Mobile & Web',
    value: 'Flutter & React',
    icon: 'layers',
    accent: '#38bdf8',
    position: 'top-left',
  },
  {
    eyebrow: 'Game Dev',
    value: 'C# • itch.io',
    icon: 'gamepad',
    accent: '#a855f7',
    position: 'bottom-right',
  },
];

/** Contact methods shown in the contact card. */
export type ContactMethod = {
  label: string;
  value: string;
  href?: string;
  icon: string;
  /** When set, renders a copy-to-clipboard button. */
  copy?: string;
};

export const contactMethods: ContactMethod[] = [
  {
    label: 'Direct Phone / WhatsApp',
    value: site.phoneDisplay,
    href: site.whatsapp,
    icon: 'phone',
    copy: site.phoneRaw,
  },
  {
    label: 'Email Address',
    value: site.email,
    href: `mailto:${site.email}`,
    icon: 'mail',
    copy: site.email,
  },
  {
    label: 'Residence & Campus',
    value: site.location,
    icon: 'location',
  },
];
