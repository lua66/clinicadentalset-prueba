import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles, Phone } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Specialty, Language } from '../types';
import { SPECIALTIES, CLINIC_CONTACT } from '../data/clinicData';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { trackCrmLead } from '../utils/crmTracker';
import { buildLocalizedPath } from '../utils/routing';

interface SpecialtyDetailPageProps {
  specialty: Specialty;
  lang: Language;
  onNavigate: (path: string) => void;
}

export const SpecialtyDetailPage: React.FC<SpecialtyDetailPageProps> = ({
  specialty,
  lang,
  onNavigate,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [doctorImgError, setDoctorImgError] = useState<boolean>(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const otherSpecialties = SPECIALTIES.filter((s) => s.id !== specialty.id).slice(0, 4);
  const allSpecUrl = buildLocalizedPath('/especialidades', lang);
  const currentSpecUrl = buildLocalizedPath(`/especialidades/${specialty.slug}`, lang);

  return (
    <div className="bg-[#080C0A] transition-colors duration-200">
      {/* Unified Page Header with 1 right-aligned 3D Sphere */}
      <PageHeader
        breadcrumbs={[
          { label: t.navHome, path: '/' },
          { label: t.navSpecialties, path: '/especialidades' },
          { label: specialty.title[lang] },
        ]}
        eyebrowIcon={<Sparkles className="w-3.5 h-3.5 text-[#83C408]" />}
        eyebrowText={`${specialty.badge[lang]} · Poblenou, Barcelona`}
        title={specialty.title[lang]}
        subtitle={specialty.subtitle[lang]}
        lang={lang}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Crawlable Back Link */}
        <a
          href={allSpecUrl}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(allSpecUrl);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-[#83C408] bg-[#101914] hover:bg-[#16231B] border border-[#83C408]/50 hover:border-[#83C408] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.allSpecialties}</span>
        </a>

        {/* Specialty Clinical Specialist & Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#101914] border border-[#1F3125] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="text-xs font-bold text-[#83C408] uppercase tracking-wider">
                Equipo Médico Colegiado · Clínica Dental SET
              </div>

              {/* Doctor in charge & Verified Collegiate Number */}
              <div className="flex items-start gap-3.5">
                {!doctorImgError ? (
                  <img
                    src={specialty.leadDoctor.image}
                    alt={specialty.leadDoctor.name}
                    width={56}
                    height={56}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setDoctorImgError(true)}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#83C408] shrink-0 bg-[#142019]"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[#142019] border-2 border-[#83C408] flex items-center justify-center text-[#83C408] font-bold text-xs shrink-0">
                    SET
                  </div>
                )}

                <div className="text-xs space-y-1">
                  <span className="font-bold text-sm text-[#F5FAF3] block">
                    {specialty.leadDoctor.name}
                  </span>
                  <span className="text-[#83C408] block leading-snug tabular-nums font-medium">
                    {specialty.leadDoctor.role}
                  </span>
                  {specialty.leadDoctor.scheduleSummary?.[lang] && (
                    <span className="text-xs font-medium text-[#9AB39E] block pt-0.5">
                      {specialty.leadDoctor.scheduleSummary[lang]}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions in Corporate Brand Green #83C408 */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20${encodeURIComponent(specialty.title[lang])}%20en%20Cl%C3%ADnica%20Dental%20SET.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCrmLead({
                    type: 'whatsapp',
                    treatment: specialty.title[lang],
                    sourcePage: `Página de Especialidad: ${specialty.title[lang]}`,
                    sourceUrl: currentSpecUrl,
                  });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${CLINIC_CONTACT.phoneClean}`}
                onClick={() => {
                  trackCrmLead({
                    type: 'call',
                    treatment: specialty.title[lang],
                    sourcePage: `Página de Especialidad: ${specialty.title[lang]}`,
                    sourceUrl: currentSpecUrl,
                  });
                }}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-bold text-[#83C408] bg-[#16231B] hover:bg-[#1D2E24] rounded-xl transition-colors border border-[#83C408]/60 hover:border-[#83C408] tabular-nums cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Llamar al {CLINIC_CONTACT.phone}</span>
              </a>
            </div>
          </div>

          {/* Specialty Hero Image */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[220px] rounded-2xl overflow-hidden border border-[#1F3125] shadow-sm bg-[#142019]">
            <img
              src={specialty.image}
              alt={specialty.title[lang]}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-medium flex items-center justify-between">
              <span>{CLINIC_CONTACT.address}</span>
              <span className="flex items-center gap-1 text-[#83C408] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                +25 años en Poblenou
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Clinical Description & Indications */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl text-[#F5FAF3] mb-4">
                ¿En qué consiste el tratamiento en Clínica Dental SET?
              </h2>
              <p className="text-sm text-[#B9CEBE] leading-relaxed">
                {specialty.fullDescription[lang]}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1D2D22]">
                {specialty.features[lang].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#E5F0E3]">
                    <CheckCircle2 className="w-4 h-4 text-[#83C408] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg sm:text-xl text-[#F5FAF3] mb-4">
                Indicaciones Clínicas
              </h3>
              <ul className="space-y-3">
                {specialty.indications[lang].map((ind, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#B9CEBE]">
                    <div className="w-5 h-5 rounded-full bg-[#16241B] border border-[#83C408]/40 text-[#83C408] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg sm:text-xl text-[#F5FAF3] mb-4">
                Tratamientos y Procedimientos
              </h3>
              <div className="space-y-4">
                {specialty.treatments[lang].map((tItem, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#0B110E] border border-[#1D2D22]"
                  >
                    <h4 className="text-base text-[#F5FAF3]">
                      {tItem.name}
                    </h4>
                    <p className="text-xs text-[#B9CEBE] mt-1 leading-relaxed">
                      {tItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg sm:text-xl text-[#F5FAF3] mb-4">
                Preguntas Frecuentes sobre {specialty.title[lang]}
              </h3>
              <div className="divide-y divide-[#1D2D22]">
                {specialty.faqs[lang].map((faq, i) => (
                  <div key={i} className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between text-left gap-4 text-[#F5FAF3] hover:text-[#83C408] transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold">
                        {faq.question}
                      </span>
                      {openFaqIndex === i ? (
                        <ChevronUp className="w-4 h-4 text-[#83C408] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#83C408] shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === i && (
                      <p className="text-xs sm:text-sm text-[#B9CEBE] mt-2 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar: Direct Contact & Other Specialties */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-6 shadow-xs sticky top-28">
              <div className="mb-4">
                <img
                  src="/assets/logo-blanc.png"
                  alt="Clínica Dental SET"
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain"
                />
              </div>

              <h4 className="text-lg text-[#F5FAF3]">
                Solicita información o cita
              </h4>
              <p className="text-xs text-[#B9CEBE] mt-1 leading-relaxed">
                {CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}. {CLINIC_CONTACT.hours.weekdays}.
              </p>

              <div className="my-5 space-y-2 text-xs text-[#E5F0E3]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                  <span>Más de 25 años de experiencia en Poblenou</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                  <span>Odontólogas colegiadas COEC</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                  <span>Atención directa sin intermediarios</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20para%20${encodeURIComponent(specialty.title[lang])}%20en%20Cl%C3%ADnica%20Dental%20SET.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCrmLead({
                    type: 'whatsapp',
                    treatment: specialty.title[lang],
                    sourcePage: `Lateral de Reserva: ${specialty.title[lang]}`,
                    sourceUrl: currentSpecUrl,
                  });
                }}
                className="w-full py-3 px-4 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${CLINIC_CONTACT.phoneClean}`}
                onClick={() => {
                  trackCrmLead({
                    type: 'call',
                    treatment: specialty.title[lang],
                    sourcePage: `Lateral de Reserva: ${specialty.title[lang]}`,
                    sourceUrl: currentSpecUrl,
                  });
                }}
                className="w-full mt-2.5 py-2.5 px-4 text-xs font-bold text-[#83C408] bg-[#16231B] hover:bg-[#1D2E24] rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#83C408]/60 hover:border-[#83C408] tabular-nums cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Llamar al {CLINIC_CONTACT.phone}</span>
              </a>

              {/* Crawlable Related Specialties */}
              <div className="mt-8 pt-6 border-t border-[#1D2D22]">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#83C408] block mb-3">
                  Otras Especialidades
                </span>
                <div className="space-y-1.5">
                  {otherSpecialties.map((other) => {
                    const otherHref = buildLocalizedPath(`/especialidades/${other.slug}`, lang);
                    return (
                      <a
                        key={other.id}
                        href={otherHref}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(otherHref);
                        }}
                        className="w-full text-left p-2.5 rounded-lg text-xs font-semibold text-[#E5F0E3] hover:text-[#83C408] hover:bg-[#16231B] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{other.title[lang]}</span>
                        <span className="text-[#83C408]">→</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
