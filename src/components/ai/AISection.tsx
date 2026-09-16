import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Code2, Search, PenTool, Palette, TrendingUp, Wrench } from 'lucide-react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';

const workflowKeys = ['programming', 'research', 'content', 'design', 'marketing_ai', 'portfolio'] as const;

const iconMap = {
  programming: Code2,
  research: Search,
  content: PenTool,
  design: Palette,
  marketing_ai: TrendingUp,
  portfolio: Wrench
};

export function AISection() {
  const { t } = useTranslation();

  return (
    <Section id="ai">
      <SectionHeader 
        number="05" 
        title={t('ai.sectionTitle', 'AI.TOOLKIT')} 
        subtitle={t('ai.subtitle', 'No construyo modelos de IA. Uso IA para construir mejor.')}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="ai-statement mb-16 md:mb-20 border-l border-[var(--color-accent)] pl-6 md:pl-10 py-3 max-w-5xl"
      >
        <p className="text-2xl md:text-4xl text-[var(--color-text-secondary)] font-body leading-tight tracking-tight">
          "{t('ai.intro', 'La inteligencia artificial no es una moda en mi workflow — es una herramienta de trabajo diaria que potencia mis procesos creativos y técnicos.')}"
        </p>
      </motion.div>

      <div className="ai-workflows border-t border-[var(--color-border)]">
        {workflowKeys.map((id, index) => {
          const Icon = iconMap[id];
          const isPortfolio = id === 'portfolio';
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`ai-workflow group relative grid grid-cols-[44px_1fr] md:grid-cols-[64px_220px_1fr] items-start md:items-center gap-4 md:gap-8 py-7 md:py-9 border-b border-[var(--color-border)] ${isPortfolio ? 'text-[var(--color-accent)]' : ''}`}
            >
              <div className="ai-icon grid place-items-center w-11 h-11 rounded-full border border-[var(--color-border)]"><Icon className={`w-5 h-5 ${isPortfolio ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`} /></div>
              <h3 className="font-display font-semibold text-xl md:text-2xl text-[var(--color-text-primary)]">
                {t(`ai.workflows.${id}.title`)}
              </h3>
              <p className="col-start-2 md:col-start-auto text-base text-[var(--color-text-secondary)] font-body leading-relaxed md:text-right">
                {t(`ai.workflows.${id}.description`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default AISection;
