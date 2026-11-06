import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, MapPin, Clock, Navigation, Mail, ShieldCheck } from 'lucide-react';
import { DentalSphere } from './DentalSphere';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_CONTACT } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';
import { sendGa4ContactLead, sendGa4Event } from '../utils/googleAnalytics';
import { hasThirdPartyCookieConsent, saveCookieConsent } from '../utils/cookieConsent';
import { buildWhatsAppUrl } from '../utils/whatsapp';

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
  const [mapConsented, setMapConsented] = useState<boolean>(false);

  useEffect(() => {
    setMapConsented(hasThirdPartyCookieConsent());

    const handleConsentChange = () => {
      setMapConsented(hasThirdPartyCookieConsent());
    };

    window.addEventListener('set-cookie-consent-updated', handleConsentChange);
    return () => {
      window.removeEventListener('set-cookie-consent-updated', handleConsentChange);
    };
  }, []);

  const handleEnableMap = () => {
    saveCookieConsent('accepted');
    setMapConsented(true);
    sendGa4Event('map_load', {
      ui_location: 'DirectContactAndMap',
      language: lang,
    });
  };

  return (
    <section
      id="contacto"
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-[#080C0A] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex items-center justify-between gap-6 mb-12">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Poblenou · Sant Martí · Barcelona</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-[#F5FAF3]"
                style={{ textWrap: 'balance' }}
              >
                {t.contactHeading}
              </h2>
              <p className="mt-3 text-sm text-[#B9CEBE] max-w-2xl">
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

        {/* 2-Column Split: GDPR-Protected Google Map (6 cols) vs Direct Contact Cards (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: GDPR-Gated Interactive Map (No third-party cookies until consent) */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#1F3125] bg-[#101914] shadow-xs flex flex-col">
            <div className="w-full h-80 sm:h-96 lg:h-full min-h-[340px] relative bg-[#0D1510]">
              {mapConsented ? (
                <>
                  <iframe
                    title="Ubicación exacta de Clínica Dental SET en Google Maps"
                    src={CLINIC_CONTACT.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />

                  <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md p-3.5 rounded-xl border border-[#83C408]/60 shadow-md max-w-xs pointer-events-auto">
                    <div className="flex items-center gap-2 font-bold text-xs text-[#F5FAF3]">
                      <span>Clínica Dental SET</span>
                    </div>
                    <p className="text-[11px] text-[#B9CEBE] mt-1">
                      {CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}
                    </p>
                    <a
                      href={CLINIC_CONTACT.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[44px] gap-1.5 px-2.5 py-2 text-[11px] font-bold text-[#83C408] hover:underline mt-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>{t.mapOpenExternal}</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-br from-[#0B120E] via-[#101B14] to-[#080C0A]">
                  <div className="w-12 h-12 rounded-2xl bg-[#16241B] border border-[#83C408]/50 text-[#83C408] flex items-center justify-center mb-4 shadow-xs">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#83C408]">
                    Clínica Dental SET · Poblenou
                  </span>

                  <h3 className="text-xl text-[#F5FAF3] mt-1">
                    {t.mapPrivacyTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E5F0E3] max-w-md mt-2 leading-relaxed">
                    {CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}
                  </p>

                  <p className="text-xs text-[#9AB39E] max-w-md mt-2 leading-relaxed">
                    {t.mapPrivacyDesc}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleEnableMap}
                      className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      {t.mapAcceptBtn}
                    </button>

                    <a
                      href={CLINIC_CONTACT.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center min-h-[44px] gap-1.5 px-4 py-2.5 text-xs font-bold text-[#83C408] bg-[#16231B] hover:bg-[#1D2E24] border border-[#83C408]/60 hover:border-[#83C408] rounded-xl transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#83C408]" />
                      <span>{t.mapOpenExternal}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Contact Details (Monday to Friday schedule only) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* Primary WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-[#101914] border border-[#83C408]/50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#83C408] block mb-1">
                    Canal Directo
                  </span>
                  <h3 className="text-xl text-[#F5FAF3]">
                    WhatsApp · {CLINIC_CONTACT.whatsapp}
                  </h3>
                  <p className="text-xs text-[#B9CEBE] mt-1 leading-relaxed">
                    {t.directWhatsAppNotice}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#83C408] text-[#071408] flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1D2D22] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E5F0E3]">
                  <ShieldCheck className="w-4 h-4 text-[#83C408] shrink-0" />
                  <span>Atención directa con la clínica</span>
                </div>

                <a
                  href={buildWhatsAppUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackCrmLead({
                      type: 'whatsapp',
                      treatment: 'Consulta General (Sección Contacto y Mapa)',
                      sourcePage: 'Sección Contacto y Mapa Poblenou',
                    });
                    sendGa4ContactLead({
                      channel: 'whatsapp',
                      treatment: 'Consulta General (Sección Contacto y Mapa)',
                      uiLocation: 'Contact & Map Section',
                      lang,
                    });
                  }}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-3 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.sendWhatsAppBtn}</span>
                </a>
              </div>
            </div>

            {/* Direct Telephone Card */}
            <div className="p-6 rounded-2xl bg-[#101914] border border-[#1F3125] shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#83C408] block mb-1">
                    Atención Telefónica
                  </span>
                  <h3 className="text-lg text-[#F5FAF3]">
                    Teléfono Fijo de la Clínica
                  </h3>
                  <p className="text-xs text-[#9AB39E] mt-1">
                    {CLINIC_CONTACT.hours.weekdays}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#16241B] border border-[#83C408]/40 text-[#83C408] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1D2D22] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-mono tabular-nums text-base font-bold text-[#F5FAF3]">
                  {CLINIC_CONTACT.phone}
                </span>

                <a
                  href={`tel:${CLINIC_CONTACT.phoneClean}`}
                  onClick={() => {
                    trackCrmLead({
                      type: 'call',
                      treatment: 'Consulta General (Sección Contacto y Mapa)',
                      sourcePage: 'Sección Contacto y Mapa Poblenou',
                    });
                    sendGa4ContactLead({
                      channel: 'phone',
                      treatment: 'Consulta General (Sección Contacto y Mapa)',
                      uiLocation: 'Contact & Map Section',
                      lang,
                    });
                  }}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-bold text-[#83C408] bg-[#16231B] hover:bg-[#1D2E24] rounded-xl border border-[#83C408]/60 hover:border-[#83C408] transition-colors flex items-center justify-center gap-2 tabular-nums cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#83C408]" />
                  <span>{t.quickCallBtn}</span>
                </a>
              </div>
            </div>

            {/* Location, Schedule (Mon-Fri) & Transit Placeholder */}
            <div className="p-6 rounded-2xl bg-[#101914] border border-[#1F3125] shadow-xs space-y-3.5 text-xs text-[#B9CEBE]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F5FAF3] block">
                    {t.addressTitle}:
                  </span>
                  <p>{CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F5FAF3] block">
                    {t.hoursTitle}:
                  </span>
                  <p>{CLINIC_CONTACT.hours.weekdays}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F5FAF3] block">
                    {t.transportTitle}:
                  </span>
                  <p className="text-[#9AB39E]">{CLINIC_CONTACT.metro}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 text-xs">
                <Mail className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                <a
                  href={`mailto:${CLINIC_CONTACT.email}`}
                  className="inline-flex items-center min-h-[44px] py-2 hover:underline text-[#F5FAF3]"
                >
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
