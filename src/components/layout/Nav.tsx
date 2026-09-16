import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { useTheme } from '../../hooks/useTheme';

interface NavProps {
  activeSection: string;
}

export function Nav({ activeSection }: NavProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const visibleItems = navItems.filter(item => ['about', 'projects', 'skills', 'contact'].includes(item.id));

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
      <div className="nav-shell w-full max-w-6xl mx-auto flex items-center justify-between px-3 py-2 rounded-2xl">
        {/* Brand / Logo pill */}
        <button onClick={() => scrollToSection('hero')} className="pointer-events-auto flex items-center gap-2 px-2 cursor-pointer" aria-label="Ir al inicio">
          <span className="brand-mark">N/E</span>
          <span className="hidden sm:block font-mono text-[11px] text-[var(--color-text-muted)]">portfolio.sys</span>
        </button>

        {/* Desktop floating nav bar */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1">
          {visibleItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[var(--color-accent)] bg-[var(--color-bg-tertiary)] font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {t(`nav.${item.id}`)}
              </button>
            );
          })}
        </nav>

        {/* Controls (Theme & Lang) */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-full">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full font-mono text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors cursor-pointer"
              title="Change language"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <div className="w-px h-3 bg-[var(--color-border)]" />
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-20 p-4 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-2xl backdrop-blur-xl flex flex-col gap-2">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-bg-tertiary)] text-left font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <span>{t(`nav.${item.id}`)}</span>
              <span className="text-xs text-[var(--color-accent)]">{item.number}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Nav;
