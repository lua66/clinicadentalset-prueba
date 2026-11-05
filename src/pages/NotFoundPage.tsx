import React from 'react';
import { Home, ArrowRight, MessageCircle, Compass } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { buildLocalizedPath } from '../utils/routing';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { trackCrmLead } from '../utils/crmTracker';
import { DentalSphere } from '../components/DentalSphere';

interface NotFoundPageProps {
  lang: Language;
  requestedPath: string;
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  lang,
  requestedPath,
  onNavigate,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const homeUrl = buildLocalizedPath('/', lang);
  const specialtiesUrl = buildLocalizedPath('/especialidades', lang);

  return (
    <section className="py-16 sm:py-24 bg-[#080C0A] border-b border-[#1D2D22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#101914] border border-[#1F3125] rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#83C408]">
              <Compass className="w-4 h-4 shrink-0" />
              <span>{t.notFoundEyebrow}</span>
            </div>

            <div className="font-display text-5xl sm:text-7xl text-[#83C408] tabular-nums leading-none">
              404
            </div>

            <h1
              className="text-2xl sm:text-4xl text-[#F5FAF3] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.notFoundTitle}
            </h1>

            <p className="text-sm sm:text-base text-[#B9CEBE] max-w-2xl leading-relaxed">
              {t.notFoundSubtitle}
            </p>

            {requestedPath && requestedPath !== '/404' && requestedPath !== `/${lang}/404` && (
              <p className="text-xs font-mono text-[#9AB39E] bg-[#080C0A] border border-[#1D2D22] px-3 py-2 rounded-lg inline-block">
                {requestedPath}
              </p>
            )}

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={homeUrl}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(homeUrl);
                }}
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-6 py-3 text-xs sm:text-sm font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>{t.notFoundHomeBtn}</span>
              </a>

              <a
                href={specialtiesUrl}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(specialtiesUrl);
                }}
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#83C408] bg-[#16231B] hover:bg-[#1D2E24] border border-[#83C408]/60 hover:border-[#83C408] rounded-xl transition-colors cursor-pointer"
              >
                <span>{t.notFoundSpecialtiesBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={buildWhatsAppUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCrmLead({
                    type: 'whatsapp',
                    treatment: 'Consulta desde Página 404',
                    sourcePage: 'Página 404',
                    sourceUrl: requestedPath,
                  });
                }}
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#83C408] bg-[#080C0A] hover:bg-[#142019] border border-[#1F3125] hover:border-[#83C408] rounded-xl transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.notFoundContactBtn}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
            <DentalSphere mode="page" />
          </div>
        </div>
      </div>
    </section>
  );
};
