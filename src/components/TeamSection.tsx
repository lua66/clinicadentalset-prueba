import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, MessageCircle } from 'lucide-react';
import { DentalSphere } from './DentalSphere';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { TEAM_MEMBERS, CLINIC_CONTACT } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';
import { buildWhatsAppUrl } from '../utils/whatsapp';

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
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      id="equipo"
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-[#0B110E] border-b border-[#1D2D22] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex items-center justify-between gap-6 mb-12">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4 text-[#83C408]" />
                <span>Equipo Médico Colegiado · Poblenou</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-[#F5FAF3]"
                style={{ textWrap: 'balance' }}
              >
                {t.teamHeading}
              </h2>
              <p className="mt-3 text-sm text-[#B9CEBE] max-w-2xl">
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
          {TEAM_MEMBERS.map((member) => {
            const hasFailed = Boolean(failedImages[member.id]);
            return (
              <article
                key={member.id}
                className="group bg-[#101914] border border-[#1F3125] hover:border-[#83C408]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                {/* Doctor Photo (Eager load + clean fallback if network interrupted) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#142019]">
                  {!hasFailed ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      width={600}
                      height={400}
                      decoding="async"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [member.id]: true }))
                      }
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#142019] text-[#83C408] p-6 text-center">
                      <GraduationCap className="w-10 h-10 mb-2" />
                      <span className="font-display text-base text-[#F5FAF3]">
                        {member.name}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Visible Collegiate Number */}
                  {member.collegiateNumber && (
                    <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-[#83C408] border border-[#83C408]/50 tabular-nums">
                      {member.collegiateNumber}
                    </div>
                  )}
                </div>

                {/* Doctor Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg text-[#F5FAF3] tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#83C408] mt-1 leading-snug">
                      {member.role[lang]}
                    </p>
                    {member.collegiateNumber && (
                      <p className="text-[11px] font-semibold text-[#9AB39E] mt-0.5 tabular-nums">
                        {t.collegiateNumber}: {member.collegiateNumber}
                      </p>
                    )}

                    <p className="text-xs text-[#B9CEBE] mt-3 leading-relaxed">
                      {member.bio[lang]}
                    </p>
                  </div>

                  {/* Credentials / Bracketed Placeholders */}
                  <div className="mt-6 pt-4 border-t border-[#1D2D22]">
                    <div className="space-y-1.5">
                      {member.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#9AB39E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0 mt-0.5" />
                          <span className="leading-tight">{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Collective Statement Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#101914] border border-[#1F3125] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-base sm:text-lg text-[#F5FAF3]">
              Atención cercana y continuada en Poblenou
            </h4>
            <p className="text-xs sm:text-sm text-[#B9CEBE] mt-1 leading-relaxed">
              Más de 25 años cuidando la salud bucodental de nuestros pacientes en Carrer del Doctor Trueta, 213, con trato directo y personalizado.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl(lang, { intent: 'team' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCrmLead({
                type: 'whatsapp',
                treatment: 'Consulta con Equipo Médico',
                sourcePage: 'Sección Equipo Médico',
              });
            }}
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-3 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-xs transition-colors whitespace-nowrap gap-2 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp · {CLINIC_CONTACT.whatsapp}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
