import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_CONTACT } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';
import { buildLocalizedPath, parseUrlPath } from '../utils/routing';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  lang,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];
  const { basePath } = parseUrlPath(currentPath);

  const handleNav = (targetBasePath: string) => {
    const localized = buildLocalizedPath(targetBasePath, lang);
    onNavigate(localized);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: t.navHome, isActive: basePath === '/' },
    {
      path: '/especialidades',
      label: t.navSpecialties,
      isActive: basePath.startsWith('/especialidades'),
    },
    { path: '/equipo', label: t.navTeam, isActive: basePath === '/equipo' },
    { path: '/clinica', label: t.navGallery, isActive: basePath === '/clinica' },
    { path: '/contacto', label: t.navContact, isActive: basePath === '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#83C408] text-[#081E0D] border-b border-[#6DA605] shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 xl:gap-8">
        {/* ZONE 1: Brand Logo */}
        <a
          href={buildLocalizedPath('/', lang)}
          onClick={(e) => {
            e.preventDefault();
            handleNav('/');
          }}
          className="flex items-center text-left group whitespace-nowrap shrink-0 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#081E0D]"
          aria-label="Ir a Inicio de Clínica Dental SET"
        >
          <img
            src="/assets/logo-blanc.png"
            alt="Clínica Dental SET"
            referrerPolicy="no-referrer"
            className="h-9 sm:h-11 w-auto object-contain brightness-0 contrast-125 transition-transform duration-150 group-hover:scale-105"
          />
        </a>

        {/* ZONE 2: 5 Clean Single-Line Navigation Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm tracking-tight"
        >
          {navItems.map((item) => {
            const href = buildLocalizedPath(item.path, lang);
            return (
              <a
                key={item.path}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.path);
                }}
                aria-current={item.isActive ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 relative py-1.5 transition-colors duration-150 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#081E0D] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:rounded-full after:bg-[#081E0D] after:transition-transform after:duration-200 ${
                  item.isActive
                    ? 'text-[#051408] font-extrabold after:scale-x-100'
                    : 'text-[#081E0D]/85 hover:text-[#051408] font-semibold after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* ZONE 3: Language Switcher (with real localized URLs) & Primary WhatsApp Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label="Selector de idioma"
            className="flex items-center bg-[#081E0D]/15 p-0.5 rounded-lg text-xs font-semibold border border-[#081E0D]/20 shrink-0"
          >
            {(['es', 'ca', 'en'] as Language[]).map((l) => {
              const langHref = buildLocalizedPath(basePath, l);
              return (
                <a
                  key={l}
                  href={langHref}
                  hrefLang={l}
                  onClick={(e) => {
                    e.preventDefault();
                    onLanguageChange(l);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded-md uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#081E0D] ${
                    lang === l
                      ? 'bg-[#081E0D] text-[#83C408] shadow-xs font-extrabold'
                      : 'text-[#081E0D]/90 hover:text-[#051408] hover:bg-[#081E0D]/10 font-semibold'
                  }`}
                  aria-label={`Cambiar a idioma ${l}`}
                >
                  {l}
                </a>
              );
            })}
          </div>

          {/* Primary Action Button: WhatsApp */}
          <a
            href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20me%20gustar%C3%ADa%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCrmLead({
                type: 'whatsapp',
                treatment: 'Consulta General (Botón Cabecera)',
                sourcePage: 'Cabecera Principal Web',
                sourceUrl: currentPath,
              });
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-[#FAFDF6] bg-[#081E0D] hover:bg-[#113619] rounded-lg shadow-xs border border-[#081E0D] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081E0D]"
          >
            <MessageCircle className="w-4 h-4 text-[#83C408] shrink-0" />
            <span>{t.whatsappCta}</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#081E0D] hover:bg-[#081E0D]/15 rounded-lg cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081E0D]"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-b border-[#6DA605] bg-[#83C408] text-[#081E0D] px-4 pt-3 pb-6 space-y-1.5 shadow-lg">
          {navItems.map((item) => {
            const href = buildLocalizedPath(item.path, lang);
            return (
              <a
                key={item.path}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.path);
                }}
                aria-current={item.isActive ? 'page' : undefined}
                className={`block w-full text-left px-3.5 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                  item.isActive
                    ? 'bg-[#081E0D] text-[#83C408] font-extrabold'
                    : 'text-[#081E0D] hover:bg-[#081E0D]/12 font-semibold'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-3 border-t border-[#081E0D]/20 flex flex-col sm:flex-row gap-2">
            <a
              href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCrmLead({
                  type: 'whatsapp',
                  treatment: 'Consulta General (Menú Móvil)',
                  sourcePage: 'Menú Móvil Desplegable',
                  sourceUrl: currentPath,
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-extrabold text-[#FAFDF6] bg-[#081E0D] hover:bg-[#113619] rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#83C408]" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${CLINIC_CONTACT.phoneClean}`}
              onClick={() => {
                trackCrmLead({
                  type: 'call',
                  treatment: 'Consulta General (Menú Móvil)',
                  sourcePage: 'Menú Móvil Desplegable',
                  sourceUrl: currentPath,
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#83C408] bg-[#071408] hover:bg-[#112413] border border-[#071408] rounded-lg tabular-nums transition-colors"
              aria-label="Llamar a la clínica"
            >
              <Phone className="w-4 h-4 text-[#83C408]" />
              <span>{CLINIC_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
