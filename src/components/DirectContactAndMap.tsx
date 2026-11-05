import React from 'react';
import { MessageCircle, Phone, MapPin, Clock, Train, Navigation, Mail, ShieldCheck } from 'lucide-react';
import { DentalSphere } from './DentalSphere';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_CONTACT } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';

interface DirectContactAndMapProps {
  lang: Language;
  showHeader?: boolean;
  showSphere?: boolean;
}

export const DirectContactAndMap: React.FC<DirectContactAndMapProps> = ({
  lang,
  showHeader = true,
  showSphere = false,
}) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <section
      id="contacto"
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-stone-50 dark:bg-[#08120c] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex items-center justify-between gap-6 mb-14">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Poblenou · Sant Martí · Barcelona</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                {t.contactHeading}
              </h2>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
                {t.contactSubtitle}
              </p>
            </div>

            {showSphere && (
              <div className="shrink-0">
                <DentalSphere mode="page" />
              </div>
            )}
          </div>
        )}

        {/* 2-Column Split: Google Maps Embed (6 cols) vs Direct Contact Cards (6 cols) - NO FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Responsive Google Map (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-stone-200 dark:border-emerald-950 bg-white dark:bg-[#0d1a11] shadow-sm flex flex-col">
            <div className="w-full h-80 sm:h-96 lg:h-full min-h-[340px] relative bg-stone-200 dark:bg-stone-800">
              <iframe
                title="Ubicación exacta de Clínica Dental SET en Google Maps"
                src={CLINIC_CONTACT.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-[1.02] dark:invert-[0.88] dark:hue-rotate-180"
              />

              {/* Floating Map Pin Info Badge */}
              <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#0d1a11]/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 dark:border-emerald-900 shadow-md max-w-xs pointer-events-auto">
                <div className="flex items-center gap-2 font-bold text-xs text-stone-900 dark:text-white">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#83C408]" />
                  <span>Clínica Dental SET</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Carrer Doctor Trueta 213, Bajos, 08005 Barcelona
                </p>
                <a
                  href={CLINIC_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-[#83C408] hover:underline mt-2"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Cómo llegar con Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 100% Direct Contact Details (NO FORMS - Only Direct WhatsApp & Phones) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Primary WhatsApp Card (Direct, 1-Click) */}
            <div className="p-6 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 dark:border-emerald-800/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-[#83C408] block mb-1">
                    Canal Prioritario Inmediato
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">
                    WhatsApp Directo
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                    Comunícate directamente con la clínica sin formularios ni esperas. Consulta disponibilidad o pide tu cita al instante.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#23A455] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-[#83C408]">
                  <ShieldCheck className="w-4 h-4 text-[#83C408] shrink-0" />
                  <span>Atención directa online</span>
                </div>

                <a
                  href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20me%20gustar%C3%ADa%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackCrmLead({
                      type: 'whatsapp',
                      treatment: 'Consulta General (Sección Contacto & Mapa)',
                      sourcePage: 'Sección Contacto y Mapa Poblenou',
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Direct Telephone Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0d1a11] border border-stone-200 dark:border-emerald-950 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Atención Telefónica
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    Teléfono Fijo de la Clínica
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Atención de recepción durante el horario asistencial.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#83C408] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-mono tabular-nums text-base font-bold text-stone-900 dark:text-white">
                  {CLINIC_CONTACT.phone}
                </span>

                <a
                  href={`tel:${CLINIC_CONTACT.phoneClean}`}
                  onClick={() => {
                    trackCrmLead({
                      type: 'call',
                      treatment: 'Consulta General (Sección Contacto & Mapa)',
                      sourcePage: 'Sección Contacto y Mapa Poblenou',
                    });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-emerald-950/40 hover:bg-stone-200 dark:hover:bg-emerald-900/60 rounded-xl border border-stone-200 dark:border-emerald-900/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#83C408]" />
                  <span>Llamar {CLINIC_CONTACT.phone}</span>
                </a>
              </div>
            </div>

            {/* Practical Location, Hours & Transit Strip */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0d1a11] border border-stone-200 dark:border-emerald-950 shadow-xs space-y-3.5 text-xs text-stone-600 dark:text-stone-300">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">
                    Dirección Oficial:
                  </span>
                  <p className="text-stone-500">{CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">
                    Horario de Atención:
                  </span>
                  <p className="text-stone-500">{CLINIC_CONTACT.hours.weekdays}</p>
                  <p className="text-stone-400 text-[11px]">{CLINIC_CONTACT.hours.weekend}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">
                    Transporte y Accesos:
                  </span>
                  <p className="text-stone-500">{CLINIC_CONTACT.metro}</p>
                  <p className="text-stone-400 text-[11px]">{CLINIC_CONTACT.bus}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-400">
                <Mail className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                <a href={`mailto:${CLINIC_CONTACT.email}`} className="hover:underline">
                  {CLINIC_CONTACT.email}
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
