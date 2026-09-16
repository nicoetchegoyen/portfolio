import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { projects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

const tabs = ['all', 'dev', 'marketing', 'web', 'mobile'] as const;

export function ProjectsSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter((p) => p.category === activeFilter);

  return (
    <Section id="projects">
      <SectionHeader 
        number="03" 
        title={t('projects.sectionTitle', 'PROJECTS.INDEX')} 
        subtitle={t('projects.subtitle', 'Lo que construyo.')}
      />
      
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={t('projects.sectionTitle')}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`font-mono text-sm px-4 py-2 rounded-full border transition-all cursor-pointer ${
              activeFilter === tab 
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-glow)]' 
                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-active)]'
            }`}
          >
            {t(`projects.filters.${tab}`, tab)}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

export default ProjectsSection;
