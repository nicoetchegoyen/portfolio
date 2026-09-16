export interface TimelineEvent {
  date: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  tags: string[];
  type: 'education' | 'project' | 'work' | 'milestone';
}

export const timelineEvents: TimelineEvent[] = [
  {
    date: '2023.04',
    title: { es: 'Primer commit en GitHub', en: 'First GitHub commit' },
    description: { es: 'Inicios en programación.', en: 'Beginnings in programming.' },
    tags: ['Python', 'Algoritmos'],
    type: 'milestone'
  },
  {
    date: '2023.11',
    title: { es: 'Proyecto UX/UI', en: 'UX/UI Project' },
    description: { es: 'Diseño de experiencias e interfaces.', en: 'Experience and interface design.' },
    tags: ['UX', 'UI', 'Diseño'],
    type: 'project'
  },
  {
    date: '2024.03',
    title: { es: 'Ingeniería de Software II', en: 'Software Engineering II' },
    description: { es: 'Estudio de patrones de diseño y arquitectura.', en: 'Study of design patterns and architecture.' },
    tags: ['Patrones de diseño', 'Ingeniería'],
    type: 'education'
  },
  {
    date: '2024.06',
    title: { es: 'Primer proyecto backend completo', en: 'First full backend project' },
    description: { es: 'Desarrollo de un backend con APIs.', en: 'Backend development with APIs.' },
    tags: ['Backend', 'Python', 'API'],
    type: 'project'
  },
  {
    date: '2024.08',
    title: { es: 'Salto a JavaScript', en: 'Jump to JavaScript' },
    description: { es: 'Inicios en frontend development.', en: 'Beginnings in frontend development.' },
    tags: ['JavaScript', 'Frontend'],
    type: 'milestone'
  },
  {
    date: '2024.10',
    title: { es: 'Primera SPA con React', en: 'First SPA with React' },
    description: { es: 'Desarrollo de Single Page Applications.', en: 'Development of Single Page Applications.' },
    tags: ['React', 'SPA'],
    type: 'project'
  },
  {
    date: 'TODO',
    title: { es: 'Inicio Lic. Sistemas UADER', en: 'Started Systems Degree UADER' },
    description: { es: 'Estudios de grado en Sistemas.', en: 'Undergraduate studies in Systems.' },
    tags: ['Educación', 'Sistemas'],
    type: 'education'
  },
  {
    date: 'TODO',
    title: { es: 'Inicio Tecnicatura Marketing Digital UTN', en: 'Started Digital Marketing Degree UTN' },
    description: { es: 'Estudios en marketing y estrategias digitales.', en: 'Studies in digital marketing and strategies.' },
    tags: ['Marketing', 'Digital'],
    type: 'education'
  },
  {
    date: 'TODO',
    title: { es: 'Inicio trabajo SOLO Logística', en: 'Started working at SOLO Logística' },
    description: { es: 'Gestión de presencia digital y marketing.', en: 'Digital presence management and marketing.' },
    tags: ['Trabajo', 'Marketing'],
    type: 'work'
  },
  {
    date: '2026.01',
    title: { es: 'Primer sitio web profesional', en: 'First professional website' },
    description: { es: 'Desarrollo de sitio para una posada real.', en: 'Website development for a real accommodation.' },
    tags: ['Web', 'HTML', 'CSS', 'JS'],
    type: 'project'
  },
  {
    date: '2026.04',
    title: { es: 'APIs + Redis + datos geoespaciales', en: 'APIs + Redis + geospatial data' },
    description: { es: 'Desarrollo de API geoespacial.', en: 'Geospatial API development.' },
    tags: ['API', 'Redis', 'Geodata'],
    type: 'project'
  },
  {
    date: '2026.05',
    title: { es: 'E-commerce real en TypeScript', en: 'Real e-commerce in TypeScript' },
    description: { es: 'Desarrollo de plataforma e-commerce.', en: 'E-commerce platform development.' },
    tags: ['E-commerce', 'TypeScript', 'React'],
    type: 'project'
  },
  {
    date: '2026.08',
    title: { es: 'React Native', en: 'React Native' },
    description: { es: 'Incursión en desarrollo mobile.', en: 'Incursion into mobile development.' },
    tags: ['React Native', 'Mobile'],
    type: 'milestone'
  },
  {
    date: '2026.09',
    title: { es: 'App bancaria con autenticación', en: 'Banking app with authentication' },
    description: { es: 'Aplicación mobile con flujos de seguridad.', en: 'Mobile app with security flows.' },
    tags: ['Mobile', 'Auth', 'App'],
    type: 'project'
  }
];
