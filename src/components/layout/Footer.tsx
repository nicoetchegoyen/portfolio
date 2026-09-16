import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full py-8 border-t border-[var(--color-border)] mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <span className="brand-mark">N/E</span>
        <p className="font-mono text-xs text-[var(--color-text-muted)] text-center">
          {t('footer.text', 'Diseñado y construido por Nicolás Etchegoyen · 2026')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
