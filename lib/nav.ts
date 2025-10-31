export type NavLink = {
  label: string;
  href: string;
  enabled?: boolean;
};

export const MAIN_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Signature Services', href: '/#signature-services' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Technology', href: '/#technology' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Contact', href: '/contact' },
];

export const TREATMENTS: NavLink[] = [
  { label: 'Composite Bonding', href: '/treatments/composite-bonding', enabled: true },
  { label: 'Porcelain Veneers', href: '/treatments/veneers', enabled: true },
  { label: 'Teeth Whitening', href: '/treatments/whitening', enabled: true },
  { label: 'Dental Implants', href: '/treatments/dental-implants', enabled: true },
  { label: 'General Dentistry', href: '/treatments/general', enabled: true },
  { label: 'Cosmetic Dentistry', href: '/treatments/cosmetic', enabled: true },
  { label: '3D Dentistry', href: '/treatments/3d-dentistry', enabled: true },
  { label: 'Orthodontics', href: '/treatments/orthodontics', enabled: true },
  { label: 'Technology', href: '/treatments/technology', enabled: true },
];

export const RESOURCES: NavLink[] = [
  { label: 'Patient Stories', href: '/stories', enabled: true },
  { label: 'AI Smile Quiz', href: '/ai-smile-quiz', enabled: true },
  { label: 'Blog', href: '/blog', enabled: true },
];

export const PREVIEW_NAV: NavLink[] = [
  { label: 'Tech Strip (locked)', href: '/preview/tech-strip-locked', enabled: true },
];
