import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Train, ShieldCheck, Mail } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_CONTACT, SPECIALTIES } from '../data/clinicData';
import { OwnerAlertButton } from './OwnerAlertButton';
import { trackCrmLead } from '../utils/crmTracker';

interface FooterProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <footer className="bg-stone-100 dark:bg-[#060e09] border-t border-stone-200 dark:border-emerald-950/70 text-stone-600 dark:text-stone-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Clinic Brand & Heritage with Authentic Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo-blanc.png"
                alt="Clínica Dental SET"
                className="h-10 w-auto object-contain dark:brightness-100 brightness-0"
              />
            </div>

            <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              {t.footerCol1Desc}
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 text-stone-700 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-[#83C408] shrink-0" />
                <span className="font-medium">Centro Sanitario Autorizado de Cataluña</span>
              </div>
              <span className="text-[11px] text-stone-500 pl-6">
                Dra. Izbette Luis · Dra. Ruby Herrera (Odontólogas Colegiadas COEC)
              </span>
            </div>
          </div>

          {/* Column 2: Specialties Silo (Internal Linking for SEO) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-4">
              {t.footerCol2Title}
            </h4>
            <ul className="space-y-2 text-xs">
              {SPECIALTIES.map((spec) => (
                <li key={spec.id}>
                  <button
                    onClick={() => onNavigate(`/especialidades/${spec.slug}`)}
                    className="hover:text-emerald-600 dark:hover:text-[#83C408] transition-colors text-left truncate max-w-full block cursor-pointer"
                  >
                    {spec.title[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Visiting Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-4">
              {t.footerCol3Title}
            </h4>

            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
              <span>{CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
              <div>
                <p>{CLINIC_CONTACT.hours.weekdays}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">{CLINIC_CONTACT.hours.weekend}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Train className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
              <span>{CLINIC_CONTACT.metro}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-[#83C408] shrink-0" />
              <a href={`mailto:${CLINIC_CONTACT.email}`} className="hover:underline">
                {CLINIC_CONTACT.email}
              </a>
            </div>
          </div>

          {/* Column 4: Direct WhatsApp & Call */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-4">
              Atención Inmediata
            </h4>

            <p className="text-xs text-stone-500">
              Canal directo prioritario para agendar tu consulta o resolver dudas:
            </p>

            <a
              href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCrmLead({
                  type: 'whatsapp',
                  treatment: 'Consulta General (Botón Pie de Página)',
                  sourcePage: 'Pie de Página (Footer)',
                });
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${CLINIC_CONTACT.phoneClean}`}
              onClick={() => {
                trackCrmLead({
                  type: 'call',
                  treatment: 'Consulta General (Botón Pie de Página)',
                  sourcePage: 'Pie de Página (Footer)',
                });
              }}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 text-xs font-medium text-stone-800 dark:text-stone-200 bg-stone-200/70 dark:bg-emerald-950/40 hover:bg-stone-300 dark:hover:bg-emerald-900/60 rounded-lg transition-colors border border-stone-300/40 dark:border-emerald-900/50 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#83C408]" />
              <span>Teléfono: {CLINIC_CONTACT.phone}</span>
            </a>
          </div>

        </div>

        {/* Bottom hairline separator and copyright */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-emerald-950/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => onNavigate('/contacto')} className="hover:text-stone-800 dark:hover:text-stone-300 cursor-pointer">
              {t.legalNotice}
            </button>
            <button onClick={() => onNavigate('/contacto')} className="hover:text-stone-800 dark:hover:text-stone-300 cursor-pointer">
              {t.privacyPolicy}
            </button>
            <button onClick={() => onNavigate('/contacto')} className="hover:text-stone-800 dark:hover:text-stone-300 cursor-pointer">
              {t.cookiePolicy}
            </button>
            
            {/* Discrete Owner CRM Entrance in Footer */}
            <OwnerAlertButton
              variant="footer"
              onOpenCrm={() => onNavigate('/crm')}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
