import React, { useEffect, useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { getStoredCookieConsent, saveCookieConsent } from '../utils/cookieConsent';

interface CookieBannerProps {
  lang: Language;
  onOpenPrivacyPolicy?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  lang,
  onOpenPrivacyPolicy,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
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
      <div className="bg-[#0B110E]/95 backdrop-blur-md border-2 border-[#83C408] rounded-2xl p-4 sm:px-6 sm:py-4 shadow-2xl flex flex-col gap-3 text-[#F2F7F0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

              <div className="mt-1.5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowDetails((prev) => !prev)}
                  aria-expanded={showDetails}
                  className="inline-flex items-center min-h-[44px] py-1 gap-1 text-xs font-bold text-[#83C408] hover:underline cursor-pointer"
                >
                  <span>{showDetails ? t.cookieDetailsHide : t.cookieDetailsToggle}</span>
                  {showDetails ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {onOpenPrivacyPolicy && (
                  <button
                    type="button"
                    onClick={() => {
                      setVisible(false);
                      onOpenPrivacyPolicy();
                    }}
                    className="inline-flex items-center min-h-[44px] py-1 text-xs font-semibold text-[#B9CEBE] hover:text-[#83C408] hover:underline cursor-pointer"
                  >
                    {t.privacyPolicy} · {t.cookiePolicy}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                saveCookieConsent('essential_only');
                setVisible(false);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] border-2 border-[#83C408] rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5FAF3]"
            >
              {t.cookieEssentialOnly}
            </button>

            <button
              type="button"
              onClick={() => {
                saveCookieConsent('accepted');
                setVisible(false);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] border-2 border-[#83C408] rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5FAF3]"
            >
              {t.cookieAcceptAll}
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="pt-3 border-t border-[#1D2D22] grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-[#B9CEBE]">
            <div className="p-2.5 rounded-lg bg-[#101914] border border-[#1F3125]">
              {t.cookieDetailsEssential}
            </div>
            <div className="p-2.5 rounded-lg bg-[#101914] border border-[#1F3125]">
              {t.cookieDetailsAnalytics}
            </div>
            <div className="p-2.5 rounded-lg bg-[#101914] border border-[#1F3125]">
              {t.cookieDetailsMaps}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

