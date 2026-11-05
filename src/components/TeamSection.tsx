import React from 'react';
import { GraduationCap, CheckCircle2, MessageCircle } from 'lucide-react';
import { DentalSphere } from './DentalSphere';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { TEAM_MEMBERS, CLINIC_CONTACT } from '../data/clinicData';

interface TeamSectionProps {
  lang: Language;
  showHeader?: boolean;
  showSphere?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  lang,
  showHeader = true,
  showSphere = false,
}) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <section
      id="equipo"
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-stone-50 dark:bg-[#08120c] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex items-center justify-between gap-6 mb-14">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4 text-[#83C408]" />
                <span>Vocación Médica & Proximidad</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                {t.teamHeading}
              </h2>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
                {t.teamSubtitle}
              </p>
            </div>

            {showSphere && (
              <div className="shrink-0">
                <DentalSphere mode="page" />
              </div>
            )}
          </div>
        )}

        {/* Collective Team Presentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group bg-white dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Doctor Real Photo with subtle overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Qualification Badge */}
                {member.collegiateNumber && (
                  <div className="absolute bottom-3 left-3 bg-[#0d1a11]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-[#83C408] border border-[#83C408]/30">
                    Odontóloga Colegiada COEC
                  </div>
                )}
              </div>

              {/* Doctor Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 dark:text-[#83C408] mt-1 leading-snug">
                    {member.role[lang]}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-3 leading-relaxed">
                    {member.bio[lang]}
                  </p>
                </div>

                {/* Key Credentials */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-emerald-950/60">
                  <div className="space-y-1.5">
                    {member.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0 mt-0.5" />
                        <span className="leading-tight">{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Collective Statement Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
              Atención personalizada: siempre te atenderá la misma doctora
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
              En las macroclínicas y franquicias los dentistas rotan constantemente. En Clínica Dental SET garantizamos continuidad médica, cercanía y conocimiento profundo de tu historial bucodental.
            </p>
          </div>

          <a
            href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20con%20el%20equipo%20de%20Cl%C3%ADnica%20Dental%20SET.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-lg shadow-xs transition-colors whitespace-nowrap flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar con el Equipo</span>
          </a>
        </div>

      </div>
    </section>
  );
};
