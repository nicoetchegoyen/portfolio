import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <Section id="contact">
      <SectionHeader number="08" title={t('contact.sectionTitle', 'CONNECT.INIT')} />
      
      <div className="contact-panel py-16 md:py-24 px-6 flex flex-col items-center text-center rounded-[32px] border border-[var(--color-border)] overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-6 block">Available for ideas with ambition</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-6">
            {t('contact.headline', 'Construyamos algo.')}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mb-12">
            {t('contact.description', 'Si tenés un proyecto, una idea o una oportunidad — hablemos.')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://github.com/nicoetchegoyen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="primary-cta flex items-center justify-center gap-3 w-full sm:w-auto rounded-full px-6 py-3"
            >
              <GithubIcon className="w-5 h-5" />
              <span className="font-mono text-sm">{t('contact.github', 'GitHub')}</span><ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

export default ContactSection;
