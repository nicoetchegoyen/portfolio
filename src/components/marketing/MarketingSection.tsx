import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Target, Search, FileText, Share2, Megaphone, Globe, BarChart3, Fingerprint, ExternalLink } from 'lucide-react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { useRelativeMousePosition } from '../../hooks/useRelativeMousePosition';

const capabilityKeys = ['strategy', 'seo', 'content', 'social', 'ads', 'wordpress', 'analytics', 'branding'] as const;

const iconMap = {
  strategy: Target,
  seo: Search,
  content: FileText,
  social: Share2,
  ads: Megaphone,
  wordpress: Globe,
  analytics: BarChart3,
  branding: Fingerprint
};

function CapabilityCard({ id, index }: { id: typeof capabilityKeys[number], index: number }) {
  const { t } = useTranslation();
  const Icon = iconMap[id] || Target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="capability-row border-b border-[var(--color-border)] py-5 flex items-center gap-4"
    >
      <Icon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
      <span className="font-body font-medium text-[var(--color-text-primary)] text-sm">{t(`marketing.capabilities.${id}`)}</span>
    </motion.div>
  );
}

function SoloCaseStudy() {
  const { t } = useTranslation();
  const [ref, mouse] = useRelativeMousePosition();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="spotlight-card group relative border border-[var(--color-accent)]/30 rounded-[28px] p-8 md:p-12 overflow-hidden bg-[var(--color-bg-secondary)] mt-14"
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(16,185,129,0.1), transparent 40%)`
        }}
      />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider mb-2 block">
            {t('projects.caseStudy', 'Case Study')}
          </span>
          <h3 className="text-2xl font-body font-semibold text-[var(--color-text-primary)] mb-2">SOLO Logística</h3>
          <p className="text-[var(--color-text-secondary)] font-body max-w-2xl text-sm leading-relaxed mb-4">
            {t('marketing.intro', 'Trabajo en marketing digital para empresas reales. No es un interés casual — es parte de mi práctica profesional actual.')}
          </p>
          <div className="flex flex-wrap gap-2">
            {['WordPress', 'Elementor', 'SEO', 'Meta Ads', 'Social Media'].map((tag) => (
              <span key={tag} className="font-mono text-xs border border-[var(--color-border)] rounded-full px-3 py-1 text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a 
          href="https://solologistica.com.ar" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-2 border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-lg px-6 py-3 transition-colors shrink-0 font-mono text-sm text-[var(--color-text-primary)]"
        >
          {t('projects.viewLive', 'En vivo')} <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export function MarketingSection() {
  const { t } = useTranslation();

  return (
    <Section id="marketing">
      <SectionHeader 
        number="05"
        title={t('marketing.sectionTitle', 'MARKETING.MODULE')} 
        subtitle={t('marketing.subtitle', 'No es hacer posts. Es construir sistemas de crecimiento.')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 mb-4">
        {capabilityKeys.map((id, index) => (
          <CapabilityCard key={id} id={id} index={index} />
        ))}
      </div>

      <SoloCaseStudy />
    </Section>
  );
}

export default MarketingSection;
