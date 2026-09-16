import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { timelineEvents } from '../../data/timeline';

export function TimelineSection() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'es') as 'es' | 'en';

  return (
    <Section id="timeline">
      <SectionHeader 
        number="02" 
        title={t('timeline.sectionTitle', 'EVOLUTION.LOG')} 
        subtitle={t('timeline.subtitle', 'No se trata de antigüedad. Se trata de evolución.')}
      />
      <div className="relative border-l border-[var(--color-border)] ml-3 md:ml-0 md:border-l-0">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] -translate-x-1/2" />
        
        <div className="space-y-12">
          {timelineEvents.filter((item) => !item.date.startsWith('TODO')).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pl-8 md:pl-0"
            >
              <div className="absolute left-[-6px] md:left-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] z-10 shadow-[0_0_8px_var(--color-accent)]" />
              
              <div className="md:w-[45%] text-left md:text-right pr-0 md:pr-8 mb-2 md:mb-0">
                <span className="font-mono text-[var(--color-accent)] text-sm">{item.date}</span>
              </div>
              
              <div className="md:w-[45%] pl-0 md:pl-8">
                <h3 className="font-body font-semibold text-[var(--color-text-primary)] text-lg mb-1">
                  {item.title[lang]}
                </h3>
                <p className="font-body text-[var(--color-text-secondary)] mb-3 text-sm leading-relaxed">
                  {item.description[lang]}
                </p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag: string, i: number) => (
                      <span key={i} className="font-mono text-xs border border-[var(--color-border)] rounded-full px-3 py-1 text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default TimelineSection;
