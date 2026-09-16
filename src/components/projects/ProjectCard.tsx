import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GithubIcon } from '../ui/Icons';
import { useRelativeMousePosition } from '../../hooks/useRelativeMousePosition';
import type { Project } from '../../data/projects';

export function ProjectCard({ project, index }: { project: Project, index: number }) {
  const { t, i18n } = useTranslation();
  const [ref, mouse] = useRelativeMousePosition();
  const lang = (i18n.language === 'en' ? 'en' : 'es') as 'es' | 'en';

  return (
    <motion.div
      layout
      exit={{ opacity: 0, scale: 0.97 }}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`project-card spotlight-card group relative border border-[var(--color-border)] rounded-[24px] p-7 sm:p-9 bg-[var(--color-bg-secondary)] overflow-hidden ${project.featured ? 'lg:col-span-2 featured-project' : ''}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(16,185,129,0.1), transparent 40%)`
        }}
      />
      <div className="relative z-10 h-full min-h-[270px] flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)]">0{index + 1} · {project.category}</span>
            <h3 className="project-title font-display font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)] mt-3">{project.title}</h3>
          </div>
          {project.isCaseStudy && (
            <span className="font-mono text-xs bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-accent)]/30 px-2 py-1 rounded">
              {t('projects.caseStudy', 'Case Study')}
            </span>
          )}
        </div>
        
        <p className="text-[var(--color-text-secondary)] mb-8 flex-grow text-base font-body max-w-2xl leading-relaxed">
          {project.description[lang]}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-7">
          {project.technologies?.map((tech: string, i: number) => (
            <span key={i} className="font-mono text-[11px] border border-[var(--color-border)] rounded-full px-3 py-1.5 text-[var(--color-text-secondary)]">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-5 mt-auto pt-5 border-t border-[var(--color-border)]">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-2 text-sm font-mono">
              <GithubIcon className="w-4 h-4" /> {t('projects.viewCode', 'Código')} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 text-sm font-mono">
              <ExternalLink className="w-4 h-4" /> {t('projects.viewLive', 'En vivo')} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
