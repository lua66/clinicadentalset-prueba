import React from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { SPECIALTIES, CLINIC_CONTACT } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';
import { sendGa4ContactLead, sendGa4Event } from '../utils/googleAnalytics';
import { DentalSphere } from './DentalSphere';
import { buildLocalizedPath } from '../utils/routing';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface SpecialtiesGridProps {
  lang: Language;
  onSelectSpecialty: (slug: string) => void;
  showHeader?: boolean;
  showSphere?: boolean;
}

export const SpecialtiesGrid: React.FC<SpecialtiesGridProps> = ({
  lang,
  onSelectSpecialty,
  showHeader = true,
  showSphere = false,
}) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <section
      id="especialidades"
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-[#080C0A] border-b border-[#1D2D22] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex items-center justify-between gap-6 mb-12">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Clínica Dental SET · Poblenou</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-[#F5FAF3]"
                style={{ textWrap: 'balance' }}
              >
                {t.specialtiesHeading}
              </h2>
              <p className="mt-3 text-sm text-[#B9CEBE] max-w-2xl">
                {t.specialtiesSubtitle}
              </p>
            </div>

            {showSphere && (
              <div className="shrink-0">
                <DentalSphere mode="page" />
              </div>
            )}
          </div>
        )}

        {/* Bento Grid of 8 Specialties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALTIES.map((spec) => {
            const specHref = buildLocalizedPath(`/especialidades/${spec.slug}`, lang);
            return (
              <article
                key={spec.id}
                className="group bg-[#101914] border border-[#1F3125] rounded-2xl overflow-hidden hover:border-[#83C408] shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#142019]">
                    <img
                      src={spec.image}
                      alt={spec.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-2.5 left-3 text-[11px] font-bold text-[#83C408] tracking-wide uppercase">
                      {spec.badge[lang]}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg text-[#F5FAF3] group-hover:text-[#83C408] transition-colors leading-snug">
                      {spec.title[lang]}
                    </h3>

                    <p className="mt-2 text-xs text-[#B9CEBE] line-clamp-3 leading-relaxed">
                      {spec.shortDescription[lang]}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#1D2D22] space-y-1.5">
                      {spec.features[lang].slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#9AB39E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Crawlable Action Link + WhatsApp Lead Tracking in #83C408 */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <a
                    href={specHref}
                    onClick={(e) => {
                      e.preventDefault();
                      sendGa4Event('select_content', {
                        content_type: 'dental_specialty',
                        item_id: spec.slug,
                        item_name: spec.title[lang],
                        language: lang,
                      });
                      onSelectSpecialty(spec.slug);
                    }}
                    className="flex-1 min-h-[44px] py-2.5 px-3 text-xs font-bold text-[#83C408] bg-[#16231B] hover:bg-[#1D2E24] border border-[#83C408]/60 hover:border-[#83C408] rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t.viewSpecialtyDetails}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={buildWhatsAppUrl(lang, {
                      intent: 'specialty',
                      specialtyName: spec.title[lang],
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackCrmLead({
                        type: 'whatsapp',
                        treatment: spec.title[lang],
                        sourcePage: `Catálogo de Especialidades: ${spec.title[lang]}`,
                        sourceUrl: specHref,
                      });
                      sendGa4ContactLead({
                        channel: 'whatsapp',
                        treatment: spec.title[lang],
                        uiLocation: 'Specialties Grid Card',
                        lang,
                        pagePath: specHref,
                      });
                    }}
                    className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-lg shadow-xs transition-colors cursor-pointer"
                    title="WhatsApp"
                    aria-label={`WhatsApp · ${spec.title[lang]}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
