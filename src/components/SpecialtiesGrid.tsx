import React from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { SPECIALTIES, CLINIC_CONTACT } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';
import { DentalSphere } from './DentalSphere';

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
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-white dark:bg-[#08120c] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex items-center justify-between gap-6 mb-14">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Tratamientos Odontológicos Integrales</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                {t.specialtiesHeading}
              </h2>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
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
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.id}
              className="group bg-stone-50 dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl overflow-hidden hover:border-[#83C408] dark:hover:border-[#83C408] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={spec.image}
                    alt={spec.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  
                  {/* Badge in Brand Green */}
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-bold text-[#83C408] tracking-wide uppercase">
                    {spec.badge[lang]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-[#83C408] transition-colors leading-tight">
                    {spec.title[lang]}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {spec.shortDescription[lang]}
                  </p>

                  {/* Bullet features */}
                  <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-emerald-950/80 space-y-1.5">
                    {spec.features[lang].slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                        <CheckCircle2 className="w-3 h-3 text-[#83C408] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onSelectSpecialty(spec.slug)}
                  className="flex-1 py-2 px-3 text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-[#122418] hover:bg-stone-100 dark:hover:bg-emerald-950/80 border border-stone-200 dark:border-emerald-900/60 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Ver página completa</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20consultar%20sobre%20${encodeURIComponent(spec.title[lang])}%20en%20Cl%C3%ADnica%20Dental%20SET.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackCrmLead({
                      type: 'whatsapp',
                      treatment: spec.title[lang],
                      sourcePage: `Catálogo de Especialidades: ${spec.title[lang]}`,
                      sourceUrl: '/especialidades',
                    });
                  }}
                  className="p-2 text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-lg shadow-xs transition-colors cursor-pointer"
                  title="Consultar por WhatsApp"
                  aria-label={`Consultar por WhatsApp sobre ${spec.title[lang]}`}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
