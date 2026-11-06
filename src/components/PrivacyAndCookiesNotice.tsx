import React from 'react';
import { ShieldCheck, SlidersHorizontal, Cookie, Lock } from 'lucide-react';
import { Language } from '../types';
import { resetCookieConsentPrompt } from '../utils/cookieConsent';

interface PrivacyAndCookiesNoticeProps {
  lang: Language;
}

export const PrivacyAndCookiesNotice: React.FC<PrivacyAndCookiesNoticeProps> = ({ lang }) => {
  const content = {
    es: {
      eyebrow: 'Cumplimiento RGPD · LSSI-CE · Privacidad',
      heading: 'Política de Privacidad, Aviso Legal y Política de Cookies',
      intro:
        'En Clínica Dental SET (Carrer del Doctor Trueta, 213, Bajos, 08005 Barcelona · info@clinicadentalset.com · Tel. 933 09 18 71) protegemos tu privacidad conforme al Reglamento General de Protección de Datos (RGPD) y la LSSI-CE.',
      cards: [
        {
          icon: Lock,
          title: 'Almacenamiento Técnico Esencial',
          badge: 'Siempre activo',
          body: 'Guardamos únicamente tu preferencia de consentimiento de cookies para evitar mostrarte este aviso en cada visita. No contiene datos personales ni realiza seguimiento publicitario.',
        },
        {
          icon: Cookie,
          title: 'Analítica Web (Google Analytics 4)',
          badge: 'Solo con consentimiento',
          body: 'Si aceptas las cookies opcionales, inicializamos Google Analytics 4 con anonimización de IP activa y señales publicitarias desactivadas para medir páginas vistas y clics de contacto (WhatsApp y teléfono).',
        },
        {
          icon: ShieldCheck,
          title: 'Mapa Interactivo (Google Maps)',
          badge: 'Bloqueado por defecto',
          body: 'El mapa de ubicación permanece desactivado hasta que aceptes las cookies de terceros, evitando la descarga previa de cookies externas.',
        },
      ],
      manageBtn: 'Configurar o revocar preferencias de cookies',
    },
    ca: {
      eyebrow: 'Compliment RGPD · LSSI-CE · Privadesa',
      heading: 'Política de Privadesa, Avís Legal i Política de Cookies',
      intro:
        'A Clínica Dental SET (Carrer del Doctor Trueta, 213, Baixos, 08005 Barcelona · info@clinicadentalset.com · Tel. 933 09 18 71) protegim la teva privadesa d’acord amb el Reglament General de Protecció de Dades (RGPD) i la LSSI-CE.',
      cards: [
        {
          icon: Lock,
          title: 'Emmagatzematge Tècnic Essencial',
          badge: 'Sempre actiu',
          body: 'Desem únicament la teva preferència de consentiment de cookies per recordar la teva elecció en futures visites. No recull dades personals ni perfils publicitaris.',
        },
        {
          icon: Cookie,
          title: 'Analítica Web (Google Analytics 4)',
          badge: 'Només amb consentiment',
          body: 'Si acceptes les cookies opcionals, inicialitzem Google Analytics 4 amb anonimització d’IP activa i senyals publicitaris desactivats per mesurar pàgines vistes i clics de contacte (WhatsApp i telèfon).',
        },
        {
          icon: ShieldCheck,
          title: 'Mapa Interactiu (Google Maps)',
          badge: 'Bloquejat per defecte',
          body: 'El mapa d’ubicació roman desactivat fins que acceptis les cookies de tercers, evitant la descàrrega prèvia de cookies externes.',
        },
      ],
      manageBtn: 'Configurar o revocar preferències de cookies',
    },
    en: {
      eyebrow: 'GDPR · ePrivacy · Transparency',
      heading: 'Privacy Policy, Legal Notice & Cookies Policy',
      intro:
        'At Clínica Dental SET (Carrer del Doctor Trueta, 213, Bajos, 08005 Barcelona · info@clinicadentalset.com · Phone 933 09 18 71), we protect visitor privacy in compliance with the EU General Data Protection Regulation (GDPR).',
      cards: [
        {
          icon: Lock,
          title: 'Essential Technical Storage',
          badge: 'Always active',
          body: 'Stores only your privacy preference so the website remembers whether you accepted or declined optional third-party cookies. Contains no personal identifiers.',
        },
        {
          icon: Cookie,
          title: 'Web Analytics (Google Analytics 4)',
          badge: 'Consent required',
          body: 'Activated strictly when you click “Accept all”. Uses IP anonymization and disabled advertising signals to measure page views and contact button clicks (WhatsApp and phone).',
        },
        {
          icon: ShieldCheck,
          title: 'Interactive Map (Google Maps)',
          badge: 'Blocked by default',
          body: 'The embedded clinic map remains disabled until third-party cookies are consented, preventing unconsented external requests.',
        },
      ],
      manageBtn: 'Manage or withdraw cookie consent',
    },
  }[lang];

  return (
    <section
      id="politica-privacidad-cookies"
      aria-labelledby="privacy-cookies-heading"
      className="py-12 md:py-16 bg-[#0B110E] border-t border-[#1D2D22] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#83C408]" />
            <span>{content.eyebrow}</span>
          </div>
          <h2
            id="privacy-cookies-heading"
            className="text-xl sm:text-2xl text-[#F5FAF3]"
          >
            {content.heading}
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-[#B9CEBE] leading-relaxed">
            {content.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#101914] border border-[#1F3125] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#16241B] border border-[#83C408]/40 text-[#83C408] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-[#83C408]">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-base text-[#F5FAF3]">{card.title}</h3>
                  <p className="text-xs text-[#B9CEBE] leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={resetCookieConsentPrompt}
            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 text-xs font-bold text-[#83C408] bg-[#101914] hover:bg-[#16231B] border border-[#83C408]/60 hover:border-[#83C408] rounded-xl transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{content.manageBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
