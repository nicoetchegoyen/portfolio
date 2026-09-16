export interface Project {
  id: string;
  title: string;
  year: number;
  category: 'dev' | 'marketing' | 'web' | 'mobile' | 'ai';
  technologies: string[];
  description: { es: string; en: string };
  problem?: { es: string; en: string };
  solution?: { es: string; en: string };
  learning?: { es: string; en: string };
  githubUrl?: string;
  liveUrl?: string;
  isCaseStudy?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "solo-logistica",
    title: "SOLO Logística Digital Growth",
    year: 2024,
    category: 'marketing',
    featured: true,
    isCaseStudy: true,
    technologies: ["WordPress", "Elementor", "SEO", "RankMath", "Meta Ads", "Google Search Console"],
    description: {
      es: "Construcción y gestión completa de la presencia digital de una empresa de logística internacional Argentina-Uruguay",
      en: "End-to-end digital presence management for an international logistics company between Argentina and Uruguay"
    },
    liveUrl: "https://solologistica.com.ar"
  },
  {
    id: "233mxshop",
    title: "233mxshop",
    year: 2026,
    category: 'dev',
    featured: true,
    technologies: ["TypeScript", "React"],
    description: {
      es: "E-commerce completo desarrollado en TypeScript para un negocio real",
      en: "Full e-commerce platform built with TypeScript for a real business"
    },
    githubUrl: "https://github.com/nicoetchegoyen/233mxshop"
  },
  {
    id: "tp3ibankauthapp",
    title: "tp3iBankAuthApp",
    year: 2026,
    category: 'mobile',
    featured: true,
    technologies: ["React Native", "TypeScript", "Authentication", "Expo"],
    description: {
      es: "Aplicación bancaria móvil con flujo de autenticación completo en React Native",
      en: "Mobile banking app with complete authentication flow built in React Native"
    },
    githubUrl: "https://github.com/nicoetchegoyen/tp3iBankAuthApp"
  },
  {
    id: "posada",
    title: "posada",
    year: 2026,
    category: 'web',
    featured: true,
    technologies: ["HTML", "CSS", "JavaScript"],
    description: {
      es: "Sitio web profesional diseñado y desarrollado para una posada/alojamiento real",
      en: "Professional website designed and developed for a real accommodation business"
    },
    githubUrl: "https://github.com/nicoetchegoyen/posada"
  },
  {
    id: "tp2-flujo-checkout",
    title: "TP2 Flujo Checkout",
    year: 2026,
    category: 'mobile',
    technologies: ["React Native", "TypeScript", "Expo"],
    description: {
      es: "Flujo de checkout completo para una tienda mobile con gestión de carrito y pagos",
      en: "Complete checkout flow for a mobile store with cart management and payments"
    },
    githubUrl: "https://github.com/nicoetchegoyen/TP2---Flujo-checkout-tienda"
  },
  {
    id: "tp3-georedisapi",
    title: "tp3_georedisapi",
    year: 2026,
    category: 'dev',
    technologies: ["Python", "Redis", "HTML", "API REST", "Geolocation"],
    description: {
      es: "API geoespacial con Redis para búsqueda y procesamiento de datos de ubicación",
      en: "Geospatial API with Redis for location data search and processing"
    },
    githubUrl: "https://github.com/nicoetchegoyen/tp3_georedisapi"
  },
  {
    id: "proyectobackend2024",
    title: "ProyectoBackend2024",
    year: 2024,
    category: 'dev',
    technologies: ["Python", "Backend", "API"],
    description: {
      es: "Proyecto backend completo con arquitectura de servicios y API",
      en: "Complete backend project with service architecture and API"
    },
    githubUrl: "https://github.com/nicoetchegoyen/ProyectoBackend2024"
  }
];
