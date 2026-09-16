import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Terminal, TrendingUp, Palette, Sparkles } from 'lucide-react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { useRelativeMousePosition } from '../../hooks/useRelativeMousePosition';

const modulesList = [
  { id: 'systems', icon: Terminal },
  { id: 'marketing', icon: TrendingUp },
  { id: 'creative', icon: Palette },
  { id: 'ai', icon: Sparkles },
];

function ModuleCard({ id, Icon, index }: { id: string, Icon: React.ElementType, index: number }) {
  const { t } = useTranslation();
  const [ref, mouse] = useRelativeMousePosition();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="spotlight-card group relative border border-[var(--color-border)] rounded-lg p-6 overflow-hidden bg-[var(--color-bg-secondary)]"
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(16,185,129,0.1), transparent 40%)`
        }}
      />
      <div className="relative z-10">
        <Icon className="w-8 h-8 text-[var(--color-accent)] mb-4" />
        <h3 className="font-mono text-[var(--color-accent)] mb-2">{t(`about.modules.${id}.title`)}</h3>
        <p className="text-[var(--color-text-secondary)] font-body text-sm leading-relaxed">
          {t(`about.modules.${id}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <Section id="about">
      <SectionHeader 
        number="01" 
        title={t('about.sectionTitle', 'ABOUT.PROFILE')} 
      />
      <div className="space-y-12">
        <div className="space-y-6 text-[var(--color-text-secondary)] text-lg max-w-3xl font-body">
          <p>{t('about.intro')}</p>
          <p>{t('about.introSecond')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modulesList.map((mod, index) => (
            <ModuleCard key={mod.id} id={mod.id} Icon={mod.icon} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default AboutSection;
