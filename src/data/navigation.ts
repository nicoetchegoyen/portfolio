export interface NavItem {
  id: string;
  number: string;
  label: { es: string; en: string };
}

export const navigationItems: NavItem[] = [
  { id: 'hero', number: '00', label: { es: 'system.init', en: 'system.init' } },
  { id: 'about', number: '01', label: { es: 'about.profile', en: 'about.profile' } },
  { id: 'timeline', number: '02', label: { es: 'evolution.log', en: 'evolution.log' } },
  { id: 'projects', number: '03', label: { es: 'projects.index', en: 'projects.index' } },
  { id: 'game', number: '04', label: { es: 'node.shift', en: 'node.shift' } },
  { id: 'marketing', number: '05', label: { es: 'marketing.module', en: 'marketing.module' } },
  { id: 'ai', number: '06', label: { es: 'ai.toolkit', en: 'ai.toolkit' } },
  { id: 'skills', number: '07', label: { es: 'skills.map', en: 'skills.map' } },
  { id: 'currently', number: '08', label: { es: 'status.current', en: 'status.current' } },
  { id: 'contact', number: '09', label: { es: 'connect.init', en: 'connect.init' } }
];

export const navItems = navigationItems;

