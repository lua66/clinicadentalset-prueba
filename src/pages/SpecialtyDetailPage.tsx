import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles } from 'lucide-react';
import { DentalSphere } from '../components/DentalSphere';
import { Specialty, Language } from '../types';
import { SPECIALTIES, CLINIC_CONTACT } from '../data/clinicData';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { trackCrmLead } from '../utils/crmTracker';

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const otherSpecialties = SPECIALTIES.filter((s) => s.id !== specialty.id).slice(0, 4);

  return (
    <div className="min-h-screen py-10 md:py-16 bg-[#FAF7F2] dark:bg-[#08120c] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('/especialidades')}
            className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Especialidades
          </button>
          <span>/</span>
          <span className="text-emerald-800 dark:text-[#83C408] font-bold truncate">
            {specialty.title[lang]}
          </span>
        </div>

        {/* Back Link */}
        <button
          onClick={() => onNavigate('/especialidades')}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] hover:underline mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todas las especialidades</span>
        </button>

        {/* Hero Section of Specialty */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title with Small 3D Brand Sphere on the right */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#83C408]" />
                  <span>{specialty.badge[lang]} · Poblenou, Barcelona</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white" style={{ textWrap: 'balance' }}>
                  {specialty.title[lang]}
                </h1>
              </div>

              {/* Small 3D Sphere at the right of the title (Not floating) */}
              <div className="shrink-0 pt-1">
                <DentalSphere mode="small" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {specialty.subtitle[lang]}
            </p>

            {/* Doctor in charge */}
            <div className="pt-2 flex items-center gap-3">
              <img
                src={specialty.leadDoctor.image}
                alt={specialty.leadDoctor.name}
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#83C408]"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 dark:text-white block">
                  {specialty.leadDoctor.name}
                </span>
                <span className="text-stone-500">
                  {specialty.leadDoctor.role}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20${encodeURIComponent(specialty.title[lang])}%20en%20Cl%C3%ADnica%20Dental%20SET.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCrmLead({
                    type: 'whatsapp',
                    treatment: specialty.title[lang],
                    sourcePage: `Página de Especialidad: ${specialty.title[lang]}`,
                    sourceUrl: `/especialidades/${specialty.slug}`,
                  });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-xl shadow-xs transition-colors cursor-pointer"
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
                    sourceUrl: `/especialidades/${specialty.slug}`,
                  });
                }}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-emerald-950/40 hover:bg-stone-200 dark:hover:bg-emerald-900/60 rounded-xl transition-colors border border-stone-200 dark:border-emerald-900/50 cursor-pointer"
              >
                <span>Llamar al {CLINIC_CONTACT.phone}</span>
              </a>
            </div>
          </div>

          {/* Specialty Hero Image */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 dark:border-emerald-950 shadow-md">
            <img
              src={specialty.image}
              alt={specialty.title[lang]}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-medium flex items-center justify-between">
              <span>Atención en Carrer Doctor Trueta 213</span>
              <span className="flex items-center gap-1 text-[#83C408]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Garantía Sanitaria
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Clinical Description & Indications */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Full Explanation */}
            <div className="bg-white dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white tracking-tight mb-4">
                ¿En qué consiste el tratamiento en Clínica Dental SET?
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {specialty.fullDescription[lang]}
              </p>

              {/* Feature Points */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100 dark:border-emerald-950/60">
                {specialty.features[lang].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#83C408] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indications */}
            <div className="bg-white dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight mb-4">
                Indicaciones Clínicas: ¿Cuándo está recomendado?
              </h3>
              <ul className="space-y-3">
                {specialty.indications[lang].map((ind, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-[#83C408] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specific Treatments & Techniques */}
            <div className="bg-white dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight mb-4">
                Opciones y Técnicas Disponibles
              </h3>
              <div className="space-y-4">
                {specialty.treatments[lang].map((tItem, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-stone-50 dark:bg-[#122418] border border-stone-200/80 dark:border-emerald-950"
                  >
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      {tItem.name}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                      {tItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight mb-4">
                Preguntas Frecuentes sobre {specialty.title[lang]}
              </h3>
              <div className="divide-y divide-stone-100 dark:divide-emerald-950/70">
                {specialty.faqs[lang].map((faq, i) => (
                  <div key={i} className="py-4">
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                        {faq.question}
                      </span>
                      {openFaqIndex === i ? (
                        <ChevronUp className="w-4 h-4 text-[#83C408] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === i && (
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed animate-in fade-in duration-200">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Sidebar: Fast Booking & Related Treatments (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Booking Card */}
            <div className="bg-white dark:bg-[#0d1a11] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl p-6 shadow-sm sticky top-28">
              <div className="mb-4">
                <img
                  src="/assets/logo-blanc.png"
                  alt="Clínica Dental SET"
                  className="h-8 w-auto object-contain dark:brightness-100 brightness-0"
                />
              </div>

              <h4 className="text-base font-bold text-stone-900 dark:text-white tracking-tight">
                Agenda tu consulta en Poblenou
              </h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Sin intermediarios ni franquicias: habla directamente con el equipo de la Dra. Izbette y Dra. Ruby.
              </p>

              <div className="my-5 space-y-2 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                  <span>Diagnóstico personalizado sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                  <span>Tecnología 3D intraoral</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                  <span>Financiación a tu medida</span>
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
                    sourceUrl: `/especialidades/${specialty.slug}`,
                  });
                }}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
                    sourceUrl: `/especialidades/${specialty.slug}`,
                  });
                }}
                className="w-full mt-2.5 py-2.5 px-4 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-emerald-950/40 hover:bg-stone-200 dark:hover:bg-emerald-900/60 rounded-xl transition-colors flex items-center justify-center gap-2 border border-stone-200 dark:border-emerald-900/40 cursor-pointer"
              >
                <span>Llamar al {CLINIC_CONTACT.phone}</span>
              </a>

              {/* Related Specialties */}
              <div className="mt-8 pt-6 border-t border-stone-100 dark:border-emerald-950/70">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-[#83C408] block mb-3">
                  Otras Especialidades
                </span>
                <div className="space-y-2">
                  {otherSpecialties.map((other) => (
                    <button
                      key={other.id}
                      onClick={() => onNavigate(`/especialidades/${other.slug}`)}
                      className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#122418] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{other.title[lang]}</span>
                      <span className="text-stone-400">→</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
