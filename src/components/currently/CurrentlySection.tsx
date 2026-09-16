import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';

const itemKeys = ['studying', 'working', 'learning', 'building', 'exploring'] as const;

export function CurrentlySection() {
  const { t } = useTranslation();

  return (
    <Section id="currently">
      <SectionHeader 
        number="07" 
        title={t('currently.sectionTitle', 'STATUS.CURRENT')} 
        subtitle={t('currently.subtitle', 'Qué estoy haciendo ahora.')}
      />
      
      <div className="border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] p-6">
        <div className="flex flex-col space-y-4">
          {itemKeys.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 ${
                index !== itemKeys.length - 1 ? 'pb-4 border-b border-[var(--color-border)]' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-[140px]">
                <span className="text-[var(--color-text-secondary)]">→</span>
                <span className="font-mono text-[var(--color-accent)] uppercase text-sm">
                  {t(`currently.items.${item}.label`)}
                </span>
              </div>
              <p className="text-[var(--color-text-secondary)] font-body text-sm sm:text-base">
                {t(`currently.items.${item}.value`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default CurrentlySection;
