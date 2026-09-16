import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { skillsCategories } from '../../data/skills';
import { Terminal, Cpu, TrendingUp, Sparkles, Code } from 'lucide-react';

const iconComponents: Record<string, React.ElementType> = {
  Terminal,
  Cpu,
  TrendingUp,
  Sparkles
};

export function SkillsSection() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'es') as 'es' | 'en';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)]';
      case 'learning': return 'bg-[var(--color-node)] shadow-[0_0_6px_var(--color-node)]';
      case 'familiar': return 'bg-[var(--color-text-muted)]';
      default: return 'bg-[var(--color-text-secondary)]';
    }
  };

  return (
    <Section id="skills">
      <SectionHeader 
        number="06" 
        title={t('skills.sectionTitle', 'SKILLS.MAP')} 
        subtitle={t('skills.subtitle', 'Sin porcentajes arbitrarios. Skills reales con contexto.')}
      />
      
      <div className="space-y-12">
        {skillsCategories.map((category, index) => {
          const Icon = iconComponents[category.icon] || Code;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                <h3 className="font-body font-semibold text-lg text-[var(--color-text-primary)]">
                  {category.title[lang]}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 font-mono text-xs border border-[var(--color-border)] rounded-full px-3 py-1.5 bg-[var(--color-bg-secondary)]"
                  >
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(skill.status)}`} />
                    <span className="text-[var(--color-text-secondary)]">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default SkillsSection;
