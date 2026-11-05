import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Mail, Lock, Navigation } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_CONTACT, SPECIALTIES } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';
import { buildLocalizedPath } from '../utils/routing';
import { resetCookieConsentPrompt } from '../utils/cookieConsent';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <footer className="bg-[#060908] border-t border-[#1D2D22] text-[#B9CEBE] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Clinic Brand & Collegiate Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo-blanc.png"
                alt="Clínica Dental SET"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-xs leading-relaxed text-[#B9CEBE]">
              {t.footerCol1Desc}
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 text-[#F5FAF3]">
                <ShieldCheck className="w-4 h-4 text-[#83C408] shrink-0" />
                <span className="font-semibold">Odontólogas Colegiadas COEC</span>
              </div>
              <span className="text-[11px] text-[#9AB39E] pl-6">
                Dra. Izbette Luis Torres (Col. 5664) · Dra. Ruby Herrera (Col. 5929)
              </span>
            </div>
          </div>

          {/* Column 2: Specialties Silo (Crawlable Links for SEO) */}
          <div>
            <h4 className="text-sm font-semibold text-[#F5FAF3] mb-3">
              {t.footerCol2Title}
            </h4>
            <ul className="space-y-0.5 text-xs">
              {SPECIALTIES.map((spec) => {
                const href = buildLocalizedPath(`/especialidades/${spec.slug}`, lang);
                return (
                  <li key={spec.id}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(href);
                      }}
                      className="inline-flex items-center min-h-[44px] py-2 text-[#B9CEBE] hover:text-[#83C408] hover:underline transition-colors text-left w-full cursor-pointer"
                    >
                      <span className="truncate">{spec.title[lang]}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact & Visiting Hours (Monday to Friday only) */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#F5FAF3] mb-4">
              {t.footerCol3Title}
            </h4>

            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
              <span>{CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
              <p>{CLINIC_CONTACT.hours.weekdays}</p>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Navigation className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
              <span className="text-[#9AB39E]">{CLINIC_CONTACT.metro}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-[#83C408] shrink-0" />
              <a
                href={`mailto:${CLINIC_CONTACT.email}`}
                className="inline-flex items-center min-h-[44px] py-2 hover:underline text-[#F5FAF3]"
              >
                {CLINIC_CONTACT.email}
              </a>
            </div>
          </div>

          {/* Column 4: Direct WhatsApp & Call in Brand Green #83C408 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#F5FAF3] mb-4">
              {t.footerCol4Title}
            </h4>

            <p className="text-xs text-[#B9CEBE]">
              {t.directWhatsAppNotice}
            </p>

            <a
              href={buildWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCrmLead({
                  type: 'whatsapp',
                  treatment: 'Consulta General (Pie de Página)',
                  sourcePage: 'Pie de Página (Footer)',
                });
              }}
              className="flex items-center justify-center min-h-[44px] gap-2 w-full py-2.5 px-4 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${CLINIC_CONTACT.phoneClean}`}
              onClick={() => {
                trackCrmLead({
                  type: 'call',
                  treatment: 'Consulta General (Pie de Página)',
                  sourcePage: 'Pie de Página (Footer)',
                });
              }}
              className="flex items-center justify-center min-h-[44px] gap-2 w-full py-2.5 px-4 text-xs font-bold text-[#83C408] bg-[#101914] hover:bg-[#16231B] rounded-lg transition-colors border border-[#83C408]/60 hover:border-[#83C408] tabular-nums cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#83C408]" />
              <span>{t.quickCallBtn}</span>
            </a>
          </div>
        </div>

        {/* Bottom hairline separator, copyright, cookie settings, and discreet private CRM link */}
        <div className="mt-12 pt-8 border-t border-[#1D2D22] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9AB39E]">
          <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <a
              href={buildLocalizedPath('/contacto', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(buildLocalizedPath('/contacto', lang));
              }}
              className="inline-flex items-center min-h-[44px] px-1 hover:text-[#83C408] cursor-pointer"
            >
              {t.legalNotice}
            </a>
            <a
              href={buildLocalizedPath('/contacto', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(buildLocalizedPath('/contacto', lang));
              }}
              className="inline-flex items-center min-h-[44px] px-1 hover:text-[#83C408] cursor-pointer"
            >
              {t.privacyPolicy}
            </a>
            <button
              type="button"
              onClick={resetCookieConsentPrompt}
              className="inline-flex items-center min-h-[44px] px-1 text-[#83C408] hover:underline cursor-pointer"
            >
              {t.cookieConfigure}
            </button>

            {/* Discreet, unbadged link to password-protected /crm (no public red alert or unseen count) */}
            <a
              href="/crm"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/crm');
              }}
              className="inline-flex items-center min-h-[44px] px-1 gap-1.5 text-[#9AB39E] hover:text-[#83C408] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{t.ownerPrivateAccess}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
