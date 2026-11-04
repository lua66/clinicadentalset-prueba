import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { SPECIALTIES } from '../data/clinicData';

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
  return (
    <section className="py-14 sm:py-16 bg-white dark:bg-[#08120c] border-b border-stone-200/80 dark:border-emerald-950/70 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#83C408]" />
              <span>Tratamientos Odontológicos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Nuestras Especialidades
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-[#83C408] hover:underline cursor-pointer self-start sm:self-auto"
          >
            <span>Ver todas con información completa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Streamlined, lightweight grid of treatments - only mentioning them with links to their dedicated URLs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec.id}
              onClick={() => onSelectSpecialty(spec.slug)}
              className="group p-4 rounded-xl bg-stone-50 dark:bg-[#0d1a11] hover:bg-emerald-50/60 dark:hover:bg-[#122417] border border-stone-200/80 dark:border-emerald-950/80 hover:border-[#83C408] dark:hover:border-[#83C408] transition-all text-left flex flex-col justify-between cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-bold text-[#83C408] uppercase tracking-wider block mb-1">
                  {spec.badge[lang]}
                </span>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-[#83C408] transition-colors leading-snug">
                  {spec.title[lang]}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/50 dark:border-emerald-950/60 flex items-center justify-between text-[11px] text-stone-400 group-hover:text-emerald-700 dark:group-hover:text-[#83C408]">
                <span>Página dedicada</span>
                <span className="font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
