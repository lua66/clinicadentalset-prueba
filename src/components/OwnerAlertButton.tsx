/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Illuminated Alert & Access Button for the Clinic Owner ("botón encendido de aviso que hay clientes sin ver")
 * Strict z-index and positioning logic:
 * - Header variant: z-50, constant square dimensions on #83C408 corporate header so it never expands or displaces WhatsApp.
 * - Floating variant: z-30, placed on LEFT on mobile (bottom-20 left-3 sm:left-6) and bottom-right on desktop (lg:bottom-6 lg:right-6 lg:left-auto).
 * - Footer variant: embedded cleanly in footer flow.
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, BellRing } from 'lucide-react';
import { getUnseenLeadsCount } from '../utils/crmTracker';

interface OwnerAlertButtonProps {
  onOpenCrm: () => void;
  variant?: 'header' | 'footer' | 'floating';
}

export const OwnerAlertButton: React.FC<OwnerAlertButtonProps> = ({
  onOpenCrm,
  variant = 'header',
}) => {
  const [unseenCount, setUnseenCount] = useState<number>(0);

  const updateCount = () => {
    setUnseenCount(getUnseenLeadsCount());
  };

  useEffect(() => {
    updateCount();

    const handleUpdate = () => updateCount();
    window.addEventListener('set-crm-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('set-crm-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const hasUnseen = unseenCount > 0;

  // 1. HEADER VARIANT: Fixed-size icon button styled for high contrast on corporate #83C408 header
  if (variant === 'header') {
    if (hasUnseen) {
      return (
        <button
          onClick={onOpenCrm}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-700 hover:bg-red-800 text-white shadow-[0_0_15px_rgba(185,28,28,0.75)] ring-2 ring-[#07180c] animate-pulse flex items-center justify-center shrink-0 cursor-pointer transition-all"
          title={`Aviso Dueña: ${unseenCount} ${unseenCount === 1 ? 'cliente sin ver' : 'clientes sin ver'} en el CRM`}
          aria-label={`Aviso Dueña: ${unseenCount} clientes sin ver`}
        >
          <BellRing className="w-4 h-4 text-yellow-200 animate-bounce" />
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-yellow-300 text-red-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#07180c] shadow-sm leading-none pointer-events-none tabular-nums">
            {unseenCount}
          </span>
        </button>
      );
    }

    return (
      <button
        onClick={onOpenCrm}
        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-[#07180c] hover:bg-[#07180c]/15 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
        title="Acceso Privado Dirección / CRM (Al día)"
        aria-label="Acceso Privado CRM Dirección"
      >
        <Lock className="w-4 h-4 text-[#07180c]" />
        <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#07180c] ring-1 ring-[#FAF7F2]" />
      </button>
    );
  }

  // 2. FLOATING VARIANT: Strict z-index & positioning logic preventing ANY overlap with the fixed phone button
  if (variant === 'floating') {
    return (
      <aside
        aria-label="Aviso y Acceso CRM Dirección"
        className="fixed z-30 bottom-20 left-3 sm:left-6 lg:bottom-6 lg:right-6 lg:left-auto pointer-events-auto transition-all duration-300"
      >
        {hasUnseen ? (
          <button
            onClick={onOpenCrm}
            className="group relative flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.7)] ring-2 ring-rose-400/60 transition-all cursor-pointer transform hover:scale-105"
            title={`Aviso Dueña: ${unseenCount} clientes sin revisar en el CRM`}
            aria-label="Aviso Dueña CRM"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300" />
            </span>

            <BellRing className="w-4 h-4 text-white animate-bounce" />

            <div className="text-left">
              <div className="text-[9px] uppercase font-bold text-yellow-200 tracking-wider leading-tight">
                Aviso Dueña
              </div>
              <div className="text-xs font-extrabold text-white leading-tight flex items-center gap-1 tabular-nums">
                <span>{unseenCount} sin ver</span>
              </div>
            </div>
          </button>
        ) : (
          <button
            onClick={onOpenCrm}
            className="group flex items-center gap-2 px-3 py-1.5 bg-[#0d1a11]/90 hover:bg-[#122418] text-stone-300 hover:text-white rounded-xl backdrop-blur-md border border-emerald-900/60 shadow-md text-xs transition-all cursor-pointer"
            title="Acceso Exclusivo Dirección · CRM (Al día)"
          >
            <Lock className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#83C408] transition-colors" />
            <span className="font-medium text-[11px]">CRM Dueña</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#83C408]" />
          </button>
        )}
      </aside>
    );
  }

  // 3. FOOTER VARIANT
  return (
    <button
      onClick={onOpenCrm}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
        hasUnseen
          ? 'text-white bg-red-600 hover:bg-red-700 shadow-[0_0_12px_rgba(239,68,68,0.6)] font-bold animate-pulse'
          : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white'
      }`}
    >
      {hasUnseen ? (
        <>
          <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
          <ShieldAlert className="w-3.5 h-3.5 text-white" />
          <span className="tabular-nums">Panel Dueña ({unseenCount} sin ver)</span>
        </>
      ) : (
        <>
          <Lock className="w-3.5 h-3.5 text-stone-400" />
          <span>Acceso Privado Dirección (CRM)</span>
        </>
      )}
    </button>
  );
};
