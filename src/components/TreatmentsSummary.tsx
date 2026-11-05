import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { SPECIALTIES } from '../data/clinicData';
import { buildLocalizedPath } from '../utils/routing';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface TreatmentsSummaryProps {
  lang: Language;
  onSelectSpecialty: (slug: string) => void;
  onViewAll: () => void;
}

export const TreatmentsSummary: React.FC<TreatmentsSummaryProps> = ({
  lang,
  onSelectSpecialty,
  onViewAll,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const allHref = buildLocalizedPath('/especialidades', lang);

  return (
    <section className="py-14 sm:py-16 bg-[#0B110E] border-b border-[#1D2D22] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#83C408]" />
              <span>Clínica Dental SET · Poblenou</span>
            </div>
            <h2 className="text-2xl sm:text-3xl text-[#F5FAF3]">
              {t.specialtiesHeading}
            </h2>
          </div>

          <a
            href={allHref}
            onClick={(e) => {
              e.preventDefault();
              onViewAll();
            }}
            className="inline-flex items-center min-h-[44px] gap-2 px-4 py-2.5 rounded-lg text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{t.allSpecialties}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Crawlable Grid of Specialty Pillar Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {SPECIALTIES.map((spec) => {
            const specHref = buildLocalizedPath(`/especialidades/${spec.slug}`, lang);
            return (
              <a
                key={spec.id}
                href={specHref}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectSpecialty(spec.slug);
                }}
                className="group p-4 rounded-xl bg-[#101914] hover:bg-[#15221A] border border-[#1F3125] hover:border-[#83C408] shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#83C408] uppercase tracking-wider block mb-1">
                    {spec.badge[lang]}
                  </span>
                  <h3 className="text-base text-[#F5FAF3] group-hover:text-[#83C408] transition-colors leading-snug">
                    {spec.title[lang]}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1D2D22] flex items-center justify-between text-xs font-bold text-[#83C408]">
                  <span>{t.viewSpecialtyDetails}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
