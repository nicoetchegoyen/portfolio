import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import NodeGraphMini from './NodeGraphMini';

const StatusIndicator = () => {
  const { t } = useTranslation();
  return (
    <div className="hero-status inline-flex items-center gap-3 text-xs font-mono text-[var(--color-text-secondary)] mb-8">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
      </span>
      <span>{t('hero.status', 'system.online — building')}</span><span className="text-[var(--color-text-muted)]">ARG / 2026</span>
    </div>
  );
};

export const HeroSection = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-shell min-h-screen flex flex-col justify-center pt-28 pb-12 px-5 sm:px-8 relative max-w-6xl mx-auto w-full">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-end"
      >
        {/* Left Column: Typography & Bio */}
        <div className="lg:col-span-8 flex flex-col items-start relative z-10">
          <motion.div variants={itemVariants}>
            <StatusIndicator />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-7 w-full">
            <p className="hero-kicker font-mono uppercase mb-4">Creative developer · Digital strategist</p>
            <h1 className="hero-title font-display font-bold text-[var(--color-text-primary)]">
              Nicolás
              <span className="hero-title-outline">Etchegoyen</span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-copy font-body text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mb-5 leading-relaxed">
            {t('hero.subtitle', 'Estudiante de Sistemas construyendo en la intersección de tecnología, marketing e IA.')}
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-active)]" />
            <span>{t('hero.location', 'Argentina · UADER · Lic. en Sistemas')}</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mt-2">
            <button onClick={scrollToProjects} className="primary-cta inline-flex items-center gap-3 px-5 py-3 rounded-full font-mono text-sm cursor-pointer">
              {t('hero.cta', 'Explorar proyectos')} <ArrowUpRight className="w-4 h-4" />
            </button>
            <a 
              href="https://github.com/nicoetchegoyen" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ghost-cta inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-mono"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--color-text-muted)]" />
            </a>
            
          </motion.div>
        </div>

        {/* Right Column: Node Graph Interactive Widget */}
        <motion.div variants={itemVariants} className="lg:col-span-4 w-full lg:mb-2">
          <div className="graph-card relative rounded-[28px] p-px">
            <div className="rounded-[27px] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/60" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                </div>
                <span className="font-mono text-[11px] text-[var(--color-text-muted)] tracking-wider">EXPERTISE.MAP</span>
              </div>
              
              <div className="w-full h-[260px] sm:h-[300px] relative">
                <NodeGraphMini />
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                <span>nodes: 5</span>
                <span className="text-[var(--color-accent)] flex items-center gap-1"><Sparkles className="w-3 h-3" /> live</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer self-start" 
        onClick={scrollToProjects}
      >
        <span className="text-xs font-mono tracking-wider uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
