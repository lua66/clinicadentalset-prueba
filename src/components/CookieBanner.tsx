import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { getStoredCookieConsent, saveCookieConsent } from '../utils/cookieConsent';

interface CookieBannerProps {
  lang: Language;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ lang }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const t = UI_TRANSLATIONS[lang];

  useEffect(() => {
    const existing = getStoredCookieConsent();
    if (existing === null) {
      setVisible(true);
    }

    const handleReopen = () => setVisible(true);
    const handleUpdated = () => setVisible(false);

    window.addEventListener('set-cookie-consent-reopen', handleReopen);
    window.addEventListener('set-cookie-consent-updated', handleUpdated);

    return () => {
      window.removeEventListener('set-cookie-consent-reopen', handleReopen);
      window.removeEventListener('set-cookie-consent-updated', handleUpdated);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label={t.cookieBannerTitle}
      className="fixed bottom-16 lg:bottom-4 inset-x-3 sm:inset-x-6 z-40 max-w-5xl mx-auto pointer-events-auto"
    >
      <div className="bg-[#0B110E]/95 backdrop-blur-md border-2 border-[#83C408] rounded-2xl p-4 sm:px-6 sm:py-4 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-[#F2F7F0]">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#16241B] border border-[#83C408]/40 text-[#83C408] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-[#F5FAF3] leading-snug">
              {t.cookieBannerTitle}
            </h2>
            <p className="text-xs text-[#B9CEBE] mt-0.5 leading-relaxed">
              {t.cookieBannerDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              saveCookieConsent('essential_only');
              setVisible(false);
            }}
            className="px-4 py-2 text-xs font-bold text-[#83C408] bg-[#16231B] hover:bg-[#1D2E24] border border-[#83C408]/60 hover:border-[#83C408] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.cookieEssentialOnly}
          </button>

          <button
            type="button"
            onClick={() => {
              saveCookieConsent('accepted');
              setVisible(false);
            }}
            className="px-4 py-2 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.cookieAcceptAll}
          </button>
        </div>
      </div>
    </aside>
  );
};
