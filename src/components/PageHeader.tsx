import React from 'react';
import { DentalSphere } from './DentalSphere';
import { Language } from '../types';
import { buildLocalizedPath } from '../utils/routing';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrowIcon?: React.ReactNode;
  eyebrowText: string;
  title: string;
  subtitle: string;
  lang: Language;
  onNavigate: (path: string) => void;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  eyebrowIcon,
  eyebrowText,
  title,
  subtitle,
  lang,
  onNavigate,
  children,
}) => {
  return (
    <section className="pt-8 sm:pt-10 pb-8 sm:pb-10 bg-gradient-to-b from-[#0E1611] to-[#080C0A] border-b border-[#1D2D22] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 lg:grid lg:grid-cols-12 lg:min-h-[250px]">
          {/* Left: Breadcrumbs, Eyebrow, Title & Subtitle */}
          <div className="flex-1 min-w-0 lg:col-span-8 space-y-3">
            <nav
              aria-label="Ruta de navegación"
              className="flex items-center flex-wrap gap-1.5 text-xs text-[#9AB39E]"
            >
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span aria-hidden="true">/</span>}
                  {crumb.path ? (
                    <a
                      href={buildLocalizedPath(crumb.path, lang)}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(buildLocalizedPath(crumb.path!, lang));
                      }}
                      className="inline-flex items-center min-h-[44px] px-1 hover:text-[#83C408] hover:underline transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-[#83C408] font-bold truncate max-w-[180px] sm:max-w-xs">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider">
              {eyebrowIcon}
              <span>{eyebrowText}</span>
            </div>

            <h1
              className="text-2xl sm:text-3xl lg:text-4xl text-[#F5FAF3] leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#B9CEBE] max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            {children}
          </div>

          {/* Right: Single 3D Brand Sphere at consistent vertical height across all pages */}
          <div className="shrink-0 lg:col-span-4 flex items-center justify-end">
            <DentalSphere mode="page" />
          </div>
        </div>
      </div>
    </section>
  );
};
