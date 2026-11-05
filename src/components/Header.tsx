import React, { useState } from 'react';
import { Phone, MessageCircle, Moon, Sun, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_CONTACT } from '../data/clinicData';
import { OwnerAlertButton } from './OwnerAlertButton';
import { trackCrmLead } from '../utils/crmTracker';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  lang,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: t.navHome, isActive: currentPath === '/' },
    {
      path: '/especialidades',
      label: t.navSpecialties,
      isActive: currentPath.startsWith('/especialidades'),
    },
    { path: '/equipo', label: t.navTeam, isActive: currentPath === '/equipo' },
    { path: '/clinica', label: t.navGallery, isActive: currentPath === '/clinica' },
    { path: '/contacto', label: t.navContact, isActive: currentPath === '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#83C408] text-[#07180c] border-b border-[#699e06] shadow-md transition-colors duration-200">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 xl:gap-8">
        {/* ZONE 1: Authentic Brand Logo Image (inverted to deep obsidian on #83C408) */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center text-left group whitespace-nowrap shrink-0 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06180c]"
          aria-label="Ir a Inicio de Clínica Dental SET"
        >
          <img
            src="/assets/logo-blanc.png"
            alt="Clínica Dental SET"
            referrerPolicy="no-referrer"
            className="h-9 sm:h-11 w-auto object-contain brightness-0 contrast-125 transition-transform duration-150 group-hover:scale-105"
          />
        </button>

        {/* ZONE 2: 5 Clean single-line text nav links with high-contrast deep forest ink */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm tracking-tight"
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              aria-current={item.isActive ? 'page' : undefined}
              className={`whitespace-nowrap shrink-0 relative py-1.5 transition-colors duration-150 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06180c] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:rounded-full after:bg-[#06180c] after:transition-transform after:duration-200 ${
                item.isActive
                  ? 'text-[#040f07] font-extrabold after:scale-x-100'
                  : 'text-[#081b0e]/85 hover:text-[#040f07] font-semibold after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ZONE 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Selector: ES / CA / EN */}
          <div
            role="group"
            aria-label="Selector de idioma"
            className="flex items-center bg-[#07180c]/15 p-0.5 rounded-lg text-xs font-semibold border border-[#07180c]/20 shrink-0"
          >
            {(['es', 'ca', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                className={`px-2 py-1 rounded-md uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#06180c] ${
                  lang === l
                    ? 'bg-[#07180c] text-[#83C408] shadow-xs font-extrabold'
                    : 'text-[#07180c]/85 hover:text-[#040f07] hover:bg-[#07180c]/10 font-semibold'
                }`}
                aria-label={`Cambiar a idioma ${l}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-[#07180c] hover:bg-[#07180c]/15 transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06180c]"
            title={isDark ? 'Cambiar a modo crema suave' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema de color"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#07180c]" />
            ) : (
              <Moon className="w-4 h-4 text-[#07180c]" />
            )}
          </button>

          {/* Owner CRM Warning Button in Header (fixed width so WhatsApp never shifts) */}
          <OwnerAlertButton
            variant="header"
            onOpenCrm={() => handleNav('/crm')}
          />

          {/* Primary Action Button: WhatsApp (high-contrast obsidian button with #83C408 icon) */}
          <a
            href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20me%20gustar%C3%ADa%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCrmLead({
                type: 'whatsapp',
                treatment: 'Consulta General (Botón Cabecera)',
                sourcePage: 'Cabecera Principal Web',
              });
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-[#FAF7F2] bg-[#07180c] hover:bg-[#0e2917] rounded-lg shadow-sm hover:shadow-md border border-[#07180c] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06180c]"
          >
            <MessageCircle className="w-4 h-4 text-[#83C408] shrink-0" />
            <span>{t.whatsappCta}</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#07180c] hover:bg-[#07180c]/15 rounded-lg cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06180c]"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-b border-[#699e06] bg-[#83C408] text-[#07180c] px-4 pt-3 pb-6 space-y-1.5 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              aria-current={item.isActive ? 'page' : undefined}
              className={`w-full text-left px-3.5 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                item.isActive
                  ? 'bg-[#07180c] text-[#83C408] font-extrabold'
                  : 'text-[#07180c] hover:bg-[#07180c]/12 font-semibold'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* CRM Link inside mobile drawer */}
          <button
            onClick={() => handleNav('/crm')}
            className="w-full text-left px-3.5 py-2.5 text-xs font-bold rounded-lg bg-red-700 text-white hover:bg-red-800 flex items-center justify-between transition-colors cursor-pointer mt-2"
          >
            <span>Acceso Privado Dirección</span>
            <span className="text-xs font-medium text-red-100">CRM · Dueña</span>
          </button>

          <div className="pt-3 border-t border-[#07180c]/20 flex flex-col sm:flex-row gap-2">
            <a
              href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCrmLead({
                  type: 'whatsapp',
                  treatment: 'Consulta General (Menú Móvil)',
                  sourcePage: 'Menú Móvil Desplegable',
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-extrabold text-[#FAF7F2] bg-[#07180c] hover:bg-[#0e2917] rounded-lg transition-colors"
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
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#07180c] bg-[#FAF7F2] hover:bg-white border border-[#07180c]/25 rounded-lg tabular-nums transition-colors"
              aria-label="Llamar a la clínica"
            >
              <Phone className="w-4 h-4 text-[#07180c]" />
              <span>{CLINIC_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
