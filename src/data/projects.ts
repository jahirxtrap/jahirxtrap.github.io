export interface ProjectBadge {
  textKey: string;
  href?: string;
  icon?: 'ExternalLink' | 'Lock';
  accent?: boolean;
}

export interface Project {
  id: string;
  title: string;
  titleIsKey?: boolean;
  descKey: string;
  icon: 'Blocks' | 'Code2' | 'Smartphone' | 'Bot' | 'KeyRound';
  href?: string;
  ctaKey?: string;
  badges?: ProjectBadge[];
}

export const projects: Project[] = [
  {
    id: 'minecraft',
    title: 'home.minecraft',
    titleIsKey: true,
    descKey: 'home.minecraft_desc',
    icon: 'Blocks',
    href: '/minecraft-mods',
    ctaKey: 'home.view_all',
  },
  {
    id: 'libraries',
    title: 'home.libraries',
    titleIsKey: true,
    descKey: 'home.libraries_desc',
    icon: 'Code2',
    href: '/maven-libraries',
    ctaKey: 'home.view_all',
  },
  {
    id: 'android',
    title: 'home.android',
    titleIsKey: true,
    descKey: 'home.android_desc',
    icon: 'Smartphone',
    href: 'https://play.google.com/store/apps/developer?id=jahirtrap',
    ctaKey: 'home.play_store',
  },
  {
    id: 'sudial',
    title: 'Sudial',
    descKey: 'home.sudial_desc',
    icon: 'Bot',
    badges: [
      {textKey: 'home.private', icon: 'Lock', accent: true},
      {textKey: 'home.website', href: 'https://sudial.com/', icon: 'ExternalLink'},
      {textKey: 'home.play_store', href: 'https://play.google.com/store/apps/details?id=com.sudial', icon: 'ExternalLink'},
      {textKey: 'home.app_store', href: 'https://apps.apple.com/app/sudial/id6759458373', icon: 'ExternalLink'},
    ],
  },
  {
    id: 'otp',
    title: 'OTP Cuentas',
    descKey: 'home.otp_desc',
    icon: 'KeyRound',
    badges: [
      {textKey: 'home.private', icon: 'Lock', accent: true},
    ],
  },
];
