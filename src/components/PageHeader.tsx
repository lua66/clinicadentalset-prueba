import React from 'react';
import { DentalSphere } from './DentalSphere';

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
  onNavigate: (path: string) => void;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  eyebrowIcon,
  eyebrowText,
  title,
  subtitle,
  onNavigate,
  children,
}) => {
  return (
    <section className="pt-8 sm:pt-10 pb-8 sm:pb-10 bg-stone-50/70 dark:bg-[#08120c] border-b border-stone-200/80 dark:border-emerald-950/70 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 lg:grid lg:grid-cols-12 lg:min-h-[250px]">
          {/* Left: Breadcrumbs, Eyebrow, Title & Subtitle */}
          <div className="flex-1 min-w-0 lg:col-span-8 space-y-3">
            <nav
              aria-label="Ruta de navegación"
              className="flex items-center flex-wrap gap-1.5 text-xs text-stone-500 dark:text-stone-400"
            >
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span aria-hidden="true">/</span>}
                  {crumb.path ? (
                    <button
                      onClick={() => onNavigate(crumb.path!)}
                      className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-emerald-800 dark:text-[#83C408] font-bold truncate max-w-[180px] sm:max-w-xs">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider">
              {eyebrowIcon}
              <span>{eyebrowText}</span>
            </div>

            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
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
