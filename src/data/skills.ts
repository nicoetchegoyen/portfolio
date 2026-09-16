export interface SkillCategory {
  id: string;
  title: { es: string; en: string };
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  status: 'active' | 'learning' | 'familiar';
}

export const skillsCategories: SkillCategory[] = [
  {
    id: 'technologies',
    title: { es: 'Tecnologías', en: 'Technologies' },
    icon: 'Terminal',
    skills: [
      { name: 'Python', status: 'active' },
      { name: 'JavaScript', status: 'active' },
      { name: 'TypeScript', status: 'active' },
      { name: 'React', status: 'active' },
      { name: 'React Native', status: 'learning' },
      { name: 'HTML/CSS', status: 'active' },
      { name: 'Node.js', status: 'familiar' },
      { name: 'Redis', status: 'familiar' },
      { name: 'SQL', status: 'familiar' },
      { name: 'WordPress', status: 'active' },
      { name: 'Git', status: 'active' }
    ]
  },
  {
    id: 'systems',
    title: { es: 'Sistemas', en: 'Systems' },
    icon: 'Cpu',
    skills: [
      { name: 'Arquitectura de Software', status: 'familiar' },
      { name: 'Patrones de Diseño', status: 'familiar' },
      { name: 'APIs REST', status: 'active' },
      { name: 'Bases de Datos', status: 'active' },
      { name: 'Backend', status: 'active' },
      { name: 'Frontend', status: 'active' },
      { name: 'UX/UI', status: 'familiar' }
    ]
  },
  {
    id: 'digital',
    title: { es: 'Digital', en: 'Digital' },
    icon: 'TrendingUp',
    skills: [
      { name: 'SEO', status: 'active' },
      { name: 'Marketing Digital', status: 'active' },
      { name: 'Contenido', status: 'active' },
      { name: 'Redes Sociales', status: 'active' },
      { name: 'Publicidad Digital', status: 'familiar' },
      { name: 'Analytics', status: 'familiar' },
      { name: 'Estrategia', status: 'active' }
    ]
  },
  {
    id: 'ai',
    title: { es: 'IA', en: 'AI' },
    icon: 'Sparkles',
    skills: [
      { name: 'ChatGPT', status: 'active' },
      { name: 'GitHub Copilot', status: 'active' },
      { name: 'Workflows con IA', status: 'active' },
      { name: 'Automatización', status: 'learning' },
      { name: 'Prototipado con IA', status: 'learning' }
    ]
  }
];
