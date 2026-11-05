/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Private CRM & Click Measurement Tracker for Clínica Dental SET
 * Tracks patient conversion clicks (WhatsApp & telephone), timestamps,
 * specialty/treatment interest, source page, and unseen ("sin_ver") owner status.
 */

import { hasThirdPartyCookieConsent } from './cookieConsent';

export interface CrmLead {
  id: string;
  type: 'whatsapp' | 'call';
  phoneTarget: string;
  treatment: string;
  sourcePage: string;
  sourceUrl: string;
  timestamp: number;
  formattedDate: string;
  formattedTime: string;
  status: 'sin_ver' | 'visto';
  notes?: string;
  seenAt?: string;
}

const STORAGE_KEY = 'set_clinic_crm_leads';
const AUTH_KEY = 'set_clinic_crm_auth';
const PASSWORD_KEY = 'set_clinic_crm_password';
const DEFAULT_PASSWORD = 'set2026';

const INITIAL_DEMO_TIMESTAMP = 1777971600000;

const INITIAL_LEADS: CrmLead[] = [
  {
    id: 'lead-demo-1',
    type: 'whatsapp',
    phoneTarget: '697 35 85 40',
    treatment: 'Implantes Dentales y Cirugía Oral',
    sourcePage: 'Página de Especialidad: Implantes Dentales',
    sourceUrl: '/especialidades/implantes-dentales',
    timestamp: INITIAL_DEMO_TIMESTAMP,
    formattedDate: '05/05/2026',
    formattedTime: '11:20:00',
    status: 'sin_ver',
    notes: '[Registro de ejemplo · Clic en botón de WhatsApp desde especialidad]',
  },
  {
    id: 'lead-demo-2',
    type: 'call',
    phoneTarget: '933 09 18 71',
    treatment: 'Consulta General',
    sourcePage: 'Página de Inicio',
    sourceUrl: '/',
    timestamp: INITIAL_DEMO_TIMESTAMP - 3600 * 1000 * 2,
    formattedDate: '05/05/2026',
    formattedTime: '09:20:00',
    status: 'visto',
    notes: '[Registro de ejemplo · Clic en teléfono de la clínica]',
    seenAt: '05/05 09:45',
  },
];

export const getCrmLeads = (): CrmLead[] => {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw) as CrmLead[];
  } catch (e) {
    console.error('Error reading CRM leads from localStorage:', e);
    return INITIAL_LEADS;
  }
};

export const saveCrmLeads = (leads: CrmLead[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent('set-crm-updated'));
  } catch (e) {
    console.error('Error saving CRM leads to localStorage:', e);
  }
};

/**
 * Tracks an outbound WhatsApp or phone call click conversion
 */
export const trackCrmLead = (params: {
  type: 'whatsapp' | 'call';
  phoneTarget?: string;
  treatment?: string;
  sourcePage?: string;
  sourceUrl?: string;
}): CrmLead => {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(now);
  const formattedTime = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now);

  const newLead: CrmLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: params.type,
    phoneTarget:
      params.phoneTarget ||
      (params.type === 'whatsapp' ? '697 35 85 40' : '933 09 18 71'),
    treatment: params.treatment || 'Consulta General',
    sourcePage: params.sourcePage || (typeof document !== 'undefined' ? document.title : 'Web Clínica Dental SET'),
    sourceUrl:
      params.sourceUrl ||
      (typeof window !== 'undefined' ? window.location.pathname : '/'),
    timestamp: now.getTime(),
    formattedDate,
    formattedTime,
    status: 'sin_ver',
  };

  const leads = getCrmLeads();
  const updatedLeads = [newLead, ...leads];
  saveCrmLeads(updatedLeads);

  // Push structured click conversion event if dataLayer is configured & analytics consented
  if (typeof window !== 'undefined' && hasThirdPartyCookieConsent()) {
    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: 'clinic_contact_click',
        contact_channel: params.type,
        specialty_or_treatment: newLead.treatment,
        source_page: newLead.sourcePage,
        source_url: newLead.sourceUrl,
      });
    }
  }

  return newLead;
};

export const markLeadAsSeen = (leadId: string): void => {
  const now = new Date();
  const seenAt = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  const leads = getCrmLeads().map((l) =>
    l.id === leadId ? { ...l, status: 'visto' as const, seenAt } : l
  );
  saveCrmLeads(leads);
};

export const markLeadAsUnseen = (leadId: string): void => {
  const leads = getCrmLeads().map((l) =>
    l.id === leadId ? { ...l, status: 'sin_ver' as const, seenAt: undefined } : l
  );
  saveCrmLeads(leads);
};

export const markAllLeadsAsSeen = (): void => {
  const now = new Date();
  const seenAt = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  const leads = getCrmLeads().map((l) => ({
    ...l,
    status: 'visto' as const,
    seenAt: l.seenAt || seenAt,
  }));
  saveCrmLeads(leads);
};

export const updateLeadNotes = (leadId: string, notes: string): void => {
  const leads = getCrmLeads().map((l) =>
    l.id === leadId ? { ...l, notes } : l
  );
  saveCrmLeads(leads);
};

export const deleteCrmLead = (leadId: string): void => {
  const leads = getCrmLeads().filter((l) => l.id !== leadId);
  saveCrmLeads(leads);
};

export const getUnseenLeadsCount = (): number => {
  const leads = getCrmLeads();
  return leads.filter((l) => l.status === 'sin_ver').length;
};

export const getStoredPassword = (): string => {
  if (typeof window === 'undefined') return DEFAULT_PASSWORD;
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
};

export const setStoredPassword = (newPass: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PASSWORD_KEY, newPass);
};

export const isCrmAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
};

export const setCrmAuthenticated = (auth: boolean): void => {
  if (typeof window === 'undefined') return;
  if (auth) {
    sessionStorage.setItem(AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
};

export const checkCrmPassword = (inputPass: string): boolean => {
  const stored = getStoredPassword();
  const isValid = inputPass.trim() === stored.trim();
  if (isValid) {
    setCrmAuthenticated(true);
  }
  return isValid;
};
